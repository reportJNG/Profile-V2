"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { MutableRefObject } from "react";

type WebAudioWindow = Window &
  typeof globalThis & {
    webkitAudioContext?: typeof AudioContext;
  };

type Direction = 1 | -1;
type BrowserAudioContextState = AudioContextState | "interrupted";

export type ModeSwitchSource = "control" | "keyboard" | "touch" | "wheel";

const noiseLength = 0.42;
const themeVolume = 0.10;

const note = {
  a2: 110,
  d3: 146.83,
  a3: 220,
  c4: 261.63,
  d4: 293.66,
  a4: 440,
  c5: 523.25,
  d5: 587.33,
};

type TrackedSourceRef = MutableRefObject<AudioScheduledSourceNode[]>;

function createNoiseBuffer(context: AudioContext) {
  const length = Math.max(1, Math.floor(context.sampleRate * noiseLength));
  const buffer = context.createBuffer(1, length, context.sampleRate);
  const data = buffer.getChannelData(0);

  for (let index = 0; index < length; index += 1) {
    const fade = 1 - index / length;
    data[index] = (Math.random() * 2 - 1) * fade * fade;
  }

  return buffer;
}

function trackSource(
  sourceRef: TrackedSourceRef,
  source: AudioScheduledSourceNode,
) {
  sourceRef.current = [...sourceRef.current, source];

  source.addEventListener(
    "ended",
    () => {
      sourceRef.current = sourceRef.current.filter(
        (trackedSource) => trackedSource !== source,
      );
    },
    { once: true },
  );
}

function stopTrackedSources(sourceRef: TrackedSourceRef) {
  sourceRef.current.forEach((source) => {
    try {
      source.stop();
    } catch {
      // The source can already be stopped when effects are triggered rapidly.
    }
  });

  sourceRef.current = [];
}

function setGainEnvelope(
  gain: AudioParam,
  startAt: number,
  peak: number,
  attack: number,
  releaseAt: number,
) {
  gain.cancelScheduledValues(startAt);
  gain.setValueAtTime(0.0001, startAt);
  gain.exponentialRampToValueAtTime(peak, startAt + attack);
  gain.exponentialRampToValueAtTime(0.0001, releaseAt);
}

function scheduleTone({
  context,
  destination,
  sourceRef,
  frequency,
  startAt,
  duration,
  peakGain,
  type = "triangle",
  attack = 0.012,
  detune = 0,
}: {
  context: AudioContext;
  destination: AudioNode;
  sourceRef: TrackedSourceRef;
  frequency: number;
  startAt: number;
  duration: number;
  peakGain: number;
  type?: OscillatorType;
  attack?: number;
  detune?: number;
}) {
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const filter = context.createBiquadFilter();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, startAt);
  oscillator.detune.setValueAtTime(detune, startAt);

  filter.type = "lowpass";
  filter.frequency.setValueAtTime(2600, startAt);
  filter.Q.setValueAtTime(0.55, startAt);

  setGainEnvelope(gain.gain, startAt, peakGain, attack, startAt + duration);

  oscillator.connect(filter);
  filter.connect(gain);
  gain.connect(destination);

  trackSource(sourceRef, oscillator);

  oscillator.start(startAt);
  oscillator.stop(startAt + duration + 0.04);
}

export function useLobbyAudio() {
  const [isMusicEnabled, setIsMusicEnabled] = useState(false);
  const contextRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const sfxGainRef = useRef<GainNode | null>(null);
  const themeAudioRef = useRef<HTMLAudioElement | null>(null);
  const noiseBufferRef = useRef<AudioBuffer | null>(null);
  const activeSfxSourcesRef = useRef<AudioScheduledSourceNode[]>([]);
  const isThemePlayingRef = useRef(false);
  const isMusicEnabledRef = useRef(false);

  const getContext = useCallback(() => {
    if (typeof window === "undefined") {
      return null;
    }

    if (contextRef.current && contextRef.current.state !== "closed") {
      return contextRef.current;
    }

    const AudioContextConstructor =
      window.AudioContext ?? (window as WebAudioWindow).webkitAudioContext;

    if (!AudioContextConstructor) {
      return null;
    }

    const context = new AudioContextConstructor({ latencyHint: "interactive" });
    const masterGain = context.createGain();
    const sfxGain = context.createGain();

    masterGain.gain.setValueAtTime(0.86, context.currentTime);
    sfxGain.gain.setValueAtTime(0.95, context.currentTime);

    sfxGain.connect(masterGain);
    masterGain.connect(context.destination);

    contextRef.current = context;
    masterGainRef.current = masterGain;
    sfxGainRef.current = sfxGain;
    noiseBufferRef.current = createNoiseBuffer(context);

    return context;
  }, []);

  const getThemeAudio = useCallback(() => {
    if (typeof window === "undefined") {
      return null;
    }

    if (themeAudioRef.current) {
      return themeAudioRef.current;
    }

    const audio = new Audio("/theme.mp3");
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = themeVolume;
    themeAudioRef.current = audio;

    return audio;
  }, []);

  const startTheme = useCallback(() => {
    const audio = getThemeAudio();
    if (!audio || isThemePlayingRef.current) {
      return;
    }

    audio.volume = themeVolume;
    void audio
      .play()
      .then(() => {
        isThemePlayingRef.current = true;
      })
      .catch(() => {
        isThemePlayingRef.current = false;
      });
  }, [getThemeAudio]);

  const pauseTheme = useCallback(() => {
    isThemePlayingRef.current = false;

    const audio = themeAudioRef.current;
    if (audio) {
      audio.pause();
    }
  }, []);

  const runWithAudio = useCallback(
    (callback?: (context: AudioContext) => void, shouldStartTheme = true) => {
      const context = getContext();
      if (!context) {
        return;
      }

      let retryCount = 0;
      let retryTimer: number | null = null;
      let didRun = false;
      let cleanupStateChange: (() => void) | null = null;

      const clearRetry = () => {
        if (retryTimer !== null) {
          window.clearTimeout(retryTimer);
          retryTimer = null;
        }
      };

      const cleanup = () => {
        clearRetry();
        cleanupStateChange?.();
        cleanupStateChange = null;
      };

      const run = () => {
        if (didRun) {
          return;
        }

        if ((context.state as BrowserAudioContextState) !== "running") {
          return;
        }

        didRun = true;
        cleanup();

        if (shouldStartTheme && isMusicEnabledRef.current) {
          startTheme();
        }

        callback?.(context);
      };

      const tryResume = () => {
        if ((context.state as BrowserAudioContextState) === "closed") {
          clearRetry();
          return;
        }

        if ((context.state as BrowserAudioContextState) === "running") {
          run();
          return;
        }

        void context.resume().then(run).catch(() => {
          // Browsers can block audible autoplay until a user gesture.
        });
      };

      const retryResume = () => {
        tryResume();

        if ((context.state as BrowserAudioContextState) === "running") {
          return;
        }

        retryCount += 1;
        if (retryCount <= 4) {
          retryTimer = window.setTimeout(retryResume, 50);
        } else {
          cleanup();
        }
      };

      if ((context.state as BrowserAudioContextState) !== "running") {
        const handleStateChange = () => {
          run();
        };

        context.addEventListener("statechange", handleStateChange);
        cleanupStateChange = () => {
          context.removeEventListener("statechange", handleStateChange);
        };
        retryResume();
        return;
      }

      run();
    },
    [getContext, startTheme],
  );

  const playNoise = useCallback(
    ({
      context,
      startAt,
      duration,
      peakGain,
      frequency,
      q = 0.82,
    }: {
      context: AudioContext;
      startAt: number;
      duration: number;
      peakGain: number;
      frequency: number;
      q?: number;
    }) => {
      const destination = sfxGainRef.current;
      if (!destination) {
        return;
      }

      const noise = context.createBufferSource();
      const filter = context.createBiquadFilter();
      const gain = context.createGain();

      noise.buffer = noiseBufferRef.current ?? createNoiseBuffer(context);
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(frequency, startAt);
      filter.frequency.exponentialRampToValueAtTime(
        Math.max(320, frequency * 0.52),
        startAt + duration * 0.8,
      );
      filter.Q.setValueAtTime(q, startAt);

      setGainEnvelope(
        gain.gain,
        startAt,
        peakGain,
        0.01,
        startAt + duration,
      );

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(destination);

      trackSource(activeSfxSourcesRef, noise);

      noise.start(startAt);
      noise.stop(startAt + duration + 0.02);
    },
    [],
  );

  const playMoveSound = useCallback(
    (direction: Direction, source: ModeSwitchSource = "control") => {
      runWithAudio((context) => {
        const destination = sfxGainRef.current;
        if (!destination) {
          return;
        }

        const now = context.currentTime;
        const isWheel = source === "wheel";
        const lowFrequency = direction > 0 ? 196 : 246.94;
        const highFrequency = direction > 0 ? 783.99 : 587.33;

        playNoise({
          context,
          startAt: now,
          duration: isWheel ? 0.26 : 0.18,
          peakGain: isWheel ? 0.09 : 0.07,
          frequency: isWheel ? 3400 : 2500,
          q: isWheel ? 1.2 : 0.88,
        });

        scheduleTone({
          context,
          destination,
          sourceRef: activeSfxSourcesRef,
          frequency: lowFrequency,
          startAt: now,
          duration: 0.18,
          peakGain: 0.075,
          type: "sine",
          attack: 0.008,
        });

        scheduleTone({
          context,
          destination,
          sourceRef: activeSfxSourcesRef,
          frequency: highFrequency,
          startAt: now + 0.025,
          duration: isWheel ? 0.2 : 0.14,
          peakGain: isWheel ? 0.096 : 0.076,
          type: "triangle",
          attack: 0.01,
          detune: direction > 0 ? 6 : -8,
        });

        if (isWheel) {
          scheduleTone({
            context,
            destination,
            sourceRef: activeSfxSourcesRef,
            frequency: direction > 0 ? note.d5 : note.c5,
            startAt: now + 0.095,
            duration: 0.16,
            peakGain: 0.052,
            type: "sine",
            attack: 0.018,
          });
        }
      });
    },
    [playNoise, runWithAudio],
  );

  const playEnterSound = useCallback(() => {
    runWithAudio((context) => {
      const destination = sfxGainRef.current;
      if (!destination) {
        return;
      }

      const now = context.currentTime;

      playNoise({
        context,
        startAt: now,
        duration: 0.26,
        peakGain: 0.08,
        frequency: 2200,
        q: 0.72,
      });

      [note.d4, note.a4, note.d5].forEach((frequency, index) => {
        scheduleTone({
          context,
          destination,
          sourceRef: activeSfxSourcesRef,
          frequency,
          startAt: now + index * 0.045,
          duration: 0.34 - index * 0.03,
          peakGain: 0.08 - index * 0.012,
          type: index === 2 ? "sine" : "triangle",
          attack: 0.012,
        });
      });
    });
  }, [playNoise, runWithAudio]);

  const toggleMusic = useCallback(() => {
    const nextEnabled = !isMusicEnabledRef.current;
    isMusicEnabledRef.current = nextEnabled;
    setIsMusicEnabled(nextEnabled);

    runWithAudio((context) => {
      const destination = sfxGainRef.current;
      if (!destination) {
        if (!nextEnabled) {
          pauseTheme();
        }
        return;
      }

      const now = context.currentTime;
      playNoise({
        context,
        startAt: now,
        duration: 0.18,
        peakGain: nextEnabled ? 0.066 : 0.05,
        frequency: nextEnabled ? 2800 : 1400,
        q: 0.9,
      });

      scheduleTone({
        context,
        destination,
        sourceRef: activeSfxSourcesRef,
        frequency: nextEnabled ? note.d5 : note.a3,
        startAt: now,
        duration: 0.18,
        peakGain: 0.085,
        type: "triangle",
        attack: 0.008,
      });

      scheduleTone({
        context,
        destination,
        sourceRef: activeSfxSourcesRef,
        frequency: nextEnabled ? note.a4 : note.d3,
        startAt: now + 0.045,
        duration: 0.22,
        peakGain: nextEnabled ? 0.07 : 0.058,
        type: "sine",
        attack: 0.012,
      });

      if (nextEnabled) {
        startTheme();
      } else {
        pauseTheme();
      }
    }, false);
  }, [pauseTheme, playNoise, runWithAudio, startTheme]);

  useEffect(() => {
    isMusicEnabledRef.current = isMusicEnabled;
  }, [isMusicEnabled]);

  useEffect(() => {
    const unlockAudio = () => runWithAudio();

    window.addEventListener("pointerdown", unlockAudio, {
      capture: true,
      passive: true,
    });
    window.addEventListener("click", unlockAudio, {
      capture: true,
      passive: true,
    });
    window.addEventListener("keydown", unlockAudio, { capture: true });
    window.addEventListener("touchstart", unlockAudio, {
      capture: true,
      passive: true,
    });

    return () => {
      window.removeEventListener("pointerdown", unlockAudio, { capture: true });
      window.removeEventListener("click", unlockAudio, { capture: true });
      window.removeEventListener("keydown", unlockAudio, { capture: true });
      window.removeEventListener("touchstart", unlockAudio, { capture: true });
    };
  }, [runWithAudio]);

  useEffect(() => {
    return () => {
      pauseTheme();
      stopTrackedSources(activeSfxSourcesRef);

      const context = contextRef.current;
      if (context && context.state !== "closed") {
        void context.close();
      }
    };
  }, [pauseTheme]);

  return {
    isMusicEnabled,
    playEnterSound,
    playMoveSound,
    toggleMusic,
  };
}

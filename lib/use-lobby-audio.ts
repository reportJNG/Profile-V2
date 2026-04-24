"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { MutableRefObject } from "react";

type WebAudioWindow = Window &
  typeof globalThis & {
    webkitAudioContext?: typeof AudioContext;
  };

type Direction = 1 | -1;

export type ModeSwitchSource = "control" | "keyboard" | "touch" | "wheel";

const noiseLength = 0.42;
const themePhraseSeconds = 24;
const schedulerIntervalMs = 480;
const scheduleAheadSeconds = 1.5;

const note = {
  a2: 110,
  b2: 123.47,
  c3: 130.81,
  d3: 146.83,
  e3: 164.81,
  f3: 174.61,
  g3: 196,
  a3: 220,
  b3: 246.94,
  c4: 261.63,
  d4: 293.66,
  e4: 329.63,
  f4: 349.23,
  g4: 392,
  a4: 440,
  b4: 493.88,
  c5: 523.25,
  d5: 587.33,
  e5: 659.25,
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

function schedulePad({
  context,
  destination,
  sourceRef,
  frequency,
  startAt,
  duration,
  peakGain,
  detune = 0,
}: {
  context: AudioContext;
  destination: AudioNode;
  sourceRef: TrackedSourceRef;
  frequency: number;
  startAt: number;
  duration: number;
  peakGain: number;
  detune?: number;
}) {
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const filter = context.createBiquadFilter();

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(frequency, startAt);
  oscillator.detune.setValueAtTime(detune, startAt);

  filter.type = "lowpass";
  filter.frequency.setValueAtTime(520, startAt);
  filter.frequency.linearRampToValueAtTime(720, startAt + duration * 0.58);
  filter.frequency.linearRampToValueAtTime(440, startAt + duration);
  filter.Q.setValueAtTime(0.34, startAt);

  gain.gain.cancelScheduledValues(startAt);
  gain.gain.setValueAtTime(0.0001, startAt);
  gain.gain.exponentialRampToValueAtTime(peakGain, startAt + 2.8);
  gain.gain.setValueAtTime(peakGain * 0.76, startAt + duration - 3.2);
  gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);

  oscillator.connect(filter);
  filter.connect(gain);
  gain.connect(destination);

  trackSource(sourceRef, oscillator);

  oscillator.start(startAt);
  oscillator.stop(startAt + duration + 0.05);
}

function scheduleChoirTone({
  context,
  destination,
  sourceRef,
  frequency,
  startAt,
  duration,
  peakGain,
}: {
  context: AudioContext;
  destination: AudioNode;
  sourceRef: TrackedSourceRef;
  frequency: number;
  startAt: number;
  duration: number;
  peakGain: number;
}) {
  const lowVoice = context.createOscillator();
  const highVoice = context.createOscillator();
  const shimmerVoice = context.createOscillator();
  const gain = context.createGain();
  const filter = context.createBiquadFilter();

  lowVoice.type = "sine";
  lowVoice.frequency.setValueAtTime(frequency, startAt);
  lowVoice.detune.setValueAtTime(-9, startAt);

  highVoice.type = "sine";
  highVoice.frequency.setValueAtTime(frequency * 2, startAt);
  highVoice.detune.setValueAtTime(7, startAt);

  shimmerVoice.type = "triangle";
  shimmerVoice.frequency.setValueAtTime(frequency * 3, startAt);
  shimmerVoice.detune.setValueAtTime(-4, startAt);

  filter.type = "lowpass";
  filter.frequency.setValueAtTime(1050, startAt);
  filter.frequency.linearRampToValueAtTime(1350, startAt + duration * 0.5);
  filter.frequency.linearRampToValueAtTime(760, startAt + duration);
  filter.Q.setValueAtTime(0.48, startAt);

  gain.gain.cancelScheduledValues(startAt);
  gain.gain.setValueAtTime(0.0001, startAt);
  gain.gain.exponentialRampToValueAtTime(peakGain, startAt + 0.9);
  gain.gain.setValueAtTime(peakGain * 0.74, startAt + duration - 0.9);
  gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);

  lowVoice.connect(gain);
  highVoice.connect(gain);
  shimmerVoice.connect(gain);
  gain.connect(filter);
  filter.connect(destination);

  [lowVoice, highVoice, shimmerVoice].forEach((source) =>
    trackSource(sourceRef, source),
  );

  lowVoice.start(startAt);
  highVoice.start(startAt);
  shimmerVoice.start(startAt);

  lowVoice.stop(startAt + duration + 0.08);
  highVoice.stop(startAt + duration + 0.08);
  shimmerVoice.stop(startAt + duration + 0.08);
}

function scheduleBellTone({
  context,
  destination,
  sourceRef,
  frequency,
  startAt,
  duration,
  peakGain,
}: {
  context: AudioContext;
  destination: AudioNode;
  sourceRef: TrackedSourceRef;
  frequency: number;
  startAt: number;
  duration: number;
  peakGain: number;
}) {
  const fundamental = context.createOscillator();
  const overtone = context.createOscillator();
  const gain = context.createGain();
  const filter = context.createBiquadFilter();

  fundamental.type = "sine";
  fundamental.frequency.setValueAtTime(frequency, startAt);

  overtone.type = "triangle";
  overtone.frequency.setValueAtTime(frequency * 2.01, startAt);
  overtone.detune.setValueAtTime(5, startAt);

  filter.type = "bandpass";
  filter.frequency.setValueAtTime(frequency * 2.2, startAt);
  filter.Q.setValueAtTime(1.4, startAt);

  gain.gain.cancelScheduledValues(startAt);
  gain.gain.setValueAtTime(0.0001, startAt);
  gain.gain.exponentialRampToValueAtTime(peakGain, startAt + 0.018);
  gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);

  fundamental.connect(gain);
  overtone.connect(gain);
  gain.connect(filter);
  filter.connect(destination);

  [fundamental, overtone].forEach((source) => trackSource(sourceRef, source));

  fundamental.start(startAt);
  overtone.start(startAt);
  fundamental.stop(startAt + duration + 0.05);
  overtone.stop(startAt + duration + 0.05);
}

function scheduleThemePhrase(
  context: AudioContext,
  musicGain: AudioNode,
  sourceRef: TrackedSourceRef,
  startAt: number,
) {
  const beat = themePhraseSeconds / 32;

  [
    [note.e3, 0, 8],
    [note.c3, 8, 8],
    [note.g3, 16, 8],
    [note.d3, 24, 8],
  ].forEach(([frequency, beatStart, beats]) => {
    schedulePad({
      context,
      destination: musicGain,
      sourceRef,
      frequency,
      startAt: startAt + beatStart * beat,
      duration: beats * beat + 4.6,
      peakGain: 0.05,
    });
    schedulePad({
      context,
      destination: musicGain,
      sourceRef,
      frequency: frequency * 1.5,
      startAt: startAt + beatStart * beat + 0.18,
      duration: beats * beat + 4.2,
      peakGain: 0.017,
      detune: -6,
    });
  });

  [
    [note.e4, 0.3, 5.6],
    [note.g4, 8.2, 4.8],
    [note.b3, 16.4, 5.2],
    [note.a3, 24.15, 4.9],
  ].forEach(([frequency, beatStart, beats]) => {
    scheduleChoirTone({
      context,
      destination: musicGain,
      sourceRef,
      frequency,
      startAt: startAt + beatStart * beat,
      duration: beats * beat,
      peakGain: 0.028,
    });
  });

  [
    [note.e4, 1.0],
    [note.b3, 2.5],
    [note.g4, 4.0],
    [note.e5, 6.65],
    [note.c4, 9.1],
    [note.g3, 10.45],
    [note.e4, 12.15],
    [note.b4, 14.7],
    [note.g4, 17.2],
    [note.d4, 18.65],
    [note.b4, 20.2],
    [note.d5, 22.85],
    [note.d4, 25.15],
    [note.a3, 26.65],
    [note.f4, 28.1],
    [note.a4, 30.25],
  ].forEach(([frequency, beatStart], index) => {
    scheduleBellTone({
      context,
      destination: musicGain,
      sourceRef,
      frequency,
      startAt: startAt + beatStart * beat,
      duration: index % 4 === 3 ? 1.7 : 1.25,
      peakGain: index % 4 === 0 ? 0.026 : 0.018,
    });
  });

  [
    [note.b4, 7.35],
    [note.e5, 15.45],
    [note.a4, 23.6],
    [note.g4, 31.1],
  ].forEach(([frequency, beatStart]) => {
    scheduleChoirTone({
      context,
      destination: musicGain,
      sourceRef,
      frequency,
      startAt: startAt + beatStart * beat,
      duration: 2.15 * beat,
      peakGain: 0.014,
    });
  });
}

export function useLobbyAudio() {
  const [isMusicEnabled, setIsMusicEnabled] = useState(false);
  const contextRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const musicGainRef = useRef<GainNode | null>(null);
  const sfxGainRef = useRef<GainNode | null>(null);
  const noiseBufferRef = useRef<AudioBuffer | null>(null);
  const activeMusicSourcesRef = useRef<AudioScheduledSourceNode[]>([]);
  const activeSfxSourcesRef = useRef<AudioScheduledSourceNode[]>([]);
  const schedulerRef = useRef<number | null>(null);
  const nextPhraseStartRef = useRef(0);
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
    const musicGain = context.createGain();
    const sfxGain = context.createGain();

    masterGain.gain.setValueAtTime(0.86, context.currentTime);
    musicGain.gain.setValueAtTime(0.0001, context.currentTime);
    sfxGain.gain.setValueAtTime(0.95, context.currentTime);

    musicGain.connect(masterGain);
    sfxGain.connect(masterGain);
    masterGain.connect(context.destination);

    contextRef.current = context;
    masterGainRef.current = masterGain;
    musicGainRef.current = musicGain;
    sfxGainRef.current = sfxGain;
    noiseBufferRef.current = createNoiseBuffer(context);

    return context;
  }, []);

  const clearScheduler = useCallback(() => {
    if (schedulerRef.current !== null) {
      window.clearInterval(schedulerRef.current);
      schedulerRef.current = null;
    }
  }, []);

  const startTheme = useCallback(() => {
    const context = getContext();
    const musicGain = musicGainRef.current;

    if (!context || !musicGain || context.state !== "running") {
      return;
    }

    const audioContext = context;
    const musicOutput = musicGain;

    if (isThemePlayingRef.current) {
      return;
    }

    isThemePlayingRef.current = true;
    nextPhraseStartRef.current = audioContext.currentTime + 0.08;

    const now = audioContext.currentTime;
    musicOutput.gain.cancelScheduledValues(now);
    musicOutput.gain.setValueAtTime(
      Math.max(musicOutput.gain.value, 0.0001),
      now,
    );
    musicOutput.gain.exponentialRampToValueAtTime(0.58, now + 2.8);

    function scheduleAhead() {
      if (!isMusicEnabledRef.current || audioContext.state !== "running") {
        return;
      }

      while (
        nextPhraseStartRef.current <
        audioContext.currentTime + scheduleAheadSeconds
      ) {
        scheduleThemePhrase(
          audioContext,
          musicOutput,
          activeMusicSourcesRef,
          nextPhraseStartRef.current,
        );
        nextPhraseStartRef.current += themePhraseSeconds;
      }
    }

    clearScheduler();
    scheduleAhead();
    schedulerRef.current = window.setInterval(
      scheduleAhead,
      schedulerIntervalMs,
    );
  }, [clearScheduler, getContext]);

  const pauseTheme = useCallback(() => {
    clearScheduler();
    isThemePlayingRef.current = false;

    const context = contextRef.current;
    const musicGain = musicGainRef.current;
    if (!context || !musicGain || context.state === "closed") {
      stopTrackedSources(activeMusicSourcesRef);
      return;
    }

    const now = context.currentTime;
    musicGain.gain.cancelScheduledValues(now);
    musicGain.gain.setValueAtTime(Math.max(musicGain.gain.value, 0.0001), now);
    musicGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);

    window.setTimeout(() => {
      stopTrackedSources(activeMusicSourcesRef);
    }, 340);
  }, [clearScheduler]);

  const runWithAudio = useCallback(
    (callback?: (context: AudioContext) => void, shouldStartTheme = true) => {
      const context = getContext();
      if (!context) {
        return;
      }

      const run = () => {
        if (context.state !== "running") {
          return;
        }

        if (shouldStartTheme && isMusicEnabledRef.current) {
          startTheme();
        }

        callback?.(context);
      };

      if (context.state === "suspended") {
        void context.resume().then(run).catch(() => {
          // Browsers can block audible autoplay until a user gesture.
        });
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
    }, nextEnabled);
  }, [pauseTheme, playNoise, runWithAudio, startTheme]);

  useEffect(() => {
    isMusicEnabledRef.current = isMusicEnabled;
  }, [isMusicEnabled]);

  useEffect(() => {
    const context = getContext();
    if (!context) {
      return;
    }

    runWithAudio();

    const unlockAudio = () => runWithAudio();

    window.addEventListener("pointerdown", unlockAudio, { passive: true });
    window.addEventListener("keydown", unlockAudio);
    window.addEventListener("touchstart", unlockAudio, { passive: true });

    return () => {
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
    };
  }, [getContext, runWithAudio]);

  useEffect(() => {
    return () => {
      clearScheduler();
      stopTrackedSources(activeMusicSourcesRef);
      stopTrackedSources(activeSfxSourcesRef);

      const context = contextRef.current;
      if (context && context.state !== "closed") {
        void context.close();
      }
    };
  }, [clearScheduler]);

  return {
    isMusicEnabled,
    playEnterSound,
    playMoveSound,
    toggleMusic,
  };
}

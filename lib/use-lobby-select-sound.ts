"use client";

import { useCallback, useEffect, useRef } from "react";

type WebAudioWindow = Window &
  typeof globalThis & {
    webkitAudioContext?: typeof AudioContext;
  };

const soundLength = 0.16;

function createNoiseBuffer(context: AudioContext) {
  const length = Math.max(1, Math.floor(context.sampleRate * soundLength));
  const buffer = context.createBuffer(1, length, context.sampleRate);
  const data = buffer.getChannelData(0);

  for (let index = 0; index < length; index += 1) {
    const fade = 1 - index / length;
    data[index] = (Math.random() * 2 - 1) * fade;
  }

  return buffer;
}

export function useLobbySelectSound() {
  const contextRef = useRef<AudioContext | null>(null);
  const noiseBufferRef = useRef<AudioBuffer | null>(null);
  const activeSourcesRef = useRef<AudioScheduledSourceNode[]>([]);

  const stopActiveSources = useCallback(() => {
    activeSourcesRef.current.forEach((source) => {
      try {
        source.stop();
      } catch {
        // Sources may already have ended between rapid selection inputs.
      }
    });

    activeSourcesRef.current = [];
  }, []);

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
    contextRef.current = context;
    noiseBufferRef.current = createNoiseBuffer(context);

    return context;
  }, []);

  useEffect(() => {
    return () => {
      stopActiveSources();

      const context = contextRef.current;
      if (context && context.state !== "closed") {
        void context.close();
      }
    };
  }, [stopActiveSources]);

  return useCallback(() => {
    const context = getContext();
    if (!context) {
      return;
    }

    if (context.state === "suspended") {
      void context.resume();
    }

    stopActiveSources();

    const now = context.currentTime;
    const end = now + soundLength;
    const master = context.createGain();
    master.gain.setValueAtTime(0.12, now);
    master.gain.exponentialRampToValueAtTime(0.001, end);
    master.connect(context.destination);

    const noise = context.createBufferSource();
    noise.buffer = noiseBufferRef.current ?? createNoiseBuffer(context);

    const noiseFilter = context.createBiquadFilter();
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.setValueAtTime(2200, now);
    noiseFilter.Q.setValueAtTime(0.85, now);

    const noiseGain = context.createGain();
    noiseGain.gain.setValueAtTime(0.001, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.18, now + 0.012);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(master);

    const sweep = context.createOscillator();
    sweep.type = "triangle";
    sweep.frequency.setValueAtTime(980, now);
    sweep.frequency.exponentialRampToValueAtTime(540, now + 0.09);

    const sweepGain = context.createGain();
    sweepGain.gain.setValueAtTime(0.001, now);
    sweepGain.gain.exponentialRampToValueAtTime(0.11, now + 0.01);
    sweepGain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

    sweep.connect(sweepGain);
    sweepGain.connect(master);

    const click = context.createOscillator();
    click.type = "sine";
    click.frequency.setValueAtTime(1460, now);

    const clickGain = context.createGain();
    clickGain.gain.setValueAtTime(0.001, now);
    clickGain.gain.exponentialRampToValueAtTime(0.08, now + 0.004);
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

    click.connect(clickGain);
    clickGain.connect(master);

    activeSourcesRef.current = [noise, sweep, click];

    noise.start(now);
    sweep.start(now);
    click.start(now);

    noise.stop(end);
    sweep.stop(end);
    click.stop(now + 0.05);

    window.setTimeout(() => {
      master.disconnect();
    }, soundLength * 1000 + 60);
  }, [getContext, stopActiveSources]);
}

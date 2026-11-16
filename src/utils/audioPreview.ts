let activeCtx: AudioContext | null = null;
let stopTimer: number | null = null;

export function stopAudioPreview() {
  if (stopTimer !== null) {
    window.clearTimeout(stopTimer);
    stopTimer = null;
  }
  if (activeCtx) {
    activeCtx.close().catch(() => {});
    activeCtx = null;
  }
}

export function playArtistChordPreview(freqs: number[], onEnd?: () => void) {
  stopAudioPreview();
  const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtx) {
    onEnd?.();
    return;
  }

  const ctx = new AudioCtx();
  activeCtx = ctx;

  const master = ctx.createGain();
  master.gain.setValueAtTime(0.001, ctx.currentTime);
  master.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 0.15);
  master.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3.2);
  master.connect(ctx.destination);

  freqs.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const noteGain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = idx % 2 === 0 ? 'triangle' : 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.14);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, ctx.currentTime);

    noteGain.gain.setValueAtTime(0.001, ctx.currentTime + idx * 0.14);
    noteGain.gain.exponentialRampToValueAtTime(0.25 / freqs.length, ctx.currentTime + idx * 0.14 + 0.08);
    noteGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3.1);

    osc.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(master);

    osc.start(ctx.currentTime + idx * 0.14);
    osc.stop(ctx.currentTime + 3.25);
  });

  stopTimer = window.setTimeout(() => {
    stopAudioPreview();
    onEnd?.();
  }, 3300);
}

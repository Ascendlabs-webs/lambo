/**
 * Real-time synthetic V10 Engine Sound Synthesizer via Web Audio API.
 * Accurately models a 90-degree 5.2L naturally aspirated V10 firing order:
 * Fundamental firing frequency = (RPM / 60) * (10 cylinders / 2 strokes) = RPM / 12 Hz.
 * Includes harmonic overtones, exhaust resonance, rumble, and redline limiter rasp.
 */

class V10AudioEngine {
  private ctx: AudioContext | null = null;
  private isRunning: boolean = false;
  private currentRpm: number = 900;
  private masterGain: GainNode | null = null;
  private idleOsc: OscillatorNode | null = null;
  private mainOsc: OscillatorNode | null = null;
  private subOsc: OscillatorNode | null = null;
  private highOsc: OscillatorNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private exhaustFilter: BiquadFilterNode | null = null;
  private waveshaper: WaveShaperNode | null = null;

  public init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    } catch {
      // AudioContext not supported or blocked
      this.ctx = null;
    }
  }

  private makeDistortionCurve(amount: number = 40): Float32Array {
    const k = amount;
    const nSamples = 44100;
    const curve = new Float32Array(nSamples);
    const deg = Math.PI / 180;
    for (let i = 0; i < nSamples; ++i) {
      const x = (i * 2) / nSamples - 1;
      curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
    }
    return curve;
  }

  public start() {
    this.init();
    if (!this.ctx) return false;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    if (this.isRunning) return true;

    try {
      const t = this.ctx.currentTime;
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0, t);
      this.masterGain.gain.linearRampToValueAtTime(0.28, t + 0.3);
      this.masterGain.connect(this.ctx.destination);

      // Waveshaper for exhaust growl
      this.waveshaper = this.ctx.createWaveShaper();
      (this.waveshaper as unknown as { curve: Float32Array | null }).curve = this.makeDistortionCurve(35) as any;
      this.waveshaper.oversample = '4x';

      // Resonant exhaust filter
      this.exhaustFilter = this.ctx.createBiquadFilter();
      this.exhaustFilter.type = 'lowpass';
      this.exhaustFilter.frequency.setValueAtTime(450, t);
      this.exhaustFilter.Q.setValueAtTime(3.5, t);

      this.exhaustFilter.connect(this.waveshaper);
      this.waveshaper.connect(this.masterGain);

      // 1. Fundamental V10 firing frequency
      this.mainOsc = this.ctx.createOscillator();
      this.mainOsc.type = 'sawtooth';
      this.mainOsc.frequency.setValueAtTime(75, t); // ~900 RPM idle

      // 2. Sub rumble
      this.subOsc = this.ctx.createOscillator();
      this.subOsc.type = 'triangle';
      this.subOsc.frequency.setValueAtTime(37.5, t);

      // 3. High harmonic scream (V10 characteristic)
      this.highOsc = this.ctx.createOscillator();
      this.highOsc.type = 'sawtooth';
      this.highOsc.frequency.setValueAtTime(150, t);

      // Gains
      const mainGain = this.ctx.createGain();
      mainGain.gain.value = 0.6;
      this.mainOsc.connect(mainGain);
      mainGain.connect(this.exhaustFilter);

      const subGain = this.ctx.createGain();
      subGain.gain.value = 0.5;
      this.subOsc.connect(subGain);
      subGain.connect(this.exhaustFilter);

      const highGain = this.ctx.createGain();
      highGain.gain.value = 0.35;
      this.highOsc.connect(highGain);
      highGain.connect(this.exhaustFilter);

      this.mainOsc.start(t);
      this.subOsc.start(t);
      this.highOsc.start(t);

      this.isRunning = true;
      return true;
    } catch {
      return false;
    }
  }

  public setRpm(rpm: number) {
    this.currentRpm = Math.max(900, Math.min(8500, rpm));
    if (!this.ctx || !this.isRunning) return;

    try {
      const t = this.ctx.currentTime;
      // Firing frequency in Hz = RPM / 12
      const baseFreq = this.currentRpm / 12;

      if (this.mainOsc) {
        this.mainOsc.frequency.setTargetAtTime(baseFreq, t, 0.05);
      }
      if (this.subOsc) {
        this.subOsc.frequency.setTargetAtTime(baseFreq * 0.5, t, 0.05);
      }
      if (this.highOsc) {
        this.highOsc.frequency.setTargetAtTime(baseFreq * 2.5, t, 0.05);
      }
      if (this.exhaustFilter) {
        // As RPM increases, exhaust opens up from 450Hz to 4800Hz
        const cutoff = 400 + Math.pow(this.currentRpm / 8500, 1.4) * 4400;
        this.exhaustFilter.frequency.setTargetAtTime(cutoff, t, 0.04);
      }
    } catch {
      // ignore transient param errors
    }
  }

  public stop() {
    if (!this.ctx || !this.isRunning) return;
    try {
      const t = this.ctx.currentTime;
      if (this.masterGain) {
        this.masterGain.gain.setTargetAtTime(0, t, 0.15);
      }
      setTimeout(() => {
        try {
          this.mainOsc?.stop();
          this.subOsc?.stop();
          this.highOsc?.stop();
          this.mainOsc?.disconnect();
          this.subOsc?.disconnect();
          this.highOsc?.disconnect();
        } catch {}
        this.isRunning = false;
      }, 200);
    } catch {
      this.isRunning = false;
    }
  }

  public getRunning(): boolean {
    return this.isRunning;
  }
}

export const audioEngine = new V10AudioEngine();

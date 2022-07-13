export default class Inning {
  phases: string[] = ['top', 'mid', 'bottom', 'end'];

  currentPhasePosition: number = 0;

  maxPosition(): number {
    return this.phases.length - 1;
  }

  // getters
  activePhase(): string {
    return this.phases[this.currentPhasePosition];
  }

  // methods...
  nextPhase(): string {
    if (this.currentPhasePosition < this.maxPosition()) {
      this.currentPhasePosition++;
      return this.activePhase();
    } else {
      return 'complete';
    }
  }
}

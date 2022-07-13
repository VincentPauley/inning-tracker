export default class Inning {
  phases = ['top', 'mid', 'bottom', 'end'];

  currentPhasePosition: number = 0;

  // getters
  activePhase(): string {
    return this.phases[this.currentPhasePosition];
  }

  // methods...
}

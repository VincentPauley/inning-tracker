import InningPhase from '../interfaces/InningPhase';

export default class Inning {
  private _phases: InningPhase[] = [
    { name: 'Top', abbreviation: 'top' },
    { name: 'Middle', abbreviation: 'mid' },
    { name: 'Bottom', abbreviation: 'bottom' },
    { name: 'End', abbreviation: 'end' }
  ];

  currentPhasePosition: number = 0;

  maxPosition(): number {
    return this._phases.length - 1;
  }

  // getters
  activePhase(): InningPhase {
    return this._phases[this.currentPhasePosition];
  }

  // methods...
  nextPhase(): InningPhase {
    if (this.currentPhasePosition > this.maxPosition()) {
      throw new Error('impossible count');
    }
    this.currentPhasePosition++;
    return this.activePhase();
  }
}

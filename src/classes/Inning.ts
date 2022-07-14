import InningPhase from '../interfaces/InningPhase';

export default class Inning {
  private _phases: InningPhase[] = [
    { name: 'Top', abbreviation: 'top' },
    { name: 'Middle', abbreviation: 'mid' },
    { name: 'Bottom', abbreviation: 'bottom' },
    { name: 'End', abbreviation: 'end' }
  ];

  _currentPhasePosition: number = 0;

  maxPosition(): number {
    return this._phases.length - 1;
  }

  public phasePosition(phase: string): number {
    return this._phases.findIndex(element => element.abbreviation === phase);
  }

  // getters
  activePhase(): InningPhase {
    return this._phases[this._currentPhasePosition];
  }

  // methods...
  // TODO: make this into a setter instead:
  public setCurrentPhasePosition(position: number) {
    this._currentPhasePosition = position;
  }

  nextPhase(): InningPhase {
    if (this._currentPhasePosition > this.maxPosition()) {
      throw new Error('impossible count');
    }
    this._currentPhasePosition++;
    return this.activePhase();
  }
}

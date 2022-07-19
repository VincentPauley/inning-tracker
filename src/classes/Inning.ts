import InningPhase from '../interfaces/InningPhase';

export default class Inning {
  private _currentOuts: number = 0; // no need for constructor input
  private _maxOuts: number = 3; // configure from constructor

  private _phases: InningPhase[] = [
    { name: 'Top', abbreviation: 'top' },
    { name: 'Middle', abbreviation: 'mid' },
    { name: 'Bottom', abbreviation: 'bottom' },
    { name: 'End', abbreviation: 'end' }
  ];

  constructor(maxOuts: number = 3) {
    this._maxOuts = maxOuts;
  }

  private _currentPhasePosition: number = 0;

  public get currentOuts() {
    return this._currentOuts;
  }

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

  // adds an out to the inning
  public increaseOuts(outs: number): void {
    if (this._currentOuts >= this._maxOuts) {
      throw new Error('max outs already used');
    }

    if (this._currentOuts + outs > this._maxOuts) {
      throw new Error('outs received exceed max allowed');
    }

    // TODO: ACTUALLY DO THE OUT INCREMENT
  }

  nextPhase(): InningPhase {
    if (this._currentPhasePosition > this.maxPosition()) {
      throw new Error('impossible count');
    }
    this._currentPhasePosition++;
    return this.activePhase();
  }
}

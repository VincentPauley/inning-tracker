import InningPhase from '../interfaces/InningPhase';

export default class Inning {
  private _currentOuts: number = 0; // no need for constructor input
  private _maxOuts: number = 3;

  // use tuple here to keep array constant
  private _phases: [InningPhase, InningPhase, InningPhase, InningPhase] = [
    { name: 'Top', abbreviation: 'top', idle: false },
    { name: 'Middle', abbreviation: 'mid', idle: true },
    { name: 'Bottom', abbreviation: 'bottom', idle: false },
    { name: 'End', abbreviation: 'end', idle: true }
  ];

  constructor(maxOuts: number = 3) {
    this._maxOuts = maxOuts;
  }

  private _currentPhasePosition: number = 0;

  public get currentOuts() {
    return this._currentOuts;
  }

  // returns true when inning is in an active phase and not idling
  isActive(): boolean {
    const { idle } = this.activePhase();
    return !idle;
  }

  // TODO: make this private?
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
    if (!this.isActive()) {
      throw new Error('cannot submit outs when inning is inactive');
    }
    // TODO: ensure that the inning is in a phase that allows for outs
    if (this._currentOuts >= this._maxOuts) {
      throw new Error('max outs already used');
    }

    if (this._currentOuts + outs > this._maxOuts) {
      throw new Error('outs received exceed max allowed');
    }

    this._currentOuts += outs;
  }

  nextPhase(): InningPhase {
    if (this._currentPhasePosition > this.maxPosition()) {
      throw new Error('impossible count');
    }
    this._currentPhasePosition++;
    return this.activePhase();
  }
}

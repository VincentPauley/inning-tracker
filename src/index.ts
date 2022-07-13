import InningPhase from './interfaces/InningPhase';

import InningPhases from './InningPhases';

import Inning from './classes/Inning';

class InningTracker {
  // rules
  totalInnings: number;
  extraInningsAllowed: boolean;

  // state
  private _inningNumber: number = 0;

  activeInning: any;

  // getters

  // possibly a separate configuration object and a setup object to start off in different innings
  constructor(totalInnings: number = 9, extraInningsAllowed: boolean = true) {
    this.totalInnings = totalInnings;
    this.extraInningsAllowed = extraInningsAllowed;
  }

  incrementInning(): void {
    // TODO: eventually need to check to see if a winner can be made as  well
    if (this._inningNumber < this.totalInnings) {
      const newInning = new Inning(); // TODO: should receive inning number
      this._inningNumber++;
      this.activeInning = newInning;
    }
  }

  startGame() {
    this.incrementInning();
  }

  nextInningPhase() {
    const nextPhase = this.activeInning.nextPhase();

    if (nextPhase === 'complete') {
      this.incrementInning();
    }
  }

  summary() {
    const inningPhase = this.activeInning.activePhase();
    return `it's currently: ${inningPhase} of the ${this._inningNumber}, we're playing ${this.totalInnings} total`;
  }
}

export default InningTracker;

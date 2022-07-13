import InningPhase from './interfaces/InningPhase';

import InningPhases from './InningPhases';

class InningTracker {
  // rules
  totalInnings: number;
  extraInningsAllowed: boolean;

  // state
  inningData: InningPhase[][] = [];

  constructor(totalInnings: number = 9, extraInningsAllowed: boolean = true) {
    this.totalInnings = totalInnings;
    this.extraInningsAllowed = extraInningsAllowed;
  }

  currentInning() {
    return this.inningData.length;
  }

  incrementInning() {
    this.inningData.push(InningPhases);
  }

  startGame() {
    this.incrementInning();
  }

  summary() {
    return `it's currently inning: ${this.currentInning()} of ${
      this.totalInnings
    }`;
  }
}

export default InningTracker;

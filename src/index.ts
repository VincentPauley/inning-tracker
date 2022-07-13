import phases from './InningPhases';

class InningTracker {
  // rules
  totalInnings: number;
  extraInningsAllowed: boolean;

  // state
  currentInning: number = 0;

  constructor(totalInnings: number = 9, extraInningsAllowed: boolean = true) {
    this.totalInnings = totalInnings;
    this.extraInningsAllowed = extraInningsAllowed;
  }

  summary() {
    return `it's currently inning: ${this.currentInning} of ${this.totalInnings}`;
  }
}

export default InningTracker;

import InningPhase from './interfaces/InningPhase';

import InningPhases from './InningPhases';

import Inning from './classes/Inning';

class InningTracker {
  // rules
  totalInnings: number;
  extraInningsAllowed: boolean;

  // state
  inningData: any[] = [];

  activeInning: any;

  // possibly a separate configuration object and a setup object to start off in different innings
  constructor(totalInnings: number = 9, extraInningsAllowed: boolean = true) {
    this.totalInnings = totalInnings;
    this.extraInningsAllowed = extraInningsAllowed;
  }

  currentInning(): number {
    return this.inningData.length;
  }

  incrementInning(): void {
    // TODO: eventually need to check to see if a winner can be made as  well
    if (this.currentInning() < this.totalInnings) {
      const newInning = new Inning(); // TODO: should receive inning number
      this.inningData.push(newInning);
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
    return `it's currently: ${inningPhase} of the ${this.currentInning()}, we're playing ${
      this.totalInnings
    } total`;
  }
}

export default InningTracker;

import GameConfiguration from './interfaces/GameConfiguration';

import Inning from './classes/Inning';

class InningTracker {
  private _gameConfiguration: GameConfiguration = {
    totalInnings: 9,
    extraInningsAllowed: true
  };

  // state
  private _inningNumber: number = 0;
  activeInning: any;

  // possibly a separate configuration object and a setup object to start off in different innings
  constructor(
    GameConfiguration = { totalInnings: 9, extraInningsAllowed: true }
  ) {
    const { totalInnings, extraInningsAllowed } = GameConfiguration;

    this._gameConfiguration.totalInnings = totalInnings;
    this._gameConfiguration.extraInningsAllowed = extraInningsAllowed;
  }

  incrementInning(): void {
    // TODO: eventually need to check to see if a winner can be made as  well
    if (this._inningNumber < this._gameConfiguration.totalInnings) {
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
    return `it's currently: ${inningPhase.name} of the ${this._inningNumber}, we're playing ${this._gameConfiguration.totalInnings} total`;
  }
}

export default InningTracker;

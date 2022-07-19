import GameConfiguration from './interfaces/GameConfiguration';

import Inning from './classes/Inning';

class InningTracker {
  private _gameConfiguration: GameConfiguration = {
    outsPerInning: 3,
    totalInnings: 9,
    extraInningsAllowed: true
  };

  // state
  private _inningNumber: number = 0;

  private set inningNumber(inning: number) {
    this._inningNumber = inning;
  }

  activeInning: any;

  // possibly a separate configuration object and a setup object to start off in different innings
  constructor(
    GameConfiguration: GameConfiguration = {
      totalInnings: 9,
      extraInningsAllowed: true,
      outsPerInning: 3
    }
  ) {
    const {
      totalInnings,
      extraInningsAllowed,
      outsPerInning
    } = GameConfiguration;

    this._gameConfiguration.totalInnings = totalInnings;
    this._gameConfiguration.extraInningsAllowed = extraInningsAllowed;
    this._gameConfiguration.outsPerInning = outsPerInning;
  }

  // private set inningNumber(inning: number): void {
  //   this._inningNumber = inning;
  // }

  // TODO: should receive inning number & phase?
  private _reInitInning() {
    const newInning = new Inning(this._gameConfiguration.outsPerInning);
    this.activeInning = newInning;
  }

  incrementInning(): void {
    // TODO: eventually need to check to see if a winner can be made as  well
    if (this._inningNumber < this._gameConfiguration.totalInnings) {
      this._inningNumber++;
      this._reInitInning();
    }
  }

  handleOut(out: number) {
    const totalOuts: number = this.activeInning.increaseOuts(out);

    const { outsPerInning } = this._gameConfiguration;

    if (totalOuts === outsPerInning) {
      this.nextInningPhase();
    }
  }

  startGame(gameState = { inning: 1, phase: 'top' }) {
    this._reInitInning();

    this.inningNumber = gameState.inning;
    const phasePosition = this.activeInning.phasePosition(gameState.phase);

    if (phasePosition > -1) {
      this.activeInning.setCurrentPhasePosition(phasePosition);
    }
  }

  nextInningPhase() {
    const nextPhase = this.activeInning.nextPhase();
    if (nextPhase === 'end') {
      this.incrementInning(); // TODO: probably need to move in next phase
    }
  }

  // TODO: should ideally have a function that will just relay the current
  // either outs increment to an intermediate step... or it will provide notice
  // that next phase needs to be manually started.

  summary() {
    const inningPhase = this.activeInning.activePhase();
    return `it's currently: ${inningPhase.name} of the ${this._inningNumber}, ${this.activeInning.currentOuts} outs, we're playing ${this._gameConfiguration.totalInnings} total`;
  }
}

export default InningTracker;

import GameConfiguration from './interfaces/GameConfiguration';
import InningState from './interfaces/InningState';
import InningPhase from './interfaces/InningPhase';

import Inning from './classes/Inning';

import AppendOrdinalSuffix from './util/appendOrdinalSuffix';

class InningTracker {
  private _gameConfiguration: GameConfiguration = {
    outsPerInning: 3,
    totalInnings: 9,
    extraInningsAllowed: true
  };

  // state
  private _inningNumber: number = 1;

  private get inningNumber(): number {
    return this._inningNumber;
  }

  private set inningNumber(inning: number) {
    this._inningNumber = inning;
  }

  activeInning: Inning;

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

    this.activeInning = new Inning(this._gameConfiguration.outsPerInning);
  }

  // TODO: should receive inning number & phase?
  private _reInitInning() {
    const newInning = new Inning(this._gameConfiguration.outsPerInning);
    this.activeInning = newInning;
  }

  incrementInning(): void {
    // TODO: eventually need to check to see if a winner can be made as  well
    if (this.inningNumber < this._gameConfiguration.totalInnings) {
      this.inningNumber = this.inningNumber + 1;
      this._reInitInning();
    }
  }

  handleOut(out: number): InningState {
    const totalOuts: number = this.activeInning.increaseOuts(out);

    const {
      outsPerInning
    }: { outsPerInning: number } = this._gameConfiguration;

    if (totalOuts === outsPerInning) {
      this.nextInningPhase();
    }

    return this.currentState();
  }

  // don't really need to call this in order to  start game, rather to set away from defaults
  startGame(gameState = { inning: 1, phase: 'top' }) {
    const { inning, phase } = gameState;

    this.inningNumber = inning;
    const phasePosition = this.activeInning.phasePosition(phase);

    if (phasePosition > -1) {
      this.activeInning.setCurrentPhasePosition(phasePosition);
    }
  }

  nextInningPhase() {
    const nextPhase = this.activeInning.nextPhase();
    if (nextPhase.abbreviation === 'end') {
      this.incrementInning(); // TODO: probably need to move in next phase
    }

    return this.currentState();
  }

  // TODO: should ideally have a function that will just relay the current
  // either outs increment to an intermediate step... or it will provide notice
  // that next phase needs to be manually started.
  public currentState(): InningState {
    const activeInningNumber: number = this.inningNumber;
    const activeInningPhase: InningPhase = this.activeInning.activePhase();
    const currentOuts: number = this.activeInning.currentOuts;
    const summary: string = this.createSummary(
      activeInningPhase,
      activeInningNumber,
      currentOuts
    );

    return {
      activeInningNumber,
      activeInningPhase,
      currentOuts,
      summary
    };
  }

  private createSummary(
    currentInningPhase: InningPhase,
    currentInningNumber: number,
    currentOuts: number
  ): string {
    const outQuantity: string | number = currentOuts === 0 ? 'no' : currentOuts;
    const outSuffix: string = currentOuts === 1 ? 'out' : 'outs';

    return [
      currentInningPhase.name,
      'of the',
      `${AppendOrdinalSuffix(currentInningNumber)},`,
      `${outQuantity} ${outSuffix}.`
    ].join(' ');
  }
}

export default InningTracker;

import InningPhase from './interfaces/InningPhase';

const InningPhases: InningPhase[] = [
  {
    name: 'Top',
    abbreviation: 'top',
    active: false
  },
  {
    name: 'Middle',
    abbreviation: 'mid',
    active: false
  },
  {
    name: 'Bottom',
    abbreviation: 'bot',
    active: false
  },
  {
    name: 'End',
    abbreviation: 'end',
    active: false
  }
];

export default InningPhases;

// potential redo  of this for faster execution
class Inning {
  phases = ['top', 'mid', 'bottom', 'end'];

  currentPhasePosition: number = 0;

  activePhase(): string {
    return this.phases[this.currentPhasePosition];
  }
}

// could be that inning should be a class?

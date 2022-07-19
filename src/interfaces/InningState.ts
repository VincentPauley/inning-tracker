import InningPhase from './InningPhase';

export default interface InningState {
  activeInningNumber: number;
  activeInningPhase: InningPhase;
  currentOuts: number;
}

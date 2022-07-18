import InningTracker from '../src/index';

describe('class: InningTracker', () => {
  describe('given the startGame method is called', () => {
    const testInningTracker = new InningTracker();
    testInningTracker.startGame();

    test('the inning tracker can correctly describe the top of the first', () => {
      const inningSummary = testInningTracker.summary();
      expect(inningSummary).toBe(
        `it's currently: Top of the 1, 0 outs, we're playing 9 total`
      );
    });

    test('the inning tracker can correctly move an inning into the next phase', () => {
      testInningTracker.nextInningPhase();
      const inningSummary = testInningTracker.summary();

      expect(inningSummary).toBe(
        `it's currently: Middle of the 1, 0 outs, we're playing 9 total`
      );
    });
  });

  describe('given a game is initialized in the middle of a  game', () => {
    test('then the proper inning can be read out', () => {
      const testInningTracker = new InningTracker({
        totalInnings: 9,
        extraInningsAllowed: true
      });
      testInningTracker.startGame({ inning: 4, phase: 'top' }); // start in inning 4
      const inningSummary = testInningTracker.summary();

      expect(inningSummary).toBe(
        `it's currently: Top of the 4, 0 outs, we're playing 9 total`
      );
    });
  });

  describe('given an inning is started in a phase other than the top', () => {
    test('the inning and phase is properly returned', () => {
      const testInningTracker = new InningTracker({
        totalInnings: 9,
        extraInningsAllowed: true
      });
      testInningTracker.startGame({ inning: 6, phase: 'mid' });

      const inningSummary = testInningTracker.summary();

      expect(inningSummary).toBe(
        `it's currently: Middle of the 6, 0 outs, we're playing 9 total`
      );
    });
  });
});

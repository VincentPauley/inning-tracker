import InningTracker from '../src/index';

describe('class: InningTracker', () => {
  // TODO: a test here for game not ready yet?
  // describe('given a game is initialized with default values', () => {
  //   const testInningTracker = new InningTracker();
  //   test('it provides the expected summary', () => {
  //     const inningSummary = testInningTracker.summary();
  //     expect(inningSummary).toBe(`it's currently inning: 0 of 9`);
  //   });
  // });

  describe('given the startGame method is called', () => {
    const testInningTracker = new InningTracker();
    testInningTracker.startGame();

    test('the inning tracker can correctly describe the top of the first', () => {
      const inningSummary = testInningTracker.summary();
      expect(inningSummary).toBe(
        `it's currently: Top of the 1, we're playing 9 total`
      );
    });

    test('the inning tracker can correctly move an inning into the next phase', () => {
      testInningTracker.nextInningPhase();
      const inningSummary = testInningTracker.summary();

      expect(inningSummary).toBe(
        `it's currently: Middle of the 1, we're playing 9 total`
      );
    });
  });
});

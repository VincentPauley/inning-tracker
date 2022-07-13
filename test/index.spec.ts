import InningTracker from '../src/index';

describe('class: InningTracker', () => {
  describe('given a game is initialized with default values', () => {
    const testInningTracker = new InningTracker();
    test('it provides the expected summary', () => {
      const inningSummary = testInningTracker.summary();
      expect(inningSummary).toBe(`it's currently inning: 0 of 9`);
    });
  });

  describe('given the startGame method is called', () => {
    const testInningTracker = new InningTracker();
    testInningTracker.startGame();

    test('the inning correctly increments to 1', () => {
      const inningSummary = testInningTracker.summary();
      expect(inningSummary).toBe(`it's currently inning: 1 of 9`);
    });
  });
});

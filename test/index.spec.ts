import InningTracker from '../src/index';

const testInningTracker = new InningTracker();

describe('class: InningTracker', () => {
  describe('given a game is initialized with default values', () => {
    test('it provides the expected summary', () => {
      const inningSummary = testInningTracker.summary();
      expect(inningSummary).toBe(`it's currently inning: 0 of 9`);
    });
  });
});

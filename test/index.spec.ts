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
        extraInningsAllowed: true,
        outsPerInning: 3
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
        extraInningsAllowed: true,
        outsPerInning: 3
      });
      testInningTracker.startGame({ inning: 6, phase: 'mid' });

      const inningSummary = testInningTracker.summary();

      expect(inningSummary).toBe(
        `it's currently: Middle of the 6, 0 outs, we're playing 9 total`
      );
    });
  });

  describe('test the out tracking functionality', () => {
    describe('given an out increase is called when the max is already used', () => {
      test('then an error is thrown when too many out submissions have been made', () => {
        const testInningTracker = new InningTracker({
          totalInnings: 9,
          extraInningsAllowed: true,
          outsPerInning: 0 // < so max will already be hit
        });
        testInningTracker.startGame();
        function callTooManyOuts() {
          testInningTracker.handleOut(1);
        }

        expect(callTooManyOuts).toThrowError('max outs already used');
      });
    });

    describe('given an out increase is called that exceeds maximum', () => {
      test('then an error is thrown thrown explaining that issue', () => {
        const testInningTracker = new InningTracker({
          totalInnings: 9,
          extraInningsAllowed: true,
          outsPerInning: 3 // < so max will already be hit
        });
        testInningTracker.startGame();
        function callTooManyOuts() {
          testInningTracker.handleOut(4);
        }

        expect(callTooManyOuts).toThrowError(
          'outs received exceed max allowed'
        );
      });
    });

    describe('given outs are increased by a set number', () => {
      test('then the outs are increased accordingly', () => {
        const testInningTracker = new InningTracker();

        testInningTracker.startGame();
        testInningTracker.handleOut(1);

        const inningSummary = testInningTracker.summary();

        expect(inningSummary).toBe(
          `it's currently: Top of the 1, 1 outs, we're playing 9 total`
        );
      });
    });

    describe('given outs are increased during a phase where that is not possible', () => {
      test('then an error is thrown indicating the inning needs to be advanced', () => {
        const testInningTracker = new InningTracker();

        testInningTracker.startGame({ inning: 6, phase: 'mid' });

        function callOutWhileInningInActive() {
          testInningTracker.handleOut(1);
        }

        expect(callOutWhileInningInActive).toThrowError(
          'cannot submit outs when inning is inactive'
        );
      });
    });

    describe('given the total outs per inning are met', () => {
      test('inning is incremented to the next phase automatically', () => {
        const testInningTracker = new InningTracker();
        testInningTracker.startGame();

        testInningTracker.handleOut(3);

        const summary = testInningTracker.summary();

        expect(summary).toBe(
          `it's currently: Middle of the 1, 3 outs, we're playing 9 total`
        );
      });
    });
  });
});

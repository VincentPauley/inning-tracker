import InningTracker from '../src/index';

describe('class: InningTracker', () => {
  describe('given InningTracker is initiated as default', () => {
    const testInningTracker = new InningTracker();

    const expectedDefaultState = {
      activeInningNumber: 1,
      activeInningPhase: { name: 'Top', abbreviation: 'top', idle: false },
      currentOuts: 0,
      summary: 'Top of the 1st, no outs.'
    };

    test('state is accurately returned from currentState()', () => {
      expect(testInningTracker.currentState()).toMatchObject(
        expectedDefaultState
      );
    });
  });

  describe('given method is called to advance inning phase', () => {
    const testInningTracker = new InningTracker();

    const expectedDefaultState = {
      activeInningNumber: 1,
      activeInningPhase: { name: 'Middle', abbreviation: 'mid', idle: true },
      currentOuts: 0,
      summary: 'Middle of the 1st, no outs.'
    };

    test('the inning tracker can correctly move an inning into the next phase', () => {
      // TODO: this should throw an error - should need to do it
      testInningTracker.nextInningPhase();

      expect(testInningTracker.currentState()).toMatchObject(
        expectedDefaultState
      );
    });
  });

  describe('given a game is initialized in the middle of a  game', () => {
    test('then the proper inning can be read out', () => {
      const testInningTracker = new InningTracker();

      testInningTracker.startGame({ inning: 4, phase: 'top' }); // start in inning 4

      const expectedDefaultState = {
        activeInningNumber: 4,
        activeInningPhase: { name: 'Top', abbreviation: 'top', idle: false },
        currentOuts: 0,
        summary: 'Top of the 4th, no outs.'
      };

      expect(testInningTracker.currentState()).toMatchObject(
        expectedDefaultState
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
        testInningTracker.handleOut(3);

        const summary = testInningTracker.summary();

        expect(summary).toBe(
          `it's currently: Middle of the 1, 3 outs, we're playing 9 total`
        );
      });
    });

    describe('given inning is transitioned from mid to bottom', () => {
      test('the outs are reset to zero', () => {
        const testInningTracker = new InningTracker();
        testInningTracker.handleOut(3); // inning to middle

        // move from middle of inning to the bottom
        testInningTracker.nextInningPhase();

        const summary = testInningTracker.summary();

        expect(summary).toBe(
          `it's currently: Bottom of the 1, 0 outs, we're playing 9 total`
        );
      });
    });
  });
});

# Inning Tracker

This package is intended to be used in conjunction with several other packages to track the entire state of a baseball/softball game. This specific piece tracks the inning number, phase of the inning, outs, etc. Allows instantiator
to submit outs to advance the game, and directly call methods to move innings along through phases.

## Installation

```bash
$ npm install inning-tracker
```

## Setup

To begin use of the app, you need to setup how many innings there are in the game, set the number of outs allowed per inning, and wether or not extra-innings are allowed to solve a tie.

## Usage

```ts
import InningTracker from 'inning-tracker';

const gameInningTracker = new InningTracker();
```

### Inning Tracker Provides methods for changing the state

advanceInningFrame()

submitOuts()

### Inning Tracker provides these methods for checking the state

currentState()

Example Return:

```bash
{
  activeInningNumber: 1,
  activeInningPhase: { name: 'Top', abbreviation: 'top', idle: false },
  currentOuts: 0,
  summary: 'Top of the 1st, no outs.'
}
```

the same structure is returned as a response to the methods above

basic pattern of inning-tracker is you can increment details about the state at any time and receive a modified
state as a result. you can also check state at any time.s

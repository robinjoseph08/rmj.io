import { useMemo, useState } from 'react';

import { Board, type Box, type BoxValue } from './Board';
import { Button }                         from '../Button';

export const LEVELS: Box[][][] = [
  [
    [{ value: 0, correct: 2 }, { value: 0, correct: 2 }, { value: 1, correct: 1 }, { value: 0, correct: 1 }],
    [{ value: 0, correct: 1 }, { value: 0, correct: 1 }, { value: 0, correct: 2 }, { value: 2, correct: 2 }],
    [{ value: 1, correct: 1 }, { value: 0, correct: 2 }, { value: 1, correct: 1 }, { value: 0, correct: 2 }],
    [{ value: 0, correct: 2 }, { value: 0, correct: 1 }, { value: 0, correct: 2 }, { value: 0, correct: 1 }],
  ],
  [
    [{ value: 0, correct: 2 }, { value: 0, correct: 1 }, { value: 0, correct: 2 }, { value: 0, correct: 1 }],
    [{ value: 0, correct: 2 }, { value: 1, correct: 1 }, { value: 1, correct: 1 }, { value: 0, correct: 2 }],
    [{ value: 1, correct: 1 }, { value: 0, correct: 2 }, { value: 1, correct: 1 }, { value: 0, correct: 2 }],
    [{ value: 1, correct: 1 }, { value: 0, correct: 2 }, { value: 0, correct: 2 }, { value: 0, correct: 1 }],
  ],
  [
    [{ value: 0, correct: 1 }, { value: 0, correct: 1 }, { value: 0, correct: 2 }, { value: 0, correct: 2 }, { value: 0, correct: 1 }, { value: 0, correct: 2 }],
    [{ value: 0, correct: 2 }, { value: 0, correct: 1 }, { value: 1, correct: 1 }, { value: 0, correct: 2 }, { value: 2, correct: 2 }, { value: 0, correct: 1 }],
    [{ value: 0, correct: 1 }, { value: 2, correct: 2 }, { value: 0, correct: 2 }, { value: 0, correct: 1 }, { value: 0, correct: 1 }, { value: 0, correct: 2 }],
    [{ value: 2, correct: 2 }, { value: 0, correct: 1 }, { value: 0, correct: 2 }, { value: 0, correct: 1 }, { value: 2, correct: 2 }, { value: 0, correct: 1 }],
    [{ value: 2, correct: 2 }, { value: 2, correct: 2 }, { value: 0, correct: 1 }, { value: 0, correct: 2 }, { value: 0, correct: 1 }, { value: 0, correct: 1 }],
    [{ value: 0, correct: 1 }, { value: 2, correct: 2 }, { value: 0, correct: 1 }, { value: 0, correct: 1 }, { value: 2, correct: 2 }, { value: 0, correct: 2 }],
  ],
  [
    [{ value: 0, correct: 1 }, { value: 2, correct: 2 }, { value: 0, correct: 2 }, { value: 0, correct: 1 }, { value: 0, correct: 1 }, { value: 0, correct: 2 }],
    [{ value: 0, correct: 2 }, { value: 0, correct: 2 }, { value: 1, correct: 1 }, { value: 0, correct: 1 }, { value: 0, correct: 2 }, { value: 0, correct: 1 }],
    [{ value: 0, correct: 2 }, { value: 0, correct: 1 }, { value: 1, correct: 1 }, { value: 0, correct: 2 }, { value: 1, correct: 1 }, { value: 0, correct: 2 }],
    [{ value: 0, correct: 1 }, { value: 0, correct: 1 }, { value: 0, correct: 2 }, { value: 2, correct: 2 }, { value: 0, correct: 1 }, { value: 0, correct: 2 }],
    [{ value: 0, correct: 1 }, { value: 0, correct: 2 }, { value: 0, correct: 2 }, { value: 0, correct: 1 }, { value: 0, correct: 2 }, { value: 0, correct: 1 }],
    [{ value: 0, correct: 2 }, { value: 0, correct: 1 }, { value: 0, correct: 1 }, { value: 0, correct: 2 }, { value: 0, correct: 2 }, { value: 0, correct: 1 }],
  ],
  [
    [{ value: 0, correct: 2 }, { value: 0, correct: 2 }, { value: 0, correct: 1 }, { value: 1, correct: 1 }, { value: 0, correct: 2 }, { value: 1, correct: 1 }, { value: 0, correct: 2 }, { value: 1, correct: 1 }],
    [{ value: 0, correct: 1 }, { value: 0, correct: 2 }, { value: 1, correct: 1 }, { value: 0, correct: 2 }, { value: 0, correct: 1 }, { value: 0, correct: 2 }, { value: 0, correct: 1 }, { value: 0, correct: 2 }],
    [{ value: 2, correct: 2 }, { value: 0, correct: 1 }, { value: 0, correct: 2 }, { value: 0, correct: 1 }, { value: 2, correct: 2 }, { value: 0, correct: 1 }, { value: 0, correct: 1 }, { value: 0, correct: 2 }],
    [{ value: 0, correct: 2 }, { value: 0, correct: 1 }, { value: 2, correct: 2 }, { value: 2, correct: 2 }, { value: 0, correct: 1 }, { value: 0, correct: 1 }, { value: 2, correct: 2 }, { value: 0, correct: 1 }],
    [{ value: 0, correct: 1 }, { value: 0, correct: 2 }, { value: 1, correct: 1 }, { value: 1, correct: 1 }, { value: 0, correct: 2 }, { value: 0, correct: 2 }, { value: 0, correct: 1 }, { value: 0, correct: 2 }],
    [{ value: 1, correct: 1 }, { value: 0, correct: 1 }, { value: 0, correct: 2 }, { value: 0, correct: 2 }, { value: 0, correct: 1 }, { value: 0, correct: 2 }, { value: 0, correct: 2 }, { value: 1, correct: 1 }],
    [{ value: 0, correct: 2 }, { value: 0, correct: 1 }, { value: 0, correct: 1 }, { value: 0, correct: 2 }, { value: 2, correct: 2 }, { value: 0, correct: 1 }, { value: 0, correct: 1 }, { value: 0, correct: 2 }],
    [{ value: 1, correct: 1 }, { value: 0, correct: 2 }, { value: 0, correct: 2 }, { value: 1, correct: 1 }, { value: 0, correct: 1 }, { value: 0, correct: 2 }, { value: 2, correct: 2 }, { value: 0, correct: 1 }],
  ],
  [
    [{ value: 0, correct: 2 }, { value: 0, correct: 1 }, { value: 0, correct: 2 }, { value: 0, correct: 1 }, { value: 2, correct: 2 }, { value: 0, correct: 1 }, { value: 2, correct: 2 }, { value: 0, correct: 1 }],
    [{ value: 0, correct: 1 }, { value: 0, correct: 2 }, { value: 0, correct: 1 }, { value: 2, correct: 2 }, { value: 0, correct: 2 }, { value: 1, correct: 1 }, { value: 0, correct: 2 }, { value: 0, correct: 1 }],
    [{ value: 2, correct: 2 }, { value: 0, correct: 1 }, { value: 0, correct: 2 }, { value: 0, correct: 1 }, { value: 0, correct: 1 }, { value: 0, correct: 2 }, { value: 0, correct: 1 }, { value: 2, correct: 2 }],
    [{ value: 0, correct: 2 }, { value: 0, correct: 1 }, { value: 0, correct: 1 }, { value: 2, correct: 2 }, { value: 0, correct: 2 }, { value: 0, correct: 1 }, { value: 0, correct: 1 }, { value: 0, correct: 2 }],
    [{ value: 0, correct: 1 }, { value: 2, correct: 2 }, { value: 0, correct: 1 }, { value: 2, correct: 2 }, { value: 0, correct: 1 }, { value: 2, correct: 2 }, { value: 0, correct: 2 }, { value: 1, correct: 1 }],
    [{ value: 0, correct: 1 }, { value: 0, correct: 1 }, { value: 0, correct: 2 }, { value: 0, correct: 1 }, { value: 0, correct: 2 }, { value: 1, correct: 1 }, { value: 0, correct: 2 }, { value: 0, correct: 2 }],
    [{ value: 2, correct: 2 }, { value: 2, correct: 2 }, { value: 0, correct: 1 }, { value: 2, correct: 2 }, { value: 0, correct: 1 }, { value: 0, correct: 2 }, { value: 0, correct: 1 }, { value: 0, correct: 1 }],
    [{ value: 0, correct: 1 }, { value: 0, correct: 2 }, { value: 0, correct: 2 }, { value: 0, correct: 1 }, { value: 0, correct: 1 }, { value: 0, correct: 2 }, { value: 0, correct: 1 }, { value: 2, correct: 2 }],
  ],
  [
    [{ value: 0, correct: 1 }, { value: 0, correct: 1 }, { value: 0, correct: 2 }, { value: 0, correct: 2 }, { value: 0, correct: 1 }, { value: 0, correct: 2 }, { value: 0, correct: 1 }, { value: 2, correct: 2 }, { value: 0, correct: 1 }, { value: 0, correct: 2 }],
    [{ value: 1, correct: 1 }, { value: 0, correct: 2 }, { value: 1, correct: 1 }, { value: 0, correct: 2 }, { value: 0, correct: 2 }, { value: 1, correct: 1 }, { value: 0, correct: 2 }, { value: 0, correct: 1 }, { value: 0, correct: 2 }, { value: 1, correct: 1 }],
    [{ value: 0, correct: 2 }, { value: 0, correct: 1 }, { value: 0, correct: 2 }, { value: 0, correct: 1 }, { value: 0, correct: 2 }, { value: 0, correct: 1 }, { value: 0, correct: 2 }, { value: 1, correct: 1 }, { value: 0, correct: 1 }, { value: 2, correct: 2 }],
    [{ value: 0, correct: 2 }, { value: 0, correct: 1 }, { value: 0, correct: 2 }, { value: 0, correct: 1 }, { value: 0, correct: 1 }, { value: 2, correct: 2 }, { value: 0, correct: 1 }, { value: 0, correct: 2 }, { value: 2, correct: 2 }, { value: 1, correct: 1 }],
    [{ value: 0, correct: 1 }, { value: 2, correct: 2 }, { value: 1, correct: 1 }, { value: 0, correct: 2 }, { value: 0, correct: 1 }, { value: 2, correct: 2 }, { value: 0, correct: 1 }, { value: 0, correct: 1 }, { value: 2, correct: 2 }, { value: 0, correct: 2 }],
    [{ value: 0, correct: 1 }, { value: 0, correct: 2 }, { value: 1, correct: 1 }, { value: 1, correct: 1 }, { value: 0, correct: 2 }, { value: 1, correct: 1 }, { value: 0, correct: 2 }, { value: 0, correct: 2 }, { value: 0, correct: 1 }, { value: 0, correct: 2 }],
    [{ value: 2, correct: 2 }, { value: 0, correct: 1 }, { value: 2, correct: 2 }, { value: 1, correct: 1 }, { value: 0, correct: 2 }, { value: 0, correct: 2 }, { value: 0, correct: 1 }, { value: 0, correct: 2 }, { value: 0, correct: 1 }, { value: 1, correct: 1 }],
    [{ value: 1, correct: 1 }, { value: 0, correct: 1 }, { value: 0, correct: 2 }, { value: 0, correct: 2 }, { value: 0, correct: 1 }, { value: 0, correct: 2 }, { value: 0, correct: 2 }, { value: 1, correct: 1 }, { value: 0, correct: 2 }, { value: 1, correct: 1 }],
    [{ value: 0, correct: 2 }, { value: 2, correct: 2 }, { value: 0, correct: 1 }, { value: 0, correct: 1 }, { value: 0, correct: 2 }, { value: 0, correct: 1 }, { value: 0, correct: 1 }, { value: 0, correct: 2 }, { value: 1, correct: 1 }, { value: 0, correct: 2 }],
    [{ value: 0, correct: 2 }, { value: 2, correct: 2 }, { value: 0, correct: 1 }, { value: 0, correct: 2 }, { value: 1, correct: 1 }, { value: 0, correct: 1 }, { value: 0, correct: 2 }, { value: 0, correct: 1 }, { value: 2, correct: 2 }, { value: 1, correct: 1 }],
  ],
  [
    [{ value: 0, correct: 1 }, { value: 0, correct: 2 }, { value: 0, correct: 2 }, { value: 0, correct: 1 }, { value: 2, correct: 2 }, { value: 0, correct: 2 }, { value: 0, correct: 1 }, { value: 1, correct: 1 }, { value: 0, correct: 2 }, { value: 1, correct: 1 }],
    [{ value: 2, correct: 2 }, { value: 2, correct: 2 }, { value: 1, correct: 1 }, { value: 0, correct: 2 }, { value: 0, correct: 1 }, { value: 1, correct: 1 }, { value: 0, correct: 2 }, { value: 0, correct: 1 }, { value: 0, correct: 1 }, { value: 2, correct: 2 }],
    [{ value: 0, correct: 2 }, { value: 1, correct: 1 }, { value: 1, correct: 1 }, { value: 2, correct: 2 }, { value: 0, correct: 1 }, { value: 0, correct: 2 }, { value: 1, correct: 1 }, { value: 0, correct: 2 }, { value: 0, correct: 2 }, { value: 0, correct: 1 }],
    [{ value: 0, correct: 1 }, { value: 0, correct: 1 }, { value: 2, correct: 2 }, { value: 0, correct: 1 }, { value: 0, correct: 2 }, { value: 0, correct: 1 }, { value: 0, correct: 2 }, { value: 0, correct: 1 }, { value: 0, correct: 2 }, { value: 2, correct: 2 }],
    [{ value: 0, correct: 2 }, { value: 0, correct: 2 }, { value: 0, correct: 1 }, { value: 2, correct: 2 }, { value: 0, correct: 1 }, { value: 2, correct: 2 }, { value: 0, correct: 1 }, { value: 0, correct: 2 }, { value: 1, correct: 1 }, { value: 0, correct: 1 }],
    [{ value: 0, correct: 1 }, { value: 1, correct: 1 }, { value: 0, correct: 2 }, { value: 0, correct: 2 }, { value: 0, correct: 1 }, { value: 1, correct: 1 }, { value: 2, correct: 2 }, { value: 0, correct: 2 }, { value: 1, correct: 1 }, { value: 0, correct: 2 }],
    [{ value: 2, correct: 2 }, { value: 0, correct: 2 }, { value: 0, correct: 1 }, { value: 1, correct: 1 }, { value: 0, correct: 2 }, { value: 0, correct: 1 }, { value: 0, correct: 2 }, { value: 0, correct: 1 }, { value: 0, correct: 2 }, { value: 1, correct: 1 }],
    [{ value: 2, correct: 2 }, { value: 1, correct: 1 }, { value: 1, correct: 1 }, { value: 0, correct: 2 }, { value: 0, correct: 1 }, { value: 2, correct: 2 }, { value: 0, correct: 1 }, { value: 0, correct: 2 }, { value: 0, correct: 1 }, { value: 0, correct: 2 }],
    [{ value: 0, correct: 1 }, { value: 0, correct: 2 }, { value: 0, correct: 2 }, { value: 0, correct: 1 }, { value: 2, correct: 2 }, { value: 1, correct: 1 }, { value: 2, correct: 2 }, { value: 0, correct: 1 }, { value: 2, correct: 2 }, { value: 1, correct: 1 }],
    [{ value: 0, correct: 1 }, { value: 0, correct: 1 }, { value: 2, correct: 2 }, { value: 1, correct: 1 }, { value: 0, correct: 2 }, { value: 2, correct: 2 }, { value: 0, correct: 1 }, { value: 0, correct: 2 }, { value: 0, correct: 1 }, { value: 0, correct: 2 }],
  ]
];

export const Takuzu = () => {
  const [level, setLevel] = useState(0);
  const [board, setBoard] = useState(() => structuredClone(LEVELS[0]));
  const finished = level === LEVELS.length;

  // The boxes that start out filled in can't be changed.
  const isLocked = (i: number, j: number) => LEVELS[level][i][j].value !== 0;

  const toggleBox = (i: number, j: number) => {
    if (isLocked(i, j)) {
      return;
    }

    const b = structuredClone(board);
    b[i][j].value = (b[i][j].value + 1) % 3 as BoxValue;
    setBoard(b);
  };

  const completed = useMemo(() => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j].value === 0) {
          return false;
        }
      }
    }

    return true;
  }, [board]);

  const incorrect = useMemo(() => {
    if (!completed) {
      // this won't be seen
      return 0;
    }

    let inc = 0;

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j].value !== board[i][j].correct) {
          inc++;
        }
      }
    }

    return inc;
  }, [board]);

  const handleNext = () => {
    if (!completed) {
      return;
    }

    if (level + 1 < LEVELS.length) {
      setBoard(structuredClone(LEVELS[level + 1]));
    }
    setLevel(level + 1);
  };

  return (
    <div className="text-center">
      {finished ?
        <div className="text-curious-blue">
          <h3 className="my-[1em] text-[1.17em] font-bold">Congratulations! You finished all of the available boards!</h3>
        </div> :
        <>
          <Board board={board} isLocked={isLocked} toggleBox={toggleBox} />
          {completed && incorrect > 0 &&
            <p className="my-[1em] text-[14px]"><em>Looks like you&apos;ve got {incorrect} that {incorrect === 1 ? 'is' : 'are'} incorrect.</em></p>
          }
          <Button disabled={!completed || incorrect > 0} onClick={handleNext}>next</Button>
        </>
      }
    </div>
  );
};

import cloneDeep                       from 'lodash/cloneDeep';
import { Fragment, useMemo, useState } from 'react';

import { Board }  from './board';
import { Footer } from '../footer';
import { Nav }    from '../nav';

// 0s are empty, 1s are green, 2s are red
const LEVELS = [
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
  const [board, setBoard] = useState(cloneDeep(LEVELS[level]));

  const toggleBox = (i, j) => {
    // don't allow toggling of the default boxes
    if (LEVELS[level] && LEVELS[level][i][j].value !== 0) {
      return;
    }

    const b = cloneDeep(board);
    b[i][j].value = (b[i][j].value + 1) % 3;
    setBoard(b);
  };

  const completed = useMemo(() => {
    if (!board) {
      return false;
    }

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!completed) {
      return;
    }

    setBoard(cloneDeep(LEVELS[level + 1]));
    setLevel(level + 1);
  };

  return (
    <Fragment>
      <Nav />
      <div className="main takuzu">
        <header>
          <h1>takuzu</h1>
          <div className="description">
            The binary logic game. The rules are simple:
            <ol>
              <li>Each row and each column should contain an equal number of red and green boxes.</li>
              <li>No more than two of the same color box can be adjacent to each other.</li>
              <li>And each row and column is unique.</li>
            </ol>
            There are currently {LEVELS.length} levels, and they progressively get harder.
          </div>
        </header>
        <hr />
        <div className="body">
          {!board ?
            <div className="finish">
              <h3>Congratulations! You finished all of the available boards!</h3>
            </div> :
            <Fragment>
              <Board board={board} toggleBox={toggleBox} />
              {completed && incorrect > 0 &&
                <div className="help">
                  <p><em>Looks like you&apos;ve got {incorrect} that {incorrect === 1 ? 'is' : 'are'} incorrect.</em></p>
                </div>
              }
              <div className="submit">
                <button disabled={!completed || incorrect > 0} onClick={handleSubmit}>next</button>
              </div>
            </Fragment>
          }
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

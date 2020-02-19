import { Fragment, useMemo, useState } from 'react';

import { HomeButton } from '../home-button';
import { Word }       from './word';

const LOWEST_SCORE = 55;
const LEVELS = [
  {
    left: ['rotation', 'rotten', 'rotisserie', 'rottweiler', 'rotator', 'rotunda'],
    right: ['godot', 'wrote', 'tornado', 'roman', 'retail', 'holiday'],
  },
  {
    left: ['foot', 'feeling', 'rubber', 'moons', 'spoon', 'reef'],
    right: ['forlorn', 'rusting', 'response', 'ferns', 'whole', 'knocked'],
  },
  {
    left: ['joe@gmail.com', 'jsmith538@me.com', 'joe_smith@smith.io', 'js9274@college.edu', 'joe.smith@hotmail.co.uk', 'joe-s@sbcglobal.net'],
    right: ['@.com', '@gmail.com', 'joesmith@', 'joe_s.yahoo.com', 'joe@smith@me', 'joe..smith@hotmail.com'],
  },
  {
    left: ['214-555-8260', '(415) 237-9732', '646.864.9731', '1-800-239-8261', '2129630725', '972 832 7236'],
    right: ['765234046', '(652-125-6732)', '-800-825-8259', '(9) 527-8152', '9260 8326 23', '12 (800) 180 1963'],
  }
];

export const Regex = () => {
  const [level, setLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [guess, setGuess] = useState('');

  const regex = useMemo(() => {
    try {
      return new RegExp(guess);
    } catch (ex) {
      return new RegExp('');
    }
  }, [guess]);

  const completed = useMemo(() => {
    if (!LEVELS[level]) {
      return false;
    }

    for (let i = 0; i < LEVELS[level].left.length; i++) {
      const word = LEVELS[level].left[i];
      const matches = regex.exec(word);
      const fullyMatched = matches && matches.length !== 0 && matches[0] === word;

      if (!fullyMatched) {
        return false;
      }
    }

    for (let i = 0; i < LEVELS[level].right.length; i++) {
      const word = LEVELS[level].right[i];
      const matches = regex.exec(word);
      const matched = matches && matches[0] !== '';

      if (matched) {
        return false;
      }
    }

    return true;
  }, [regex, level]);

  const handleChange = (e) => {
    setGuess(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!completed) {
      return;
    }

    setScore(score + guess.length);
    setGuess('');
    setLevel(level + 1);
  };

  return (
    <Fragment>
      <HomeButton />
      <div className="container regex">
        <div className="box-container">
          <header>
            <h1>regex</h1>
            <p>Try to match the first six words completely while not matching any of the last six words at all.</p>
            <p>When they all have checkmarks, you&apos;ve gotten it.</p>
            <p>The shorter the regex, the lower the score, the better you are.</p>
            <p>Currently, there are only {LEVELS.length} levels, and the lowest score I ever got was {LOWEST_SCORE}.</p>
          </header>
          <hr />
          <div className="body-container">
            <div className="status">
              <div className="level-container">Level: {LEVELS[level] ? level + 1 : level}</div>
              <div className="score-container">Score: {score}</div>
            </div>
            {level === LEVELS.length ?
              <div className="finish">
                <h3>Congratulations! You finished it with a score of {score}!</h3>
              </div> :
              <Fragment>
                <div className="words">
                  <ul className="left">
                    {LEVELS[level].left.map((word) =>
                      <Word
                        key={word}
                        regex={regex}
                        side="left"
                        word={word}
                      />
                    )}
                  </ul>
                  <ul className="right">
                    {LEVELS[level].right.map((word) =>
                      <Word
                        key={word}
                        regex={regex}
                        side="right"
                        word={word}
                      />
                    )}
                  </ul>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="input">
                    <input
                      autoCapitalize="none"
                      autoComplete="off"
                      className="code"
                      onChange={handleChange}
                      placeholder="Enter regex"
                      type="text"
                      value={guess}
                    />
                  </div>
                  <div className="help">
                    <p><em>You should omit any surrounding &apos;/&apos;s and any modifiers.</em></p>
                  </div>
                  <div className="submit">
                    <button disabled={!completed}>next</button>
                  </div>
                </form>
              </Fragment>
            }
          </div>
        </div>
      </div>
    </Fragment>
  );
};

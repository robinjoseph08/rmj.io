import { type ChangeEvent, type SubmitEvent, useMemo, useState } from 'react';

import { Button } from '../Button';
import { Word }   from './Word';

export const LOWEST_SCORE = 55;
export const LEVELS = [
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
    } catch {
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setGuess(e.target.value);
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!completed) {
      return;
    }

    setScore(score + guess.length);
    setGuess('');
    setLevel(level + 1);
  };

  return (
    <div className="text-center">
      <div className="mb-[1em] flex items-center justify-center">
        <div className="mr-[5px]">Level: <b>{LEVELS[level] ? level + 1 : level}</b></div>
        <div className="ml-[5px]">Score: <b>{score}</b></div>
      </div>
      {level === LEVELS.length ?
        <div className="text-curious-blue">
          <h3 className="my-[1em] text-[1.17em] font-bold">Congratulations! You finished it with a score of {score}!</h3>
        </div> :
        <>
          <div className="mb-[1em] flex items-center justify-center">
            <ul className="px-[30px] py-[5px] text-left">
              {LEVELS[level].left.map((word) =>
                <Word
                  key={word}
                  regex={regex}
                  side="left"
                  word={word}
                />
              )}
            </ul>
            <ul className="px-[30px] py-[5px] text-left">
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
            <input
              aria-label="Regex"
              autoCapitalize="none"
              autoComplete="off"
              className="mx-auto block w-4/5 max-w-[400px] appearance-none rounded-[4px] border border-silver bg-white px-[10px] py-[5px] font-mono text-[14px] text-black placeholder:text-[#757575] focus:border-curious-blue focus:outline-none"
              onChange={handleChange}
              placeholder="Enter regex"
              type="text"
              value={guess}
            />
            <p className="my-[1em] text-[14px]"><em>You should omit any surrounding &apos;/&apos;s and any modifiers.</em></p>
            <Button disabled={!completed}>next</Button>
          </form>
        </>
      }
    </div>
  );
};

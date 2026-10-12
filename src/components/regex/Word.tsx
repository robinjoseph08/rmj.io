import '../../lib/fontawesome';

import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';

interface WordProps {
  regex: RegExp;
  side: 'left' | 'right';
  word: string;
}

export const Word = ({ regex, side, word }: WordProps) => {
  const matches = regex.exec(word);
  const matched = matches && matches[0] !== '';
  const fullyMatched = matches && matches.length !== 0 && matches[0] === word;
  const left = side === 'left';
  const passed = left && fullyMatched || !left && !matched;

  return (
    <li>
      {passed ?
        <FontAwesomeIcon className="mr-[5px] w-[1em] text-shamrock" icon={faCheck} /> :
        <FontAwesomeIcon className="mr-[5px] w-[1em] text-cinnabar" icon={faXmark} />
      }
      {matched ?
        <span>
          {word.slice(0, matches.index)}
          <span className="text-shamrock">{matches[0]}</span>
          {word.slice(matches.index + matches[0].length)}
        </span> :
        word
      }
    </li>
  );
};

import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

export const Word = ({ regex, side, word }) => {
  const matches = regex.exec(word);
  const matched = matches && matches[0] !== '';
  const fullyMatched = matches && matches.length !== 0 && matches[0] === word;
  const left = side === 'left';
  const passed = left && fullyMatched || !left && !matched;

  return (
    <li>
      <FontAwesomeIcon icon={passed ? faCheck : faTimes} />
      {matched ?
        <span
          dangerouslySetInnerHTML={{
            __html: word.replace(matches[0], '<span class="match">' + matches[0] + '</span>')
          }}
        /> :
        word
      }
    </li>
  );
};

Word.propTypes = {
  regex: PropTypes.instanceOf(RegExp).isRequired,
  side: PropTypes.oneOf(['left', 'right']).isRequired,
  word: PropTypes.string.isRequired
};

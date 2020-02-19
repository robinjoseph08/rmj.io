import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link }            from 'react-router-dom';
import { faHome }          from '@fortawesome/free-solid-svg-icons';

export const HomeButton = () => (
  <div className="home-button">
    <Link to="/">
      <button><FontAwesomeIcon className="icon" icon={faHome} /></button>
    </Link>
  </div>
);

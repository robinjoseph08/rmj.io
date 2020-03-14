import { FontAwesomeIcon }                             from "@fortawesome/react-fontawesome";
import { OutboundLink }                                from 'react-ga';
import { faGithubSquare, faLinkedin, faTwitterSquare } from '@fortawesome/free-brands-svg-icons';

export const Footer = () => (
  <footer>
    <div className="container">
      <OutboundLink eventLabel="Footer - LinkedIn" target="_blank" to="https://www.linkedin.com/in/robin-joseph-0207065b">
        <FontAwesomeIcon icon={faLinkedin} />
      </OutboundLink>
      <span className="middot">·</span>
      <OutboundLink eventLabel="Footer - GitHub" target="_blank" to="https://github.com/robinjoseph08">
        <FontAwesomeIcon icon={faGithubSquare} />
      </OutboundLink>
      <span className="middot">·</span>
      <OutboundLink eventLabel="Footer - Twitter" target="_blank" to="https://twitter.com/robinjoseph08">
        <FontAwesomeIcon icon={faTwitterSquare} />
      </OutboundLink>
    </div>
  </footer>
);

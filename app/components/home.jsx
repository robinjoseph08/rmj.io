import { Link } from 'react-router-dom';

export const Home = () => (
  <div className="container home">
    <div className="box-container">
      <h1>Robin Joseph</h1>
      <ul className="home-list">
        <li className="home-list-item">
          <a href="https://interviewplanner.com" rel="noopener noreferrer" target="_blank">
            <button className="interviewplanner">interviewplanner</button>
          </a>
        </li>
        <li className="home-list-item">
          <a href="https://pokedextracker.com" rel="noopener noreferrer" target="_blank">
            <button className="pokedextracker">pokedextracker</button>
          </a>
        </li>
        <li className="home-list-item">
          <Link to="/regex">
            <button className="regex">regex</button>
          </Link>
        </li>
        <li className="home-list-item">
          <Link to="/takuzu">
            <button className="takuzu">takuzu</button>
          </Link>
        </li>
        <li className="home-list-item">
          <a href="https://www.linkedin.com/in/robin-joseph-0207065b" rel="noopener noreferrer" target="_blank">
            <button className="linkedin">linkedin</button>
          </a>
        </li>
        <li className="home-list-item">
          <a href="https://github.com/robinjoseph08" rel="noopener noreferrer" target="_blank">
            <button className="github">github</button>
          </a>
        </li>
        <li className="home-list-item">
          <a href="https://www.twitter.com/robinjoseph08" rel="noopener noreferrer" target="_blank">
            <button className="twitter">twitter</button>
          </a>
        </li>
      </ul>
    </div>
  </div>
);

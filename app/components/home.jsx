import { Fragment }     from 'react';
import { OutboundLink } from 'react-ga';

import { Footer } from './footer';
import { Nav }    from './nav';

export const Home = () => (
  <Fragment>
    <Nav />
    <div className="main home">
      <div className="container">
        <img className="image" src="/app/assets/images/me.jpg" />
        <div className="info">
          <h1>robin joseph</h1>
          <h2>
            co-founder of <OutboundLink eventLabel="Home Page - InterviewPlanner" target="_blank" to="https://interviewplanner.com">interviewplanner</OutboundLink><br />
            co-creator of <OutboundLink eventLabel="Home Page - PokedexTracker" target="_blank" to="https://pokedextracker.com">pokedextracker</OutboundLink>
          </h2>
        </div>
      </div>
    </div>
    <Footer />
  </Fragment>
);

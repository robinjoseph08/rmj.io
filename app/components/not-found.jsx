import { Fragment } from 'react';

import { Footer } from "./footer";
import { Nav }    from "./nav";

export const NotFound = () => (
  <Fragment>
    <Nav />
    <div className="main not-found">
      <h1>whoops, that's not a real page</h1>
    </div>
    <Footer />
  </Fragment>
);

import { Route, Switch } from 'react-router-dom';

import { Home }     from './home';
import { NotFound } from './not-found';
import { Regex }    from './regex';
import { Takuzu }   from './takuzu';

export const App = () => (
  <Switch>
    <Route component={Home} exact path="/" />
    <Route component={Regex} path="/regex" />
    <Route component={Takuzu} path="/takuzu" />
    <Route component={NotFound} path="/" />
  </Switch>
);

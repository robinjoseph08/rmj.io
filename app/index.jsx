import './styles/index.scss';

import { createBrowserHistory } from 'history';
import { render }               from 'react-dom';
import { Router }               from 'react-router-dom';

import { App }         from './components/app';
// import { logPageView } from './libraries/analytics';

const history = createBrowserHistory();
// history.listen(() => logPageView());
// logPageView();

render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById('root')
);

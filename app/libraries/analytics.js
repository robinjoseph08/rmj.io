import ReactGA from 'react-ga';

ReactGA.initialize('UA-45307701-2', { titleCase: false });

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.send({
    hitType: 'pageview',
    page: window.location.pathname + window.location.hash,
    hitCallback: () => {
      // Strip any UTM parameters after tracking the pageview to prevent link
      // sharing from skewing data and to have a more clean URL.
      // Reference: https://davidwalsh.name/remove-utm-parameters-urls
      const hasUTM = window.location.search.indexOf('utm_') !== -1;
      if (hasUTM && window.history.replaceState) {
        history.replaceState({}, '', window.location.toString().replace(/(\&|\?)utm([_a-z0-9=]+)/g, ""));
      }
    }
  });
};

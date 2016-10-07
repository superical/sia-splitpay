import 'whatwg-fetch';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, useRouterHistory } from 'react-router';
import { createHistory } from 'history'
import { getRoutes } from './routes';

const history = useRouterHistory(createHistory)({ basename: '/' })
const component = (
  <Router history={history}>
    {getRoutes()}
  </Router>
);

ReactDOM.render(
    component,
  document.getElementById('app')
);
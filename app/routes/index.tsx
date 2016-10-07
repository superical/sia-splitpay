import * as React from 'react';
import { IndexRoute, Route } from 'react-router';
import { App } from '../containers';
import {Payment} from "../containers/Payment/index";
import {SplitPayment} from "../containers/SplitPayment/index";

function getRoutes() {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Payment} />
      <Route path="booking/:bookingId/:passengerId" component={SplitPayment} />
      <Route path="*" component={Payment} />
    </Route>
  );
};

export { getRoutes }

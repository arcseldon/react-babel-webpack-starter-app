'use strict';

/*eslint-disable */
import bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import bootstrapTheme from '../node_modules/bootstrap/dist/css/bootstrap-theme.min.css';
import toastr from '../node_modules/toastr/build/toastr.css';
/*eslint-enable */
import faviconUrl from './images/favicon.ico';
import React from 'react';
import Router from 'react-router';
import routes from './routes';
import initializeActions from './actions/initializeActions';

$('#favicon_id').attr('href', faviconUrl);
initializeActions.initApp();

//Router.run(routes, Router.HistoryLocation, function (Handler) {
Router.run(routes, function (Handler) {
  React.render(<Handler/>, $('#app')[0]);
});


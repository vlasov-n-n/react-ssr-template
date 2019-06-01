import React from 'react';
import {renderToString} from 'react-dom/server';
import {Provider} from 'react-redux';
import serialize from 'serialize-javascript'
import {StaticRouter} from 'react-router-dom';
import {renderRoutes} from 'react-router-config';
import {Helmet} from 'react-helmet';

import Routes from '../client/Routes';

/**
 *
 * @param req {Object}
 * @param store {Object}
 * @returns {string}
 */
export default (req, store, context) => {
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={context}>
        <div>{renderRoutes(Routes)}</div>
      </StaticRouter>
    </Provider>
  );

  const helmet = Helmet.renderStatic();

  return `
    <html>
        <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        <!-- Compiled and minified CSS -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
        <!-- Compiled and minified JavaScript -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
       </head>
        <body>
            <div id="root">${content}</div>
            <script>window.INITIAL_STATE = ${serialize(store.getState())}</script>
            <script src="bundle.js"></script>
        </body>
    </html>
  `;
};

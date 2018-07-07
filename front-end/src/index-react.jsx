import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch } from 'react-router-dom';
import T from 'i18n-react';
import { AuthProvider } from './components/Auth/AuthProvider';
import AppRoute from './components/AppRoute/AppRoute';
import indexRoutes from './routes/index';
import i18nBr from './i18n/br.json';

T.setTexts(i18nBr);

ReactDOM.render(
  <AuthProvider>
    <HashRouter>
      <Switch>
        {indexRoutes
          .map(route => (
            <AppRoute
              key={route.name}
              {...route}
            />
          ))}
      </Switch>
    </HashRouter>
  </AuthProvider>,
  document.getElementById('root'),
);

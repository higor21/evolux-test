import { PhoneAddPage, PhoneEditPage, PhonesListPage } from 'pages';
import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as RouterProvider,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import { RouteNames } from 'shared/constants';
import store, { persistor } from 'store';

import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import { Colors } from 'shared/colors';

const CustomToastContainer = styled(ToastContainer)`
  & .Toastify__toast {
    border-radius: 1em;
    font-size: 1.4em;
    text-align: center;
    font-weight: bold;
  }
  & .Toastify__toast--error {
    background: ${Colors.red};
  }
  & .Toastify__toast--success {
    background: ${Colors.green};
  }
`;

const App = () => (
  <Switch>
    <Route exact path={RouteNames.phoneAdd} component={PhoneAddPage} />
    <Route
      exact
      path={`${RouteNames.phoneEdit}/:id`}
      component={PhoneEditPage}
    />
    <Route exact path={RouteNames.phoneList} component={PhonesListPage} />
    <Redirect to={RouteNames.phoneList} />
  </Switch>
);

const AppBootstrap = () => (
  <Provider store={store}>
    <RouterProvider>
      <PersistGate persistor={persistor} loading={null}>
        <CustomToastContainer position="bottom-right" />
        <App />
      </PersistGate>
    </RouterProvider>
  </Provider>
);

export default AppBootstrap;

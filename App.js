import React from 'react';
import NavigtionHandler from './src/navigation/NavigationHandler';
import {NavigationContainer} from '@react-navigation/native';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/redux/store';
import {Provider} from 'react-redux';

import {navigationRef} from './src/navigation/RootNavigation';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer ref={navigationRef}>
            <NavigtionHandler />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;

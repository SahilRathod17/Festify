import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {  userReducer,tutorialReducer,snackbarReducer, splashReducer, appTypeStateReducer } from './reducers';

const tutorialConfig = {
        key: 'Festify_Tutorials',
        storage: AsyncStorage,
        whitelist:['onBoardingTutorial']
}

const userConfig = {
        key: 'Festify_User',
        storage: AsyncStorage,
        whitelist:['isLoggedIn','userDetails']
};
const moduleConfig = {
        key: 'Festify_User_Type',
        storage: AsyncStorage,
        whitelist:['currentAppType']
};

const rootReducer = combineReducers({
        splash:splashReducer,
        module:persistReducer(moduleConfig, appTypeStateReducer),
        tutorials: persistReducer(tutorialConfig, tutorialReducer),
        user: persistReducer(userConfig, userReducer),
        snackbar:snackbarReducer
})

export const store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware({
                        serializableCheck: {
                                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                        },
                })
});

export const persistor = persistStore(store);
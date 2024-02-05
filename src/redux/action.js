export const AppTypeAction = (data) => {
  return {
    type: 'APP_TYPE',
    payload: data
  };
};
export const SnackbarOpen = (data) => {
  return {
    type: 'SNACKBAR_OPEN',
    payload: data
  };
};
export const SnackbarClose = () => {
  return {
    type: 'SNACKBAR_CLOSE',
    payload:{}
  };
};

export const loginAction = data => {
  return {
    type: 'LOGIN',
    payload: data,
  };
};
export const logoutAction = () => {
  return {
    type: 'LOGOUT',
    payload: null,
  };
};
export const onBoardingTutorial = data => {
  return {
    type: 'ON_BOARDING_TUTORIAL',
    payload: data,
  };
};

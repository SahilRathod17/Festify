const Tutorial = {
  onBoardingTutorial: true,
};
const AppTypeState = {
  currentAppType: '',
};
const SnackbarContent = {
  visible: false,
  message: '',
  color: '',
  code: 0,
};
const userState = {
  isLoggedIn: false,
  userDetails: null,
};
const SplashState = {
  splashDisplay: true,
};

export const appTypeStateReducer = (state = AppTypeState, action) => {
  const {type, payload} = action;
  switch (type) {
    case 'APP_TYPE':
      return {...state, currentAppType: payload};
    default:
      return state;
  }
};

export const splashReducer = (state = SplashState, action) => {
  const {type, payload} = action;
  switch (type) {
    case 'SPLASH_DISPLAY':
      return {...state, splashDisplay: false};
    default:
      return state;
  }
};

export const tutorialReducer = (state = Tutorial, action) => {
  const {type, payload} = action;
  switch (type) {
    case 'ON_BOARDING_TUTORIAL':
      return {...state, onBoardingTutorial: payload};
    default:
      return state;
  }
};
export const snackbarReducer = (state = SnackbarContent, action) => {
  const {type, payload} = action;
  switch (type) {
    case 'SNACKBAR_OPEN':
      return {
        ...state,
        visible: true,
        message: payload.message,
        code: payload.code,
      };
    case 'SNACKBAR_CLOSE':
      return {...state, visible: false, message: '', color: ''};
    default:
      return state;
  }
};

export const userReducer = (state = userState, action) => {
  const {type, payload} = action;
  switch (type) {
    case 'LOGIN':
      return {...state, userDetails: payload, isLoggedIn: true};
    case 'LOGOUT':
      return {...state, userDetails: null, isLoggedIn: false};
    default:
      return state;
  }
};

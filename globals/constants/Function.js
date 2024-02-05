import {SnackbarOpen, loginAction} from '../../src/redux/action';
import {useDispatch} from 'react-redux';
import {navigationRef} from '../../src/navigation/RootNavigation';
import axios from 'axios';

export const OpenSnackbar = () => {
  // use like this in component where we need to call API
  // const loginFunction = userLogin();
  // async & await loginFunction(DATA);
  const dispatch = useDispatch();
  const handleSnackBarOpen = async (messsage, code) => {
    dispatch(
      SnackbarOpen({
        message: messsage,
        code: code,
      }),
    );
  };

  return handleSnackBarOpen;
};

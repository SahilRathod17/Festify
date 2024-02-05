import {loginAction} from '../../src/redux/action';
import {useDispatch} from 'react-redux';
import {navigationRef} from '../../src/navigation/RootNavigation';
import axios from 'axios';
const BASE_URL = 'http://192.168.3.23:8000/';
// const BASE_URL = 'http://192.168.29.149:8000/';
const HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const StudentSignIn = () => {
  // use like this in component where we need to call API
  // const loginFunction = userLogin();
  // async & await loginFunction(DATA);
  const SignIn = async body => {
    let response = await fetch(`${BASE_URL}studentLogin`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(body),
    })
      .then(response => response.json())
      .then(res => {
        return res;
      });
    return response;
  };

  return SignIn;
};
export const TeacherSignIn = () => {
  // use like this in component where we need to call API
  // const loginFunction = userLogin();
  // async & await loginFunction(DATA);
  const SignIn = async body => {
    let response = await fetch(`${BASE_URL}teacherLogin`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(body),
    })
      .then(response => response.json())
      .then(res => {
        return res;
      });
    return response;
  };

  return SignIn;
};
export const ForgotPasswordAPI = () => {
  // use like this in component where we need to call API
  // const loginFunction = userLogin();
  // async & await loginFunction(DATA);
  const FP = async (person, body) => {
    let suffix =
      person == 'Student' ? 'Studentforgetpassword' : 'Teacherforgetpassword';
    let response = await fetch(`${BASE_URL}${suffix}`, {
      method: 'PATCH',
      headers: HEADERS,
      body: JSON.stringify(body),
    })
      .then(response => response.json())
      .then(res => {
        return res;
      });
    return response;
  };

  return FP;
};
export const GetAnnouncements = () => {
  // use like this in component where we need to call API
  // const loginFunction = userLogin();
  // async & await loginFunction(DATA);
  const fetchAnnouncement = async body => {
    let response = await fetch(`${BASE_URL}AnnouncementByCollegeId`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(body),
    })
      .then(response => response.json())
      .then(res => {
        return res;
      });
    return response;
  };

  return fetchAnnouncement;
};

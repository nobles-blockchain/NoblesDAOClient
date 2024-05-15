import Cookies from 'js-cookie';

const USER_ID_COOKIE_NAME = "user_id";

export const setUserIdCookie = (userId) => {
  return new Promise((resolve) => {
    Cookies.set(USER_ID_COOKIE_NAME, userId);
    resolve();
  });
};

export const getUserIdFromCookie = () => {
  return Cookies.get(USER_ID_COOKIE_NAME);
};

export const removeUserIdCookie = () => {
  return new Promise((resolve) => {
    Cookies.remove(USER_ID_COOKIE_NAME);
    resolve();
  });
};

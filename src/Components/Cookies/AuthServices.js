import React from 'react';
import { useState } from 'react';
import Cookies from 'js-cookie';

const USER_ID_COOKIE_NAME = "null";



export const setUserIdCookie = (userId) => {
  Cookies.set(USER_ID_COOKIE_NAME, userId);
};

export const getUserIdFromCookie = () => {
  return Cookies.get(USER_ID_COOKIE_NAME);
};

export const removeUserIdCookie = () => {
  Cookies.set(USER_ID_COOKIE_NAME, "null");
};




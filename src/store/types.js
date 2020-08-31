import { createAction } from "@reduxjs/toolkit";

//login and signup post request
export const apiCallBegan = createAction("apiCallBegan");
export const apiCallSuccess = createAction("apiCallSuccess");
export const apiCallFailed = createAction("apiCallFailed");
export const logoutUser = createAction("logoutUser");

//post request

export const apiGetBegan = createAction("apiGetBegan ");
export const apiGetSuccess = createAction("apiGetSuccess");
export const apiGetFailed = createAction("apiGetFailed");

export const apiImageBegan = createAction("apiImageBegan");
export const apiImageSuccess = createAction("apiImageSuccess");
export const apiImageFailed = createAction("apiImageFailed");

//get user information
export const apiUserInfo = createAction("apiUserInfo");

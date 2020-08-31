import { createAction } from "@reduxjs/toolkit";

//login and signup post request
export const apiCallBegan = createAction("apiCallBegan");
export const apiCallSuccess = createAction("apiCallSuccess");
export const apiCallFailed = createAction("apiCallFailed");
export const logoutUser = createAction("logoutUser");

//get request
export const apiGetBegan = createAction("apiGetBegan ");
export const apiGetSuccess = createAction("apiGetSuccess");
export const apiGetFailed = createAction("apiGetFailed");

//get user information
export const apiUserInfo = createAction("apiUserInfo");

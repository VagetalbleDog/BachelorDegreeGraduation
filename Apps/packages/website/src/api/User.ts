// @ts-ignore
/* eslint-disable */
import request from 'umi-request';
const api = '/api';

/** 此处后端没有提供注释 POST /user/login */
export async function UserControllerLoginUser(
  body: API.UserLoginDTO,
  options?: { [key: string]: any },
) {
  return request<any>(`${api}/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user/register */
export async function UserControllerRegsiterUser(
  body: API.UserRegsiterDTO,
  options?: { [key: string]: any },
) {
  return request<any>(`${api}/user/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

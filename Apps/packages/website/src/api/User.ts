// @ts-ignore
/* eslint-disable */
import request from 'umi-request';
const api = '/api';

/** 此处后端没有提供注释 POST /user/follow */
export async function UserControllerFollowUser(
  body: API.FollowUserDTO,
  options?: { [key: string]: any },
) {
  return request<any>(`${api}/user/follow`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /user/getInfo/${param0} */
export async function UserControllerGetUserInfoById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UserControllerGetUserInfoByIdParams,
  options?: { [key: string]: any },
) {
  const { userId: param0, ...queryParams } = params;
  return request<any>(`${api}/user/getInfo/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /user/info */
export async function UserControllerGetUserInfo(options?: { [key: string]: any }) {
  return request<any>(`${api}/user/info`, {
    method: 'GET',
    ...(options || {}),
  });
}

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

/** 此处后端没有提供注释 POST /user/unfollow */
export async function UserControllerUnFollowUser(
  body: API.FollowUserDTO,
  options?: { [key: string]: any },
) {
  return request<any>(`${api}/user/unfollow`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

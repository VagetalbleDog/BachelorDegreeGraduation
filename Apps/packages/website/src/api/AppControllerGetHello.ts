// @ts-ignore
/* eslint-disable */
import request from 'umi-request';
const api = '/api';

/** 此处后端没有提供注释 GET / */
export async function AppControllerGetHello(options?: { [key: string]: any }) {
  return request<any>(`${api}/`, {
    method: 'GET',
    ...(options || {}),
  });
}

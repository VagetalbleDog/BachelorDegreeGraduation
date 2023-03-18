// @ts-ignore
/* eslint-disable */
import request from 'umi-request';
const api = '/api';

/** 此处后端没有提供注释 GET /article */
export async function ArticleControllerSearchByContent(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ArticleControllerSearchByContentParams,
  options?: { [key: string]: any },
) {
  return request<any>(`${api}/article`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

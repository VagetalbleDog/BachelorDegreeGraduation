// @ts-ignore
/* eslint-disable */
import request from 'umi-request';
const api = '/api';

/** 此处后端没有提供注释 GET /article */
export async function ArticleControllerFindAll(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ArticleControllerFindAllParams,
  options?: { [key: string]: any },
) {
  return request<API.ArticleResDTO>(`${api}/article`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /article/${param0} */
export async function ArticleControllerFindDetailById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ArticleControllerFindDetailByIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ArtilceDetailResDTO>(`${api}/article/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /article/collect */
export async function ArticleControllerCollectArticle(
  body: API.likeDto,
  options?: { [key: string]: any },
) {
  return request<any>(`${api}/article/collect`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /article/comment */
export async function ArticleControllerComment(
  body: API.commentDto,
  options?: { [key: string]: any },
) {
  return request<any>(`${api}/article/comment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /article/create */
export async function ArticleControllerCreateArticle(
  body: API.ArticleEditOrCreateReqDTO,
  options?: { [key: string]: any },
) {
  return request<API.ExecutionResDTO>(`${api}/article/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /article/delete */
export async function ArticleControllerDeleteArticle(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ArticleControllerDeleteArticleParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ExecutionResDTO>(`${api}/article/delete`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /article/edit */
export async function ArticleControllerEditArticle(
  body: API.ArticleEditOrCreateReqDTO,
  options?: { [key: string]: any },
) {
  return request<API.ExecutionResDTO>(`${api}/article/edit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /article/like */
export async function ArticleControllerLikeArticle(
  body: API.likeDto,
  options?: { [key: string]: any },
) {
  return request<any>(`${api}/article/like`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /article/recommend/${param0} */
export async function ArticleControllerRecommend(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ArticleControllerRecommendParams,
  options?: { [key: string]: any },
) {
  const { userId: param0, ...queryParams } = params;
  return request<API.ArticleResDTO>(`${api}/article/recommend/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /article/search */
export async function ArticleControllerSearch(
  body: API.SearchReqDTO,
  options?: { [key: string]: any },
) {
  return request<API.ArticleResDTO>(`${api}/article/search`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /article/unCollect */
export async function ArticleControllerUnCollect(
  body: API.likeDto,
  options?: { [key: string]: any },
) {
  return request<any>(`${api}/article/unCollect`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

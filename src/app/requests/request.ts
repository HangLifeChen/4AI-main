import { request } from "@/utils/request";

interface IResponse {
  code: number;
  data: any;
}

// get request list
export const getRankList = async (payload): Promise<IResponse> => {
  const res = await request.post('/api/front/get/request/ranklist', payload);
  return res
}

// get group list
export const getGroupList = async (payload?): Promise<IResponse> => {
  const res = await request.get('/api/front/get/request/ranklist/group', payload);
  return res
}

// create request
export const createRequest = async (payload): Promise<IResponse> => {
  const res = await request.post('/api/front/create/request', payload);
  return res
}

// get request detail
export const getRequestDetail = async (payload): Promise<IResponse> => {
  const res = await request.post('/api/front/get/request', payload);
  return res
}

// like request
export const likeRequest = async (payload): Promise<IResponse> => {
  const res = await request.post('/api/front/like/request', payload);
  return res
}

// unlike request
export const unlikeRequest = async (payload): Promise<IResponse> => {
  const res = await request.post('/api/front/unlike/request', payload);
  return res
}

// create request comments
export const createRequestComments = async (payload): Promise<IResponse> => {
  const res = await request.post('/api/front/create/request/comment', payload);
  return res
}

// get commments list
export const getRequestComments = async (payload): Promise<IResponse> => {
  const res = await request.post('/api/front/get/request/comment_list', payload);
  return res
}

// like commment
export const likeRequestComment = async (payload): Promise<IResponse> => {
  const res = await request.post('/api/front/like/request/comment', payload);
  return res
}
// unlike commment
export const unlikeRequestComment = async (payload): Promise<IResponse> => {
  const res = await request.post('/api/front/unlike/request/comment', payload);
  return res
}

// get comment detail
export const getCommentDetail = async (payload): Promise<IResponse> => {
  const res = await request.post('/api/front/get/request/comment', payload);
  return res
}

// get resolve list
export const getResolveList = async (payload): Promise<IResponse> => {
  const res = await request.post('/api/front/get/resolve/ranklist', payload);
  return res
}

// create resolve
export const createResolve = async (payload): Promise<IResponse> => {
  const res = await request.post('/api/front/create/resolve', payload);
  return res
}

// like resolve
export const likeResolve = async (payload): Promise<IResponse> => {
  const res = await request.post('/api/front/like/resolve', payload);
  return res
}

// unlike resolve
export const unlikeResolve = async (payload): Promise<IResponse> => {
  const res = await request.post('/api/front/unlike/resolve', payload);
  return res
}


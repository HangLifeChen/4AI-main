import { request } from "@/utils/request";

interface IResponse {
  code: number;
  data: any;
}


// get tags
export const getTags = async (): Promise<IResponse> => {
  const res = await request.post('/api/front/get/repositories/tag/tree');
  return res
}

// create agent repository
export const createRepository = async (payload): Promise<IResponse> => {
  const res = await request.post('/api/front/create/repositories', payload);
  return res
}

// update agent repository
export const updateRepository = async (payload): Promise<IResponse> => {
  const res = await request.post('/api/front/update/repositories', payload);
  return res
}

// delete agent repository
export const deleteRepository = async (payload): Promise<IResponse> => {
  const res = await request.post('/api/front/delete/repositories', payload);
  return res
}

// get agent detail
export const getAgentDetail = async (payload): Promise<IResponse> => {
  const res = await request.get('/api/front/get/repositories', {
    params: payload
  });
  return res
}

// get agent list
export const getRankList = async (payload): Promise<IResponse> => {
  const res = await request.post('/api/front/get/repositories/ranklist', payload);
  return res
}

// get group list
export const getGroupList = async (payload?): Promise<IResponse> => {
  const res = await request.get('/api/front/get/repositories/ranklist/group', payload);
  return res
}

// like agent repository
export const likeRepository = async (payload): Promise<IResponse> => {
  const res = await request.post('/api/front/like/repositories', payload);
  return res
}

// unlike agent repository
export const unlikeRepository = async (payload): Promise<IResponse> => {
  const res = await request.post('/api/front/unlike/repositories', payload);
  return res
}

// create comments
export const createAgentComments = async (payload): Promise<IResponse> => {
  const res = await request.post('/api/front/create/repositories/comment', payload);
  return res
}

// get comments
export const getAgentComments = async (payload): Promise<IResponse> => {
  const res = await request.post('/api/front/get/repositories/comment_list', payload);
  return res
}
// get comment detail
export const getCommentDetail = async (payload): Promise<IResponse> => {
  const res = await request.post('/api/front/get/repositories/comment', payload);
  return res
}


// like comments
export const likeAgentComments = async (payload): Promise<IResponse> => {
  const res = await request.post('/api/front/like/repositories/comment', payload);
  return res
}

// unlike comments
export const unlikeAgentComments = async (payload): Promise<IResponse> => {
  const res = await request.post('/api/front/unlike/repositories/comment', payload);
  return res
}


// get download chart data
export const getChartData = async (payload): Promise<IResponse> => {
  const res = await request.post('/api/front/repositories/files/download_stat', payload);
  return res
}

// upload file
export const uploadFile = async (payload): Promise<IResponse> => {
  const res = await request.post('/api/front/repositories/files/upload', payload);
  return res
}

// get files struct
export const getFileStruct = async (payload): Promise<IResponse> => {
  const res = await request.post('/api/front/repositories/get/files', payload);
  return res
}

// commit log list
export const getCommitLogs = async (payload): Promise<IResponse> => {
  const res = await request.post('/api/front/repositories/get/commit_list', payload);
  return res
}

// get download hash
export const getDownloadHash = async (payload): Promise<IResponse> => {
  const res = await request.post('/api/front/repositories/files/download', payload);
  return res
}


export const getAppInfoProfile = async (payload): Promise<IResponse> => {
  const res = await request.get('/api/front/get/aibot/profile', payload);
  return res
}


export const getAppChatOpen = async (payload): Promise<IResponse> => {
  const res = await request.post(`/api/front/get/aibot/open`, payload);
  return res
}


export const getAppChatMessage = async (payload): Promise<IResponse> => {
  const res = await request.post(`/api/front/get/aibot/chat`, payload);
  return res
}


export const seedFeedback = async (payload): Promise<IResponse> => {
  const res = await request.post(`/open_compute/new/report`, payload);
  return res
}

// step1 my verifier
export const getStep1 = async (payload): Promise<IResponse> => {
  const res = await request.post(`/open_compute/verifier/create`, payload);
  return res
}

// step4
export const getVerifier = async (payload): Promise<IResponse> => {
  const res = await request.get(`/open_compute/verifier/get`, payload);
  return res
}

// update
export const getVerifierUpdate = async (payload): Promise<IResponse> => {
  const res = await request.post(`/open_compute/verifier/update`, payload);
  return res
}

// /open_compute/verifier/get_dashborad
export const getVerifierDashboard = async (payload): Promise<IResponse> => {
  const res = await request.get(`/open_compute/verifier/get_dashborad`, payload);
  return res
}

// list_tx_signature dashboard
export const getDashboardListsignature = async (payload): Promise<IResponse> => {
  const res = await request.post(`/open_compute/list_tx_signature`, payload);
  return res
}

// getAppid
export const getAppIdFn = async (payload): Promise<IResponse> => {
  const res = await request.get(`/open_compute/verifier/device/appid`, payload);
  return res
}






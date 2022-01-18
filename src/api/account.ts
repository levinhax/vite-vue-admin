import request from '../utils/request'

// 登录
const login = async (params: { username: string; password: string; verCode: string }) => {
  const res = await request.post('/login', params)
  return {
    token: res.token,
  }
}

const getUserInfo = async () => {
  const res = await request.get('/userInfo')
  return {
    data: res,
  }
}

const apiGetLicense = async () => {
  const res = await request.get('/license/info')
  return {
    data: res,
  }
}

export { login, getUserInfo, apiGetLicense }

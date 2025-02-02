import { UserPasswordType, UserType } from '../controllers/user-controller'
import HTTPTransport from '../utils/httpTransport'
import { BaseAPI, BaseURL } from './base-api'

const userApiInstance = new HTTPTransport(BaseURL)

export class UserApi extends BaseAPI {
  getUser() {
    return userApiInstance.get('/auth/user', {
      credentials: true,
    })
  }

  searchUser(data: { login: string }) {
    return userApiInstance.post('/user/search', {
      headers: { 'Content-type': 'application/json', Accept: 'application/json' },
      credentials: true,
      data,
    })
  }

  uploadAvatar(data: FormData) {
    return userApiInstance.put('/user/profile/avatar', { credentials: true, data })
  }

  changeProfile(data: UserType) {
    return userApiInstance.put('/user/profile', {
      credentials: true,
      data,
      headers: { 'Content-type': 'application/json', Accept: 'application/json' },
    })
  }

  changePassword(data: UserPasswordType) {
    return userApiInstance.put('/user/password', {
      credentials: true,
      data,
      headers: { 'Content-type': 'application/json', Accept: 'application/json' },
    })
  }
}

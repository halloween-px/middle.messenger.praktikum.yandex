import HTTPTransport from '../utils/httpTransport'
import { BaseAPI, BaseURL } from './base-api'

export interface AuthSignUpType {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}

export interface AuthSingInType {
  login: string
  password: string
}

const authApiInstance = new HTTPTransport(BaseURL)

export class AuthApi extends BaseAPI {
  login(data: AuthSingInType) {
    return authApiInstance.post('/auth/signin', {
      data,
      headers: { 'Content-type': 'application/json', Accept: 'application/json' },
      credentials: true,
    })
  }

  register(data: AuthSignUpType) {
    return authApiInstance.post('/auth/signup', {
      data,
      headers: { 'Content-type': 'application/json', Accept: 'application/json' },
      credentials: true,
    })
  }

  logout() {
    return authApiInstance.post('/auth/logout', {
      credentials: true,
    })
  }
}

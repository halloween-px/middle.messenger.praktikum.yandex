import { XHRError } from '../utils/httpTransport'
import { AuthApi, AuthSignUpType, AuthSingInType } from '../api/auth-api'
import store from '../store/store'
import { Router, RouterPath } from '../router/router'

const authApi = new AuthApi()
class AuthController {
  async register(data: AuthSignUpType) {
    try {
      await authApi.register(data)
      new Router().go(RouterPath.chat)
    } catch (error) {
      throw new Error(`failed register: ${error}`)
    }
  }

  async login(data: AuthSingInType) {
    try {
      store.set('loading.button', true)
      await authApi.login(data)
      store.set('loading.button', false)
      new Router().go(RouterPath.chat)
    } catch (error) {
      const err = error as XHRError
      store.set('loading.button', false)

      if (err && err.status === 401) {
        store.set('formError', `${JSON.parse(err.responseText).reason}`)
      }

      throw new Error(`failed login: ${err.responseText}`)
    }
  }

  async logout() {
    try {
      await authApi.logout()
      new Router().go(RouterPath.login)
    } catch (error) {
      throw new Error(`failed logout: ${error}`)
    }
  }
}

export default new AuthController()

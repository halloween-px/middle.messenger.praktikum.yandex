import Login from './src/pages/auth/login/login'
import Register from './src/pages/auth/register/register'
import Chat from './src/pages/chat/chat'
import ErrorPage from './src/pages/error/error'
import Profile from './src/pages/profile/profile'
import { Router, RouterPath } from './src/router/router'

class App {
  init() {
    this.initRouter()
  }

  initRouter() {
    new Router('.app')
      .use(RouterPath.login, Login, true)
      .use(RouterPath.register, Register)
      .use(RouterPath.error404, ErrorPage)
      .use(RouterPath.error500, ErrorPage)
      .use(RouterPath.profile, Profile)
      .use(RouterPath.chat, Chat)
      .start()
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new App().init()
})

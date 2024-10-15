import Login from './src/pages/auth/login/login'
import Register from './src/pages/auth/register/register'
import ErrorPage from './src/pages/error/error'
import Home from './src/pages/home/home'
import Profile from './src/pages/profile/profile'

class App {
  constructor() {
    this.app = document.getElementById('app')
    this.routes = {
      '/': Home,
      '#login': Login,
      '#register': Register,
      '#error-404': ErrorPage,
      '#error-500': ErrorPage,
      '#profile': Profile,
    }
  }

  init() {
    this.router()
    this.handleRouteChange()
  }

  router() {
    window.addEventListener('hashchange', () => {
      this.handleRouteChange()
    })
  }

  handleRouteChange() {
    const hash = window.location.hash || '/'
    let Page = null
    if (hash === '#error-404') {
      Page = new this.routes[hash]({
        content: this.app,
        error: 404,
        description: 'Не туда попали',
      })
    } else if (hash === '#error-500') {
      Page = new this.routes[hash]({
        content: this.app,
        error: 500,
        description: 'Мы уже фиксим',
      })
    } else {
      Page = new this.routes[hash]({ content: this.app })
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new App().init()
})

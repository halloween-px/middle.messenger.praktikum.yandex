import Login from './src/pages/auth/login/login'
import Register from './src/pages/auth/register/register'
import Chat from './src/pages/chat/chat'
import ErrorPage from './src/pages/error/error'
import Home from './src/pages/home/home'
import Profile from './src/pages/profile/profile'
import { renderDOM } from './src/utils/renderDom'

//Как говорили роутинг в следующем спринте так что пока что такой вариант

class App {
  routes: {
    [key: string]: any
  }

  app: any

  constructor() {
    this.app = document.getElementById('app')
    this.routes = {
      '/': Home,
      '#login': Login,
      '#register': Register,
      '#error-404': ErrorPage,
      '#error-500': ErrorPage,
      '#profile': Profile,
      '#chat': Chat,
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
    this.app.innerHTML = ''
    let page = null

    if (hash === '#error-404') {
      page = new this.routes[hash]({
        error: 404,
        description: 'Не туда попали',
      })
    } else if (hash === '#error-500') {
      page = new this.routes[hash]({
        error: 500,
        description: 'Мы уже фиксим',
      })
    } else {
      page = new this.routes[hash]()
    }

    renderDOM('#app', page)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new App().init()
})

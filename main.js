import Login from './src/pages/auth/login/login'
import Register from './src/pages/auth/register/register'
import ErrorPage from './src/pages/error/error'
import Home from './src/pages/home/home'

class App {
  constructor() {
    this.app = document.getElementById('app')
    this.routes = {
      '/': new Home(),
      '#login': new Login(),
      '#register': new Register(),
      '#error-404': new ErrorPage({
        error: 404,
        description: 'Не туда попали',
      }),
      '#error-500': new ErrorPage({
        error: 500,
        description: 'Мы уже фиксим',
      }),
    }
  }

  init() {
    this.router()
  }

  renderPage(page) {
    this.app.innerHTML = page
  }

  router() {
    //тестовый роутинг, знаю полная фигня (времени поджимает) но странички переключает
    this.renderPage(this.routes['/'].render())

    window.addEventListener('hashchange', () => {
      const hash = window.location.hash || '/'
      const Page = this.routes[hash]
      if (Page) {
        this.renderPage(Page.render())
      }
    })
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new App().init()
})

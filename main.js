import Login from './src/pages/auth/login/login'
import Register from './src/pages/auth/register/register'
import ErrorPage from './src/pages/error/error'

class App {
  constructor() {
    this.app = document.getElementById('app')
    this.loginPage = new Login().render()
    this.registerPage = new Register().render()
    this.errorPage = new ErrorPage({
      error: 500,
      description: 'Мы уже фиксим',
    }).render()
  }

  init() {
    this.app.innerHTML = this.errorPage
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new App().init()
})

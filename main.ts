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

// const bubbleSort = arr => {
//   for (let i = 0; i < arr.length; i++) {
//     for (let k = 0; k < arr.length; k++) {
//       if (arr[k] > arr[k + 1]) {
//         let temp = arr[k]
//         arr[k] = arr[k + 1]
//         arr[k + 1] = temp
//       }
//     }
//   }

//   return arr
// }

// console.log(bubbleSort([5, 2, 9, 1, 5, 6]))

// const paindromStr = str => {
//   for (let i = 0; i < str.length; i++) {
//     const start = str[i]
//     const end = str[str.length - (i + 1)]

//     if (start !== end) return false
//   }

//   return true
// }

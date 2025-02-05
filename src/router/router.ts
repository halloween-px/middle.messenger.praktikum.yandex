import { Block } from '../lib/block'
import { Route } from './route'

export enum RouterPath {
  login = '/',
  register = '/sign-up',
  chat = '/messenger',
  profile = '/settings',
  error404 = '/error-404',
  error500 = '/error-500',
}

export class Router {
  routes!: Route[]
  history!: History

  _initialPage!: string
  _rootQuery!: string
  _currentRoute!: Route | null
  static __instance: Router | null = null

  constructor(rootQuery: string = '.app') {
    if (Router.__instance) {
      return Router.__instance
    }

    this.routes = []
    this.history = window.history
    this._rootQuery = rootQuery
    this._currentRoute = null
    this._initialPage = ''

    Router.__instance = this
  }

  use(pathname: string, block: typeof Block, initialPage?: boolean) {
    if (initialPage && window.location.pathname === '/') {
      this._initialPage = pathname
      this.history.pushState({}, '', this._initialPage)
    }

    const route = new Route(pathname, block, { rootQuery: this._rootQuery })
    this.routes?.push(route)
    return this
  }

  go(pathname: RouterPath) {
    this.history.pushState({}, '', pathname)
    this._onRoute(pathname)
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname)

    if (!route) return

    if (this._currentRoute) {
      this._currentRoute.leave()
    }

    this._currentRoute = route
    route.render()
  }

  getRoute(pathname: string) {
    return this.routes.find(route => route.match(pathname))
  }

  start() {
    window.addEventListener('popstate', () => {
      this._onRoute(window.location.pathname)
    })

    this._onRoute(this._initialPage || window.location.pathname)
    return this
  }
}

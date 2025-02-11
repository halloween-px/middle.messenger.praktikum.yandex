import { expect } from 'chai'
import sinon from 'sinon'
import { Router, RouterPath } from './router'
import { Route } from './route'
import { Block } from '../lib/block'

class MockBlock extends Block {
  constructor() {
    super({})
  }

  getContent(): HTMLElement {
    const div = document.createElement('div')
    return div
  }
}

describe('Router', () => {
  let router: Router

  beforeEach(() => {
    router = new Router('.app')
  })

  it('должен добавлять маршруты через use()', () => {
    router.use(RouterPath.login, MockBlock)
    expect(router.routes.length).to.equal(1)
  })

  it('должен находить маршрут через getRoute()', () => {
    router.use(RouterPath.chat, MockBlock)
    const route = router.getRoute(RouterPath.chat)
    expect(route).to.be.instanceOf(Route)
  })

  it('должен изменять URL при go()', () => {
    const pushStateStub = sinon.stub(global.window.history, 'pushState')

    router.use(RouterPath.profile, MockBlock)
    router.go(RouterPath.profile)

    expect(pushStateStub.calledOnce).to.be.true
    expect(pushStateStub.calledWith({}, '', RouterPath.profile)).to.be.true

    pushStateStub.restore()
  })

  it('должен рендерить страницу при вызове _onRoute()', () => {
    router.use(RouterPath.error404, MockBlock)
    const route = router.getRoute(RouterPath.error404)!
    const renderSpy = sinon.spy(route, 'render')

    router._onRoute(RouterPath.error404)
    expect(renderSpy.calledOnce).to.be.true
  })

  it('должен запускаться и обрабатывать popstate', () => {
    const onRouteSpy = sinon.spy(router, '_onRoute')
    router.start()
    expect(onRouteSpy.calledOnce).to.be.true
  })
})

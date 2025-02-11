import { expect } from 'chai'
import { Route } from './route'
import { RouterPath } from './router'
import { Block } from '../lib/block'
import sinon from 'sinon'

describe('Route', () => {
  let route: Route
  let mockBlock: Block

  beforeEach(() => {
    route = new Route(RouterPath.login, Block, { rootQuery: '.app' })
    mockBlock = new Block({})
    const mockElemet = document.createElement('div')
    mockBlock.getContent = () => mockElemet
    route.block = mockBlock
  })

  it('Проверка метода match() должен вернуть true', () => {
    expect(route.match(RouterPath.login)).to.be.true
  })

  it('Проверка метода match() должен вернуть false', () => {
    expect(route.match(RouterPath.chat)).to.be.false
  })

  it('метод leave() должен скрывать страницу вешая класс d-none', () => {
    const blockHide = sinon.spy(mockBlock, 'hide')
    route.leave()

    expect(blockHide.calledOnce).to.be.true
    expect(route.block!.getContent().classList.contains('d-none')).to.be.true
  })

  it('Метод render() должен показывать страницу убирая класс d-none', () => {
    const blockShow = sinon.spy(mockBlock, 'show')
    route.render()

    expect(blockShow.calledOnce).to.be.true
    expect(!route.block!.getContent().classList.contains('d-none')).to.be.true
  })

  it('Метод render() не имя this.block должен создавать экземпляр страницы и рендерить его в DomElement', () => {
    route.block = null
    route.blockClass = Block
    const mockGetContent = sinon.stub(Block.prototype, 'getContent').returns(document.createElement('div'))
    route.render()

    const isChild = (document.querySelector('.app') as HTMLElement).children.length > 0

    expect(isChild).to.be.true
    expect(mockGetContent.calledOnce).to.be.true

    mockGetContent.restore()
  })
})

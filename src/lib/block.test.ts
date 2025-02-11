import { expect } from 'chai'
import sinon from 'sinon'
import { Block } from './block'

describe('Block', () => {
  let block: Block

  beforeEach(() => {
    block = new Block({ prop1: 'value1' })
    const div = document.createElement('div')
    block.getContent = () => div
  })

  afterEach(() => {
    sinon.restore()
  })

  it('Инициализирует eventBus', () => {
    expect(block.eventBus()).to.exist
  })

  it('Вызывает componentDidMount при монтировании', () => {
    const spy = sinon.spy(block, 'componentDidMount')
    block.dispatchComponentDidMoun()
    expect(spy.calledOnce).to.be.true
  })

  it('setProps обновляет свойства и вызывает componentDidUpdate', () => {
    const spy = sinon.spy(block, 'componentDidUpdate')
    block.setProps({ prop1: 'value2' })
    expect(spy.calledOnce).to.be.true
    expect(block.props.prop1).to.equal('value2')
  })

  it('setLists обновляет lists', () => {
    block.setLists({ items: [1, 2, 3] })
    expect(block.lists.items).to.deep.equal([1, 2, 3])
  })

  it('compile заменяет заглушки на реальные элементы', () => {
    const template = '<div>{{content}}</div>'
    const compiled = block.compile(template, { content: 'Hello' })
    expect(compiled.outerHTML).to.equal('<div>Hello</div>')
  })

  it('getContent возвращает элемент', () => {
    expect(block.getContent()).to.equal(block.getContent())
  })

  it('show убирает d-none', () => {
    block.hide()
    block.show()
    expect(block.getContent().classList.contains('d-none')).to.be.false
  })

  it('hide добавляет d-none', () => {
    block.hide()
    expect(block.getContent().classList.contains('d-none')).to.be.true
  })

  it('Удаляет и добавляет обработчики событий', () => {
    const block = new Block()
    const template = '<div>{{content}}</div>'
    block.render = () => block.compile(template, { content: 'Hello' })
    block.render()

    const clickHandler = sinon.spy()

    block.setProps({ events: { click: clickHandler } })
    const element = block.getContent()
    element.click()

    expect(clickHandler.calledOnce).to.be.false
  })
})

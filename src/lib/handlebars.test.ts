import { expect } from 'chai'
import Handlebars from 'handlebars'

describe('Handlebars', () => {
  let hb = Handlebars

  it('Должен компилировать шаблон и подставлять данные', () => {
    const template = '<div>{{hello}}</div>'
    const result = hb.compile(template)({ hello: 'Привет' })

    expect(result).to.equal('<div>Привет</div>')
  })
})

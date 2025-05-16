import { expect } from 'chai'
import sinon from 'sinon'
import HTTPTransport from './httpTransport'

describe('HTTPTransport', () => {
  let http: HTTPTransport
  let xhr: sinon.SinonFakeXMLHttpRequestStatic
  let requests: sinon.SinonFakeXMLHttpRequest[] = []

  beforeEach(() => {
    http = new HTTPTransport('https://api.example.com')

    xhr = sinon.useFakeXMLHttpRequest()
    requests = []

    xhr.onCreate = req => {
      requests.push(req)
    }
  })

  afterEach(() => {
    sinon.restore()
  })

  it('Должен инициализироваться с baseUrl', () => {
    expect(http.baseUrl).to.equal('https://api.example.com')
  })

  it('Метод GET должен вызывать request с правильным URL', () => {
    const requestSpy = sinon.spy(http, 'request')

    http.get('/test', { data: { key: 'value' } })

    expect(requestSpy.calledOnce).to.be.true
    expect(requestSpy.args[0][0]).to.equal('https://api.example.com/test')
    expect(requestSpy.args[0][1]).to.deep.include({ method: 'GET' })
  })

  it('Метод POST должен отправлять данные', () => {
    const requestSpy = sinon.spy(http, 'request')

    http.post('/test', { data: { key: 'value' } })
    expect(requestSpy.calledOnce).to.be.true
    expect(requestSpy.args[0][0]).to.equal('https://api.example.com/test')
    expect(requestSpy.args[0][1]).to.deep.include({ method: 'POST' })
  })

  it('Метод request должен обрабатывать успешный ответ', async () => {
    const responseData = { success: true }
    const promise = http.get('/test')

    requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(responseData))

    const response = await promise
    expect(response).to.deep.equal(responseData)
  })

  it('Метод request должен обрабатывать ошибку запроса', async () => {
    const promise = http.get('/test')

    requests[0].respond(500, { 'Content-Type': 'application/json' }, JSON.stringify({ error: 'Internal Server Error' }))

    try {
      await promise
    } catch (error: any) {
      expect(error.status).to.equal(500)
      expect(error.responseText).to.equal(JSON.stringify({ error: 'Internal Server Error' }))
    }
  })

  it('Метод request должен обрабатывать network error', async () => {
    const promise = http.get('/test')

    requests[0].error()

    try {
      await promise
    } catch (error: any) {
      expect(error.message).to.equal('Network error')
    }
  })
})

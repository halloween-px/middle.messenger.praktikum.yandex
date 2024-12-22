enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type Options = {
  method: string
  headers?: Record<string, string>
  data?: Record<string, any>
  timeout?: number
}

type HTTPMethod = (url: string, options?: Options) => Promise<unknown>

function queryStringify(data: Object) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object')
  }

  return Object.entries(data).reduce((acc, [key, value], i) => {
    acc += `${i === 0 ? '?' : '&'}${key}=${value}`
    return acc
  }, '')
}

class HTTPTransport {
  get: HTTPMethod = (url, options = { method: METHODS.GET }) => {
    return this.request(url, options)
  }

  post: HTTPMethod = (url, options = { method: METHODS.POST }) => {
    return this.request(url, options)
  }

  put: HTTPMethod = (url, options = { method: METHODS.PUT }) => {
    return this.request(url, options)
  }

  delete: HTTPMethod = (url, options = { method: METHODS.DELETE }) => {
    return this.request(url, options)
  }

  request = (url: string, options: Options) => {
    const { method, headers = {}, data } = options
    const timeout = options.timeout || 5000

    return new Promise((resolve, reject) => {
      if (!method) {
        reject(new Error('No metod'))
      }

      const xhr = new XMLHttpRequest()
      const isGet = method === METHODS.GET
      xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url)

      Object.entries(headers).forEach(([headersKey, headersValue]) => {
        xhr.setRequestHeader(headersKey, headersValue)
      })

      xhr.timeout = timeout

      xhr.onload = () => {
        if (xhr.status <= 200 && xhr.status < 300) {
          resolve(xhr)
        } else {
          reject(new Error(`Запрос отменен статус ${xhr.status}`))
        }
      }

      xhr.onabort = () => {
        reject(new Error('Прервано хз чем'))
      }
      xhr.onerror = () => {
        reject(new Error('Network error'))
      }
      xhr.ontimeout = () => {
        reject(new Error('Время истекло'))
      }

      if (isGet || !data) {
        xhr.send()
      } else {
        xhr.send(JSON.stringify(data))
      }
    })
  }
}

export default HTTPTransport

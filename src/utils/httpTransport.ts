import { queryStringify } from './helpres'

enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export interface XHRError {
  status: number
  responseText: string
  statusText: string
}

type Options = {
  headers?: {
    'Content-type'?: 'application/json' | string
    Accept?: 'application/json' | string
  }
  data?: Record<string, any>
  timeout?: number
  credentials?: boolean
}

type HTTPMethod = (url: string, options?: Options) => Promise<unknown>

class HTTPTransport {
  baseUrl: string

  constructor(url: string) {
    this.baseUrl = url
  }

  get: HTTPMethod = (url, options) => this.request(this.baseUrl + url, { ...options, method: METHODS.GET })

  post: HTTPMethod = (url, options) => this.request(this.baseUrl + url, { ...options, method: METHODS.POST })

  put: HTTPMethod = (url, options) => this.request(this.baseUrl + url, { ...options, method: METHODS.PUT })

  delete: HTTPMethod = (url, options) => this.request(this.baseUrl + url, { ...options, method: METHODS.DELETE })

  request = (url: string, options: Omit<Options, 'method'> & { method: METHODS }) => {
    const { method, headers = {}, data, credentials = false } = options
    const timeout = options.timeout || 5000

    return new Promise((resolve, reject) => {
      if (!method) {
        reject(new Error('No method'))
      }

      const xhr = new XMLHttpRequest()
      const isGet = method === METHODS.GET

      xhr.open(method, isGet && !!data ? `${url}?${queryStringify(data)}` : url)

      if (!(data instanceof FormData)) {
        Object.entries(headers).forEach(([headersKey, headersValue]) => {
          xhr.setRequestHeader(headersKey, headersValue)
        })
      }

      xhr.withCredentials = credentials
      xhr.timeout = timeout

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const responseData = JSON.parse(xhr.responseText)
            resolve(responseData)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
          } catch (_error) {
            resolve(xhr.responseText)
          }
        } else {
          reject({
            status: xhr.status,
            responseText: xhr.responseText,
            statusText: xhr.statusText,
          } as XHRError)
        }
      }

      xhr.onabort = () => reject(new Error('Request aborted'))
      xhr.onerror = () => reject(new Error('Network error'))
      xhr.ontimeout = () => reject(new Error('Request timed out'))

      if (isGet || !data) {
        xhr.send()
      } else if (data instanceof FormData) {
        xhr.send(data)
      } else {
        xhr.send(JSON.stringify(data))
      }
    })
  }
}

export default HTTPTransport

type PlainObject<T = unknown> = {
  [key: string]: T
}

export const trim = (value: string, chars?: string): string => {
  if (!chars) {
    return value.trim()
  }

  const reg = new RegExp(`[${chars}]`, 'gi')
  return value.replace(reg, '')
}

export function isPlainObject(value: unknown): value is PlainObject {
  return (
    typeof value === 'object' &&
    value !== null &&
    value.constructor === Object &&
    Object.prototype.toString.call(value) === '[object Object]'
  )
}

export function isArray(value: unknown): value is [] {
  return Array.isArray(value)
}

function isArrayOrObject(value: unknown): value is [] | PlainObject {
  return isPlainObject(value) || isArray(value)
}

function merge(lhs: PlainObject, rhs: PlainObject): PlainObject {
  for (let p in rhs) {
    if (!rhs.hasOwnProperty(p)) {
      continue
    }

    try {
      if ((rhs[p] as PlainObject).constructor === Object) {
        rhs[p] = merge(lhs[p] as PlainObject, rhs[p] as PlainObject)
      } else {
        lhs[p] = rhs[p]
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error) {
      lhs[p] = rhs[p]
    }
  }

  return lhs
}

export function set(object: PlainObject, path: string, value: unknown): PlainObject | unknown {
  if (!isPlainObject(object)) {
    return object
  }

  if (typeof path !== 'string') {
    throw new Error('Path must be a string')
  }

  const keys = path.split('.')
  const result = keys.reduceRight(
    (acc, key) => ({
      [key]: acc,
    }),
    value as any
  )

  return merge(object, result)
}

export function isEqual(lhs: PlainObject, rhs: PlainObject) {
  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false
  }

  for (const [key, value] of Object.entries(lhs)) {
    const rightValue = rhs[key]
    if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
      if (isEqual(value as PlainObject, rightValue as PlainObject)) {
        continue
      }
      return false
    }

    if (value !== rightValue) {
      return false
    }
  }

  return true
}

export function cloneDeep<T extends object = object>(obj: T) {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }

  let result = Array.isArray(obj) ? [] : {}

  for (let k in obj) {
    ;(result as T)[k] = cloneDeep((obj as any)[k])
  }

  return result as T
}

export function getKey(key: string, parentKey?: string) {
  return parentKey ? `${parentKey}[${key}]` : key
}

export function getParams(data: PlainObject | [], parentKey?: string) {
  const result: [string, string][] = []

  for (const [key, value] of Object.entries(data)) {
    if (isArrayOrObject(value)) {
      result.push(...getParams(value, getKey(key, parentKey)))
    } else {
      result.push([getKey(key, parentKey), encodeURIComponent(String(value))])
    }
  }

  return result
}

export function queryStringify(data: PlainObject) {
  if (!isPlainObject(data)) {
    throw new Error('input must be an object')
  }

  return getParams(data)
    .map(arr => arr.join('='))
    .join('&')
}

export const isEmpty = (value: unknown) => {
  if (value === null || value === undefined) return true
  if (typeof value === 'string' || Array.isArray(value)) return value.length === 0
  if (typeof value === 'object') return Object.keys(value).length === 0
  return false
}

export const convertDataToTime = (timeString?: string) => {
  const date = timeString ? new Date(timeString) : new Date()
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}

export function escapeHTML(str: string): string {
  const div = document.createElement('div')
  div.textContent = str
  return div.innerHTML
}

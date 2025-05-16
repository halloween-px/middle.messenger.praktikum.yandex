import { JSDOM } from 'jsdom'

const jsdom = new JSDOM('<!DOCTYPE html><html><body><div class="app"></div></body></html>', {
  url: 'https://example.org',
})

global.window = jsdom.window
global.document = jsdom.window.document
global.XMLHttpRequest = jsdom.window.XMLHttpRequest
global.FormData = window.FormData

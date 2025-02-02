import { ErrorTemplate } from './error.tmpl'
import './error.scss'
import { Block } from '../../lib/block'

class ErrorPage extends Block {
  constructor() {
    super()
  }

  render() {
    return this.compile(ErrorTemplate, {
      error: 404,
      description: 'Не туда попали',
    })
  }
}

export default ErrorPage

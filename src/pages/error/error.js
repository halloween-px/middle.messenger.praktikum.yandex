import { ErrorTemplate } from './error.tmpl'
import Handlebars from 'handlebars'
import './error.scss'

class ErrorPage {
  constructor({ error, description }) {
    this.props = {
      error,
      description,
    }
  }

  render() {
    const template = Handlebars.compile(ErrorTemplate)
    return template(this.props)
  }
}

export default ErrorPage

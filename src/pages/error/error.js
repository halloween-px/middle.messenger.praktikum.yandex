import { ErrorTemplate } from './error.tmpl'
import Handlebars from 'handlebars'
import './error.scss'

class ErrorPage {
  constructor({ content, error, description }) {
    this.content = content
    this.props = {
      error,
      description,
    }

    this.render()
  }

  render() {
    const template = Handlebars.compile(ErrorTemplate)
    this.content.innerHTML = template(this.props)
  }
}

export default ErrorPage

import { ButtonTemplate } from './button.tmpl'
import Handlebars from 'handlebars'

class Button {
  constructor({ className, label }) {
    this.label = label
    this.className = className
  }

  render() {
    const template = Handlebars.compile(ButtonTemplate)
    return template({ label: this.label, className: this.className })
  }
}

export default Button

import Handlebars from 'handlebars'
import { InputTemplate } from './input.tmpl'
import './input.scss'

class Input {
  constructor({ name, type, isRequired = true, label, id }) {
    this.name = name
    this.type = type
    this.isRequired = isRequired
    this.label = label
    this.id = id
  }

  render() {
    const templateInput = Handlebars.compile(InputTemplate)
    return templateInput({
      name: this.name,
      type: this.type,
      isRequired: this.isRequired,
      label: this.label,
      id: this.id,
    })
  }
}

export default Input

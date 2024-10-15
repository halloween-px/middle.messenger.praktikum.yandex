import Handlebars from 'handlebars'
import {
  InputFloatingLabelTempalte,
  InputGroupTemplate,
  InputTemplate,
} from './input.tmpl'
import './input.scss'

export class Input {
  constructor({ name, type, isRequired = true, isReadonly, label, id, value }) {
    this.name = name
    this.type = type
    this.isRequired = isRequired
    this.isReadonly = isReadonly
    this.label = label
    this.id = id
    this.value = value
    this.templateInput = Handlebars.compile(InputTemplate)
  }

  render() {
    return this.templateInput({
      name: this.name,
      type: this.type,
      isRequired: this.isRequired,
      isReadonly: this.isReadonly,
      label: this.label,
      id: this.id,
      value: this.value,
    })
  }
}

export class InputFloatingLabel extends Input {
  constructor(props) {
    super(props)
    this.templateInput = Handlebars.compile(InputFloatingLabelTempalte)
  }
}

export class InputGroup extends Input {
  constructor(props) {
    super(props)
    this.templateInput = Handlebars.compile(InputGroupTemplate)
  }
}

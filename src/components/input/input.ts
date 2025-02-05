import {
  InputCheckTemplate,
  InputFileTemplate,
  InputFloatingLabelTempalte,
  InputGroupTemplate,
  InputSearchTemplate,
  InputTemplate,
} from './input.tmpl'
import './input.scss'
import { Block, BlockProps } from '../../lib/block'
import { ValidatorType } from '../../utils/validators'

interface InputProps extends BlockProps {
  name: string
  type: string
  isRequired?: boolean
  isReadonly?: boolean
  label?: string
  id: string
  value?: string
  className?: string
  placeholder?: string
  validators?: ValidatorType
}

export class Input extends Block {
  constructor(props: InputProps) {
    super({
      ...props,
    })
    this._addListener()
  }

  private _addListener() {
    if (!this.props.validators) return
    const input =
      this.getContent().tagName === 'INPUT'
        ? (this.getContent() as HTMLInputElement)
        : (this.getContent().querySelector('input') as HTMLInputElement)

    if (input) {
      input.addEventListener('blur', () => {
        if (input.value === '') return
        const error = this.props.validators[input.name](input.value)
        this._showError(error)
      })

      input.addEventListener('input', () => {
        const error = this.props.validators[input.name](input.value)
        if (!error) this._showError(error)
      })
    }
  }

  _showError(error: string | null) {
    const content = this.getContent()
    const errorElement = content.querySelector('.error-message') as HTMLElement
    if (errorElement) {
      error ? content.classList.add('form-error') : content.classList.remove('form-error')
      errorElement.textContent = error || ''
    }
  }

  render() {
    return this.compile(InputTemplate, this.props)
  }
}

export class InputFloatingLabel extends Input {
  constructor(props: InputProps) {
    super(props)
  }

  render() {
    return this.compile(InputFloatingLabelTempalte, this.props)
  }
}

export class InputGroup extends Input {
  constructor(props: InputProps) {
    super(props)
  }

  render() {
    return this.compile(InputGroupTemplate, this.props)
  }
}

export class InputSearch extends Input {
  constructor(props: InputProps) {
    super(props)
  }

  render() {
    return this.compile(InputSearchTemplate, this.props)
  }
}

export class InputFile extends Input {
  constructor(props: InputProps) {
    super(props)
  }

  render() {
    return this.compile(InputFileTemplate, this.props)
  }
}

export class InputCheckBox extends Input {
  constructor(props: InputProps) {
    super(props)
  }

  render() {
    return this.compile(InputCheckTemplate, this.props)
  }
}

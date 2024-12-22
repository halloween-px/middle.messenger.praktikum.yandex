import { FormMessageTemaplte, TemplateForm } from './form.tmpl'
import './form.scss'
import { Block, BlockProps } from '../../lib/block'
import { Input } from '../input/input'
import { ValidatorType } from '../../utils/validators'

interface Props extends BlockProps {
  classNames?: string
  inputs?: Block[]
  title?: string
  buttons?: Block[]
  validators?: ValidatorType
  onSubmit?: (data: Record<string, string>) => void
}

interface FormMessageProps extends Props {
  buttonMedia: Block
  buttonSend: Block
}

class MainForm extends Block {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        submit: e => this._addSubmitListener(e),
      },
    })
  }

  private _addSubmitListener(e: Event) {
    if (!this.props.validators) return
    const element = this.getContent()
    if (!element) return
    e.preventDefault()

    const data = new FormData()
    let isFormValid = true

    this.lists.inputs.forEach((input: Input) => {
      const inputElement =
        input.getContent().tagName === 'INPUT'
          ? (input.getContent() as HTMLInputElement)
          : (input.getContent().querySelector('input') as HTMLInputElement)

      const value = inputElement.value
      const name = inputElement.name
      const error = this.props.validators[name](value)

      if (error) {
        input._showError(error)
        isFormValid = false
      } else {
        data.append(name, value)
      }
    })

    if (isFormValid) {
      console.log(Object.fromEntries(data.entries()))

      if (this.props.onSubmit) {
        this.props.onSubmit(data)
      }
    }
  }

  render() {
    return this.compile(TemplateForm, this.props)
  }
}

export class FormMessage extends MainForm {
  constructor(props: FormMessageProps) {
    super(props)
  }

  render(): HTMLElement {
    return this.compile(FormMessageTemaplte, this.props)
  }
}

export default MainForm

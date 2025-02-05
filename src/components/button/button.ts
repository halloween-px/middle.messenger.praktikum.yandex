import { ButtonTemplate } from './button.tmpl'
import './button.scss'
import { Block, BlockProps } from '../../lib/block'

type variantBtn = 'btn-primary' | 'btn-link' | 'btn-link-plain' | 'btn-text-sm' | (string & {})

export interface ButtonProps extends BlockProps {
  className?: variantBtn
  icon?: string
  label?: string | Block
  type?: string
}

class Button extends Block {
  constructor(props: ButtonProps) {
    super(props)
  }

  render() {
    return this.compile(ButtonTemplate, this.props)
  }
}

export default Button

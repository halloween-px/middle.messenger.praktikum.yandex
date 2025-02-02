import { Block, BlockProps } from '../../lib/block'
import { PopoverTemplate } from './popover.tmpl'
import './popover.scss'

export interface PopoverType extends BlockProps {
  content: Block | string | Block[]
  className?: string
}

export class Popover extends Block {
  constructor(props: PopoverType) {
    super(props)
  }

  render() {
    return this.compile(PopoverTemplate, this.props)
  }
}

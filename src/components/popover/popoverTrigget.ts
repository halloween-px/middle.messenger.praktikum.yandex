import { Block, BlockProps } from '../../lib/block'
import { renderDOM } from '../../utils/renderDom'
import { PopoverTriggerTemplate } from './popover.tmpl'
import { Popovers, PopoversType } from './popovers'

interface PopoverTriggerType extends BlockProps {
  child?: Block | string
  label?: string
  popover: keyof PopoversType
  offsetX?: number
  offsetY?: number
}

export class PopoverTrigger extends Block {
  constructor(props: PopoverTriggerType) {
    let open = false
    super({
      ...props,
      events: {
        ...props.events,
        click: e => {
          if (!props.popover && !Popovers[props.popover]) return
          if (open) return
          open = true

          const target = e.target as HTMLElement
          const popover = Popovers[props.popover]()
          renderDOM('body', popover)

          const offsetX = props.offsetX || 12
          const offsetY = props.offsetY || 12
          const { x, y, height } = target.getBoundingClientRect()
          const popoverContent = popover.getContent()
          const popoverWidth = popoverContent.clientWidth
          const popoverHeight = popoverContent.clientHeight

          let popoverX = x
          let popoverY = y + height + offsetY

          if (x + popoverWidth > window.innerWidth) {
            popoverX = window.innerWidth - popoverWidth - offsetX
          }

          if (y + height + popoverHeight > window.innerHeight) {
            popoverY = y - popoverHeight - offsetY
          }

          popoverContent.style.left = popoverX + 'px'
          popoverContent.style.top = popoverY + 'px'

          setTimeout(() => {
            popoverContent.addEventListener('click', e => e.stopPropagation())
            document.addEventListener(
              'click',
              () => {
                popoverContent.remove()
                open = false
              },
              { once: true }
            )
          }, 0)
        },
      },
    })
  }

  render() {
    return this.compile(PopoverTriggerTemplate, this.props)
  }
}

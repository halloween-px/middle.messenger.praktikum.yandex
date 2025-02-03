import { v4 as uuidv4 } from 'uuid'
import EventBus from './eventBus'
import Handlebars from 'handlebars'

interface Events {
  [key: string]: (e: Event) => void
}

export type BlockProps = {
  events?: Events
  [key: string]: any
}

export class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  }

  private _id: string
  private _element: HTMLElement | null = null
  private _meta: {
    tagName: string | null
    props: BlockProps
  }

  settings: {
    withInternalID?: boolean
  }

  children: Record<string, Block>
  lists: Record<string, any>
  props: BlockProps
  eventBus: () => EventBus

  constructor(propsAndChildren: BlockProps = {}, tagName: string | null = null) {
    const eventBus = new EventBus()
    const { children, props, lists } = this._getChildrenAndProps(propsAndChildren)

    this._meta = {
      tagName,
      props,
    }

    this._id = uuidv4()
    this.settings = propsAndChildren.settings || {}
    this.children = children
    this.lists = { ...lists }
    this.props = { ...props }
    this.eventBus = () => eventBus

    this._registerEvents(eventBus)
    eventBus.emit(Block.EVENTS.INIT)
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this))
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this))
  }

  private _createResources() {
    const { tagName } = this._meta
    if (!tagName) return

    this._element = this._createDocumentElement(tagName)
  }

  private _render() {
    this._element = this.render() as HTMLElement
    this._removeEvents()
    this._addEvents()
  }

  private _getChildrenAndProps(propsAndChildren: BlockProps) {
    const children: Record<string, Block> = {}
    const props: BlockProps = {}
    const lists: Record<string, any> = {}

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value
      } else if (Array.isArray(value)) {
        lists[key] = value
      } else {
        props[key] = value
      }
    })

    return { children, props, lists }
  }

  private _createDocumentElement(tagName: string): HTMLElement {
    const element = document.createElement(tagName)
    if (this.settings.withInternalID) {
      element.setAttribute('data-id', this._id)
    }
    return element
  }

  private _componentDidUpdate(oldProps: BlockProps = {}, newProps: BlockProps) {
    const response = this.componentDidUpdate(oldProps, newProps)
    if (!response) return
    this._render()
  }

  private _componentDidMount() {
    this.componentDidMount()

    Object.values(this.children).forEach(child => {
      child.dispatchComponentDidMoun()
    })

    Object.values(this.lists).forEach(list => {
      list.dispatchComponentDidMoun()
    })
  }

  private _makePropsProxy(props: BlockProps): BlockProps {
    const self = this

    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop]
        return typeof value === 'function' ? value.bind(target) : value
      },
      set(target, prop: string, value) {
        const oldValue = { ...target }
        target[prop] = value
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldValue, target)
        return true
      },
      deleteProperty(target, prop) {
        delete target[prop as string]
        return true
      },
    })
  }

  private _addEvents() {
    const { events = {} } = this.props

    Object.keys(events).forEach(eventName => {
      this._element?.addEventListener(eventName, events[eventName])
    })
  }

  private _removeEvents() {
    const { events = {} } = this.props

    Object.keys(events).forEach(eventName => {
      this._element?.removeEventListener(eventName, events[eventName])
    })
  }

  componentDidMount() {}

  componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): boolean {
    console.log(oldProps, newProps)
    return true
  }

  dispatchComponentDidMoun(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM)
  }

  compile(template: string, props: BlockProps): HTMLElement {
    const propsAndStumbs = { ...props }
    const tempId = Math.floor(100000 + Math.random() * 900000)

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStumbs[key] = `<div data-id="${child?._id}"></div>`
    })

    Object.keys(this.lists).forEach(key => {
      propsAndStumbs[key] = `<div data-id="list_${tempId}"></div>`
    })

    const fragment = this._createDocumentElement('template') as HTMLTemplateElement
    fragment.innerHTML = Handlebars.compile(template)(propsAndStumbs)

    Object.values(this.children).forEach((child: Block) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`)
      stub?.replaceWith(child.getContent())
    })

    Object.values(this.lists).forEach(lists => {
      const listContent = this._createDocumentElement('template') as HTMLTemplateElement

      lists.forEach((item: string | Block | number) => {
        if (item instanceof Block) {
          listContent.content.append(item.getContent())
        } else {
          listContent.content.append(document.createTextNode(String(item)))
        }
      })

      const stub = fragment.content.querySelector(`[data-id="list_${tempId}"]`)

      if (stub) {
        stub.replaceWith(listContent.content)
      }
    })

    let newElement = fragment.content.firstElementChild as HTMLElement

    if (this._element && newElement) {
      this._element.replaceWith(newElement)
    }

    return newElement
  }

  get element(): HTMLElement | null {
    return this._element
  }

  init() {
    this._createResources()
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
  }

  render(): string | HTMLElement {
    return ''
  }

  setProps = (nextProps: BlockProps) => {
    if (!nextProps) return
    const oldProps = { ...this.props }

    this.props = {
      ...this.props,
      ...nextProps,
    }

    this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, this.props)
  }

  setLists = (nextLists: BlockProps) => {
    if (!nextLists) return
    Object.assign(this.lists, nextLists)
  }

  getContent(): HTMLElement {
    if (!this._element) {
      throw new Error('Element is not created')
    }

    return this._element
  }

  show() {
    const content = this.getContent()
    if (content && content.classList.contains('d-none')) {
      content.classList.remove('d-none')
    }
  }

  hide() {
    const content = this.getContent()
    if (content) {
      content.classList.add('d-none')
    }
  }
}

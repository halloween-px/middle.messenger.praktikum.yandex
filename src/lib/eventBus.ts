class EventBus {
  listeners: Record<string, Function[]>

  constructor() {
    this.listeners = {}
  }

  on(event: string, callback: Function) {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }

    this.listeners[event].push(callback)
  }

  off(event: string, callback: Function) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`)
    }
    this.listeners[event] = this.listeners[event].filter(c => c !== callback)
  }

  emit(event: string, ...args: any) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`)
    }

    this.listeners[event].forEach(listener => listener(...args))
  }
}

export default EventBus

import EventBus from '../lib/eventBus'

export enum EventWSTransport {
  Error = 'Error',
  Connected = 'Connected',
  Close = 'Close',
  Message = 'Message',
}

export interface MessageIncomingType {
  content: string
  type: string
  userId: number
  id: number
  time: string
}

export interface MessageOutgoingType {
  content: string
  type: string
}

export class WSTransport extends EventBus {
  url: string
  socket: WebSocket | undefined
  pingIntervalTime: number = 3000
  pingInterval: NodeJS.Timeout | undefined

  constructor(url: string) {
    super()

    this.url = url
  }

  connect(): Promise<void> {
    this.socket = new WebSocket(this.url)

    this._subscribe(this.socket)
    this._setupPing()

    return new Promise((resolve, reject) => {
      // Выполняется синхронно! Когда выполнется open || error запустится наша функция, она же выполнит resolve
      this.on(EventWSTransport.Error, reject)
      this.on(EventWSTransport.Connected, () => {
        this.off(EventWSTransport.Error, reject)
        resolve()
      })
    })
  }

  send(data: unknown | MessageOutgoingType) {
    if (!this.socket) {
      throw new Error('Socket is no connected')
    }

    this.socket.send(JSON.stringify(data))
  }

  close() {
    this.socket?.close()
    clearInterval(this.pingInterval)
  }

  _setupPing() {
    this.pingInterval = setInterval(() => {
      this.send({ type: 'ping' })
    }, this.pingIntervalTime)

    this.on(EventWSTransport.Close, () => {
      clearInterval(this.pingInterval)
      this.pingInterval = undefined
    })
  }

  _subscribe(socket: WebSocket) {
    socket.addEventListener('open', () => {
      this.emit(EventWSTransport.Connected)
    })
    socket.addEventListener('close', () => {
      this.emit(EventWSTransport.Close)
    })
    socket.addEventListener('error', e => {
      this.emit(EventWSTransport.Error, e)
    })
    socket.addEventListener('message', message => {
      try {
        const data = JSON.parse(message.data)

        if (['pong', 'user connected'].includes(data?.type)) {
          return
        }

        this.emit(EventWSTransport.Message, data as MessageIncomingType)
      } catch (error) {}
    })
  }
}

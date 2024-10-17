import Handlebars from 'handlebars'
class Chat {
  constructor({ content }) {
    this.content = content

    this.render()
  }

  render() {
    this.content.innerHTML = Handlebars.compile(`Заглушка`)({})
  }
}

export default Chat

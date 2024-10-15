import Handlebars from 'handlebars'
import { HomeTemplate } from './home.tmpl'

class Home {
  constructor({ content }) {
    this.content = content

    this.render()
  }

  render() {
    this.content.innerHTML = Handlebars.compile(HomeTemplate)({})
  }
}

export default Home

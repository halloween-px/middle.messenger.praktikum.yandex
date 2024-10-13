import Handlebars from 'handlebars'
import { HomeTemplate } from './home.tmpl'

class Home {
  render() {
    const template = Handlebars.compile(HomeTemplate)
    return template({})
  }
}

export default Home

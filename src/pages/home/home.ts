import { Block } from '../../lib/block'
import { HomeTemplate } from './home.tmpl'

class Home extends Block {
  constructor(props: {}) {
    super(props)
  }

  render() {
    return this.compile(HomeTemplate, this.props)
  }
}

export default Home

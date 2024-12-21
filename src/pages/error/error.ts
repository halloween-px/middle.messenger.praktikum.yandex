import { ErrorTemplate } from './error.tmpl'
import './error.scss'
import { Block } from '../../lib/block'

interface ErrorProps {
  error: string
  description: string
}

class ErrorPage extends Block {
  constructor(props: ErrorProps) {
    super(props)
  }

  render() {
    return this.compile(ErrorTemplate, this.props)
  }
}

export default ErrorPage

import Handlebars from 'handlebars'
import { TemplateForm } from './form.tmpl'
import './form.scss'

class MainForm {
  constructor({ classNames, inputs, title, buttons }) {
    this.classNames = classNames
    this.inputs = inputs
    this.title = title
    this.buttons = buttons
  }

  render() {
    const temaplate = Handlebars.compile(TemplateForm)
    return temaplate({
      classNames: this.classNames,
      inputs: this.inputs,
      title: this.title,
      buttons: this.buttons,
    })
  }
}

export default MainForm

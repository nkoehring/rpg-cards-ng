import { ToolConstructable } from '@editorjs/editorjs'
import ContentlessBlock from './contentless-block'
import icon from '../assets/editor/delimiter.svg.txt'
const title = 'Delimiter'

export class Delimiter extends ContentlessBlock {
  protected get _CSS () {
    return {
      block: this.api.styles.block,
      wrapper: 'card-delimiter'
    }
  }

  protected _render (): HTMLElement {
    const el = document.createElement('HR')
    el.classList.add(this._CSS.wrapper, this._CSS.block)
    return el
  }

  static get toolbox () {
    return { icon, title }
  }
}

export default Delimiter as ToolConstructable

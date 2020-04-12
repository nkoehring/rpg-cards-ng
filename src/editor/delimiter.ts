import { ContentlessBlock, BlockToolArgs } from './contentless-block'
import icon from '../assets/editor/delimiter.svg.txt'
import iconR from '../assets/editor/delimiter_r.svg.txt'
import iconL from '../assets/editor/delimiter_l.svg.txt'
const title = 'Delimiter'

class Delimiter extends ContentlessBlock {
  constructor (args: BlockToolArgs) {
    super(args)
    this._settingButtons = [
      { name: 'straight', icon, action: (name: string) => this.setDelimiterType(name) },
      { name: 'pointing-left', icon: iconL, action: (name: string) => this.setDelimiterType(name) },
      { name: 'pointing-right', icon: iconR, action: (name: string) => this.setDelimiterType(name) }
    ]
  }

  private setDelimiterType (name: string) {
    this._element.classList.remove('pointing-left')
    this._element.classList.remove('pointing-right')

    if (name === 'pointing-left' || name === 'pointing-right') {
      this._element.classList.add(name)
    }
  }

  protected _render (): HTMLElement {
    const el = document.createElement('HR')
    el.classList.add('card-delimiter', this._CSS.block)
    return el
  }

  static get toolbox () {
    return { icon, title }
  }
}

export default Delimiter

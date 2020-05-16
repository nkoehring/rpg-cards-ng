import { ContentlessBlock, BlockToolArgs } from './contentless-block'
import icon from '../assets/editor/delimiter.svg.txt'
import iconR from '../assets/editor/delimiter_r.svg.txt'
import iconL from '../assets/editor/delimiter_l.svg.txt'
const title = 'Delimiter'

interface DelimiterData {
  variant: string;
}

class Delimiter extends ContentlessBlock {
  private _variant = 'none'

  constructor (args: BlockToolArgs) {
    super(args)
    this._settingButtons = [
      { name: 'straight', icon, action: (name: string) => this.setDelimiterType(name) },
      { name: 'pointing-left', icon: iconL, action: (name: string) => this.setDelimiterType(name) },
      { name: 'pointing-right', icon: iconR, action: (name: string) => this.setDelimiterType(name) }
    ]
    const { variant } = (args.data || {}) as DelimiterData
    if (variant) this.setDelimiterType(variant)
  }

  private setDelimiterType (name: string) {
    this._element.classList.remove('pointing-left')
    this._element.classList.remove('pointing-right')
    this._variant = 'none'

    if (name === 'pointing-left' || name === 'pointing-right') {
      this._variant = name
      this._element.classList.add(name)
    }
  }

  protected _render (): HTMLElement {
    const el = document.createElement('HR')
    el.classList.add('card-delimiter', this._CSS.block)
    return el
  }

  public save (): DelimiterData {
    return {
      variant: this._variant
    }
  }

  static get toolbox () {
    return { icon, title }
  }
}

export default Delimiter

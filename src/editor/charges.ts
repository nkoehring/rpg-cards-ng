import { ContentlessBlock, BlockToolArgs } from './contentless-block'
import icon from '../assets/editor/charges.svg.txt'
import iconCircle from '../assets/editor/charges-circle.svg.txt'

const title = 'Charges'

interface ChargesData {
  variant: string;
  amount: number;
  size: number;
  stretch: boolean;
}

class Charges extends ContentlessBlock {
  static MIN_SIZE = 1
  static MAX_SIZE = 5
  private _variant: string
  private _amount: number
  private _size: number
  private _stretch: boolean

  constructor (args: BlockToolArgs) {
    super(args)
    console.log('new charges', args)
    this._settingButtons = [
      { name: 'box', icon, action: (name: string) => this.setVariant(name) },
      { name: 'more', icon: icon, action: () => this.increaseAmount() },
      { name: 'bigger', icon: icon, action: () => this.increaseSize() },
      { name: 'circle', icon: iconCircle, action: (name: string) => this.setVariant(name) },
      { name: 'less', icon: icon, action: () => this.decreaseAmount() },
      { name: 'smaller', icon: icon, action: () => this.decreaseSize() },
      { name: 'toggle-stretch', icon: icon, action: () => this.toggleStretch() }
    ]
    const { variant, amount, size, stretch } = (args.data || {}) as ChargesData

    this._variant = variant || 'box'
    this._amount = amount || 5
    this._size = size || 1
    this._stretch = !(stretch === false)

    this._element = this._render()
  }

  private setVariant (variant: string) {
    if (this._variant === variant) return

    const charges = Array.from(this._element.children)

    charges.forEach(charge => {
      charge.classList.remove(`card-charge-${this._variant}`)
      charge.classList.add(`card-charge-${variant}`)
    })

    this._variant = variant
  }

  private toggleStretch () {
    if (this._stretch) this._element.classList.remove('card-charges-stretch')
    else this._element.classList.add('card-charges-stretch')
    this._stretch = !this._stretch
  }

  private createCharge (): HTMLElement {
    const charge = document.createElement('DIV')
    charge.classList.add('card-charge', `card-charge-${this._variant}`, `card-charge-size-${this._size}`)
    return charge
  }

  private increaseAmount () {
    this._element.appendChild(this.createCharge())
    this._amount++
  }

  private decreaseAmount () {
    const child = this._element.lastElementChild
    if (child) {
      this._element.removeChild(child)
      this._amount--
    }
  }

  private increaseSize () {
    if (this._size >= Charges.MAX_SIZE) return

    const charges = Array.from(this._element.children)

    charges.forEach(charge => {
      charge.classList.remove(`card-charge-size-${this._size}`)
      charge.classList.add(`card-charge-size-${this._size + 1}`)
    })

    this._size++
  }

  private decreaseSize () {
    if (this._size <= Charges.MIN_SIZE) return

    const charges = Array.from(this._element.children)

    charges.forEach(charge => {
      charge.classList.remove(`card-charge-size-${this._size}`)
      charge.classList.add(`card-charge-size-${this._size - 1}`)
    })

    this._size--
  }

  protected _render (): HTMLElement {
    const el = document.createElement('DIV')
    el.classList.add('card-charges-wrapper', this._CSS.block)

    if (this._stretch) el.classList.add('card-charges-stretch')

    for (let i = 0; i < this._amount; i++) {
      el.appendChild(this.createCharge())
    }

    console.log('rendered', this._amount, 'charges', el)

    return el
  }

  public save (): ChargesData {
    return {
      variant: this._variant,
      amount: this._amount,
      size: this._size,
      stretch: this._stretch
    }
  }

  static get toolbox () {
    return { icon, title }
  }
}

export default Charges

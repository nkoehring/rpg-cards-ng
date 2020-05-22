import { ContentlessBlock, BlockToolArgs } from './contentless-block'
import icon from '../assets/editor/charges-circle.svg.txt'

const title = 'DnDStats'

interface DnDStatsData {
  text: string;
}

class DnDStats extends ContentlessBlock {
  static _toolboxConfig = { icon, title }
  private _stats = [10, 10, 10, 10, 10, 10]

  constructor (args: BlockToolArgs) {
    super(args)
    this.data = args.data as DnDStatsData
    this._element = this._render()
  }

  public get data () {
    return {
      text: this._stats.join(',')
    }
  }

  public set data (data: DnDStatsData) {
    if (data.text === undefined) data.text = ''

    const newStats = data.text.split(',')
      .map(x => parseInt(x, 10))
      .filter(x => !Number.isNaN(x))

    while (newStats.length < 6) newStats.push(10) // fill missing stats

    this._stats = newStats
  }

  // creates a random four character long id
  private randomId (): string {
    const min = 46656 // '1000'
    const max = 1679615 /* 'zzzz' */ - 46656 /* '1000' */
    return (min + Math.floor(max * Math.random())).toString(36)
  }

  private renderStatMod (value: number): string {
    const mod = Math.floor((value - 10) / 2.0)
    const sign = mod < 0 ? '' : '+'
    return ` (${sign}${mod})`
  }

  private createStatBlock (title: string, value: number, changeHandler: (newValue: number) => void): HTMLElement {
    const id = `dnd-stat-${title}-${this.randomId()}`

    const labelWrapper = document.createElement('label')
    const titleEl = document.createElement('span')
    const statInputEl = document.createElement('input')
    const statModEl = document.createElement('span')

    // should allow focussing block with tab
    labelWrapper.setAttribute('z-index', '1')
    labelWrapper.classList.add('dnd-stat-block')
    labelWrapper.setAttribute('for', id)

    titleEl.classList.add('dnd-stat-title')
    titleEl.innerText = title

    statInputEl.id = id
    statInputEl.value = `${value}`
    statInputEl.addEventListener('input', () => {
      const value = parseInt(statInputEl.value, 10)
      statModEl.innerText = this.renderStatMod(value)
      changeHandler(value)
    })

    statModEl.innerText = this.renderStatMod(value)

    labelWrapper.appendChild(titleEl)
    labelWrapper.appendChild(statInputEl)
    labelWrapper.appendChild(statModEl)

    return labelWrapper
  }

  protected _render (): HTMLElement {
    const el = document.createElement('div')
    el.classList.add('card-dnd-stats')
    const stats = this._stats || [10, 10, 10, 10, 10, 10]
    const titles = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA']

    stats.forEach((stat, i) => {
      const title = titles[i]
      const block = this.createStatBlock(title, stat, newValue => {
        this._stats[i] = newValue
      })
      el.appendChild(block)
    })

    return el
  }

  public save (): DnDStatsData {
    return this.data
  }
}

export default DnDStats

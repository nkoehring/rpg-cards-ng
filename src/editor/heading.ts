import {
  ContentBlock,
  ContentBlockArgs,
  ContentBlockConfig,
  ContentBlockData,
  HTMLPasteEvent
} from './content-block'

import icon from '../assets/editor/header.svg.txt'
import icon1 from '../assets/editor/header1.svg.txt'
import icon2 from '../assets/editor/header2.svg.txt'
import icon3 from '../assets/editor/header3.svg.txt'
import icon4 from '../assets/editor/header4.svg.txt'
import icon5 from '../assets/editor/header5.svg.txt'
import icon6 from '../assets/editor/header6.svg.txt'

const title = 'Heading'

enum HeadingLevel {
  One = 1,
  Two = 2,
  Three = 3,
  Four = 4,
  Five = 5,
  Six = 6
}

const icons = [null, icon1, icon2, icon3, icon4, icon5, icon6]

interface HeadingConfig extends ContentBlockConfig {
  placeholder?: string;
  levels?: HeadingLevel[];
  defaultLevel?: HeadingLevel;
}

interface HeaderData extends ContentBlockData {
  text: string;
  level?: HeadingLevel;
}

class Heading extends ContentBlock {
  static _supportedTags = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6']
  static _toolboxConfig = { icon, title }

  protected _config: HeadingConfig
  private defaultLevel: HeadingLevel
  private currentLevel: HeadingLevel

  constructor (args: ContentBlockArgs) {
    super(args)
    this._config = args.config as HeadingConfig

    if (this._config.levels === undefined) {
      this._config.levels = [HeadingLevel.Two, HeadingLevel.Three]
    }
    if (this._config.defaultLevel === undefined) {
      this._config.defaultLevel = HeadingLevel.Two
    }
    if (this._config.levels.indexOf(this._config.defaultLevel) === -1) {
      console.warn('(ง\'̀-\'́)ง Heading Tool: the default level specified was not found in available levels')
    }
    this.defaultLevel = this._config.defaultLevel
    this.currentLevel = this.defaultLevel

    // setting data will rerender the element with the right settings
    this.data = {
      level: this.currentLevel,
      text: (args.data as HeaderData).text || ''
    }

    this._settingButtons = this._config.levels.map(level => {
      return {
        name: `H${level}`,
        icon: icons[level] || icon,
        action: (name: string) => this.setLevel(name),
        isActive: (name: string): boolean => this.isCurrentLevel(name)
      }
    })
  }

  public get data () {
    return this._data
  }

  public set data (data: HeaderData) {
    const currentData = this._data as HeaderData

    if (data.level === undefined) data.level = currentData.level || this.defaultLevel
    if (data.text === undefined) data.text = currentData.text || ''

    this._data = data
    this.currentLevel = data.level

    const newHeader = this._render()
    if (this._element.parentNode) {
      this._element.parentNode.replaceChild(newHeader, this._element)
    }
    this._element = newHeader
  }

  private isCurrentLevel (name: string): boolean {
    const currentLevel = `H${this.currentLevel}`
    return name === currentLevel
  }

  private setLevel (name: string) {
    const level = parseInt(name[1], 10)
    this.data = { level, text: this._element.innerHTML }
  }

  protected _render (): HTMLElement {
    const el = document.createElement(`H${this.currentLevel}`)
    el.innerHTML = this.data.text || ''
    el.classList.add(this._CSS.block)
    el.contentEditable = 'true'
    el.dataset.placeholder = this._config.placeholder || ''
    return el
  }

  // Handle pasted H1-H6 tags to substitute with header tool
  public onPaste (event: HTMLPasteEvent) {
    const content = event.detail.data
    const text = content.innerHTML
    let level = this.defaultLevel

    const tagMatch = content.tagName.match(/H(\d)/)
    if (tagMatch) level = parseInt(tagMatch[1], 10)

    // Fallback to nearest level when specified not available
    if (this._config.levels) {
      level = this._config.levels.reduce((prevLevel, currLevel) => {
        return Math.abs(currLevel - level) < Math.abs(prevLevel - level) ? currLevel : prevLevel
      })
    }

    this.data = { level, text }
  }

  // Method that specified how to merge two Text blocks.
  // Called by Editor.js by backspace at the beginning of the Block
  public merge (data: HeaderData) {
    this.data = {
      text: this.data.text + (data.text || ''),
      level: this.data.level
    }
  }

  // extract tools data from view
  public save (toolsContent: HTMLElement): HeaderData {
    return {
      text: toolsContent.innerHTML,
      level: this.currentLevel
    }
  }

  static get sanitize () {
    return { level: {} }
  }
}

export default Heading

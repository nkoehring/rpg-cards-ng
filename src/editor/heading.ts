import { ToolConstructable, ToolConfig, HTMLPasteEvent } from '@editorjs/editorjs'
import { BlockToolExt, BlockToolArgs } from './block-tool'
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

interface HeaderConfig extends ToolConfig {
  placeholder?: string;
  levels?: HeadingLevel[];
  defaultLevel?: HeadingLevel;
}

interface HeaderData {
  text?: string;
  level?: HeadingLevel;
}

class Heading extends BlockToolExt {
  protected _config: HeaderConfig
  protected settingsButtons: HTMLElement[] = []
  private levels: HeadingLevel[]
  private defaultLevel: HeadingLevel
  private currentLevel: HeadingLevel
  private icons: Map<HeadingLevel, string> = new Map([
    [HeadingLevel.One, icon1],
    [HeadingLevel.Two, icon2],
    [HeadingLevel.Three, icon3],
    [HeadingLevel.Four, icon4],
    [HeadingLevel.Five, icon5],
    [HeadingLevel.Six, icon6]
  ])

  constructor (args: BlockToolArgs) {
    super(args)
    this._config = args.config as HeaderConfig

    if (this._config.levels === undefined) {
      this._config.levels = [HeadingLevel.Two, HeadingLevel.Three]
    }
    if (this._config.defaultLevel === undefined) {
      this._config.defaultLevel = HeadingLevel.Two
    }
    if (this._config.levels.indexOf(this._config.defaultLevel) === -1) {
      console.warn('(ง\'̀-\'́)ง Heading Tool: the default level specified was not found in available levels')
    }
    this.levels = this._config.levels
    this.defaultLevel = this._config.defaultLevel
    this.currentLevel = this.defaultLevel

    // setting data will rerender the element with the right settings
    this.data = {
      level: this.currentLevel,
      text: (args.data as HeaderData).text || ''
    }
  }

  public renderSettings (): HTMLElement {
    const wrapper = document.createElement('DIV')

    this.levels.forEach(level => {
      const { settingsButton, settingsButtonActive } = this._CSS
      const btn = document.createElement('SPAN')
      btn.classList.add(settingsButton)
      btn.dataset.level = `${level}`
      btn.innerHTML = this.icons.get(level) || icon

      if (this.currentLevel === level) btn.classList.add(settingsButtonActive)

      btn.addEventListener('click', () => this.setLevel(level))
      wrapper.appendChild(btn)
      this.settingsButtons.push(btn)
    })

    return wrapper
  }

  public get data (): HeaderData {
    return this._data as HeaderData
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

  private setLevel (level: HeadingLevel) {
    this.data = { level, text: this._element.innerHTML }
  }

  protected get _CSS () {
    return {
      block: this.api.styles.block,
      settingsButton: this.api.styles.settingsButton,
      settingsButtonActive: this.api.styles.settingsButtonActive,
      wrapper: 'card-heading'
    }
  }

  protected _render (): HTMLElement {
    console.log('render', `H${this.currentLevel}`, this.data)

    const el = document.createElement(`H${this.currentLevel}`)
    el.innerHTML = this.data.text || ''
    el.classList.add(this._CSS.wrapper, this._CSS.block)
    el.contentEditable = 'true'
    el.dataset.placeholder = this._config.placeholder || ''
    return el
  }

  // Handle pasted H1-H6 tags to substitute with header tool
  onPaste (event: HTMLPasteEvent) {
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

  // Used by Editor.js paste handling API.
  // Provides configuration to handle H1-H6 tags.
  static get pasteConfig () {
    return {
      tags: ['H1', 'H2', 'H3', 'H4', 'H5', 'H6']
    }
  }

  // Method that specified how to merge two Text blocks.
  // Called by Editor.js by backspace at the beginning of the Block
  public merge (data: HeaderData) {
    this.data = {
      text: this.data.text + (data.text || ''),
      level: this.data.level
    }
  }

  // validate text block data
  validate (blockData: HeaderData): boolean {
    if (!blockData.text) return false
    return blockData.text.trim() !== ''
  }

  // extract tools data from view
  save (toolsContent: HTMLElement): HeaderData {
    return {
      text: toolsContent.innerHTML,
      level: this.currentLevel
    }
  }

  // Allow Heading to be converted to/from other blocks
  static get conversionConfig () {
    return {
      export: 'text', // use 'text' property for other blocks
      import: 'text' // fill 'text' property from other block's export string
    }
  }

  static get sanitize (): object {
    return { level: {} }
  }

  static get toolbox () {
    return { icon, title }
  }
}

export default Heading as ToolConstructable

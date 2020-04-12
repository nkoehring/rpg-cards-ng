import {
  BlockTool,
  BlockToolData,
  ToolboxConfig,
  API,
  HTMLPasteEvent,
  ToolSettings,
  SanitizerConfig
} from '@editorjs/editorjs'

export { HTMLPasteEvent } from '@editorjs/editorjs'

interface PasteConfig {
  tags: string[];
}

export interface ContentBlockConfig extends ToolSettings {
  placeholder?: string;
}

export interface ContentBlockSettingButton {
  name: string;
  icon: string;
  action: (name: string, event?: MouseEvent) => void; // action triggered by button
  isActive?: (name: string) => boolean; // determine if current button is active
}

export type ContentBlockSettings = ContentBlockSettingButton[]

export interface ContentBlockArgs {
  api: API;
  config?: ContentBlockConfig;
  data?: BlockToolData;
}

export interface CSSClasses {
  [key: string]: string;
}

export interface ContentBlockData extends BlockToolData {
  text: string;
}

export class ContentBlock implements BlockTool {
  // Default placeholder for Paragraph Tool
  static get DEFAULT_PLACEHOLDER (): string {
    return ''
  }

  static _supportedTags: string[] = []

  static _toolboxConfig: ToolboxConfig = {
    icon: '<svg></svg>',
    title: 'UnnamedContentPlugin'
  }

  protected _defaultPlaceholder (): string {
    return ContentBlock.DEFAULT_PLACEHOLDER
  }

  protected api: API
  protected _element: HTMLElement
  protected _data: ContentBlockData
  protected _config: ContentBlockConfig
  protected _placeholder: string
  protected _CSS: CSSClasses = {}
  protected onKeyUp: (event: KeyboardEvent) => void
  protected _settingButtons: ContentBlockSettings = []

  constructor ({ data, config, api }: ContentBlockArgs) {
    this.api = api
    this._config = config as ContentBlockConfig
    this._CSS.block = this.api.styles.block

    this.onKeyUp = (event: KeyboardEvent) => this._onKeyUp(event)

    // Placeholder it is first Block
    this._placeholder = config?.placeholder ? config.placeholder : this._defaultPlaceholder()
    this._data = data as ContentBlockData
    this._element = this._render()
  }

  // Check if text content is empty and set empty string to inner html.
  // We need this because some browsers (e.g. Safari) insert <br> into empty contenteditanle elements
  _onKeyUp (event: KeyboardEvent) {
    if (event.code !== 'Backspace' && event.code !== 'Delete') return

    if (this._element.textContent === '') {
      this._element.innerHTML = ''
    }
  }

  // render tool view
  // whenever a redraw is needed the result is saved in this._element
  protected _render (): HTMLElement {
    const el = document.createElement('DIV')
    el.classList.add(this._CSS.block)
    el.dataset.placeholder = this._placeholder
    el.addEventListener('keyup', this.onKeyUp)
    el.innerHTML = this.data.text
    el.contentEditable = 'true'

    return el
  }

  // Return Tool's view
  public render (): HTMLElement {
    return this._element
  }

  // Method that specified how to merge two Text blocks.
  // Called by Editor.js by backspace at the beginning of the Block
  public merge (data: ContentBlockData) {
    this.data = {
      text: this.data.text + data.text
    }
  }

  // Validate Paragraph block data (by default checks for emptiness)
  public validate (savedData: ContentBlockData): boolean {
    if (!savedData.text) return false
    return savedData.text.trim() !== ''
  }

  // Extract Tool's data from the view
  public save (toolsContent: HTMLElement): ContentBlockData {
    return {
      text: toolsContent.innerHTML
    }
  }

  // On paste callback fired from Editor.
  public onPaste (event: HTMLPasteEvent) {
    this.data = {
      text: event.detail.data.innerHTML
    }
  }

  /**
   * Enable Conversion Toolbar. Paragraph can be converted to/from other tools
   */
  static get conversionConfig () {
    return {
      export: 'text', // to convert Paragraph to other block, use 'text' property of saved data
      import: 'text' // to covert other block's exported string to Paragraph, fill 'text' property of tool data
    }
  }

  // Sanitizer rules
  static get sanitize (): SanitizerConfig {
    return {
      text: { br: true }
    }
  }

  get data (): ContentBlockData {
    const text = this._element?.innerHTML
    if (text !== undefined) this._data.text = text
    if (this._data.text === undefined) this._data.text = ''
    return this._data
  }

  set data (data: ContentBlockData) {
    this._data = data || {}
    this._element.innerHTML = this._data.text || ''
  }

  public renderSettings (): HTMLElement {
    const wrapper = document.createElement('DIV')

    this._settingButtons.forEach(tune => {
      // make sure the settings button does something
      if (!tune.icon || typeof tune.action !== 'function') return

      const { name, icon, action, isActive } = tune

      const btn = document.createElement('SPAN')
      btn.classList.add(this.api.styles.settingsButton)

      if (typeof isActive === 'function' && isActive(name)) {
        btn.classList.add(this.api.styles.settingsButtonActive)
      }
      btn.innerHTML = icon
      btn.addEventListener('click', event => action(name, event))

      wrapper.appendChild(btn)
    })

    return wrapper
  }

  // Used by Editor.js paste handling API.
  // Provides configuration to handle the tools tags.
  static get pasteConfig (): PasteConfig {
    return {
      tags: this._supportedTags
    }
  }

  // Icon and title for displaying at the Toolbox
  static get toolbox (): ToolboxConfig {
    return this._toolboxConfig
  }
}

export default ContentBlock

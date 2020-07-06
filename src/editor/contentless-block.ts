import { BlockTool, BlockToolData, ToolSettings, ToolboxConfig, API } from '@editorjs/editorjs'
import { ContentBlockSettings, CSSClasses } from './content-block'

export interface BlockToolArgs {
  api: API;
  config?: ToolSettings;
  data?: BlockToolData;
}

export class ContentlessBlock implements BlockTool {
  static get contentless () {
    return true
  }

  protected api: API
  protected _element: HTMLElement
  protected _data: object
  protected _config: ToolSettings
  protected _CSS: CSSClasses = {}
  protected _settingButtons: ContentBlockSettings = []

  constructor ({ data, config, api }: BlockToolArgs) {
    this.api = api
    this._config = config as ToolSettings
    this._data = data || {}
    this._CSS.block = this.api.styles.block
    this._element = this._render()
  }

  protected _render (): HTMLElement {
    const el = document.createElement('DIV')
    el.classList.add(this._CSS.block)
    return el
  }

  public render (): HTMLElement {
    return this._element
  }

  public save (_toolsContent: HTMLElement): object {
    return {}
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

  static get toolbox (): ToolboxConfig {
    return { icon: '<svg></svg>', title: 'UnnamedPlugin' }
  }
}

export default ContentlessBlock

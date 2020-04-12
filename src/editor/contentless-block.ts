import { BlockTool, BlockToolData, ToolSettings, ToolboxConfig, API } from '@editorjs/editorjs'

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

  constructor ({ data, config, api }: BlockToolArgs) {
    this.api = api
    this._config = config as ToolSettings
    this._data = data || {}
    this._element = this._render()
  }

  protected get _CSS (): { [key: string]: string } {
    return { block: this.api.styles.block }
  }

  protected _render (): HTMLElement {
    const el = document.createElement('DIV')
    el.classList.add(this._CSS.block)
    return el
  }

  render (): HTMLElement {
    return this._element
  }

  save (_toolsContent: HTMLElement): object {
    return {}
  }

  static get toolbox (): ToolboxConfig {
    return { icon: '<svg></svg>', title: 'UnnamedPlugin' }
  }
}

export default ContentlessBlock

import { BlockTool, BlockToolData, ToolConfig, ToolboxConfig, API } from '@editorjs/editorjs'

interface BlockToolConfig extends ToolConfig {
  [key: string]: string;
}

export interface BlockToolArgs {
  api: API;
  config: BlockToolConfig;
  data?: BlockToolData;
}

export class ContentlessBlock implements BlockTool {
  protected api: API
  protected _element: HTMLElement
  protected _data: object
  protected _config: ToolConfig

  constructor ({ data, config, api }: BlockToolArgs) {
    this.api = api
    this._config = config
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

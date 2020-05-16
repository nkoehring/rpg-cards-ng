import {
  ContentBlock,
  ContentBlockArgs,
  ContentBlockConfig,
  ContentBlockData,
  ConversionConfig
} from './content-block'

import icon from '../assets/editor/list.svg.txt'
import iconUL from '../assets/editor/list_unordered.svg.txt'
import iconOL from '../assets/editor/list_ordered.svg.txt'

const title = 'List'

enum ListStyle {
  Ordered = 'OL',
  Unordered = 'UL'
}
const icons = {
  [ListStyle.Ordered]: iconOL,
  [ListStyle.Unordered]: iconUL
}

interface ListConfig extends ContentBlockConfig {
  placeholder?: string;
  styles: ListStyle[];
  defaultStyle: ListStyle;
}

interface ListData extends ContentBlockData {
  style: ListStyle;
  items: string[];
}

interface ListConversionConfig extends ConversionConfig {
  import: (str: string) => ListData;
  export: (data: ListData) => string;
}

class List extends ContentBlock {
  static _supportedTags = ['UL', 'OL', 'LI']
  static _toolboxConfig = { icon, title }

  protected _config: ListConfig
  private defaultStyle: ListStyle
  private currentStyle: ListStyle

  constructor (args: ContentBlockArgs) {
    super(args)
    this._config = args.config as ListConfig

    if (this._config.styles === undefined) {
      this._config.styles = [ListStyle.Unordered, ListStyle.Ordered]
    }

    if (this._config.defaultStyle === undefined) {
      this._config.defaultStyle = ListStyle.Unordered
    }
    if (this._config.styles.indexOf(this._config.defaultStyle) === -1) {
      console.warn('(ง\'̀-\'́)ง List Tool: the default style specified was not found in available styles')
    }
    this.defaultStyle = this._config.defaultStyle
    this.currentStyle = this.defaultStyle

    this.data = {
      style: this.currentStyle,
      items: (args.data as ListData).items
    }

    this._settingButtons = this._config.styles.map(listStyle => {
      return {
        name: listStyle,
        icon: icons[listStyle] || icon,
        action: (name: string) => this.setStyle(name as ListStyle),
        isActive: (name: string): boolean => name === this.currentStyle
      }
    })
  }

  public get data (): ListData {
    // first render
    if (!this._element) return this._data as ListData

    const items = this.queryItems()
    const data = this._data as ListData
    data.items = Array.from(items).map(item => item.innerText)
    return data
  }

  public set data (data: ListData) {
    const currentData = this._data as ListData

    if (data.style === undefined) data.style = currentData.style || this.defaultStyle
    if (data.items === undefined) data.items = currentData.items || []

    this._data = data
    this.currentStyle = data.style

    const newList = this._render()
    if (this._element.parentNode) {
      this._element.parentNode.replaceChild(newList, this._element)
    }
    this._element = newList
  }

  private setStyle (style: ListStyle) {
    this.data = { style, items: this.data.items || [] }
  }

  protected _render (): HTMLElement {
    const el = document.createElement(this.currentStyle)
    el.classList.add('cdx-list', this._CSS.block)
    el.contentEditable = 'true'
    el.dataset.placeholder = this._config.placeholder || ''

    const items = this.data.items

    if (!items || !items.length) {
      const li = document.createElement('LI')
      li.innerText = ''
      li.classList.add('cdx-list__item')
      el.appendChild(li)
    } else {
      items.forEach(item => {
        const li = document.createElement('LI')
        li.innerText = item
        li.classList.add('cdx-list__item')
        el.appendChild(li)
      })
    }

    el.addEventListener('keydown', event => {
      // on pressing Enter
      if (event.keyCode === 13) return this.getOutOfList(event)
      // on pressing Backspace
      if (event.keyCode === 8) return this.backspace(event)
    }, false)

    return el
  }

  private queryItems (): NodeListOf<HTMLLIElement> {
    return this._element.querySelectorAll('.cdx-list__item')
  }

  private get currentItem (): Element | undefined {
    const selection = window.getSelection()
    if (selection === null) return

    let currentNode = selection.anchorNode
    if (currentNode === null) return

    if (currentNode.nodeType !== Node.ELEMENT_NODE) {
      currentNode = currentNode.parentNode
    }

    return (currentNode as HTMLElement).closest('.cdx-list__item') || undefined
  }

  // leave list by pressing enter on an empty list item
  private getOutOfList (event: KeyboardEvent) {
    const items = this.queryItems()
    if (items.length < 2) return

    const lastItem = items[items.length - 1]
    const currentItem = this.currentItem

    // prevent generation of new li if last li is empty
    if (currentItem === lastItem && !lastItem.innerText.trim().length) {
      if (!currentItem.parentElement) return // somethings really wrong
      currentItem.parentElement.removeChild(currentItem)
      this.api.blocks.insertNewBlock()
      event.preventDefault()
      event.stopPropagation()
    }
  }

  public backspace (event: KeyboardEvent) {
    const items = this.queryItems()
    const firstItem = items[0]

    if (firstItem === undefined) return
    if (items.length < 2 && !firstItem.innerText.trim()) event.preventDefault()
  }

  public selectItem (event: KeyboardEvent) {
    event.preventDefault()

    const selection = window.getSelection()
    if (selection === null) return // no selection, no problem

    const currentNode = selection.anchorNode?.parentNode
    if (currentNode === null) return

    const currentItem = (currentNode as Element).closest('.cdx-list__item')
    if (currentItem === null) return

    const range = new Range()

    range.selectNodeContents(currentItem)
    selection.removeAllRanges()
    selection.addRange(range)
  }

  protected pasteHandler (element: HTMLUListElement | HTMLOListElement | HTMLLIElement): ListData {
    const tag = element.tagName
    const style = tag === ListStyle.Ordered ? ListStyle.Ordered : ListStyle.Unordered
    const data: ListData = { style, items: [] }

    if (tag === 'LI') { // does this really happen?
      data.items.push(element.innerText)
    } else {
      const items = Array.from(element.querySelectorAll('LI'))
      data.items = items.map(item => (item as HTMLElement).innerText).filter(item => !!item.trim())
    }

    return data
  }

  // allow to use native enter behavior
  static get enableLineBreaks (): boolean {
    return true
  }

  static get sanitize () {
    return {
      style: {},
      items: {
        br: true
      }
    }
  }

  static get conversionConfig (): ListConversionConfig {
    return {
      export: data => {
        return data.items.join(' * ')
      },
      import: str => {
        return {
          items: [str],
          style: ListStyle.Unordered
        }
      }
    }
  }

  public save (): ListData {
    console.log('saving list', this.data)
    return this.data
  }
}

export default List

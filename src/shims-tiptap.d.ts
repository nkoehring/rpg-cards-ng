/* eslint @typescript-eslint/no-explicit-any: 0 */
declare module 'tiptap' {
  import { Vue } from 'vue/types/vue'

  export class Emitter {
    on(event: any, fn: (...args: any[]) => void): Emitter
    emit(event: any, ...args: any[]): Emitter
    off(event: any, fn: (...args: any[]) => void): Emitter
  }

  export class Editor extends Emitter {
    constructor (...arg: any[])
    [key: string]: any
  }

  export class Extension {
    constructor(...arg: any[])
    init(): null
    bindEditor(editor: Editor): void
    get name(): string|null
    get type(): string
    get update(): object
    get defaultOptions(): object
    get plugins(): any[]
    inputRules(): any[]
    pasteRules(): any[]
    keys(): object
  }

  export class Node extends Extension {
    get type(): 'node'
    get view(): null
    get schema(): null
    command(): () => object
  }

  export class Mark extends Extension {
    get type(): 'mark'
    get view(): null
    get schema(): null
    command(): () => object
  }

  export class EditorMenuBubble extends Vue {
    [key: string]: any
  }
  export class EditorContent extends Vue {
    [key: string]: any
  }
  export class EditorMenuBar extends Vue {
    [key: string]: any
  }
  export class EditorFloatingMenu extends Vue {
    [key: string]: any
  }
}

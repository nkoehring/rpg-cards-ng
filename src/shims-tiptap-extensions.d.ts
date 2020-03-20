/* eslint @typescript-eslint/no-explicit-any: 0 */
declare module 'tiptap-extensions' {
  import { Node, Mark, Extension } from 'tiptap'

  export class Heading extends Node {
    [key: string]: any
  }
  export class Blockquote extends Node {
    [key: string]: any
  }
  export class BulletList extends Node {
    [key: string]: any
  }
  export class Code extends Node {
    [key: string]: any
  }
  export class CodeBlock extends Node {
    [key: string]: any
  }
  export class CodeBlockHighlight extends Node {
    [key: string]: any
  }
  export class HardBreak extends Node {
    [key: string]: any
  }
  export class HorizontalRule extends Node {
    [key: string]: any
  }
  export class Image extends Node {
    [key: string]: any
  }
  export class ListItem extends Node {
    [key: string]: any
  }
  export class Mention extends Node {
    [key: string]: any
  }
  export class OrderedList extends Node {
    [key: string]: any
  }
  export class Table extends Node {
    [key: string]: any
  }
  export class TableCell extends Node {
    [key: string]: any
  }
  export class TableHeader extends Node {
    [key: string]: any
  }
  export class TableNodes extends Node {
    [key: string]: any
  }
  export class TableRow extends Node {
    [key: string]: any
  }
  export class TodoItem extends Node {
    [key: string]: any
  }
  export class TodoList extends Node {
    [key: string]: any
  }

  export class Link extends Mark {
    [key: string]: any
  }
  export class Bold extends Mark {
    [key: string]: any
  }
  export class Italic extends Mark {
    [key: string]: any
  }
  export class Strike extends Mark {
    [key: string]: any
  }
  export class Underline extends Mark {
    [key: string]: any
  }

  export class Collaboration extends Extension {
    [key: string]: any
  }
  export class Focus extends Extension {
    [key: string]: any
  }
  export class History extends Extension {
    [key: string]: any
  }
  export class Placeholder extends Extension {
    [key: string]: any
  }
  export class Search extends Extension {
    [key: string]: any
  }
  export class TrailingNode extends Extension {
    [key: string]: any
  }

  export class Suggestions {
    [key: string]: any
  }
  export class Highlight {
    [key: string]: any
  }
}

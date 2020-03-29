import { Node } from 'tiptap'
import { tableNodes, tableEditing, goToNextCell, deleteTable } from 'prosemirror-tables'
import { createTable } from 'prosemirror-utils'
import { TextSelection } from 'prosemirror-state'

export default class StatBlock extends Node {
  get name () {
    return 'stat_block'
  }

  get defaultOptions () {
    return {
      resizable: false
    }
  }

  get schema () {
    return {
      group: 'block',
      content: 'stat_column+',
      toDOM: () => ['ol', { 'data-type': this.name }, 0],
      parseDOM: [{
        priority: 51,
        tag: `[data-type="${this.name}"]`
      }]
    }
  }

  commands ({ schema }) {
    return () => (state, dispatch) => {
      const offset = state.tr.selection.anchor + 1

      const nodes = createTable(schema, 2, 6, true)
      const tr = state.tr.replaceSelectionWith(nodes).scrollIntoView()
      const resolvedPos = tr.doc.resolve(offset)

      tr.setSelection(TextSelection.near(resolvedPos))

      dispatch(tr)
    }
  }

  keys () {
    return {
      Tab: goToNextCell(1),
      'Shift-Tab': goToNextCell(-1)
    }
  }

  get plugins () {
    return [tableEditing()]
  }
}

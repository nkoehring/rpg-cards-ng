import { Node } from 'tiptap'
import { tableEditing, goToNextCell, deleteTable } from 'prosemirror-tables'
import { createTable } from 'prosemirror-utils'
import { TextSelection } from 'prosemirror-state'
import { TableNodes } from 'tiptap-extensions'

export default class StatBlock extends Node {
  public get name () {
    return 'stat_block'
  }

  public get defaultOptions () {
    return {
      resizable: false
    }
  }

  public get schema () {
    return TableNodes.table
  }

  public commands ({ schema }) {
    return {
      createStatBlock: () => (state, dispatch) => {
        const offset = state.tr.selection.anchor + 1

        const nodes = createTable(schema, 2, 6, true)
        const tr = state.tr.replaceSelectionWith(nodes).scrollIntoView()
        const resolvedPos = tr.doc.resolve(offset)

        tr.setSelection(TextSelection.near(resolvedPos))

        dispatch(tr)
      },
      deleteTable: () => deleteTable
    }
  }

  public keys () {
    return {
      Tab: goToNextCell(1),
      'Shift-Tab': goToNextCell(-1)
    }
  }

  public get plugins () {
    return [tableEditing()]
  }
}

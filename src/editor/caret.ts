import { getFocussedNode } from './node'

function applyRange (callback: (range: Range) => void) {
  const range = document.createRange()
  callback(range)

  const sel = window.getSelection()
  if (sel) {
    sel.removeAllRanges()
    sel.addRange(range)
  }
}
function collapseRange (node: Node, toStart = false) {
  applyRange(range => {
    range.selectNode(node)
    range.collapse(toStart)
  })
}

export function moveCaretToBOL () {
  const node = getFocussedNode()
  if (node) collapseRange(node, true)
}
export function moveCaretToEOL () {
  const node = getFocussedNode()
  if (node) collapseRange(node, false)
}
export function selectLine () {
  const node = getFocussedNode()
  if (node) {
    applyRange(range => range.selectNodeContents(node))
  }
}

function collapseRange (node: Node, toStart = false) {
  const range = document.createRange()
  range.selectNode(node)
  range.collapse(toStart)
  const sel = window.getSelection()
  if (sel) {
    sel.removeAllRanges()
    sel.addRange(range)
  }
}

export function moveCaretToBOL () {
  const node = window.getSelection()?.focusNode
  if (node) collapseRange(node, true)
}
export function moveCaretToEOL () {
  const node = window.getSelection()?.focusNode
  if (node) collapseRange(node, false)
}

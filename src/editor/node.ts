const { TEXT_NODE, ELEMENT_NODE } = Node
export function getFocussedNode (): Node | null {
  return window.getSelection()?.focusNode || null
}
export function isTextNode ({ nodeType }: Node): boolean {
  return nodeType === TEXT_NODE
}
export function isElementNode ({ nodeType }: Node): boolean {
  return nodeType === ELEMENT_NODE
}
export function isEmptyTextNode (node: Node): boolean {
  return isTextNode(node) && (node as CharacterData).data === ''
}
export function isRootNode (node: Node): boolean {
  return (node as HTMLElement).contentEditable === 'true'
}
export function isRootChild (node: Node): boolean {
  // TODO: maybe use a data attribute or something for saver identification
  return node.parentElement?.contentEditable === 'true'
}

import Vue from 'vue'
import { randomId } from './lib'

const eventHandlers: { [key: string]: () => void } = {}

Vue.directive('editable', (el, { value, arg }, vnode) => {
  const keypressHandler = (event: KeyboardEvent) => {
    console.log('keypress', event.code)
    // allow line break via Shift + Enter
    if (event.keyCode === 13 && !event.shiftKey) {
      event.preventDefault()
      console.log('edit event on enter', el.innerText)
      if (!vnode.context) return
      vnode.context.$emit('edit', { param: arg, value: el.innerText })
    }
  }

  const blurHandler = () => {
    console.log('edit event on blur', el.innerText)
    if (!vnode.context) return
    vnode.context.$emit('edit', { param: arg, value: el.innerText })
  }

  // remove old event listeners
  if (el.dataset.__evtid) {
    eventHandlers[el.dataset.__evtid]()
  }

  el.contentEditable = value ? 'true' : 'false'
  el.addEventListener('keypress', keypressHandler)
  el.addEventListener('blur', blurHandler)

  // TODO: is there a better way to avoid multiple event handlers?
  const id = randomId()
  el.dataset.__evtid = id
  eventHandlers[id] = () => {
    el.removeEventListener('keypress', keypressHandler)
    el.removeEventListener('blur', blurHandler)
  }
})

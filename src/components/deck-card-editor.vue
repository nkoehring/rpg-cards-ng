<template>
  <main>
    <deck-card-editor-menu
      :active="contentInFocus"
      @action="editorAction"
      v-model="menuState"
    />

    <div
      ref="content"
      class="card-content"
      :contenteditable="active"
      @focus="start"
      @click="syncMenuStateIfFocussed"
      @keyup="syncMenuStateOnKeyPress"
      @blur="stop"
    >
      <h2>card content</h2>
      <hr />
      <p><b>foo:</b> boom</p>
      <p><b>bar:</b> blam</p>
      <hr />
      <p>Some description maybe?</p>
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import DeckCardEditorMenu from '@/components/deck-card-editor-menu.vue'
import {
  menuActionToCommand,
  getActiveMarksAndBlocks,
  State,
  movementKeys,
  controlSequenceKeys
} from '@/editor'

@Component({
  components: { DeckCardEditorMenu }
})
export default class DeckCardEditor extends Vue {
  @Prop() public readonly active!: boolean
  @Prop() public readonly content!: Card['content']

  private contentInFocus = false

  private defaultMenuState (): State {
    return {
      bold: false,
      italic: false,
      paragraph: true,
      heading1: false,
      heading2: false,
      heading3: false,
      bulletList: false,
      spacer: false,
      separator: false,
      statBlock: false
    }
  }

  private menuState = this.defaultMenuState()

  private resetMenuState () {
    this.menuState = this.defaultMenuState()
  }

  private setMenuState (marks: string[], block: string) {
    this.resetMenuState()
    marks.forEach(mark => { this.menuState[mark] = true })
    if (block !== 'paragraph') {
      this.menuState.paragraph = false
      this.menuState[block] = true
    }
  }

  private editorAction (action: string) {
    console.log('action', action)
    const content = this.$refs.content as HTMLElement
    content.focus()

    const cmd = menuActionToCommand[action]
    cmd()

    this.$nextTick(() => this.syncMenuState())
  }

  private syncMenuState () {
    const sel = window.getSelection()?.focusNode
    if (!sel) return

    const { marks, block } = getActiveMarksAndBlocks(sel as HTMLElement)
    this.setMenuState(marks, block)
  }

  private syncMenuStateIfFocussed () {
    if (this.contentInFocus) this.syncMenuState()
  }

  private syncMenuStateOnKeyPress (event: KeyboardEvent) {
    // undo/redo/cut/paste
    const isCtrlSq = event.ctrlKey && controlSequenceKeys.indexOf(event.key) >= 0
    // arrow keys, enter, delete, etc
    const isMove = movementKeys.indexOf(event.key) >= 0

    if (isCtrlSq || isMove) this.syncMenuState()
  }

  private start () {
    this.contentInFocus = true
    this.syncMenuState()
    // insert paragraphs instead of DIVs on enter
    document.execCommand('defaultParagraphSeparator', false, 'p')
  }

  private stop () {
    this.contentInFocus = false
  }
}
</script>

<style>
.card-content p {
  margin: 0;
  line-height: 1.2;
}

.card-content ul {
  list-style-position: inside;
  margin: 0;
  padding-left: .5em;
}
.card-content li > p {
  display: inline;
}

.card-content h2 {
  font-size: 1.4rem;
  color: var(--highlight-color);
  margin: 0;
  font-weight: normal;
}

.card-content h3 {
  font-size: 1.4rem;
  color: var(--highlight-color);
  margin: 0 0 .2em 0;
  font-weight: normal;
  font-variant: small-caps;
  line-height: .9em;
  border-bottom: 1px solid var(--highlight-color);
}

.card-content hr {
  height: 0;
  margin: .2em 0;
  border: 2px solid var(--highlight-color);
}
.card-content hr.pointing-right {
  height: 0;
  margin: .2em 0;
  border-style: solid;
  border-width: 2px 0 2px 220px;
  border-color: transparent transparent transparent var(--highlight-color);
}
.card-content hr.pointing-left {
  height: 0;
  margin: .2em 0;
  border-style: solid;
  border-width: 2px 220px 2px 0;
  border-color: transparent var(--highlight-color) transparent transparent;
}
[contenteditable="true"] { outline: none; }
</style>

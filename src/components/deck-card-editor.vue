<template>
  <main :id="id" class="card-content"></main>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import Editor from '@editorjs/editorjs'
import List from '@editorjs/list'
import { /* Heading, */ Delimiter, Boop } from '@/editor'

@Component
export default class DeckCardEditor extends Vue {
  @Prop() public readonly cardId!: string
  @Prop() public readonly active!: boolean
  @Prop() public readonly content!: Card['content']

  private editor!: Editor

  private get id () {
    return `${this.cardId}-editor`
  }

  private mounted () {
    this.editor = new Editor({
      holderId: this.id,
      autofocus: false,
      tools: {
        // header: Heading,
        list: { class: List, inlineToolbar: true },
        delimiter: { class: Delimiter, inlineToolbar: true },
        boop: { class: Boop, inlineToolbar: true }
      },
      // data: {},
      placeholder: 'Click here to write your card.'
    })
  }
}
</script>

<style>
.card-content .cdx-block {
  padding: 0;
}

.card-content .ce-paragraph, .card-content p {
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

.card-content .card-delimiter {
  height: 0;
  margin: .2em 0;
  padding: 0;
  border: 2px solid var(--highlight-color);
}
.card-content .card-delimiter.pointing-right {
  height: 0;
  margin: .2em 0;
  border-style: solid;
  border-width: 2px 0 2px 220px;
  border-color: transparent transparent transparent var(--highlight-color);
}
.card-content .card-delimiter.pointing-left {
  height: 0;
  margin: .2em 0;
  border-style: solid;
  border-width: 2px 220px 2px 0;
  border-color: transparent var(--highlight-color) transparent transparent;
}
[contenteditable="true"] { outline: none; }
</style>

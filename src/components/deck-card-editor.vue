<template>
  <main ref="cardEl" class="card-content"></main>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import Editor from '@editorjs/editorjs'
import List from '@editorjs/list'
import { Heading, Delimiter, Charges, DnDStats } from '@/editor'

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
      holder: this.$refs.cardEl as HTMLElement,
      autofocus: false,
      tools: {
        // header: Heading,
        list: { class: List, inlineToolbar: true },
        heading: { class: Heading, inlineToolbar: true },
        delimiter: { class: Delimiter, inlineToolbar: false },
        charges: { class: Charges, inlineToolbar: false },
        dndstats: { class: DnDStats, inlineToolbar: false }
      },
      data: this.content,
      placeholder: 'Click here to write your card.',
      onChange: () => {
        console.log('editor change, saving')
        this.editor.save().then(value => {
          this.$emit('change', { field: 'content', value })
        }).catch(error => {
          console.error('error saving data', error)
        })
      }
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
  line-height: 1.3;
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
.card-content .cdx-list__item {
  padding: 0;
  line-height: 1.3;
}
.card-content .card-charges-wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-height: 1em;
}
.card-content .card-charges-wrapper.card-charges-stretch { justify-content: space-around; }
.card-content .card-charges-wrapper > .card-charge {
  width: 1.0em;
  height: 1.0em;
  border: 2px solid var(--highlight-color);
  margin: .5em .2em;
}
.card-content .card-charges-wrapper > .card-charge-circle { border-radius: 100%; }
.card-content .card-charges-wrapper > .card-charge-size-1 { width: 1.0em; height: 1.0em; }
.card-content .card-charges-wrapper > .card-charge-size-2 { width: 1.2em; height: 1.2em; }
.card-content .card-charges-wrapper > .card-charge-size-3 { width: 1.4em; height: 1.4em; }
.card-content .card-charges-wrapper > .card-charge-size-4 { width: 1.6em; height: 1.6em; }
.card-content .card-charges-wrapper > .card-charge-size-5 { width: 1.8em; height: 1.8em; }

.card-content .card-dnd-stats {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
  color: var(--highlight-color);
}
.card-content .dnd-stat-block {
  flex: 1 1 auto;
  display: flex;
  flex-flow: row wrap;
  font-size: .8em;
}
.card-content .dnd-stat-block > .dnd-stat-title {
  width: 100%;
  font-weight: bold;
  text-align: center;
}
.card-content .dnd-stat-block > input {
  width: 50%;
  background: white;
  color: var(--highlight-color);
  border: none;
  padding: 0;
  margin: 0;
  font-size: 1em;
  text-align: center;
}
.card-content .dnd-stat-block {
}

[contenteditable="true"] { outline: none; }
</style>

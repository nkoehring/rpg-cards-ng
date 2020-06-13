<template>
  <main ref="cardEl" class="card-content"></main>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Card } from '@/types'

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

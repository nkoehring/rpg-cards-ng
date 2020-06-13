<template>
  <div class="card" :style="containerStyle">
    <div class="card-front" v-if="showFront">
      <header>
        <h1>{{ card.name }}</h1>
        <img :src="icon" />
      </header>
      <main ref="cardEl" class="card-content">
      </main>
    </div>
    <div class="card-back" v-if="showBack">BACK</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Deck, Card } from '@/types'
import { iconPath } from '@/lib'

import Editor from '@editorjs/editorjs'
import List from '@editorjs/list'
import { Heading, Delimiter, Charges, DnDStats } from '@/editor'

@Component
export default class StaticCard extends Vue {
  @Prop() public readonly card!: Card
  @Prop() public readonly deck!: Deck
  @Prop({ default: false }) public readonly showFront!: boolean
  @Prop({ default: false }) public readonly showBack!: boolean

  private editor!: Editor

  private mounted () {
    this.editor = new Editor({
      holder: this.$refs.cardEl as HTMLElement,
      autofocus: false,
      hideToolbar: true,
      tools: {
        list: { class: List, inlineToolbar: false },
        heading: { class: Heading, inlineToolbar: false },
        delimiter: { class: Delimiter, inlineToolbar: false },
        charges: { class: Charges, inlineToolbar: false },
        dndstats: { class: DnDStats, inlineToolbar: false }
      },
      data: this.card.content,
      onReady: () => {
        console.log('editor is ready, what to do?')
      }
    })
  }

  private get icon () {
    const icon = this.card.icon || this.deck.icon
    return iconPath(icon)
  }

  private get backIcon () {
    const icon = this.card.backIcon || this.deck.icon
    return iconPath(icon)
  }

  private get containerStyle () {
    const color = (this.deck && this.deck.color) || this.card.color

    return {
      '--highlight-color': color
    }
  }
}
</script>

<style src="@/assets/card.css" />

<style scoped>
.card {
  height: auto;
  width: auto;
  background-color: var(--highlight-color);
  border: none;
  box-shadow: none;
  margin: 0;
  cursor: default;
  pointer-events: none;
}
.card-front, .card-back {
  width: var(--card-width);
  height: var(--card-height);
}
</style>

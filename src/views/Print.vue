<template>
  <main id="print-view" name="print-view" :class="{ loading, 'not-found': notFound }" :style="pageSizeCSS">
    <div class="page">
      <header>Page 1</header>
      <p>foo bar baz</p>
      <ol>
        <li :key="`c${i}`" v-for="(card, i) in deck.cards">{{ card.title }}</li>
      </ol>
    </div>
    <div class="page">
      <header>Page 2</header>
      <p>foo bar baz</p>
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Deck } from '../types'
import { iconPath } from '../lib'

@Component
export default class PrintDeck extends Vue {
  private loading = true
  private notFound = false
  private deck: Deck | null = null

  private size = '210mm 297mm'
  private landscape = false // TODO: not yet implemented

  private mounted () {
    const currentDeckId = this.$route.params.id
    this.deck = this.$storage.findDeck(currentDeckId)
    if (this.deck === null) this.notFound = true
    this.loading = false
  }

  private get deckIcon () {
    if (this.deck === null) return ''
    return iconPath(this.deck.icon)
  }

  private get pageSizeCSS () {
    const [w, h] = this.size.split(' ')

    return {
      '--width': w,
      '--height': h,
      '--size': this.size
    }
  }
}
</script>

<style>
@page {
  margin: 0;
  size: var(--size);
}
#print-view > .page {
  display: block;
  width: var(--width);
  height: var(--height);
  margin: 5mm auto;
  background-color: white;
  color: black;
}
@media print {
  html,body {
    background-color: gray;
  }
  #app > .home-link {
    display: none;
  }
  #print-view > .page {
    margin: 0;
    box-shadow: none;
  }
}
</style>

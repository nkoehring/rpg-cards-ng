<template>
  <main id="print-view" name="print-view" :class="{ loading, 'not-found': notFound }" :style="pageSizeCSS">
    <div class="loading" v-if="loading">— loading —</div>
    <div class="not-found" v-else-if="notFound">Deck not found :(</div>
    <template v-else>
      <div class="page">
        <Card :key="card.id" v-for="card in deck.cards"
          :card="card"
          :deck="deck"
          :show-front="true"
        />
      </div>
      <div class="page">
        <header>Page 2</header>
        <p>foo bar baz</p>
      </div>
    </template>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Deck } from '../types'
import { defaultCardSize, defaultPageSize } from '../consts'
import Card from '../components/static-card.vue'
import { iconPath } from '../lib'

interface Dimensions {
  width: number;
  height: number;
}

@Component({
  components: { Card }
})
export default class PrintDeck extends Vue {
  private loading = true
  private notFound = false
  private deck: Deck | null = null

  private landscape = false // TODO: not yet implemented

  private mounted () {
    const currentDeckId = this.$route.params.id
    this.deck = this.$storage.findDeck(currentDeckId)
    if (this.deck === null) this.notFound = true
    this.loading = false
  }

  private get pageSize (): Dimensions {
    const pageSize = this.deck === null ? defaultPageSize : this.deck.pageSize
    const [width, height] = pageSize.split(' ').map(x => parseFloat(x))
    return { width, height }
  }

  private get cardSize (): Dimensions {
    const cardSize = this.deck === null ? defaultCardSize : this.deck.cardSize
    const [height, width] = cardSize.split('x').map(x => parseFloat(x))
    return { width, height }
  }

  private get cardsPerPage (): number {
    if (this.deck === null || this.deck.cards.length === 0) return 0
  }

  private get deckIcon () {
    if (this.deck === null) return ''
    return iconPath(this.deck.icon)
  }

  private get pageSizeCSS () {
    const cardHeight = `${this.cardSize.height}mm`
    const cardWidth = `${this.cardSize.width}mm`

    const pageHeight = `${this.pageSize.height}mm`
    const pageWidth = `${this.pageSize.width}mm`

    console.log(cardHeight, cardWidth, pageHeight, pageWidth)

    return {
      '--width': pageWidth,
      '--height': pageHeight,
      '--card-width': cardWidth,
      '--card-height': cardHeight
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
  box-sizing: border-box;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-content: flex-start;
  page-break-after: always;
  width: var(--width);
  height: var(--height);
  margin: 5mm auto;
  padding: 1cm 9mm;
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

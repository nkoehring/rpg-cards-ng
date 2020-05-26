<template>
  <div id="print-options-form">
    <header>Print Deck</header>

    <form @submit.prevent="printDeck">
    <div class="deck-form-fields">
      <label for="print-option-page-size">
        Page Size
        <select class="print-option-select" id="print-option-page-size" v-model="pageSize">
          <option :key="size" :value="size.value" v-for="size in pageSizes">{{ size.title }}</option>
        </select>
      </label>

      <label for="print-option-card-size">
        Card Size
        <select class="print-option-select" id="print-option-card-size" v-model="cardSize">
          <option :key="size" :value="size.value" v-for="size in cardSizes">{{ size.title }}</option>
        </select>
      </label>

      <label for="print-option-arrangement">
        Arrangement
        <select class="print-option-select" id="print-option-arrangement" v-model="arrangement">
          <option :key="arrangement" :value="arrangement.value" v-for="arrangement in arrangements">{{ arrangement.title }}</option>
        </select>
      </label>

      <button type="submit">Print deck</button>
      <button class="cancel" @click.prevent="$emit('close')">cancel</button>
    </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from 'vue-property-decorator'
import { cardSizeFromWH } from '../lib'

@Component
export default class EditDeckForm extends Vue {
  @Prop() public readonly deck!: Deck

  private pageSizes = [
    { title: 'A4', value: 'a4' }, // 210mm × 297mm
    { title: 'US Letter', value: 'usletter' }, // 8.5in × 11in
    { title: 'JIS-B4', value: 'jisb4' }, // 182mm × 257mm
    { title: 'A3', value: 'a3' }, // 297mm × 420mm
    { title: 'A5', value: 'a5' }, // 148mm × 210mm
    { title: 'US Legal', value: 'uslegal' }, // 8.5in × 14in
    { title: 'US Ledger', value: 'usledger' }, // 11in × 17in
    { title: 'JIS-B5', value: 'jisb5' } // 257mm × 364mm
  ]

  private cardSizes = [
    { title: '88x62 (Poker)', value: '88x62' },
    { title: '88x56 (Bridge)', value: '88x56' }
  ]

  private arrangements = [
    { title: 'Doublesided', value: 'doublesided' },
    { title: 'Only Front Sides', value: 'frontonly' },
    { title: 'Side by Side', value: 'sidebyside' }
  ]

  private pageSize = 'a4'
  private cardSize = '88x62'
  private arrangement = 'doublesided'

  private mounted () {
    this.cardSize = cardSizeFromWH(this.deck.cardWidth, this.deck.cardHeight)
  }
}
</script>

<style scoped>
.print-option-select {
  width: 55%;
}
.deck-form-fields {
  width: 100%;
  max-width: 20em;
  margin: auto;
}
</style>

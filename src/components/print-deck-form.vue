<template>
  <div id="print-options-form">
    <header>Print Deck</header>

    <form @submit.prevent="printDeck">
    <div class="deck-form-fields">
      <label for="print-option-page-size">
        Page Size
        <select class="print-option-select" id="print-option-page-size" v-model="pageSize">
          <option :key="size.value" :value="size.value" v-for="size in pageSizes">{{ size.title }}</option>
        </select>
      </label>

      <label for="print-option-card-size">
        Card Size
        <select class="print-option-select" id="print-option-card-size" v-model="cardSize">
          <option :key="size.value" :value="size.value" v-for="size in cardSizes">{{ size.title }}</option>
        </select>
      </label>

      <label for="print-option-arrangement">
        Arrangement
        <select class="print-option-select" id="print-option-arrangement" v-model="arrangement">
          <option :key="arrangement.value" :value="arrangement.value" v-for="arrangement in arrangements">{{ arrangement.title }}</option>
        </select>
      </label>

      <FlipSwitch id="print-option-rounded-corners" label="Rounded Corners" v-model="roundedCorners">
      </FlipSwitch>

      <button type="submit">Print deck</button>
      <button class="cancel" @click.prevent="$emit('close')">cancel</button>
    </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Deck, Arrangement, PageSize, CardSize } from '@/types'
import FlipSwitch from '@/components/flip-switch.vue'

@Component({
  components: { FlipSwitch }
})
export default class EditDeckForm extends Vue {
  @Prop() public readonly deck!: Deck

  private pageSizes = [
    { title: 'A4', value: PageSize.A4 }, // 210mm × 297mm
    { title: 'US Letter', value: PageSize.USLetter }, // 8.5in × 11in
    { title: 'JIS-B4', value: PageSize.JISB4 }, // 182mm × 257mm
    { title: 'A3', value: PageSize.A3 }, // 297mm × 420mm
    { title: 'A5', value: PageSize.A5 }, // 148mm × 210mm
    { title: 'US Legal', value: PageSize.USLegal }, // 8.5in × 14in
    { title: 'US Ledger', value: PageSize.USLedger }, // 11in × 17in
    { title: 'JIS-B5', value: PageSize.JISB5 } // 257mm × 364mm
  ]

  private cardSizes = [
    { title: '88x62 (Poker)', value: CardSize.Poker },
    { title: '88x56 (Bridge)', value: CardSize.Bridge }
  ]

  private arrangements = [
    { title: 'Double Sided', value: Arrangement.DoubleSided },
    { title: 'Only Front Sides', value: Arrangement.FrontOnly },
    { title: 'Side by Side', value: Arrangement.SideBySide }
  ]

  private pageSize = PageSize.A4
  private cardSize = CardSize.Poker
  private arrangement = Arrangement.DoubleSided
  private roundedCorners = true

  private mounted () {
    this.cardSize = this.deck.cardSize
  }

  private printDeck () {
    console.log('would print on', this.pageSize, `(${this.arrangement})`, this.deck.cards.length, 'cards of size', this.cardSize, this.roundedCorners ? 'with rounded corners' : '')
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

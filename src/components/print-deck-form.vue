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
import { Deck } from '@/types'
import {
  cardSizeOptions,
  pageSizeOptions,
  arrangementOptions,
  defaultCardSize,
  defaultPageSize,
  defaultArrangement
} from '@/consts'
import FlipSwitch from '@/components/flip-switch.vue'

@Component({
  components: { FlipSwitch }
})
export default class EditDeckForm extends Vue {
  @Prop() public readonly deck!: Deck

  private pageSizes = pageSizeOptions
  private cardSizes = cardSizeOptions
  private arrangements = arrangementOptions

  private pageSize = defaultPageSize
  private cardSize = defaultCardSize
  private arrangement = defaultArrangement
  private roundedCorners = true

  private mounted () {
    this.cardSize = this.deck.cardSize
    this.pageSize = this.deck.pageSize
    this.arrangement = this.deck.arrangement
    this.roundedCorners = this.deck.roundedCorners
  }

  private printDeck () {
    this.$storage.saveDeck({
      ...this.deck,
      arrangement: this.arrangement,
      pageSize: this.pageSize,
      cardSize: this.cardSize,
      roundedCorners: this.roundedCorners
    })
    console.log('would print on', this.pageSize, `(${this.arrangement})`, this.deck.cards.length, 'cards of size', this.cardSize, this.roundedCorners ? 'with rounded corners' : '')
    window.open(`/print/${this.deck.id}`, '_blank')
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

<template>
  <form class="options-form" @submit.prevent="saveDeck">
    <div class="deck-form-fields">
      <select v-model="icon">
        <option :key="iconName" :value="iconName" v-for="iconName in icons">{{ iconName }}</option>
      </select>

      <input v-model="name" title="deck name" placeholder="give it a name" />
      <input v-model="description" title="deck description" placeholder="the most awesome deck of cards" />

      <p>Pick a colour: <input type="color" v-model="color" /></p>

      <select v-model="cardSize">
        <option :key="size.value" :value="size.value" v-for="size in sizes">{{ size.title }}</option>
      </select>

      <button type="submit">Save deck</button>
      <button class="cancel" @click.prevent="$emit('close')">cancel</button>
    </div>

    <DeckCover :deck="newDeck" />
  </form>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from 'vue-property-decorator'
import { Deck, CardSize } from '@/types'
import { cardSizeOptions } from '@/consts'
import DeckCover from '@/components/deck-cover.vue'
import { iconPath } from '../lib'

@Component({
  components: { DeckCover }
})
export default class DeckForm extends Vue {
  @Prop() public readonly deck!: Deck

  private icons = ['mouth-watering', 'robe', 'thorny-triskelion']
  private sizes = cardSizeOptions

  private icon: string
  private name: string
  private description: string
  private color: string
  private cardSize: CardSize

  constructor () {
    super()
    this.icon = this.deck.icon
    this.name = this.deck.name
    this.description = this.deck.description
    this.color = this.deck.color
    this.cardSize = this.deck.cardSize
  }

  private get iconPath () {
    return iconPath(this.icon)
  }

  private get newDeck (): Deck {
    return {
      ...this.deck,
      name: this.name,
      description: this.description,
      color: this.color,
      icon: this.icon,
      cardSize: this.cardSize
    }
  }

  @Emit('save')
  private saveDeck (): Deck {
    return this.newDeck
  }
}
</script>

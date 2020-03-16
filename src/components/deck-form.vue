<template>
  <form @submit.prevent="saveDeck">
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
import DeckCover from '@/components/deck-cover.vue'
import { cardWHFromSize, cardSizeFromWH, iconPath } from '../lib'

@Component({
  components: { DeckCover }
})
export default class DeckForm extends Vue {
  @Prop() public readonly deck!: Deck

  private icons = ['mouth-watering', 'robe', 'thorny-triskelion']
  private sizes = [
    { title: '88x62 (Poker)', value: '88x62' },
    { title: '88x56 (Bridge)', value: '88x56' }
  ]

  private icon: string
  private name: string
  private description: string
  private color: string
  private cardSize: string

  constructor () {
    super()
    this.icon = this.deck.icon
    this.name = this.deck.name
    this.description = this.deck.description
    this.color = this.deck.color
    this.cardSize = cardSizeFromWH(this.deck.cardWidth, this.deck.cardHeight)
  }

  private get iconPath () {
    return iconPath(this.icon)
  }

  private get newDeck () {
    const [cardWidth, cardHeight] = cardWHFromSize(this.cardSize)

    return {
      ...this.deck,
      name: this.name,
      description: this.description,
      color: this.color,
      icon: this.icon,
      cardWidth,
      cardHeight
    }
  }

  @Emit('save')
  private saveDeck (): Deck {
    return this.newDeck
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-evenly;
}

.deck-form-fields {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  max-width: 25rem;
  width: 50%;
  margin-right: -15%;
  z-index: 1;
}

.deck-form-fields select,
.deck-form-fields input,
.deck-form-fields button {
  margin: .5em 0;
}
.deck-form-fields input[type=color] {
  margin-left: .5em;
  padding: 0;
  vertical-align: middle;
}
</style>

<template>
  <div
    :id="deck.id" class="card deck-cover" :style="style"
    @click="$emit('click')"
  >
    <div class="icon-wrapper">
      <img :src="icon" />
    </div>
    <footer>{{ deck.name }} ({{ deck.cards.length }})</footer>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Deck } from '@/types'
import { cardSizeToStyle, iconPath, defaultDeck } from '@/lib'

const emptyDeck: Deck = {
  ...defaultDeck(),
  id: '_add_deck',
  name: 'create new deck',
  color: 'transparent',
  icon: 'plus'
}

@Component
export default class DeckCover extends Vue {
  @Prop({ default () { return emptyDeck } }) public readonly deck!: Deck

  private get icon () {
    const icon = this.deck.icon || 'default'
    return iconPath(icon)
  }

  private get style () {
    return {
      backgroundColor: this.deck.color,
      ...cardSizeToStyle(this.deck.cardSize)
    }
  }
}
</script>

<style scoped>
.deck-cover {
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-evenly;
  text-align: center;
  line-height: 4rem;
  font-size: 2rem;
}
.deck-cover > footer {
  font-size: 2rem;
  margin: 1rem 0;
}
#_add_deck.deck-cover {
  height: var(--card-height);
  width: 25rem;
  border: none;
  box-shadow: none;
}
#_add_deck.deck-cover > footer {
  display: none;
}
.deck-cover > .icon-wrapper {
  width: 90%;
  margin: auto;
}
</style>

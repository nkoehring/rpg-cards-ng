<template>
  <div id="new-deck-form" class="deck">
    <header>Create a new deck of cards</header>
    <DeckForm :deck="newDeck" @save="saveDeck" @close="$emit('close')" />
  </div>
</template>

<script lang="ts">
import { Component, Emit, Vue } from 'vue-property-decorator'
import DeckForm from './deck-form.vue'
import { defaultDeck, randomId } from '../lib'

@Component({
  components: { DeckForm }
})
export default class NewDeckForm extends Vue {
  private newDeck: Deck = defaultDeck()

  @Emit('save')
  private saveDeck (deck: Deck) {
    deck.id = randomId() // just to make sure
    this.$storage.saveDeck(deck)
  }
}
</script>

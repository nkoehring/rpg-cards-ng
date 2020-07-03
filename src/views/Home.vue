<template>
  <header>RPG Cards for y'all</header>

  <section name="deck-covers" class="cards" :class="{ centered: !decks.length }">
    <router-link :to="{ name: 'Deck', params: { id: deck.id } }" :key="deck.id" v-for="deck in decks">
      <DeckCard :deck="deck" />
    </router-link>
    <Card id="_add_deck" @click="addDeck" />
  </section>

  <teleport to="#popup > .popup-content">
    <div class="deck new-deck-form-wrapper">
      <header>Create a new deck of cards</header>
      <DeckForm :deck="newDeck" @save="saveDeck" @close="hidePopup" />
      <footer class="centered">
        You can also
        <button @click="importDeck">import</button>
        an existing deck.
      </footer>
    </div>
  </teleport>

</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useState } from '@/state'

import Card from '@/components/Card.vue'
import DeckCard from '@/components/DeckCard.vue'
import DeckForm from '@/components/DeckForm.vue'

export default defineComponent({
  name: 'Home',
  components: { Card, DeckCard, DeckForm },
  setup () {
    const { actions: popupActions } = useState('popup')
    const { collection: decks, actions: deckActions } = useState('decks')

    const newDeckIndex = ref(0)
    const newDeck = computed(() => decks.value[newDeckIndex.value])

    const addDeck = () => {
      const idx = deckActions.new()
      newDeckIndex.value = idx
      popupActions.show()
    }

    const saveDeck = (updatedDeck) => {
      console.log('saving deck', updatedDeck)
      updatedDeck.id = newDeckIndex.value
      deckActions.update(updatedDeck)
      popupActions.hide()
    }

    return {
      decks,
      addDeck,
      newDeck,
      saveDeck,
      hidePopup: popupActions.hide
      // importDeck: deckActions.import,
    }
  }
})
</script>

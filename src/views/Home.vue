<template>
  <header>RPG Cards for y'all</header>

  <section name="deck-covers" class="cards" :class="{ centered: decks.length === 0 }">
    <router-link :to="{ name: 'Deck', params: { id: deck.id } }" :key="deck.id" v-for="deck in decks">
      <CardBack :icon="deck.icon" :color="deck.color" :size="deck.cardSize">
        {{ deck.name }} ({{ deck.cards.length }})
      </CardBack>
    </router-link>
    <CardBack id="_add" @click="addDeck" />
  </section>

  <Popup>
    <div class="deck new-deck-form-wrapper">
      <header>Create a new deck of cards</header>
      <DeckForm :deck="newDeck" @save="saveDeck" @cancel="cancelDeck" />
      <footer class="centered">
        You can also
        <button @click="importDeck">import</button>
        an existing deck.
      </footer>
    </div>
  </Popup>

</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useState } from '@/state'

import Popup from '@/components/Popup.vue'
import CardBack from '@/components/CardBack.vue'
import DeckForm from '@/components/DeckForm.vue'

export default defineComponent({
  name: 'Home',
  components: { Popup, CardBack, DeckForm },
  setup () {
    const { actions: popupActions } = useState('popup')
    const { collection: decks, actions: deckActions } = useState('decks')

    const newDeckId = ref('')
    const newDeck = computed(() => decks.value[newDeckId.value])

    const addDeck = () => {
      const id = deckActions.new()
      newDeckId.value = id
      popupActions.show()
    }

    const saveDeck = (updatedDeck) => {
      updatedDeck.id = newDeckId.value
      deckActions.update(updatedDeck)
      popupActions.hide()
    }

    const cancelDeck = () => {
      popupActions.hide()
      deckActions.remove(newDeckId.value)
      newDeckId.value = ''
    }

    return {
      decks,
      addDeck,
      newDeck,
      saveDeck,
      cancelDeck,
      hidePopup: popupActions.hide
      // importDeck: deckActions.import,
    }
  }
})
</script>

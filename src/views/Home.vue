<template>
  <header>RPG Cards for y'all</header>

  <section name="deck-covers" class="cards" :class="{ centered: !decks.length }">
    <router-link :to="{ name: 'Deck', params: { id: deck.id } }" :key="deck.id" v-for="deck in decks">
      <Card :icon="deck.icon" :color="deck.color" :size="deck.cardSize">
        <template #back>{{ deck.name }} ({{ deck.cards.length }})</template>
      </Card>
    </router-link>
    <Card id="_add_deck" @click="newDeck" />
  </section>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useState } from '@/state'

import Card from '@/components/Card.vue'


export default defineComponent({
  name: 'Home',
  components: { Card },
  setup () {
    const { collection: decks, actions: deckActions } = useState('decks')

    return {
      decks,
      // TODO: open popup with Deck settings after creation
      newDeck: deckActions.new
    }
  }
})
</script>

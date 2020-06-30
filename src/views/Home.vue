<template>
  <header>RPG Cards for y'all</header>

  <section name="deck-covers" class="cards" :class="{ centered: !decks.length }">
    <router-link :to="{ name: 'Deck', params: { id: deck.id } }" :key="deck.id" v-for="deck in decks">
      <CardBack :icon="deck.icon" :color="deck.color" :size="deck.cardSize">
        {{ deck.name }} ({{ deck.cards.length }})
      </CardBack>
    </router-link>
    <CardBack @click="newDeck" icon="plus" />
  </section>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useState } from '@/state'

import CardBack from '@/components/CardBack.vue'


export default defineComponent({
  name: 'Home',
  components: { CardBack },
  setup () {
    const { collection: decks, actions } = useState('decks')
    return {
      decks,
      newDeck: actions['decks/new']
    }
  }
})
</script>

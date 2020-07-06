<template>
  <template v-if="errorState">
    <header>Cannot find this deck</header>
    <router-link to="/">« lets go back home</router-link>
  </template>

  <template v-else>
    <div class="deck-bg">
      <img :src="deckIcon" />
    </div>

    <header>
      <span>{{ deck.name }}</span>
      <button class="edit-button">edit</button>
      <button class="print-button">print</button>

      <p>{{ deck.description }}</p>
    </header>

    <section name="deck-cards" class="cards" :class="{ centered: deck.cards.length === 0 }">
      <CardBack v-for="card in deck.cards"
        :key="card.id"
        :id="card.id"
        :card="card"
        :icon="deck.icon"
        :color="deck.color"
        :size="deck.cardSize"
      />
      <CardBack id="_add" @click="addCard" />
    </section>
  </template>
</template>

<script lang="ts">
import { defineComponent, watchEffect, ref } from 'vue'
import { useRoute } from 'vue-router'
import { IDeck } from '@/types'
import state from '@/state'
import iconPath from '@/lib/iconPath'
import CardBack from '@/components/CardBack.vue'

const name = 'Deck'

export default defineComponent({
  components: { CardBack },
  setup () {
    const route = useRoute()

    const errorState = ref(false)
    const deck = ref<IDeck | null>(null)
    const deckIcon = ref('')

    watchEffect(() => {
      const deckId = route.params.id as string
      const existingDecks = Object.keys(state.decks.value)
      const exists = existingDecks.indexOf(deckId) >= 0
      errorState.value = !exists

      if (exists) {
        deck.value = state.decks.value[deckId]
        deckIcon.value = iconPath(deck.value.icon)
      }
    })

    const addCard = () => {}

    state.loading.value = false
    return { errorState, deck, deckIcon, addCard }
  },
  beforeRouteEnter (_to, _from, next) {
    state.loading.value = true
    next()
  }
})
</script>

<style scoped>
.edit-button, .print-button {
  vertical-align: middle;
  margin-top: -2px;
}
.edit-button {
  margin-left: 1em;
}
.deck-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  max-height: 100vh;
  overflow: hidden;
  pointer-events: none;
}
.deck-bg > img {
  filter: saturate(0%) blur(5px) opacity(8%);
}
</style>

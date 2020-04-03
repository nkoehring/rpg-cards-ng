<template>
  <main name="home" :class="{ popup }">
    <header>RPG Cards for y'all</header>
    <section name="notifications">
      <p class="warning">
        <strong>This is a pre-alpha version.</strong>
        Many features are still unstable or completely missing.
        <br />
        Check out <a href="https://github.com/nkoehring/rpg-cards-ng/">the code repository</a> for more information.
      </p>
    </section>
    <section name="deck-covers" class="cards" :class="{ centered: !savedDecks.length }">
      <router-link :to="{ name: 'Deck', params: { id: deck.id } }" :key="deck.id" v-for="deck in savedDecks">
        <deck-cover :deck="deck" />
      </router-link>
      <deck-cover @click="newDeck" />
    </section>
    <p class="info" v-if="savedDecks.length === 0">Click the PLUS to create a new deck of cards.</p>

    <div id="popup" v-show="popup">
      <div class="popup-content">
        <NewDeckForm @save="popup = false" @close="popup = false" />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DeckCover from '@/components/deck-cover.vue'
import NewDeckForm from '@/components/new-deck-form.vue'

@Component({
  components: { NewDeckForm, DeckCover }
})
export default class Home extends Vue {
  private popup = false
  private savedDecks: Deck[];

  constructor () {
    super()
    this.savedDecks = this.$storage.decks
  }

  private editDeck (deck: Deck) {
    console.log('would edit deck', deck.name, 'now')
  }

  private newDeck () {
    this.popup = true
  }
}
</script>

<template>
  <main name="deck" class="loading" v-if="loading">
    <header>...wait for it...</header>
    <router-link to="/">« or go back if you're impatient</router-link>
  </main>

  <main name="deck" class="not-found" v-else-if="notFound">
    <header>Deck not found</header>
    <router-link to="/">« lets go back home</router-link>
  </main>

  <main name="deck" :class="{ popup }" v-else>
    <div class="deck-bg">
      <img :src="deckIcon" />
    </div>

    <header>
      <span>{{ deck.name }}</span>
      <button class="edit-button" @click="popup = 'edit'">edit</button>
      <button class="print-button" @click="popup = 'print'">print</button>

      <p>{{ deck.description }}</p>
    </header>

    <section name="deck-cards" class="cards" :class="{ centered: !deck.cards.length }">
      <deck-card v-for="(card, i) in deck.cards"
        :key="card.id"
        :card="card"
        :deck="deck"
        :is-selection="card === selection"
        @click="selection = card"
        @close="selection = null"
        @edit="editCard(card, $event.field, $event.value)"
        @delete="removeCard(i)"
      />
      <deck-cover @click="newCard" />
    </section>

    <div id="popup" v-if="popup === 'edit'">
      <div class="popup-content">
        <EditDeckForm
          :deck="deck"
          @save="closeAndReload"
          @close="popup = false"
        />
      </div>
    </div>

    <div id="popup" v-else-if="popup === 'print'">
      <div class="popup-content">
        <PrintDeckForm
          :deck="deck"
          @save="closeAndReload"
          @close="popup = false"
        />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DeckCover from '@/components/deck-cover.vue'
import DeckCard from '@/components/deck-card.vue'
import EditDeckForm from '@/components/edit-deck-form.vue'
import PrintDeckForm from '@/components/print-deck-form.vue'
import { iconPath, defaultCard } from '@/lib'

@Component({
  components: { DeckCover, DeckCard, EditDeckForm, PrintDeckForm }
})
export default class DeckView extends Vue {
  private popup = false
  private notFound = false
  private loading = true
  private deck: Deck | null = null
  private selection: Card | null = null

  private mounted () {
    const currentDeckId = this.$route.params.id
    this.deck = this.$storage.findDeck(currentDeckId)
    if (this.deck === null) this.notFound = true
    this.loading = false
  }

  private get deckIcon () {
    if (this.deck === null) return ''
    return iconPath(this.deck.icon)
  }

  private closeAndReload () {
    this.deck = this.$storage.findDeck(this.deck?.id || '')
    this.selection = null
    this.popup = false
  }

  private newCard () {
    if (this.deck === null) return

    const newCard = defaultCard()
    newCard.content = {
      time: Date.now(),
      blocks: [{
        type: 'heading',
        data: {
          text: 'Next Level RPG Card',
          level: 2
        }
      }, {
        type: 'delimiter',
        data: { variant: 'pointing-left' }
      }, {
        type: 'paragraph',
        data: { text: 'This card is a rich text editor so you can basically do whatever you want.' }
      }, {
        type: 'paragraph',
        data: { text: ' ' }
      }, {
        type: 'paragraph',
        data: { text: 'You see that delimiter over there? It seems to be wrong, or maybe you like it that way. In any way you can change it by clicking on it and then on the little tool button on the right.' }
      }],
      version: '2.17.0'
    }
    this.deck.cards.push(newCard)
    this.$storage.persist()

    this.$nextTick(() => {
      this.selection = newCard
    })
  }

  private editCard<Card, K extends keyof Card> (card: Card, field: K, value: Card[K]) {
    card[field] = value
    this.$storage.persist()
  }

  private removeCard (index: number) {
    if (this.deck === null) return
    if (this.deck.cards.length - 1 < index) return

    const userIsSure = confirm('Are you sure you want to permanently delete this card?')
    if (!userIsSure) return

    this.deck.cards.splice(index, 1)
    this.$storage.persist()
    this.closeAndReload()
  }
}
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

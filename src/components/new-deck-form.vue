<template>
  <div id="new-deck-form" class="deck">
    <header>Create a new deck of cards</header>
    <DeckForm :deck="newDeck" @save="saveDeck" @close="$emit('close')" />
    <footer class="centered">You can also <button @click="importDeck">import</button> an existing set.</footer>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Vue } from 'vue-property-decorator'
import { Deck } from '@/types'
import DeckForm from './deck-form.vue'
import { defaultDeck, randomId, isValidDeck } from '../lib'

@Component({
  components: { DeckForm }
})
export default class NewDeckForm extends Vue {
  private newDeck: Deck = defaultDeck()

  private importDeck () {
    const newFileSelector = document.createElement('input')
    newFileSelector.setAttribute('type', 'file')

    newFileSelector.onchange = event => {
      if (event === null) return
      const fileList = (event.target as HTMLInputElement).files
      if (fileList === null || fileList.length < 1) return
      const file = fileList[0]
      if (!file) return

      const seemsToBeJSON = file.type === 'application/json'
      // TODO: more checks?
      let fileOk = seemsToBeJSON

      if (!seemsToBeJSON) {
        fileOk = window.confirm(`This seems to be wrong file type (${file.type}). Should be JSON. Import anyway?`)
      }

      if (!fileOk) return

      file.text().then((text: string) => {
        const json = JSON.parse(text)
        if (!isValidDeck(json)) window.alert('Sorry, that did\'t seem to be a valid deck.')
        else this.$emit('save', this.$storage.saveDeck(json))
      })
    }

    newFileSelector.click()
  }

  @Emit('save')
  private saveDeck (deck: Deck) {
    deck.id = randomId() // just to make sure
    this.$storage.saveDeck(deck)
  }
}
</script>

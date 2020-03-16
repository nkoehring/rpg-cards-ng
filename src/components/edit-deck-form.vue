<template>
  <div id="edit-deck-form" class="deck">
    <header>Deck Config</header>
    <DeckForm :deck="deck" @save="saveDeck" @close="$emit('close')" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from 'vue-property-decorator'
import DeckForm from './deck-form.vue'

@Component({
  components: { DeckForm }
})
export default class EditDeckForm extends Vue {
  @Prop() public readonly deck!: Deck

  @Emit('save')
  private saveDeck (deck: Deck) {
    this.$storage.saveDeck(deck)
  }
}
</script>

<template>
  <ul>
    <li v-for="(param, i) in params"
    :key="`param${i}`"
    v-editable:[i]="editable"
    @keydown="handleKey(i, $event)">
      {{ param }}
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class DeckCardBulletList extends Vue {
  @Prop() public readonly params!: string[]
  @Prop() public readonly editable!: boolean

  private addEntry (index: number) {
    const newParams = [...this.params]
    newParams.splice(index + 1, 0, '')
    this.$emit('replace', newParams)
  }

  private removeEntry (index: number) {
    const newParams = [...this.params]
    newParams.splice(index, 1)
    this.$emit('replace', newParams)
  }

  private handleKey (index: number, event: KeyboardEvent) {
    const { key, shiftKey } = event
    if (key === 'Enter' && shiftKey) {
      event.preventDefault()
      this.addEntry(index)
    } else if (key === 'Backspace') {
      const text = (event.target as HTMLElement).innerText
      if (text.trim() === '') this.removeEntry(index)
    }
  }
}
</script>

<style scoped>
ul {
  list-style-position: inside;
  margin: 0;
  padding-left: .5em;
}
</style>

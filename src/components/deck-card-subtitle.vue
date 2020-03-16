<template>
  <h3 :contenteditable="editable"
  @keypress.enter.prevent="$emit('edit', { param: 0, value: $event.target.innerText })">
    {{ params[0] }}
  </h3>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class DeckCardSubtitle extends Vue {
  @Prop() public readonly params!: string[]
  @Prop() public readonly editable!: boolean
}
</script>

<style scoped>
h3 {
  font-size: 1.4rem;
  color: var(--highlight-color);
  margin: 0;
  font-weight: normal;
}
</style>

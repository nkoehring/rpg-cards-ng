<template>
  <p>
    <span class="title">{{ params[0] }}</span>
    <span class="description">{{ params[1] }}</span>
  </p>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class DeckCardProperty extends Vue {
  @Prop() public readonly params!: string[]
}
</script>

<style scoped>
p { margin: 0 0 0 1em; line-height: 1.2; text-indent: -1em; }
p > .title { font-weight: bold; }
p > .title::after { content: ' '; }
</style>

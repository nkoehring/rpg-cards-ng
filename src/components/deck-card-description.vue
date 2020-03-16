<template>
  <p>
    <span class="title">{{ params[0] }}</span>
    <span>{{ params[1] }}</span>
  </p>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class DeckCardDescription extends Vue {
  @Prop() public readonly params!: string[]
}
</script>

<style scoped>
p { margin: 0; line-height: 1.2; }
p > .title { font-weight: bold; font-style: italic; }
p > .title::after { content: ' '; }
</style>

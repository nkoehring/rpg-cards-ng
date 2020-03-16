<template>
  <p>{{ params[0] }}</p>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class DeckCardNote extends Vue {
  @Prop() public readonly params!: string[]
}
</script>

<style scoped>
p { margin: 0 0 .5em 0; line-height: 1.2; font-style: italic; }
</style>

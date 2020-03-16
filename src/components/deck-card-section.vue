<template>
  <h4>{{ params[0] }}</h4>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class DeckCardSection extends Vue {
  @Prop() public readonly params!: string[]
}
</script>

<style scoped>
h4 {
  font-size: 1.4rem;
  color: var(--highlight-color);
  margin: 0 0 .2em 0;
  font-weight: normal;
  font-variant: small-caps;
  line-height: .9em;
  border-bottom: 1px solid var(--highlight-color);
}
</style>

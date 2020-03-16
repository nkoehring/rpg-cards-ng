<template>
  <div :style="{flex: params[0]}"> </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class DeckCardFill extends Vue {
  @Prop() public readonly params!: string[]
}
</script>

<style scoped>
div {
  flex: 1;
}
</style>

<template>
  <hr :class="params[0]" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class DeckCardRule extends Vue {
  @Prop() public readonly params!: string[]
}
</script>

<style scoped>
hr {
  height: 0;
  margin: .2em 0;
  border: 2px solid var(--highlight-color);
}
hr.pointing-right {
  height: 0;
  margin: .2em 0;
  border-style: solid;
  border-width: 2px 0 2px 220px;
  border-color: transparent transparent transparent var(--highlight-color);
}
hr.pointing-left {
  height: 0;
  margin: .2em 0;
  border-style: solid;
  border-width: 2px 220px 2px 0;
  border-color: transparent var(--highlight-color) transparent transparent;
}
</style>

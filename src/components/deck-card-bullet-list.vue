<template>
  <ul>
    <li :key="param" v-for="param in params">{{ param }}</li>
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class DeckCardBulletList extends Vue {
  @Prop() public readonly params!: string[]
}
</script>

<style scoped>
ul {
  list-style-position: inside;
  margin: 0;
  padding-left: .5em;
}
</style>

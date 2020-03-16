<template>
  <ol>
    <li :key="n" v-for="n in amount" :style="style"> </li>
  </ol>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class DeckCardBoxes extends Vue {
  @Prop() public readonly params!: string[]

  private get amount () {
    return parseInt(this.params[0], 10)
  }

  private get style () {
    const size = parseFloat(this.params[1])
    return {
      width: `calc(${size}em - 0.25em)`,
      height: `calc(${size}em - 0.25em)`
    }
  }
}
</script>

<style scoped>
ol {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  list-style: none;
  margin: 0 0 1em 0;
  padding: 0;
}
ol > li {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  font-size: 1rem;
  margin: 0 .3em .3em 0;
  border: 0.25em solid var(--highlight-color);
}
</style>

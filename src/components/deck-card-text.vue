<template>
  <p v-editable:0="editable">{{ params[0] }}</p>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class DeckCardText extends Vue {
  @Prop() public readonly params!: string[]
  @Prop() public readonly editable!: boolean
}
</script>

<style scoped>
p { margin: 0 0 .5em 0; line-height: 1.2; }
</style>

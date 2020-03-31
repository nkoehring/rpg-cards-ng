<template>
  <div class="menu-bar" :class="{ active }">
    <button class="editor-button-bold" :class="{ active: value.bold }" @click="menuAction('bold')" />
    <button class="editor-button-italic" :class="{ active: value.italic }" @click="menuAction('italic')" />

    <button class="editor-button-paragraph" :class="{ active: value.paragraph }" @click="menuAction('paragraph')" />
    <button class="editor-button-heading2" :class="{ active: value.heading2 }" @click="menuAction('heading2')" />
    <button class="editor-button-heading3" :class="{ active: value.heading3 }" @click="menuAction('heading3')" />

    <button class="editor-button-bullet-list" :class="{ active: value.bulletList }" @click="menuAction('bulletList')" />
    <button class="editor-button-horizontal-rule" :class="{ active: value.separator}" @click="menuAction('separator')" />
    <button class="editor-button-horizontal-rule" :class="{ active: value.spacer}" @click="menuAction('spacer')" />

    <button class="editor-button-stat-block" :class="{ active: value.statBlock }" @click="menuAction('statBlock')" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { blocks, State } from '@/editor.ts'

@Component
export default class DeckCardEditorMenu extends Vue {
  @Prop() public readonly active!: boolean
  @Prop() public readonly value!: State

  private menuAction (name: string) {
    const newState = { ...this.value }

    if (blocks.indexOf(name) >= 0) { // blocks behave like radio buttons
      blocks.forEach(block => {
        newState[block] = false
      })
      newState[name] = true
    } else { // marks behave like checkboxes
      newState[name] = !newState[name]
    }

    this.$emit('input', newState)
    this.$emit('action', name)
  }
}
</script>

<style scoped>
.card-front > main > .menu-bar {
  position: absolute;
  width: 70%;
  margin: -3rem 0 0 -1rem;
  padding: .2rem 1rem;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.2s, visibility 0.2s;
  background-color: var(--highlight-color);
  z-index: 2;
}
.card-front > main > .menu-bar.active {
  opacity: 1.0;
  visibility: visible;
}
.menu-bar > button {
  position: relative;
  width: 1.6rem;
  height: 1.6rem;
  margin: 0 .1rem;
  background-color: #EEE;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 75%;
  border: none;
  border-radius: 0;
}
.menu-bar > button:after {
  position: absolute;
  top: 0;
  left: 0;
  height: 1.6rem;
  width: 1.6rem;
  font-size: 1.2rem;
  color: black;
}
.menu-bar > button.active {
  background-color: #FF0;
}
.editor-button-bold { background-image: url(../assets/zondicons/format-bold.svg); }
.editor-button-italic { background-image: url(../assets/zondicons/format-italic.svg); }
.editor-button-bullet-list { background-image: url(../assets/zondicons/list-bullet.svg); }

.editor-button-heading2:after { content: 'H2'; }
.editor-button-heading3:after { content: 'H3'; }
.editor-button-paragraph:after { content: 'P'; }
.editor-button-horizontal-rule:after { content: '—'; }

.editor-button-stat-block:after { content: 'ST'; }
</style>

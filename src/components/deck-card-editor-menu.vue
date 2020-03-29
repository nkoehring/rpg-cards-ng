<template>
  <editor-menu-bar :editor="editor" v-slot="{ commands, isActive, focused }">
    <div class="menu-bar" :class="{ active: focused }">
      <button class="editor-button-bold" :class="{ active: active.bold }" @click="menuAction('bold', commands.bold, isActive)" />
      <button class="editor-button-italic" :class="{ active: active.italic }" @click="menuAction('italic', commands.italic, isActive)" />

      <button class="editor-button-paragraph" :class="{ active: active.paragraph }" @click="menuAction('paragraph', commands.paragraph, isActive)" />
      <button class="editor-button-heading2" :class="{ active: active.heading2 }" @click="menuAction('heading2', commands.heading({ level: 2}), isActive)" />
      <button class="editor-button-heading3" :class="{ active: active.heading3 }" @click="menuAction('heading3', commands.heading({ level: 3}), isActive)" />

      <button class="editor-button-bullet-list" :class="{ active: active.bullet_list }" @click="menuAction('bullet_list', commands.bullet_list, isActive)" />
      <button class="editor-button-horizontal-rule" :class="{ active: active.horizontal_rule }" @click="menuAction('horizontal_rule', commands.horizontal_rule, isActive)" />

      <button class="editor-button-stat-block" :class="{ active: active.stat_block }" @click="menuAction('stat_block', commands.stat_block, isActive)" />
    </div>
  </editor-menu-bar>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Editor, EditorMenuBar } from 'tiptap'

@Component({
  components: { EditorMenuBar }
})
export default class DeckCardEditorMenu extends Vue {
  @Prop() public readonly editor!: Editor

  private active: {[key: string]: boolean} = {
    bold: false,
    italic: false,

    paragraph: false,
    heading2: false,
    heading3: false,

    bulletList: false,
    horizontalLule: false
  }

  private menuAction (name: string, command: () => void, isActive: {[key: string]: () => boolean}) {
    command()

    Object.keys(this.active).forEach(action => {
      this.active[action] = isActive[action]()
    })
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

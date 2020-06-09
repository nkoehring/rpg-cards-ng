<template>
  <div
  :id="card.id"
  class="flip-card card"
  :class="{ active: isSelection }"
  :style="containerStyle"
  @click="clickUnlessSelected">
    <div class="active-background" @click.self.stop="$emit('close')" />
    <button class="action-close" @click.self.stop="$emit('close')" v-if="isSelection" />
    <section name="card-front" class="card-front">
      <header>
        <h1 :contenteditable="isSelection"
        @blur="editField('name', $event)"
        @keypress.enter.prevent="editField('name', $event)">
          {{ card.name }}
        </h1>
        <img :src="icon" />
      </header>
      <deck-card-editor
        :card-id="card.id"
        :active="isSelection"
        :content="card.content"
        @change="$emit('edit', $event)"
      />
    </section>
    <section name="card-back" class="card-back">
      <div class="icon-wrapper">
        <img :src="backIcon" />
      </div>
      <button @click="$emit('click')">edit card</button>
      <button @click="$emit('delete')">delete card</button>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Deck, Card } from '@/types'
import { cardSizeToStyle, iconPath } from '@/lib'
import DeckCardEditor from '@/components/deck-card-editor.vue'

@Component({
  components: { DeckCardEditor }
})
export default class DeckCard extends Vue {
  @Prop() public readonly card!: Card
  @Prop() public readonly deck!: Deck
  @Prop() public readonly isSelection!: boolean

  /// TODO: onEdit
  // this.$emit('edit', { field: 'content', value: doc.content })

  private editHeadline = false;
  private editFieldIndex: number | null = null;

  private clickUnlessSelected () {
    if (this.isSelection) return
    this.$emit('click')
  }

  private editField (field: string, event: Event) {
    if (event.target === null) return
    const target = event.target as HTMLElement
    const payload = { field, value: target.innerText }
    this.$emit('edit', payload)
  }

  private get icon () {
    const icon = this.card.icon || this.deck.icon
    return iconPath(icon)
  }

  private get backIcon () {
    const icon = this.card.backIcon || this.deck.icon
    return iconPath(icon)
  }

  private get containerStyle () {
    const style = {
      '--highlight-color': this.card.color || this.deck.color,
      ...cardSizeToStyle(this.deck.cardSize),
      transform: ''
    }

    const selected = this.isSelection
    const hasElement = this.$el

    if (selected && hasElement) {
      const el = this.$el.getBoundingClientRect()
      const wWidth = window.innerWidth
      const wHeight = window.innerHeight
      let scale = Math.min(2, wWidth / el.width)

      const dH = wHeight / el.height
      if (dH < scale) {
        // leave some space if scaled card would otherwise fill top to bottom
        // so that we can fit controls
        scale = dH - dH * 0.1
      }

      console.log('scale', scale)

      const dx = Math.round(wWidth / 2.0 - el.x - el.width / 2.0)
      const dy = Math.round(wHeight / 2.0 - el.y - el.height / 2.0)

      style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`
    }

    return style
  }
}
</script>

<style scoped>
.flip-card {
  position: relative;
  perspective: 600px;
  transition: transform .2s ease-out .4s;
}
.flip-card > .active-background {
  display: none;
  position: fixed;
  top: -100vh;
  left: -100vw;
  width: 200vw;
  height: 200vh;
  background-color: #0008;
}
.flip-card.active {
  z-index: 1;
}
.flip-card.active > .active-background {
  display: block;
}

.card-front, .card-back {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--highlight-color);
  transform: rotateX(0) rotateY(0);
  transform-style: preserve-3d;
  backface-visibility: hidden;
  transition: transform .4s ease-out;
  overflow: hidden;
}
.flip-card:not(.active):hover > .card-front {
  transform: rotateX(0) rotateY(179deg);
}
.card-back {
  z-index: 2;
  transform: rotateX(0) rotateY(-179deg);
}
.flip-card:not(.active):hover > .card-back {
  z-index: 2;
  transform: rotateX(0) rotateY(0);
}

.card-front {
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  z-index: 1;
}
.card-front > header {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  height: 3.6rem;
  color: white;
  font-size: 1.2rem;
  font-weight: normal;
  font-variant: small-caps;
  padding: 0 1em;
  text-align: left;
}
.card-front > header > h1 {
  margin: .5em 0 0 0;
  align-self: center;
  line-height: .9em;
  font-size: 2rem;
}
.card-front > header > img {
  height: 3rem;
  align-self: end;
}
.card-front > header > h1[contenteditable="true"] { text-decoration: underline dotted; }
.card-front > header > h1[contenteditable="true"]:focus { text-decoration: none; }

.card-front > main {
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  flex: 1;
  height: 100%;
  margin: .7rem .4rem .5rem;
  padding: .2rem 1rem;
  background: white;
  border-radius: 1rem;
  font-size: 1.2rem;
  color: black;
  overflow: hidden;
}

.card-back {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  cursor: pointer;
}
.card-back > .icon-wrapper {
  margin: 3em;
}
.card-back > button {
  width: 80%;
  margin: .1rem auto;
}

.action-close {
  position: absolute;
  top: 0;
  right: 0;
  width: 3rem;
  height: 3rem;
  margin-top: -3rem;
}

 @media screen and (orientation:landscape) {
   .action-close {
      top: 3rem;
      right: -3rem;
   }
 }
</style>

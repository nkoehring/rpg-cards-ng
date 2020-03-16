<template>
  <div
  :id="card.id"
  class="flip-card card"
  :class="{ active: isSelection }"
  :style="containerStyle"
  @click="clickUnlessSelected">
    <section name="card-front" class="card-front">
      <header>
        <h2 :contenteditable="isSelection"
        @keypress.enter.prevent="editField('name', $event)">
          {{ card.name }}
        </h2>
        <img :src="icon" />
        <button class="edit-close" @click.self.stop="$emit('close')" v-if="isSelection" />
      </header>
      <main>
        <component v-for="(entry, i) in card.contents"
          :is="`deck-card-${entry.type}`"
          :key="`e${i}`"
          :params="entry.params"
          :editable="isSelection"
          @edit="editContent(i, $event)"
        />
      </main>
    </section>
    <section name="card-back" class="card-back">
      <div class="icon-wrapper">
        <img :src="backIcon" />
      </div>
      <p>click to edit</p>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { cardWHtoStyle, iconPath } from '@/lib'

import DeckCardSubtitle from './deck-card-subtitle.vue'
import DeckCardSection from './deck-card-section.vue'
import DeckCardRule from './deck-card-rule.vue'
import DeckCardProperty from './deck-card-property.vue'
import DeckCardDescription from './deck-card-description.vue'
import DeckCardText from './deck-card-text.vue'
import DeckCardNote from './deck-card-note.vue'
import DeckCardFill from './deck-card-fill.vue'
import DeckCardBulletList from './deck-card-bullet-list.vue'
import DeckCardBoxes from './deck-card-boxes.vue'
import DeckCardDndstats from './deck-card-dndstats.vue'

interface ContentEditEvent {
  param: number;
  value: string;
}

@Component({
  components: {
    DeckCardSubtitle,
    DeckCardSection,
    DeckCardRule,
    DeckCardProperty,
    DeckCardDescription,
    DeckCardText,
    DeckCardNote,
    DeckCardFill,
    DeckCardBulletList,
    DeckCardBoxes,
    DeckCardDndstats
  }
})
export default class DeckCard extends Vue {
  @Prop() public readonly card!: Card
  @Prop() public readonly deck!: Deck
  @Prop() public readonly isSelection!: boolean

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

  private editContent (index: number, event: ContentEditEvent) {
    const { param, value } = event
    const field = this.card.contents[index]
    const newContents = [...this.card.contents]

    field.params[param] = value
    newContents.splice(index, 1, field)

    const payload = { field: 'contents', value: newContents }
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
      ...cardWHtoStyle(this.deck.cardWidth, this.deck.cardHeight),
      transform: ''
    }

    if (this.isSelection && this.$el) {
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
.flip-card.active {
  z-index: 1;
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
  z-index: 0;
}
.card-front {
  z-index: 1;
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
.card-front > header > h2 {
  margin: 0;
  align-self: end;
  line-height: .9em;
}
.card-front > header > img {
  height: 3rem;
  align-self: end;
}
.card-front > main {
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
.card-front > main > .entry.fill {
  display: none;
}
.card-front > main > .entry.text > span {
  display: block;
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
.card-back > p {
  position: absolute;
  bottom: -12%;
  width: 100%;
  text-align: center;
}

.edit-close {
  position: absolute;
  top: 0;
  left: calc(25vw + 1.5rem);
  width: 3rem;
  height: 3rem;
  margin-top: -3rem;
}

[contenteditable="true"] {
  position: relative;
}
[contenteditable="true"]::after {
  content: ' ';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border-bottom: 1px dotted white;
  mix-blend-mode: difference;
}
[contenteditable="true"]:focus::after {
  border-bottom: none;
}
</style>

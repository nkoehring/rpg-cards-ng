<template>
  <section name="card-front" class="card card-front" :style="cssVars">
    <header>
      <h1>{{ card.name }}</h1>
      <img :src="iconPath" />
    </header>
    <main ref="cardEl" class="card-content" />
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { KV } from '@/types'
import { cardCSSVars } from '@/lib/card'
import iconPath from '@/lib/iconPath'

import Editor from '@editorjs/editorjs'
import List from '@editorjs/list'
import { Heading, Delimiter, Charges, DnDStats } from '@/editor'

const editorjsConfig = {
  autofocus: false,
  hideToolbar: true,
  tools: {
    list: { class: List, inlineToolbar: false },
    heading: { class: Heading, inlineToolbar: false },
    delimiter: { class: Delimiter, inlineToolbar: false },
    charges: { class: Charges, inlineToolbar: false },
    dndstats: { class: DnDStats, inlineToolbar: false }
  },
  onReady: () => {
    console.log('editor is ready, what to do?')
  }
}

export default defineComponent({
  name: 'CardFront',
  props: {
    card: Object,
    icon: String,
    color: String,
    size: String
  },
  setup (props) {
    const cardEl = ref(document.createElement('main'))
    const editor = new Editor({
      holder: cardEl.value,
      data: props.card?.content || {},
      ...editorjsConfig
    })

    console.log('card content', props.card?.content)

    return { cardEl }
  },
  computed: {
    iconPath (): string {
      const icon = this.card?.icon || this.icon || 'plus'
      return iconPath(icon)
    },
    cssVars (): KV<string> {
      return cardCSSVars(this.size, this.color)
    }
  }
})
</script>

<style scoped src="@/assets/card.css" />

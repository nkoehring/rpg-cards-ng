<template>
  <form class="options-form" @submit.prevent="saveDeck">
    <div class="deck-form-fields">
      <select v-model="icon">
        <option :key="iconName" :value="iconName" v-for="iconName in icons">{{ iconName }}</option>
      </select>

      <input v-model="name" title="deck name" placeholder="give it a name" />
      <input v-model="description" title="deck description" placeholder="the most awesome deck of cards" />

      <p>Pick a colour: <input type="color" v-model="color" /></p>

      <select v-model="cardSize">
        <option :key="size.value" :value="size.value" v-for="size in sizes">{{ size.title }}</option>
      </select>

      <button type="submit">Save deck</button>
      <button class="cancel" @click.prevent="$emit('cancel')">cancel</button>
    </div>

    <DeckCard :deck="{ icon, name, description, color, cardSize, cards: [] }" />
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useState } from '@/state'
import { cardSizeOptions, defaultCardSize } from '@/consts'
import DeckCard from '@/components/DeckCard.vue'

export default defineComponent({
  components: { DeckCard },
  props: {
    deck: Object
  },
  data () {
    const icons = useState('icons').collection

    return {
      icons,
      sizes: cardSizeOptions,
      icon: icons[0],
      name: 'no-name deck',
      description: '',
      color: '#3C1C00',
      cardSize: defaultCardSize
    }
  },
  watch: {
    deck (deck) {
      if (deck === undefined) return
      this.icon = deck.icon
      this.name = deck.name
      this.description = deck.description
      this.color = deck.color
      this.cardSize = deck.cardSize
    }
  },
  methods: {
    saveDeck () {
      const { icon, name, description, color, cardSize } = this
      this.$emit('save', { icon, name, description, color, cardSize })
    }
  }
})
</script>

<template>
  <Card :icon="deck.icon" :color="deck.color" :size="deck.cardSize">
    <template #back>{{ deck.name }} ({{ deck.cards.length }})</template>
  </Card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Card from '@/components/Card.vue'

export default defineComponent({
  components: { Card },
  props: {
    deck: Object
  }
})
</script>

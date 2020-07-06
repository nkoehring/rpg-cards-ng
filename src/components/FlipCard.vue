<template>
  <div class="flip-card card">
    <CardFront :card="card" :icon="icon" :color="color" :size="size" />
    <CardBack :icon="card.icon || icon" :color="card.color || color" :size="size">
      <button @click="$emit('click')">edit card</button>
      <button @click="$emit('delete')">delete card</button>
    </CardBack>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CardFront from '@/components/CardFront.vue'
import CardBack from '@/components/CardBack.vue'

export default defineComponent({
  name: 'FlipCard',
  components: { CardFront, CardBack },
  props: {
    card: Object,
    icon: String,
    color: String,
    size: String
  }
})
</script>

<style scoped>
.flip-card {
  position: relative;
  perspective: 600px;
  transition: transform .2s ease-out .4s;
}
.flip-card.card {
  border: none;
  box-shadow: none;
}
.flip-card.card > .card {
  margin: 0;
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
.flip-card:not(.active):hover > .card-back {
  z-index: 2;
  transform: rotateX(0) rotateY(0);
}

.card-front {
  z-index: 1;
}
.card-front h1[contenteditable="true"] { text-decoration: underline dotted; }
.card-front h1[contenteditable="true"]:focus { text-decoration: none; }

.card-back {
  cursor: pointer;
  z-index: 2;
  transform: rotateX(0) rotateY(-179deg);
}
.card-back button {
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

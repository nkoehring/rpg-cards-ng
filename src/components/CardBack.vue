<template>
  <section name="card-back" class="card card-back" :style="cssVars">
    <div class="icon-wrapper">
      <img :src="iconPath" alt="card icon" />
    </div>
    <footer><slot></slot></footer>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { KV } from '@/types'
import { cardCSSVars } from '@/lib/card'
import iconPath from '@/lib/iconPath'

export default defineComponent({
  name: 'CardBack',
  props: {
    icon: String,
    color: String,
    size: String
  },
  computed: {
    iconPath (): string {
      const icon = this.icon || 'plus'
      return iconPath(icon)
    },
    cssVars (): KV<string> {
      return cardCSSVars(this.size, this.color)
    }
  }
})
</script>

<style scoped>
.card-back {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  text-align: center;
  line-height: 4rem;
  font-size: 2rem;
}
.card-back > footer {
  font-size: 2rem;
  margin: 1rem 0;
}
#_add.card-back {
  height: var(--card-height);
  width: 25rem;
  border: none;
  box-shadow: none;
}
#_add.card-back > footer {
  display: none;
}
.card-back > .icon-wrapper {
  width: 70%;
  margin: auto;
}
</style>

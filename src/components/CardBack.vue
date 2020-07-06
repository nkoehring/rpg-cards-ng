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
import { KV, ICard } from '@/types'
import { CardSize, defaultCardSize } from '@/consts'
import { cardSizeToStyle } from '@/lib/card'
import iconPath from '@/lib/iconPath'

export default defineComponent({
  name: 'Card',
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
    showBackSide (): boolean {
      return true
    },
    showFrontSide (): boolean {
      return false
    },
    cssVars (): KV<string> {
      const backgroundColor = this.color || 'transparent'
      const size = this.size as CardSize || defaultCardSize
      return {
        backgroundColor,
        ...cardSizeToStyle(size)
      }
    }
  }
})
</script>

<style scoped>
.card-back {
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-evenly;
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
  width: 90%;
  margin: auto;
}
</style>

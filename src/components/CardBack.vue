<template>
  <div class="icon-wrapper">
    <img :src="iconPath" alt="card icon" />
  </div>
  <slot></slot>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import iconPath from '@/lib/iconPath'

export default defineComponent({
  name: 'CardBack',
  props: {
    icon: String,
    color: String
  },
  setup (props) {
    return {
      iconPath: computed(() => iconPath(props.icon || 'plus'))
    }
  }
})
</script>

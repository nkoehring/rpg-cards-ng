<template>
  <h1>Welcome {{ name }}</h1>
  <p>This is a placeholder view.</p>
</template>

<script lang="ts">
import { defineComponent } from "vue"

const name = 'Print'

export default defineComponent({
  setup() {
    return { name }
  }
})
</script>

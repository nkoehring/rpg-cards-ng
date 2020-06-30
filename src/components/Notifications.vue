<template>
  <transition-group name="notifications" tag="section" class="notification-section">
    <p class="note" :class="note.level" v-for="note in notifications">
      <strong>{{ note.title }}</strong>
      <div v-html="note.content" />
      <button @click="$emit('dismiss', note)">dismiss</button>
    </p>
  </transition-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Notification } from '@/types'

export default defineComponent({
  name: 'Notifications',
  props: {
    notifications: Array
  }
})
</script>

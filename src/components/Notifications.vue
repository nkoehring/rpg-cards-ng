<template>
  <section name="notifications">
    <p class="note" :class="note.level" v-for="note in notDismissedNotes">
      <strong>{{ note.title }}</strong>
      <div v-html="note.content" />
      <button @click="$emit('dismiss', note)">dismiss</button>
    </p>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Notification } from '@/types'

export default defineComponent({
  name: 'Notifications',
  props: {
    notifications: Array
  },
  computed: {
    notDismissedNotes (): Notification[] {
      const notes = this.notifications as Notification[]
      return notes.filter(note => !note.dismissed)
    }
  }
})
</script>

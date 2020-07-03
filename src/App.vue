<template>
  <router-link class="home-link" to="/">
    <Logo />
  </router-link>

  <Notifications :notifications="notifications" @dismiss="dismissNotification" />

  <main>
    <router-view />
  </main>

  <div id="popup" v-show="popupShown">
    <div class="popup-content">
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { useState } from '@/state'
import Logo from '@/components/Logo.vue'
import Notifications from '@/components/Notifications.vue'

export default defineComponent({
  setup () {
    const { collection: popupShown } = useState('popup')
    const { collection: notifications, actions: notificationActions } = useState('notifications')
    return {
      popupShown,
      notifications,
      addNotification: notificationActions.add,
      dismissNotification: notificationActions.dismiss,
    }
  },
  components: { Notifications, Logo },
  data () {
    return {
      showPopup: false
    }
  },
  watch: {
    '$route' (newRoute) {
      const bodyEl = document.body
      bodyEl.className = "" // TODO: is this really the way to go here?

      const bodyClass = newRoute.meta.bodyClass
      if (bodyClass) bodyEl.classList.add(bodyClass)
    }
  },
  mounted () {
    this.addNotification({
      level: 'warning',
      title: 'This is a pre-alpha version.',
      content: 'Many features are still unstable or completely missing. Check out <a href="https://github.com/nkoehring/rpg-cards-ng/">the code repository</a> for more information.'
    })

    this.addNotification({
      content: 'Click the PLUS to create a new deck of cards.'
    })
  }
})
</script>

<style src='@/assets/app.css' />

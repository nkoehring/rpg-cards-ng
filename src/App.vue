<template>
  <router-link class="home-link" to="/">
    <Logo />
  </router-link>

  <Notifications :notifications="notifications" @dismiss="dismissNotification" />

  <main :name="routeName">
    <router-view />
  </main>

  <div id="popup" v-show="popupShown">
    <div class="popup-content"></div>
  </div>
  <div id="loading-popup" v-show="loading">
    <div class="popup-content spinner">
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
    const { collection: loading } = useState('loading')
    const { collection: popupShown } = useState('popup')
    const { collection: notifications, actions: notificationActions } = useState('notifications')
    return {
      loading,
      popupShown,
      notifications,
      addNotification: notificationActions.add,
      dismissNotification: notificationActions.dismiss,
    }
  },
  components: { Notifications, Logo },
  data () {
    return {
      routeName: 'home'
    }
  },
  watch: {
    // this adds a css class to the body equal to the name of the current root
    '$route' (newRoute, oldRoute) {
      const bodyEl = document.body
      const oldClass = oldRoute.name?.toLowerCase()
      const newClass = newRoute.name?.toLowerCase()
      this.routeName = newClass || ''

      if (oldClass) bodyEl.classList.remove(oldClass)
      if (newClass) bodyEl.classList.add(newClass)
    },
    loading (isLoading) {
      const bodyEl = document.body
      if (isLoading) bodyEl.classList.add('loading')
      else bodyEl.classList.remove('loading')
    },
    popupShown (isShown) {
      const bodyEl = document.body
      if (isShown) bodyEl.classList.add('popup')
      else bodyEl.classList.remove('popup')
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

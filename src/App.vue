<template>
  <div id="app">
    <router-link class="home-link" to="/">
      <Logo />
    </router-link>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Logo from '@/components/logo.vue'
@Component({
  components: { Logo }
})
export default class App extends Vue {
}
</script>

<style src="@/assets/app.css" />

<template>
  <div class="switch">
    <input :id="id" class="checkbox" type="checkbox" :checked="value" @change="$emit('input', !value)" />
    <label :for="id">
      <div class="switch-label-text">{{ label }}</div>
      <div class="switch-elements-wrapper">
        <div class="switch-elements">
          <div class="switch-element off"><slot name="off">NO</slot></div>
          <div class="switch-element btn"></div>
          <div class="switch-element on"><slot name="on">YES</slot></div>
        </div>
      </div>
    </label>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class FlipSwitch extends Vue {
  @Prop() public readonly id!: string
  @Prop() public readonly value!: boolean
  @Prop() public readonly label!: string
}
</script>

<style scoped>
.switch > input {
  display: none;
}
.switch .switch-elements-wrapper {
  height: 2em;
  width: 4em;
  border: 4px solid black;
  border-radius: 2em;
  background-color: black;
  overflow: hidden;
}
.switch .switch-elements {
  display: flex;
  flex-flow: row nowrap;
  transition: transform .2s ease-in;
}
.switch .switch-element {
  height: 1.8em;
  width: 1.8em;
  margin: .1em;
  line-height: 1.8em;
  flex: 0 0 auto;
}
.switch .btn {
  background-color: gray;
  border-radius: 5em;
}

input.checkbox:checked + label .switch-elements-wrapper > .switch-elements {
  transform: translate(-2em, 0);
}
input.checkbox:checked + label .switch-elements-wrapper {
  box-shadow: 0 0 15px 2px green;
}
</style>

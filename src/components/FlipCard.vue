<template>
  <div :id="card && card.id" class="flip-card card" :style="cssVars">
    <section name="card-front" class="card-front" v-if="showFrontSide">
      <span>Front Side</span>
    </section>
    <section name="card-back" class="card-back" v-if="showBackSide">
      <div class="icon-wrapper">
        <img :src="iconPath" alt="card icon" />
      </div>
      <footer><slot name="back"></slot></footer>
    </section>
  </div>
</template>

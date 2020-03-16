<template>
  <main name="deck" class="loading" v-if="loading">
    <header>...wait for it...</header>
    <router-link to="/">« or go back if you're impatient</router-link>
  </main>

  <main name="deck" class="not-found" v-else-if="notFound">
    <header>Deck not found</header>
    <router-link to="/">« lets go back home</router-link>
  </main>

  <main name="deck" :class="{ popup }" v-else>
    <div class="deck-bg">
      <img :src="deckIcon" />
    </div>

    <header>
      <span>{{ deck.name }}</span>
      <button class="edit-button" @click="popup = true">edit</button>

      <p>{{ deck.description }}</p>
    </header>

    <section name="deck-cards" class="cards" :class="{ centered: !deck.cards.length }">
      <!--deck-cover :key="card.id" v-for="card in deck.cards" :card="deck" /-->
      <deck-card v-for="card in testCards"
        :key="card.id"
        :card="card"
        :deck="deck"
        :is-selection="card === selection"
        @click="selection = card"
        @close="selection = null"
      />
      <deck-cover @click="newCard" />
    </section>

    <div id="popup" v-show="popup">
      <div class="popup-content">
        <EditDeckForm
          :deck="deck"
          @save="closeAndReload"
          @close="popup = false"
        />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DeckCover from '@/components/deck-cover.vue'
import DeckCard from '@/components/deck-card.vue'
import EditDeckForm from '@/components/edit-deck-form.vue'
import { iconPath, defaultCard } from '@/lib'

@Component({
  components: { DeckCover, DeckCard, EditDeckForm }
})
export default class DeckView extends Vue {
  private popup = false
  private notFound = false
  private loading = true
  private deck: Deck | null = null
  private selection: Card | null = null

  private testCards: Card[] = [{
    id: 'foo',
    name: 'Hideous Laughter',
    count: 1,
    tags: ['foo', 'test'],
    icon: 'robe',
    contents: [
      { type: 'subtitle', params: ['1st Level Enchantment'] },
      { type: 'rule', params: ['pointing-right'] },
      { type: 'property', params: ['Casting Time', '1 Action'] },
      { type: 'property', params: ['Range', 'Self (15ft cone)'] },
      { type: 'property', params: ['Components', 'V,S,M*'] },
      { type: 'rule', params: ['pointing-left'] },
      { type: 'fill', params: ['2'] },
      { type: 'text', params: ['A creature of your choice that you can see within range perceives everything as hilariously funny if this spell affects it. The target must succeed on a Wisdom saving throw or fall prone, becoming incapacitated and unable to stand up for the duration. Only applies to creatures with Int 4 or higher.'] },
      { type: 'text', params: ['Either at the end of its turn or when taken damage, the target can make another Wisdom saving throw (with advantage if triggered by damage). On a success, the spell ends.'] },
      { type: 'fill', params: ['3'] },
      { type: 'note', params: ['* - (tiny tarts and a feather)'] }
    ]
  }, {
    id: 'fire',
    name: 'Burning Hands',
    count: 1,
    tags: ['fire', 'test'],
    icon: 'robe',
    contents: [
      { type: 'subtitle', params: ['1st Level Evocation'] },
      { type: 'rule', params: ['pointing-right'] },
      { type: 'property', params: ['Casting Time', '1 Action'] },
      { type: 'property', params: ['Range', 'Self (15ft cone)'] },
      { type: 'property', params: ['Components', 'V,S'] },
      { type: 'rule', params: ['pointing-left'] },
      { type: 'fill', params: [2] },
      { type: 'text', params: ['Each creature in a 15-foot cone must make a Dexterity saving throw. A creature takes 3d6 fire damage on a failed save, or half as much damage on a successful one.'] },
      { type: 'text', params: ['The fire ignites any flammable objects in the area that aren\'t being worn or carried.'] },
      { type: 'fill', params: [3] },
      { type: 'section', params: ['At higher levels'] },
      { type: 'text', params: ['+1d6 damage for each slot above 1st.'] }
    ]
  }, {
    id: 'wand',
    name: 'Wand of Magic Missiles',
    count: 1,
    tags: ['wand', 'test'],
    icon: 'robe',
    contents: [
      { type: 'subtitle', params: ['Wondrous Item'] },
      { type: 'rule', params: ['pointing-right'] },
      { type: 'property', params: ['Maximum charges', '7'] },
      { type: 'property', params: ['Recharge', '1d6+1 each day'] },
      { type: 'property', params: ['Depletion', 'If you expend the last charge, roll a d20. On a 1, the item is destroyed.'] },
      { type: 'rule', params: ['pointing-left'] },
      { type: 'fill', params: [2] },
      { type: 'description', params: ['Spells', 'You can use your action to cast the following spells:'] },
      { type: 'bullet-list', params: ['magic missile, 1st level (1 charge)', 'magic missile, 2nd level (2 charges)', 'magic missile, 3rd level (3 charges)'] },
      { type: 'fill', params: [3] },
      { type: 'boxes', params: [7, 2.5] }
    ]
  }, {
    id: 'goblin',
    name: 'Goblin',
    count: 1,
    tags: ['goblin', 'test'],
    icon: 'robe',
    contents: [
      { type: 'subtitle', params: ['Small humanoid (goblinoid)'] },
      { type: 'rule', params: ['pointing-right'] },
      { type: 'property', params: ['Armor Class', '15 (leather armor)'] },
      { type: 'property', params: ['Hit Points', '7 (2d6)'] },
      { type: 'rule', params: ['pointing-left'] },
      { type: 'dndstats', params: [8, 14, 10, 10, 8, 8] },
      { type: 'rule', params: ['pointing-left'] },
      { type: 'property', params: ['Skills', 'Stealth +6'] },
      { type: 'property', params: ['Challenge', '1/4 (50 XP)'] },
      { type: 'rule', params: ['pointing-left'] },
      { type: 'description', params: ['Nimble escape', 'Disengage or Hide as bonus action'] },
      { type: 'fill', params: [2] },
      { type: 'section', params: ['Actions'] },
      { type: 'description', params: ['Scimitar.', 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) slashing damage'] }
    ]
  }]

  private mounted () {
    const currentDeckId = this.$route.params.id
    this.deck = this.$storage.findDeck(currentDeckId)
    if (this.deck === null) this.notFound = true
    this.loading = false
  }

  private get deckIcon () {
    if (this.deck === null) return ''
    return iconPath(this.deck.icon)
  }

  private closeAndReload () {
    this.deck = this.$storage.findDeck(this.deck?.id || '')
    this.selection = null
    this.popup = false
  }

  private newCard () {
    if (this.deck === null) return

    const newCard = defaultCard()
    this.deck.cards.push(newCard)
    this.selection = newCard
  }
}
</script>

<style scoped>
.edit-button {
  vertical-align: middle;
  margin-left: 1em;
  margin-top: -2px;
}
.deck-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  max-height: 100vh;
  overflow: hidden;
  pointer-events: none;
}
.deck-bg > img {
  filter: saturate(0%) blur(5px) opacity(8%);
}
</style>

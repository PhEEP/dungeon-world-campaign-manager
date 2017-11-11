<template>
  <v-container fluid grid-list-lg>
      <span v-if="error">
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </span>
      <v-layout row wrap>
        <v-progress-linear v-bind:indeterminate="true" v-if="loading" color="accent"></v-progress-linear>
        <v-flex md3 v-for="(character, index) in createdCharacters" v-bind:key="index">
          <v-card>
            <v-card-media :src="character.avatar || 'http://placehold.it/200/200'" height="200px"></v-card-media>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{ character.name }}</h3>
                <div>{{ character.className }}</div>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn block color="secondary" @click="$router.push('/character/' + character.id)">View {{ character.name }}</v-btn>
              <v-btn color="error" @click.stop="promptDelete = true, deathRow = character.name, deathRowId = character.id"><v-icon>delete</v-icon></v-btn>
            </v-card-actions>
            <v-dialog v-model="promptDelete">
              <v-card>
                <v-card-title primary-title>
                  Delete {{ deathRow }}?
                </v-card-title>
                <v-card-text color="warning">
                  Deleting a character awefis irreversible!
                </v-card-text>
                <v-card-actions>
                  <v-btn block raised color="success" @click.stop="promptDelete=false">Go back</v-btn>
                  <v-btn icon color="error" dark @click="deleteCharacter(deathRowId)"><v-icon>delete</v-icon></v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card>
        </v-flex>
        <v-flex xs12 >
          <v-card dark tile color="error" v-if="characterCount >= 4"><v-card-text>You've hit max characters, kill one to give another life!</v-card-text></v-card>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-progress-linear v-bind:indeterminate="true" v-if="loading" color="accent"></v-progress-linear>
        <v-flex xs12 sm6 md4 lg3 xl2 v-for="cClass in characterClasses" v-bind:key="cClass.id">
          <v-card>
            <!-- <v-card-media height="200px" :src="cClass.classIcon" :title="cClass.classIconAttribution">
            </v-card-media> -->
            <v-layout row justify-space-around align-center>
              <img :src="cClass.classIcon" style="margin-top:1rem;height:200px;" alt="">
            </v-layout>
            <v-card-title primary-title >
              <h4 mb-0>{{ cClass.name }}</h4>
            </v-card-title>
            <v-card-actions v-if="characterCount < 4">
              <v-btn color="secondary" @click="$router.push('/characters/new/' + cClass.id)">View {{ cClass.name }}</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="accent" dark @click="$router.push('/characters/admin/' + cClass.id)" v-if="userIsAdmin">Manage</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
  </v-container>
</template>


<script>
export default {
  name: 'Characters',
  data () {
    return {
      characters: '',
      promptDelete: false,
      deathRow: ''
    }
  },
  computed: {
    createdCharacters () {
      return this.$store.getters.getCreatedCharacters
    },
    characterClasses () {
      return this.$store.getters.getCharacterClasses
    },
    loading () {
      return this.$store.getters.loading
    },
    characterCount () {
      return this.createdCharacters.length
    },
    error () {
      return this.$store.getters.error
    },
    userIsAdmin () {
      return this.$store.getters.getUserRole
    }
  },
  methods: {
    deleteCharacter (characterId) {
      this.$store.dispatch('deleteCharacter', characterId)
      this.promptDelete = false
    }
  },
  mounted () {
    this.$store.dispatch('getCreatedCharacters')
    this.$store.dispatch('getCharacterClasses')
  }
}
</script>

<style>

</style>

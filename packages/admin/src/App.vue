<template>
  <v-app>
    <v-content>
      <Applications/>
    </v-content>
  </v-app>
</template>

<script>

import Applications from './components/Applications'

export default {
  name: 'App',
  components: {
    
    Applications
  },
  data () {
    return {
      //
    }
  }
}
</script>

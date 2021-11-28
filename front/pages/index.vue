<template>
  <div>
    <button
      type="button"
      name="button"
      @click="getMsg"
      class="button"
    >
      RailsからAPIを取得する
    </button>
    <div
    >
      {{ hello.hello_string }}
      {{ hello.hello_text }}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      msgs: []
    }
  },
   computed: {
    ...mapState('hello', ['hello']),
  },
  methods: {
    getMsg () {
      this.$store.dispatch('hello/fetch')
    }
  }
}
</script>

<style lang="scss">
.button{
  color: red;
}
</style>

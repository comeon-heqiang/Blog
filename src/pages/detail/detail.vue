<template>
  <div>
    文章详情页
  </div>
</template>

<script>
export default {
  data () {
    return {
      id: 0
    }
  },
  onShow () {
    this.id = this.$root.$mp.query.id
  },
  created () {

  },
  methods: {

  },
}
</script>

<style scoped>
</style>
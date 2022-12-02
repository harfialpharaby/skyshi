<template>
  <div class="empty-state" :data-cy="dataCy">
    <b-img
      :src="imgSrc"
      alt="empty-state-image"
      class="h-100"
      @click.prevent="handleAddNewData"
    ></b-img>
  </div>
</template>

<script>
export default {
  name: 'EmptyState',
  props: {
    imgSrc: {
      default: require('@/assets/illustrations/activity-empty-state.webp')
    },
    dataCy: {
      type: String,
      default: 'todo-empty-state'
    }
  },
  methods: {
    handleAddNewData () {
      this.$emit('add')
    }
  },
}
</script>

<style scoped>
.empty-state {
  height: 490px;
}
</style>
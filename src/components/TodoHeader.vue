<template>
  <div class="todo-header">
    <h1 data-cy="activity-title">
      <slot name="title">
        {{ title }}
      </slot>
    </h1>
    <slot name="cta"></slot>
    <s-button
      :data-cy="addButtonDataCy"
      bg-color="#16abf8"
      @click="handleAddNewData"
    >
      <template>
        <div>
          <img :src="require('@/assets/icons/plus.svg')" alt="icon-plus" class="mr-2">
          Tambah
        </div>
      </template>
    </s-button>
  </div>
</template>

<script>
import SButton from '@/components/atoms/SButton.vue'

export default {
  name: 'TodoHeader',
  components: {
    SButton
  },
  props: {
    title: {
      type: String,
      default: 'Activity'
    },
    addButtonDataCy: {
      type: String,
      default: 'activity-add-button'
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
.todo-header {
  display: flex;
  justify-content: space-between;
  margin: 43px 0 55px;
  width: 100%;
}
</style>
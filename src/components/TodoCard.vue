<template>
  <div class="todo-card">
    <div class="todo-title">
      <div data-cy="todo-item-priority-indicator" class="priority-color" :style="{ backgroundColor: priorityColor }"></div>
      <p class="title">
        {{ title }}
      </p>
      <img
        data-cy="todo-item-edit-button"
        src="@/assets/icons/edit.svg"
        alt="edit-icon"
        class="edit-icon"
        @click.prevent="onEdit"
      >
    </div>
    <img
      data-cy="todo-item-delete-button"
      src="@/assets/icons/delete.svg"
      alt="delete-icon"
      class="delete-icon"
      @click.prevent="onDelete"
    >
  </div>
</template>

<script>
import { PRIORITIES } from '@/constants/priorities.js'

export default {
  name: 'TodoCard',
  props: {
    id: {
      type: Number,
      default: 0
    },
    priority: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    isActive: {
      type: Number,
      default: 1
    }
  },
  computed: {
    priorityColor () {
      return PRIORITIES.find(priority => priority.value === this.priority)?.color
    }
  },
  methods: {
    onDelete () {
      this.$emit('delete', this.id, this.title)
    },
    onEdit () {
      this.$emit('edit', this.id, this.title, this.priority, this.priorityColor, this.isActive)
    }
  },
}
</script>

<style scoped>
.todo-card {
  width: 100%;
  background: #FFFFFF;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 30px 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.todo-title {
  display: flex;
  align-items: center;
}

.priority-color {
  height: 9px;
  width: 9px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 19px;
}

.title {
  margin-bottom: 0;
  margin-right: 16px;
  font-weight: 500;
  font-size: 18px;
  line-height: 27px;
  color: #111111;
}

.edit-icon:hover,
.delete-icon:hover {
  cursor: pointer;
}
</style>
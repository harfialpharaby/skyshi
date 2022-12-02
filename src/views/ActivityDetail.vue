<template>
  <div>
    <div class="dashboard-container">
      <todo-header add-button-data-cy="todo-add-button" @add="toggleAddEditTodoModal">
        <template #title>
          <div class="header-title">
            <router-link to="/" data-cy="todo-icon-back">
              <img src="@/assets/icons/back.svg" alt="back-icon">
            </router-link>
            <div>
              <input
                v-if="isTitleEditable"
                v-model="newTitle"
                @change="saveNewTitle"
                ref="editableTitle"
                id="editable-title"
                type="text"
                name="title"
                class="input-title"
              >
              <h1 class="m-0" data-cy="todo-title" @click="toggleEditableTitle" v-else>
                {{ detail.title }}
              </h1>
            </div>
            <img
              data-cy="todo-edit-button"
              src="@/assets/icons/edit.svg"
              alt="edit-icon"
              class="edit-icon"
              @click.prevent="toggleEditableTitle"
            >
          </div>
        </template>
      </todo-header>
      <div class="loading-state" v-if="isLoading">
        <b-spinner variant="primary"></b-spinner>
      </div>
      <empty-state
        v-else-if="detail.todo_items.length < 1"
        :img-src="require('@/assets/illustrations/todo-empty-state.webp')"
        data-cy="todo-empty-state"
        @add="toggleAddEditTodoModal"
      />
      <div class="todo-list" v-else>
        <todo-card
          v-for="(todo, iTodo) in detail.todo_items"
          :key="`todo-item-${iTodo}`"
          :id="todo.id"
          :priority="todo.priority"
          :title="todo.title"
          :is-active="todo.is_active"
          @delete="toggleDeleteConfirmModal"
          @edit="toggleAddEditTodoModal"
        ></todo-card>
      </div>
    </div>

    <b-modal
      v-model="isShowNewTodoModal"
      size="lg"
      lazy
      centered
      hide-header
      hide-footer
      body-class="p-0"
    >
      <div class="modal-container" data-cy="modal-add">
        <div class="header">
          <h4>
            Tambah List Item
          </h4>
          <b-button
            variant="link"
            class="text-dark text-decoration-none"
            @click="toggleAddEditTodoModal"
          >
            <img src="@/assets/icons/close.svg" alt="close-icon">
          </b-button>
        </div>

        <hr class="m-0">

        <div class="body">
          <b-form-group label="NAMA LIST ITEM" label-for="input-name" class="mb-3">
            <b-form-input
              data-cy="modal-add-name-input"
              id="input-name"
              v-model="todoItem.title"
              placeholder="Tambahkan nama activity"
              trim
            ></b-form-input>
          </b-form-group>

          <b-form-group label="PRIORITY" label-for="dropdown-priority" class="mb-3">
            <b-dropdown
              id="dropdown-priority"
              variant="outline-secondary"
              class="dropdown-list"
              data-cy="modal-add-priority-dropdown"
            >
              <template #button-content>
                <span>
                  <span
                    v-if="todoItem.priority.color"
                    class="priority-color"
                    :style="{ backgroundColor: todoItem.priority.color }"
                  ></span>
                  {{ todoItem.priority.name }}
                </span>
              </template>
              <b-dropdown-item
                v-for="(priority, iPriority) in availablePriorities"
                :key="`priority-${iPriority}`"
                data-cy="modal-add-priority-item"
                @click.prevent="handleChangePriority(priority)"
              >
                <div class="priority-list">
                  <span class="priority-color" :style="{ backgroundColor: priority.color }"></span>
                  {{ priority.name }}
                </div>
              </b-dropdown-item>
            </b-dropdown>
          </b-form-group>
        </div>

        <hr class="m-0">

        <div class="footer">
          <s-button
            data-cy="modal-add-save-button"
            bg-color="#16ABF8"
            :disabled="validateButton"
            @click="validateSubmitAction"
          >
            Simpan
          </s-button>
        </div>
      </div>
    </b-modal>

    <confirm-delete-modal
      v-model="isShowDeleteConfirmation"
      :selected="selectedTodo"
      modal-data-cy="todo-modal-delete"
      ok-data-cy="modal-delete-confirm-button"
      @delete="deleteSelectedTodo"
      @toggle="toggleDeleteConfirmModal"
    ></confirm-delete-modal>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import { PRIORITIES } from '@/constants/priorities.js'
import SButton from '@/components/atoms/SButton.vue'
import TodoHeader from '@/components/TodoHeader.vue'

export default {
  name: 'ActivityDetail',
  components: {
    SButton,
    TodoHeader,
    EmptyState: () => import('@/components/EmptyState.vue'),
    TodoCard: () => import('@/components/TodoCard.vue'),
    ConfirmDeleteModal: () => import('@/components/atoms/ConfirmDeleteModal.vue')
  },
  data() {
    return {
      isLoading: false,
      isTitleEditable: false,
      isShowNewTodoModal: false,
      isShowDeleteConfirmation: false,
      newTitle: '',
      availablePriorities: PRIORITIES,
      selectedTodo: null,
      detail: {
        title: '',
        todo_items: []
      },
      todoItem: {
        title: '',
        priority: {
          name: 'Pilih priority',
          color: '',
          value: ''
        }
      }
    }
  },
  computed: {
    validateButton () {
      return this.todoItem.title === '' && !PRIORITIES.some(priority => priority.value === this.todoItem.priority)
    }
  },
  methods: {
    async getActivityDetail () {
      this.isLoading = true
      try {
        const { data } = await axios.get(`https://todo.api.devcode.gethired.id/activity-groups/${this.$route.params.id}`)
        this.detail = data
      } catch (error) {
        this.$router.replace('/')
      }
      this.isLoading = false
    },
    async saveNewTitle (event) {
      try {
        const newTitle = event.target.value
        await axios.patch(`https://todo.api.devcode.gethired.id/activity-groups/${this.$route.params.id}`, {
          title: newTitle
        })
        this.detail.title = this.newTitle
      } catch (error) {
        Swal
          .mixin({
            toast: true,
            showConfirmButton: false,
          })
          .fire({
            icon: 'error',
            timer: 1000,
            title: 'Gagal mengubah nama todo'
          })
      }
    },
    async saveNewItem () {
      try {
        await axios.post('https://todo.api.devcode.gethired.id/todo-items', {
          title: this.todoItem.title,
          activity_group_id: this.$route.params.id,
          priority: this.todoItem.priority.value
        })
        this.toggleAddEditTodoModal()
        this.getActivityDetail()
      } catch (error) {
        Swal
          .mixin({
            toast: true,
            showConfirmButton: false,
          })
          .fire({
            icon: 'error',
            timer: 1000,
            title: 'Gagal menambahkan todo'
          })
      }
    },
    async deleteSelectedTodo () {
      try {
        await axios.delete(`https://todo.api.devcode.gethired.id/todo-items/${this.selectedTodo.id}`)
        this.toggleDeleteConfirmModal()
        this.getActivityDetail()
      } catch (error) {
        Swal
          .mixin({
            toast: true,
            showConfirmButton: false,
          })
          .fire({
            icon: 'error',
            timer: 1000,
            title: 'Gagal menghapus todo'
          })
      }
    },
    async saveEditedItem () {
      try {
        const { id, title, isActive, priority } = this.todoItem
        await axios.patch(`https://todo.api.devcode.gethired.id/todo-items/${id}`, {
          title,
          priority: priority.value,
          is_active: isActive
        })
        this.toggleAddEditTodoModal()
        this.getActivityDetail()
      } catch (error) {
        Swal
          .mixin({
            toast: true,
            showConfirmButton: false,
          })
          .fire({
            icon: 'error',
            timer: 1000,
            title: 'Gagal mengubah todo'
          })
      }
    },
    validateSubmitAction () {
      if (this.todoItem.id > 0) {
        this.saveEditedItem()
      } else {
        this.saveNewItem()
      }
    },
    toggleDeleteConfirmModal (id = 0, title = '') {
      this.selectedTodo = { id, title }
      this.isShowDeleteConfirmation = !this.isShowDeleteConfirmation
    },
    toggleAddEditTodoModal (id = 0, title = '', prioValue = '', color = '', isActive = 1) {
      this.isShowNewTodoModal = !this.isShowNewTodoModal
      if (this.isShowNewTodoModal) {
        let name = 'Pilih priority'
        if (prioValue !== '') {
          name = PRIORITIES.find(priority => priority.value === prioValue)?.name
        }
        this.todoItem = {
          id,
          isActive,
          title,
          priority: {
            name,
            color,
            value: prioValue
          }
        }
      }
    },
    handleChangePriority (newPriority) {
      this.todoItem.priority = newPriority
    },
    toggleEditableTitle () {
      this.isTitleEditable = !this.isTitleEditable
      if (this.isTitleEditable) {
        this.$nextTick(() => {
          this.newTitle = this.detail.title
          this.$refs.editableTitle.focus()
        })
      }
    },
    handleClickOutside (event) {
      if (!this.$el.contains(event.target)) {
        this.isTitleEditable = false
      }
    },
  },
  created() {
   this.getActivityDetail() 
  },
  mounted() {
    window.addEventListener('mousedown', this.handleClickOutside)
  }
}
</script>

<style scoped>
.header-title {
  display: flex;
  align-items: center;
  gap: 19px;
}

.input-title {
  border: none;
  border-bottom: 1px solid black;
}

.todo-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.input-title:focus {
  outline: none;
}

.edit-icon:hover {
  cursor: pointer;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 30px;
}

.body {
  padding: 38px 43px 23px 28px;
}

.footer {
  float: right;
  padding: 15px 40px;
}

.header h4 {
  margin: 0;
  font-weight: 600;
  font-size: 18px;
  line-height: 27px;
  color: #111111;
}

.dropdown-list {
  width: 205px;
  height: 52px;
  border-radius: 6px;
}

.priority-color {
  height: 14px;
  width: 14px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 19px;
}

.priority-list {
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #4A4A4A;
}
</style>
<template>
  <div>
    <div class="dashboard-container">
      <todo-header title="Activity" @add="addNewActivity" />
      <div class="loading-state" v-if="isLoading">
        <b-spinner variant="primary"></b-spinner>
      </div>
      <empty-state
        v-else-if="activities.length < 1"
        :img-src="require('@/assets/illustrations/activity-empty-state.webp')"
        @add="addNewActivity"
      />
      <div class="dashboard-content" v-else>
        <activity-card
          v-for="(activity, iActivity) in activities"
          :key="`activity-item-${iActivity}`"
          :id="activity.id"
          :title="activity.title"
          :created-at="activity.created_at"
          @delete="toggleDeleteConfirmModal"
        ></activity-card>
      </div>
    </div>

    <confirm-delete-modal
      v-model="isShowDeleteConfirmation"
      :selected="selectedActivity"
      @delete="deleteSelectedActivity"
      @toggle="toggleDeleteConfirmModal"
    ></confirm-delete-modal>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import TodoHeader from '@/components/TodoHeader.vue'

export default {
  name: 'ActivityDashboard',
  components: {
    TodoHeader,
    EmptyState: () => import('@/components/EmptyState.vue'),
    ActivityCard: () => import('@/components/ActivityCard.vue'),
    ConfirmDeleteModal: () => import('@/components/atoms/ConfirmDeleteModal.vue')
  },
  data() {
    return {
      activities: [],
      selectedActivity: null,
      isLoading: false,
      isShowDeleteConfirmation: false,
    }
  },
  methods: {
    async getActivityList () {
      this.isLoading = true
      try {
        const { data } = await axios.get('https://todo.api.devcode.gethired.id/activity-groups?email=harfialpharaby@gmail.com')
        // const { data } = await axios.get('https://todo.api.devcode.gethired.id/activity-groups?email=ivan@skyshi.com')
        this.activities = data.data
      } catch (error) {
        this.activities = []
      }
      this.isLoading = false
    },
    async addNewActivity () {
      try {
        await axios.post('https://todo.api.devcode.gethired.id/activity-groups/', {
          title: "New Activity",
          email: "harfialpharaby@gmail.com"
        })
        this.getActivityList()
      } catch (error) {
        Swal
          .mixin({
            toast: true,
            showConfirmButton: false,
          })
          .fire({
            icon: 'error',
            timer: 1000,
            title: 'Gagal menambahkan activity'
          })
      }
    },
    async deleteSelectedActivity () {
      try {
        await axios.delete(`https://todo.api.devcode.gethired.id/activity-groups/${this.selectedActivity.id}`)
        this.toggleDeleteConfirmModal()
        Swal
          .mixin({
            toast: true,
            showConfirmButton: false,
          })
          .fire({
            icon: 'success',
            iconHtml: '!',
            timer: 1000,
            title: 'Activity berhasil dihapus'
          })
        this.getActivityList()
      } catch (error) {
        this.toggleDeleteConfirmModal()
        Swal
          .mixin({
            toast: true,
            showConfirmButton: false,
          })
          .fire({
            icon: 'error',
            timer: 1000,
            title: 'Gagal menghapus activity'
          })
      }
    },
    toggleDeleteConfirmModal (id = 0, title = '') {
      this.selectedActivity = { id, title }
      this.isShowDeleteConfirmation = !this.isShowDeleteConfirmation
    }
  },
  created() {
    this.getActivityList()
  }
}
</script>

<style scoped>
.dashboard-content {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 26px 20px;
}
</style>
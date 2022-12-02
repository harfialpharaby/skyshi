<template>
  <b-modal
    v-model="isShowModal"
    data-cy="todo-modal-delete"
    lazy
    centered
    hide-header
    hide-footer
  >
    <div class="modal-container">
      <div class="d-flex justify-content-center">
        <img src="@/assets/icons/modal-delete.svg" alt="modal-delete-icon" data-cy="modal-delete-icon">
      </div>
      <p class="modal-delete-title">
        Apakah anda yakin menghapus activity
        <br>
        <b v-if="selected">
          “{{ selected.title }}”?
        </b>
      </p>
      <div class="modal-delete-footer">
        <s-button
          data-cy="modal-delete-cancel-button"
          text-color="#4A4A4A"
          bg-color="#F4F4F4"
          @click="toggleDeleteConfirmModal"
        >
          Batal
        </s-button>
        <s-button
          :data-cy="okDataCy"
          bg-color="#ED4C5C"
          @click="onDelete"
        >
          Hapus
        </s-button>
      </div>
    </div>
  </b-modal>
</template>

<script>
import SButton from '@/components/atoms/SButton.vue'

export default {
  name: 'ConfirmDeleteModal',
  components: {
    SButton
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Object,
      default: null
    },
    okDataCy: {
      type: String,
      default: ''
    }
  },
  computed: {
    isShowModal: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    toggleDeleteConfirmModal () {
      this.$emit('toggle')
    },
    onDelete () {
      this.$emit('delete')
    }
  },
}
</script>

<style scoped>
.modal-container {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 355px;
  border-radius: 12px;
}

.modal-delete-title {
  font-weight: 500;
  font-size: 18px;
  line-height: 150%;
  text-align: center;
  color: #111111;
}

.modal-delete-footer {
  display: flex;
  justify-content: space-evenly;
}
</style>
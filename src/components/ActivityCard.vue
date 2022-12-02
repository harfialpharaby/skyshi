<template>
  <div class="activity-card" data-cy="activity-item">
    <div class="activity-body" @click.prevent="toActivityDetail">
      <h4 data-cy="activity-item-title">
        {{ title }}
      </h4>
    </div>
    <div class="card-footer">
      <span data-cy="activity-item-date">
        {{ formattedDate }}
      </span>
      <img
        src="@/assets/icons/delete.svg"
        alt="delete-icon"
        class="delete-icon"
        @click.prevent="onDelete"
      >
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'ActivityCard',
  props: {
    id: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: 'New Activity'
    },
    createdAt: {
      type: String,
      default: new Date()
    }
  },
  computed: {
    formattedDate () {
      moment.locale('id')
      return moment(this.createdAt).format('LL')
    }
  },
  methods: {
    onDelete () {
      this.$emit('delete', this.id, this.title)
    },
    toActivityDetail () {
      this.$router.push(`/detail/${this.id}`)
    }
  }
}
</script>

<style scoped>
.activity-card {
  width: 235px;
  height: 234px;
  background: #FFFFFF;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 22px 27px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.activity-body:hover,
.delete-icon:hover {
  cursor: pointer;
}

.activity-body {
  height: 100%;
}

.activity-body h4 {
  font-weight: 700;
  font-size: 18px;
  line-height: 27px;
  color: #111111;
  text-align: left;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-footer span {
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  color: #888888;
}
</style>
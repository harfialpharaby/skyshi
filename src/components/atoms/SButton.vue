<template>
  <button
    class="btn"
    :style="{ backgroundColor: bgColor, color: textColor }"
    :data-cy="dataCy"
    :disabled="disabled"
    @click.prevent="handleClickButton"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'SButton',
  props: {
    dataCy: {
      type: String,
      default: ''
    },
    textColor: {
      type: String,
      default: '#FFFFFF'
    },
    bgColor: {
      type: String,
      default: '#16abf8'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClickButton () {
      this.$emit('click')
    }
  }
}
</script>

<style scoped>
.btn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 13px 21px 13px 14px;
  width: 159px;
  height: 54px;
  border-radius: 45px;
  border: none;
  font-weight: 600;
  font-size: 18px;
  line-height: 27px;
  color: #FFFFFF;
}

.btn:hover {
  cursor: pointer;
}

.btn:disabled {
  opacity: 0.2;
}
</style>
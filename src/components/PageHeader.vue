<template>
  <div data-cy="header-background" class="header">
    <h2 data-cy="header-title">
      TO DO LIST APP
    </h2>
  </div>
</template>

<script>
export default {
  name: 'PageHeader'
}
</script>

<style scoped>
.header {
  height: 105px;
  background: #16ABF8;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 0 220px;
  display: flex;
  align-items: center;
}

h2 {
  font-weight: 700;
  font-size: 24px;
  line-height: 36px;
  text-transform: uppercase;
  color: #FFFFFF;
  width: fit-content;
}
</style>
<template>
  <span>{{ value }}</span>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
      require: true,
    },
  },
};
</script>

<style></style>

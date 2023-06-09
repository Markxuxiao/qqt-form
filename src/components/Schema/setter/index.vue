<template>
  <div>
    {{ getSchema() }}
  </div>
</template>
<script>
export default {
  props: {
    compSchema: {
      type: Object,
      require: true,
    },
  },
  methods: {
    getSchema() {
      return JSON.stringify(this.compSchema);
    },
  },
};
</script>
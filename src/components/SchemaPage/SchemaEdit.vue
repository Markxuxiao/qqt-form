<template>
  <div></div>
</template>
<script>
import SchemaLayout from "../SchemaEditLayout/SchemaLayout.vue";
import SchemaFormVue from "../SchemaForm/SchemaForm.vue";
export default {
  props: {
    schema: {
      default() {
        return {
          groups: [],
        };
      },
    },
  },
  components: {
    SchemaLayout,
    SchemaFormVue,
  },
};
</script>
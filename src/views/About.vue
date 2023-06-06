<template>
  <div class="about">
    <NumberPick v-model="value1" type="single" />
    <NumberPick v-model="value2" type="multiple" />
    <NumberPick v-model="value3" type="range" />
    <super-render />
  </div>
</template>
<script>
import superRender from "./rander.jsx";
import NumberPick from "@/components/NumberPick/NumberPick.vue";
export default {
  components: {
    NumberPick,
    superRender,
  },
  data() {
    return {
      value1: 2,
      value2: [2, 3],
      value3: [2, 3],
    };
  },
};
</script>

<template>
  <div id="app">
    <div id="nav">
      <span v-for="item in routes" :key="item.name">
        <router-link :to="item.path">{{ item.name }}</router-link> |
      </span>
    </div>
    <router-view />
  </div>
</template>
<script>
import { routes } from "./router";
export default {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data() {
    return {
      routes,
    };
  },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
// 解析token
import JwtDecode from "jwt-decode";
export default {
  name: "app",
  components: {},
  created() {
    if (localStorage.UserToken) {
      const decoded = JwtDecode(localStorage.UserToken);
      this.$store.dispatch("SetAuthenticated", !this.isEmpty(decoded));
      this.$store.dispatch("setUser", decoded);
    }
  },
  methods: {
    isEmpty(val) {
      return (
        val === undefined ||
        val === null ||
        (typeof val === "object" && Object.keys(val).length === 0) ||
        (typeof val === "string" && val.trim().length === 0)
      );
    }
  }
};
</script>
<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
}
</style>

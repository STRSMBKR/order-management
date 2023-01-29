<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <div id="app">
    <AppInput></AppInput>
    <AppButton>入力完了</AppButton>
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
// import { Component } from "vue-property-decorator";
import AppButton from "./components/common/AppButton.vue";
import AppInput from "./components/common/AppInput.vue";
import HelloWorld from "./components/HelloWorld.vue";

@Options({
  components: {
    HelloWorld,
    AppButton,
    AppInput,
  },
})
export default class App extends Vue {
  data() {
    return {
      nameList: "",
    };
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<template>
  <div class="cp_iptxt">
    <label class="ef">
      <input type="text" placeholder="お名前" v-bind="nameList" />
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

const AppInput = defineComponent({
  data() {
    return {
      nameList: "",
    };
  },
});
export default AppInput;
</script>

<style scoped lang="scss">
.cp_iptxt {
  position: relative;
  width: 80%;
  margin: 40px 3%;
}
.cp_iptxt input[type="text"] {
  font: 15px/24px sans-serif;
  box-sizing: border-box;
  width: 100%;
  padding: 0.3em;
  transition: 0.3s;
  letter-spacing: 1px;
  color: #242222;
  border: 1px solid #1b2538;
  border-radius: 4px;
}
.ef input[type="text"]:focus {
  border: 1px solid #da3c41;
  outline: none;
  box-shadow: 0 0 5px 1px rgba(218, 60, 65, 0.5);
}
</style>

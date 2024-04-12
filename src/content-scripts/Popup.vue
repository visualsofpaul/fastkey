<template>
  <div v-show="visible">
    <div class="popup">
      <h1>Test</h1>
    </div>
  </div>
</template>

<script>
import "../styles/_fonts.css";
import "../styles/_colors.css";
import "../styles/_font-family.css";
import "../styles/_font-sizes.css";
import "../styles/main.css";

export default {
  data() {
    return {
      visible: false,
    };
  },
};
</script>

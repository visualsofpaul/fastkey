<template>
  <div class="output" id="output">
    <p>{{ password }}</p>
  </div>
</template>

<script>
import "../styles/main.css";

export default {
  name: "Output",
  props: {
    password: String,
    require: true,
  },
};
</script>

<template>
  <div :class="id" :id="id">
    <p :class="id + '-password'" :id="id + '-password'"></p>
  </div>
</template>

<script>
import "../styles/main.css";

export default {
  name: "Output",
  props: {
    id: String,
    password: String,
  },
};
</script>

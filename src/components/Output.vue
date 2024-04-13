<template>
  <div :class="id" :id="id"></div>
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

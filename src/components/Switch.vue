<template>
  <input
    type="checkbox"
    class="switch-input"
    :name="name + '-switch'"
    :id="name + '-switch'"
    @change="$emit('change', $event.target.checked)"
    :checked="checked"
  />
  <label class="switch-label" :for="name + '-switch'"></label>
</template>

<script>
export default {
  name: "Switch",
  props: {
    name: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

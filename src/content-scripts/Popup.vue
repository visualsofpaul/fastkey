<template>
  <section
    class="popup-container"
    id="close-container"
    v-show="visible"
    @click="closePopup"
  >
    <article class="popup">
      <header>
        <figure>
          <img src="../assets/images/logo.svg" alt="Logo" />
          <h1>FastKey</h1>
        </figure>
        <button id="close-button" @click="closePopup">Close</button>
      </header>
    </article>
  </section>
</template>

<script>
const fontURL = chrome.runtime.getURL("/fonts/Mona-Sans.ttf");

// import "../styles/_fonts.css";
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
  methods: {
    closePopup($event) {
      const targetID = $event.target.id;

      if (targetID === "close-container" || targetID === "close-button") {
        this.visible = false;
      }
    },
  },
};
</script>

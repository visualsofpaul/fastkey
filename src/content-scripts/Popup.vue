<template>
  <link
    href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css"
    rel="stylesheet"
  />
  <style v-if="fontLink !== undefined">
    @font-face {
      font-family: "Mona-Sans";
      src: url(${fontLink});
    }
  </style>
  <section
    class="fastkey-popup-container"
    id="close-container"
    v-show="visible"
    @click="closePopup"
  >
    <article class="fastkey-popup dark">
      <header class="tab">
        <figure>
          <img src="../assets/images/logo.svg" alt="Logo" />
          <h2>FastKey</h2>
        </figure>
        <i
          class="ri-close-line close-button"
          id="close-button"
          @click="closePopup"
        ></i>
      </header>
      <section class="content">
        <div class="output" id="output"></div>
        <button class="button" @click="generatePassword">
          Generate password
        </button>
      </section>
    </article>
  </section>
</template>

<script>
// Import styles
import "../styles/_colors.css";
import "../styles/_font-family.css";
import "../styles/_font-sizes.css";
import "../styles/main.css";
import "../styles/remixicon.css";

// Import classes
import Scrambler from "./scrambler.js";
import Password from "./password.js";

export default {
  data() {
    return {
      visible: false,
      fontLink: undefined,
      password: null,
      scrambler: null,
    };
  },
  methods: {
    closePopup($event) {
      const targetID = $event.target.id;

      if (targetID === "close-container" || targetID === "close-button") {
        this.visible = false;
      }
    },

    async generatePassword() {
      this.scrambler.reset();

      this.scrambler.scramble(
        await this.password.generate({
          length: 32,
          numbers: true,
          letters: true,
          specialCharacters: true,
        })
      );
    },
  },
  mounted() {
    this.scrambler = new Scrambler(4, document.getElementById("output"));
    this.password = new Password();

    this.generatePassword();

    this.fontLink = chrome.runtime.getURL("/fonts/Mona-Sans.ttf");
  },
};
</script>

<template>
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
        <aside>
          <figure>
            <img src="../assets/images/logo.svg" alt="Logo" />
            <h2>FastKey</h2>
          </figure>
        </aside>
        <aside>
          <ThemeSwitch :theme="theme" @toggle-theme="toggleTheme"></ThemeSwitch>
          <figure class="close-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              id="close-button"
              @click="closePopup"
            >
              <path
                d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z"
              ></path>
            </svg>
          </figure>
        </aside>
      </header>
      <section class="content">
        <article>
          <h2>Your password</h2>
          <Output id="output"></Output>
        </article>
        <article>
          <h2>Settings</h2>
          <ul>
            <li>
              <Switch
                name="numbers"
                @change="updateSettings('numbers')"
                checked
              ></Switch>
              <p>Numbers</p>
            </li>
            <li>
              <Switch
                name="letters"
                @change="updateSettings('letters')"
                checked
              ></Switch>
              <p>Letters</p>
            </li>
            <li>
              <Switch
                name="specialCharacters"
                @change="updateSettings('specialCharacters')"
                checked
              ></Switch>
              <p>Special characters</p>
            </li>
          </ul>
        </article>
        <button class="button" @click="generatePassword">
          Generate password
        </button>
      </section>
    </article>
  </section>
</template>

<script>
// Import styles
import "../styles/_fonts.css";
import "../styles/_colors.css";
import "../styles/_font-family.css";
import "../styles/_font-sizes.css";
import "../styles/main.css";
import "../styles/switch.css";

// Import components
import Output from "../components/Output.vue";
import ThemeSwitch from "../components/ThemeSwitch.vue";
import Switch from "../components/Switch.vue";

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
      extensionID: null,
      theme: null,
      settings: {
        length: 32,
        numbers: true,
        letters: true,
        specialCharacters: true,
      },
    };
  },
  methods: {
    closePopup($event) {
      const targetID = $event.target.id;

      if (
        targetID === "close-container" ||
        targetID === "close-button" ||
        targetID === "close-button-path"
      ) {
        this.visible = false;
      }
    },

    async generatePassword() {
      this.scrambler.scramble(await this.password.generate(this.settings));
    },

    toggleTheme(darkMode) {
      const popup = document.querySelector(".fastkey-popup");

      popup.classList.toggle("dark", darkMode);
      popup.classList.toggle("light", !darkMode);

      // Save the theme to storage
      chrome.runtime.sendMessage(
        {
          type: "setThemeToStorage",
          theme: darkMode ? "dark" : "light",
        },
        (response) => {
          console.log("Antwort:", response);
        }
      );
    },

    setTheme(theme) {
      this.theme = theme;

      const popup = document.querySelector(".fastkey-popup");

      popup.classList.toggle("dark", theme === "dark");
      popup.classList.toggle("light", theme === "light");
    },

    updateSettings(setting) {
      this.settings[setting] = !this.settings[setting];
    },
  },
  mounted() {
    this.scrambler = new Scrambler(
      4,
      document.getElementById("output-password")
    );
    this.password = new Password();

    this.generatePassword();

    // Get the theme from storage
    chrome.runtime.sendMessage({ type: "getThemeFromStorage" }, (response) => {
      this.setTheme(response);
    });
  },
};
</script>

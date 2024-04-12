import { createApp } from "vue";
import Popup from "./Popup.vue";

const element = "fast-key-extension";

let mountedElement = document.getElementById(element);
if (mountedElement) {
  mountedElement.innerHTML.length = 0;
}
mountedElement = document.createElement("div");
mountedElement.setAttribute("id", element);
document.body.appendChild(mountedElement);

const module = createApp(Popup).mount(mountedElement);

chrome.runtime.onMessage.addListener((message) => {
  if (message.toggleVisible) {
    module.visible = !module.visible;
  }
});

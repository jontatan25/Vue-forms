import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";

const files = import.meta.globEager("./components/Base*.{vue,js}");

const app = createApp(App);

for (const fileName in files) {
  const componentConfig = files[fileName];

  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\/components\/(.*)\.(vue|js)$/, "$1"))
  );

  app.component(componentName, componentConfig.default || componentConfig);
}

app.mount("#app");

import { configure, storiesOf } from "@storybook/react";
import { setOptions } from "@storybook/addon-options";

import { version } from "../package.json";

import "../src/assets/helvetica.scss";

// Set google analytics ID Var;
window.STORYBOOK_GA_ID = 'UA-133585953-1';

function loadStories() {
  if (global.self === global.top) {
    require("./e2e-styles.scss");
  }

  require("./stories.scss");
  require("../stories");
}

configure(loadStories, module);

setOptions({
  showAddonPanel: false,
  name: `wix-style-react v${version}`,
  url: "https://github.com/wix/wix-style-react",
  sidebarAnimations: true
});

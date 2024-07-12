import { addIconSelectors } from "@iconify/tailwind";
export const content = [
  "./components/**/*.{js,vue,ts}",
  "./layouts/**/*.vue",
  "./pages/**/*.vue",
  "./plugins/**/*.{js,ts}",
  "./app.vue",
  "./error.vue",
];
export const theme = {
  extend: {},
};
export const plugins = [addIconSelectors(["mdi", "mdi-light"])];

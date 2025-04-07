import mitt from "mitt";

type Events = {
  "theme-change": "dark" | "light";
};

export const eventBus = mitt<Events>();

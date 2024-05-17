import type { ButtonPassThroughOptions } from "primevue/button";

export default {
  root: ({ props, parent }) => ({
    class: [
      "relative",

      // Alignments
      "items-center inline-flex text-center justify-center",

      // Sizes & Spacing
      "leading-normal",
      {
        "py-2 px-4": props.size === null && props.label !== null,
        "text-sm py-2 px-3": props.size === "small",
        "text-xl py-3 px-4": props.size === "large",
      },
      
      //Shapes
      { "shadow-lg": props.raised },
      { "rounded": !props.rounded, "rounded-full": props.rounded },
      { "rounded-none first:rounded-l-md last:rounded-r-md": parent.instance.$name == "InputGroup" },

      // Borders
      "border-2",

      // Transitions
      "transition-colors duration-200 ease-in",
      
      // Colors
      {
        "bg-yellow-500 border-yellow-500 text-black hover:bg-transparent": props.severity === "primary"
      },
      {
        "bg-black border-black text-white hover:bg-transparent hover:text-black": props.severity === "secondary",
      }
    ],
  }),
  label: ({ props }) => ({
    class: [
      "duration-200",
      "font-bold",
      {
        "hover:underline": props.link,
      },
      { "flex-1": props.label !== null, "invisible w-0": props.label == null },
    ],
  }),
  icon: ({ props }) => ({
    class: [
      "mx-0",
      {
        "mr-2": props.iconPos == "left" && props.label != null,
        "ml-2 order-1": props.iconPos == "right" && props.label != null,
        "mb-2": props.iconPos == "top" && props.label != null,
        "mt-2": props.iconPos == "bottom" && props.label != null,
      },
    ],
  }),
  loadingIcon: ({ props }) => ({
    class: [
      "h-4 w-4",
      "mx-0",
      {
        "mr-2": props.iconPos == "left" && props.label != null,
        "ml-2 order-1": props.iconPos == "right" && props.label != null,
        "mb-2": props.iconPos == "top" && props.label != null,
        "mt-2": props.iconPos == "bottom" && props.label != null,
      },
      "animate-spin",
    ],
  }),
  badge: ({ props }) => ({
    class: [{ "ml-2 w-4 h-4 leading-none flex items-center justify-center": props.badge }],
  }),
} satisfies ButtonPassThroughOptions;

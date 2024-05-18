import type { TabViewPassThroughOptions } from "primevue/tabview";
import type { TabPanelPassThroughMethodOptions } from "primevue/tabpanel";

export default {
  navContainer: ({ props }) => ({
    class: [
      // Position
      "relative",

      // Misc
      { "overflow-hidden": props.scrollable },
    ],
  }),
  navContent: {
    class: [
      // Overflow and Scrolling
      "overflow-y-hidden overscroll-contain",
      "overscroll-auto",
      "scroll-smooth",
      "[&::-webkit-scrollbar]:hidden",
    ],
  },
  previousButton: {
    class: [
      // Flexbox and Alignment
      "flex items-center justify-center",

      // Position
      "!absolute",
      "top-0 left-0",
      "z-20",

      // Size and Shape
      "h-full w-12",
      "rounded-none",

      // Colors
      "bg-slate-0 ",
      "text-yellow-500 ",
      "shadow-md",
    ],
  },
  nextButton: {
    class: [
      // Flexbox and Alignment
      "flex items-center justify-center",

      // Position
      "!absolute",
      "top-0 right-0",
      "z-20",

      // Size and Shape
      "h-full w-12",
      "rounded-none",

      // Colors
      "bg-slate-0 ",
      "text-yellow-500 ",
      "shadow-md",
    ],
  },
  nav: {
    class: [
      // Flexbox
      "flex items-center justify-center",
      "flex-1",
      // "justify-center",
      // "items-center",

      // Spacing
      "list-none",
      "p-0 m-0",

      // "first:rounded-l-full",
      // "last:rounded-r-full",

      // Colors
      "bg-slate-0 ",
      // "border-2 border-slate-200 ",
      "text-slate-900 /80",
    ],
  },
  tabpanel: {
    header: ({ props, parent, context }: TabPanelPassThroughMethodOptions) => ({
      class: [
        // Spacing
        "mr-0",
        "border-2",
        "border-r-0",
        "first:rounded-l-full",
        // "last:rounded-r-full",
        // "last:border-r-2",

        "[&:nth-last-child(2)]:rounded-r-full",
        "[&:nth-last-child(2)]:border-r-2",


        "border-black",

        // Misc
        {
          "opacity-60 cursor-default user-select-none select-none pointer-events-none": props?.disabled,
        },

        {
          // "border-slate-200 ": parent.state.d_activeIndex !== context.index,
          // "text-slate-700 /80": parent.state.d_activeIndex !== context.index,

          // "border-yellow-500 ": parent.state.d_activeIndex === context.index,
          "bg-yellow-500": parent.state.d_activeIndex === context.index,
        },
      ],
    }),
    headerAction: ({ parent, context }: TabPanelPassThroughMethodOptions) => ({
      class: [
        "relative",

        // Font
        "font-bold",

        // Flexbox and Alignment
        "flex items-center",

        // Spacing
        "p-5",
        "-mb-[2px]",


        // States
        "focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:ring focus-visible:ring-inset",
        "focus-visible:ring-yellow-400/50 :ring-yellow-300/50",
        {
          // "hover:bg-slate-0 :bg-slate-800/80": parent.state.d_activeIndex !== context.index,
          // "hover:border-slate-400 :border-yellow-400": parent.state.d_activeIndex !== context.index,
          // "hover:text-slate-900 :text-slate-0": parent.state.d_activeIndex !== context.index,
        },

        // Transitions
        "transition-all duration-200",

        // Misc
        "cursor-pointer select-none text-decoration-none",
        "overflow-hidden",
        "user-select-none",
      ],
    }),
    headerTitle: {
      class: [
        // Text
        "leading-none",
        "whitespace-nowrap",
      ],
    },
    content: {
      class: [
        // Spacing
        "p-5",

        // Shape
        "rounded-b-md",

        // Colors
        "bg-slate-0 ",
        "text-slate-700 /80",
        "border-0",
      ],
    },
  },
} satisfies TabViewPassThroughOptions;

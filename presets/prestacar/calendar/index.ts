import type { CalendarPassThroughOptions } from "primevue/calendar";

export default {
  root: ({ props }) => ({
    class: [
      // Display and Position
      "inline-flex",
      "max-w-full",
      "relative",

      // Misc
      { "opacity-60 select-none pointer-events-none cursor-default": props.disabled },
    ],
  }),
  input: ({ props }) => ({
    class: [
      // Font
      "font-sans leading-none",

      // Colors
      "text-slate-600",
      "placeholder:text-slate-400",
      "bg-white",
      "border border-slate-300",

      // Spacing
      "m-0 p-3",

      // Shape
      "appearance-none",
      { "rounded-md": !props.showIcon || props.iconDisplay == "input" },
      { "rounded-l-md  flex-1 pr-9": props.showIcon && props.iconDisplay !== "input" },
      { "rounded-md flex-1 pr-9": props.showIcon && props.iconDisplay === "input" },

      // Transitions
      "transition-colors",
      "duration-200",

      // States
      "hover:border-yellow-500",
      "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-yellow-500/50",
    ],
  }),
  dropdownButton: {
    root: {
      class: [
        "relative",

        // Alignments
        "items-center inline-flex text-center align-bottom",

        // Shape
        "rounded-r-md",

        // Size
        "px-4 py-3 leading-none",

        // Colors
        "text-white",
        "bg-yellow-500",
        "border border-yellow-500",

        // States
        "focus:outline-none focus:outline-offset-0 focus:ring",
        "hover:bg-yellow-600 hover:border-yellow-600",
        "focus:ring-yellow-400/50",
      ],
    },
  },
  panel: ({ props }) => ({
    class: [
      // Display & Position
      {
        absolute: !props.inline,
        "inline-block": props.inline,
      },

      // Size
      { "w-auto p-2 ": !props.inline },
      { "min-w-[80vw] w-auto p-2 ": props.touchUI },
      { "p-2 min-w-full": props.inline },

      // Shape
      "border rounded-lg",
      {
        "shadow-md": !props.inline,
      },

      // Colors
      "bg-white",
      "border-slate-200",

      //misc
      { "overflow-x-auto": props.inline },
    ],
  }),
  datepickerMask: {
    class: ["fixed top-0 left-0 w-full h-full", "flex items-center justify-center", "bg-black bg-opacity-90"],
  },
  header: {
    class: [
      //Font
      "font-semibold",

      // Flexbox and Alignment
      "flex items-center justify-between",

      // Spacing
      "p-2",
      "m-0",

      // Shape
      "border-b",
      "rounded-t-md",

      // Colors
      "text-slate-700",
      "bg-white",
      "border-slate-200",
    ],
  },
  previousButton: {
    root: {
      class: [
        "relative",

        // Flexbox and Alignment
        "inline-flex items-center justify-center",

        // Size
        "w-8 h-8",
        "p-0 m-0",

        // Shape
        "rounded-full",

        // Colors
        "text-slate-600",
        "border-0",
        "bg-transparent",

        // Transitions
        "transition-colors duration-200 ease-in-out",

        // States
        "hover:text-slate-700",
        "hover:bg-slate-100",

        // Misc
        "cursor-pointer overflow-hidden",
      ],
    },
  },
  title: {
    class: [
      // Text
      "leading-8",
      "mx-auto my-0",
    ],
  },
  monthTitle: {
    class: [
      // Font
      "text-base leading-5",
      "font-semibold",

      // Colors
      "text-slate-700",

      // Transitions
      "transition duration-200",

      // Spacing
      "p-2",
      "m-0 mr-2",

      // States
      "hover:text-yellow-500",

      // Misc
      "cursor-pointer",
    ],
  },
  yearTitle: {
    class: [
      // Font
      "text-base leading-5",
      "font-semibold",

      // Colors
      "text-slate-700",

      // Transitions
      "transition duration-200",

      // Spacing
      "p-2",
      "m-0",

      // States
      "hover:text-yellow-500",

      // Misc
      "cursor-pointer",
    ],
  },
  nextButton: {
    root: {
      class: [
        "relative",

        // Flexbox and Alignment
        "inline-flex items-center justify-center",

        // Size
        "w-8 h-8",
        "p-0 m-0",

        // Shape
        "rounded-full",

        // Colors
        "text-slate-600",
        "border-0",
        "bg-transparent",

        // Transitions
        "transition-colors duration-200 ease-in-out",

        // States
        "hover:text-slate-700",
        "hover:bg-slate-100",

        // Misc
        "cursor-pointer overflow-hidden",
      ],
    },
  },
  table: {
    class: [
      // Font
      "text-base leading-none",
      // Size & Shape
      "border-collapse",
      "w-full",

      // Spacing
      "m-0 my-2",
    ],
  },
  tableHeaderCell: {
    class: [
      // Spacing
      "p-0 md:p-2",
    ],
  },
  weekHeader: {
    class: ["leading-5", "text-slate-600", "opacity-60 cursor-default"],
  },
  weekNumber: {
    class: ["text-slate-600", "opacity-60 cursor-default"],
  },
  weekDay: {
    class: [
      // Colors
      "text-slate-500",
    ],
  },
  day: {
    class: [
      // Spacing
      "p-0 md:p-2",
    ],
  },
  weekLabelContainer: ({ context }) => ({
    class: [
      // Flexbox and Alignment
      "flex items-center justify-center",
      "mx-auto",

      // Shape & Size
      "w-10 h-10",
      "rounded-full",
      "border-transparent border",

      // Colors
      {
        "text-slate-600 bg-transparent": !context.selected && !context.disabled,
        "text-yellow-700 bg-yellow-100": context.selected && !context.disabled,
      },

      // States
      "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-yellow-400/50",
      {
        "hover:bg-slate-100": !context.selected && !context.disabled,
        "hover:bg-yellow-200": context.selected && !context.disabled,
      },
      {
        "opacity-60 cursor-default": context.disabled,
        "cursor-pointer": !context.disabled,
      },
    ],
  }),
  dayLabel: ({ context }) => ({
    class: [
      // Flexbox and Alignment
      "flex items-center justify-center",
      "mx-auto",

      // Shape & Size
      "w-10 h-10",
      "rounded-full",
      "border-transparent border",

      // Colors
      {
        "text-yellow-500": context.today,
        "text-slate-600 bg-transparent": !context.selected && !context.disabled && !context.today,
        "text-yellow-700 bg-yellow-100":
          context.selected && !context.disabled,
      },

      // States
      "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-yellow-400/50",
      {
        "hover:bg-slate-100": !context.selected && !context.disabled,
        "hover:bg-yellow-200": context.selected && !context.disabled,
      },
      {
        "opacity-60 cursor-default": context.disabled,
        "cursor-pointer": !context.disabled,
      },
    ],
  }),
  monthPicker: {
    class: [
      // Spacing
      "my-2",
    ],
  },
  month: ({ context }) => ({
    class: [
      // Flexbox and Alignment
      "inline-flex items-center justify-center",

      // Size
      "w-1/3",
      "p-2",

      // Shape
      "rounded-md",

      // Colors
      {
        "text-slate-600 bg-transparent": !context.selected && !context.disabled,
        "text-yellow-700 bg-yellow-100":
          context.selected && !context.disabled,
      },

      // States
      "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-yellow-400/50",
      {
        "hover:bg-slate-100": !context.selected && !context.disabled,
        "hover:bg-yellow-200": context.selected && !context.disabled,
      },

      // Misc
      "cursor-pointer",
    ],
  }),
  yearPicker: {
    class: [
      // Spacing
      "my-2",
    ],
  },
  year: ({ context }) => ({
    class: [
      // Flexbox and Alignment
      "inline-flex items-center justify-center",

      // Size
      "w-1/3",
      "p-2",

      // Shape
      "rounded-md",

      // Colors
      {
        "text-slate-600 bg-transparent": !context.selected && !context.disabled,
        "text-yellow-700 bg-yellow-100":
          context.selected && !context.disabled,
      },

      // States
      "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-yellow-400/50",
      {
        "hover:bg-slate-100": !context.selected && !context.disabled,
        "hover:bg-yellow-200": context.selected && !context.disabled,
      },

      // Misc
      "cursor-pointer",
    ],
  }),
  timePicker: {
    class: [
      // Flexbox
      "flex",
      "justify-center items-center",

      // Borders
      "border-t-1",
      "border-solid border-slate-200",

      // Spacing
      "p-2",
    ],
  },
  separatorContainer: {
    class: [
      // Flexbox and Alignment
      "flex",
      "items-center",
      "flex-col",

      // Spacing
      "px-2",
    ],
  },
  separator: {
    class: [
      // Text
      "text-xl",
    ],
  },
  hourPicker: {
    class: [
      // Flexbox and Alignment
      "flex",
      "items-center",
      "flex-col",

      // Spacing
      "px-2",
    ],
  },
  minutePicker: {
    class: [
      // Flexbox and Alignment
      "flex",
      "items-center",
      "flex-col",

      // Spacing
      "px-2",
    ],
  },
  ampmPicker: {
    class: [
      // Flexbox and Alignment
      "flex",
      "items-center",
      "flex-col",

      // Spacing
      "px-2",
    ],
  },
  groupContainer: {
    class: [
      // Flexbox
      "flex",
    ],
  },
  group: {
    class: [
      // Flexbox and Sizing
      "flex-1",

      // Borders
      "border-l",
      "border-slate-200",

      // Spacing
      "pr-0.5",
      "pl-0.5",
      "pt-0",
      "pb-0",

      // Pseudo-Classes
      "first:pl-0",
      "first:border-l-0",
    ],
  },
  buttonbar: {
    class: [
      // Flexbox
      "flex justify-between items-center",

      // Spacing
      "py-3 px-0",

      // Shape
      "border-t border-slate-200",
    ],
  },
  todayButton: {
    root: {
      class: [
        // Flexbox and Alignment
        "inline-flex items-center justify-center",

        // Spacing
        "px-4 py-3 leading-none",

        // Shape
        "rounded-md",

        // Colors
        "bg-transparent border-transparent",
        "text-yellow-500",

        // Transitions
        "transition-colors duration-200 ease-in-out",

        // States
        "focus:outline-none focus:outline-offset-0 focus:ring",
        "hover:bg-yellow-300/20",

        // Misc
        "cursor-pointer",
      ],
    },
  },
  clearButton: {
    root: {
      class: [
        // Flexbox and Alignment
        "inline-flex items-center justify-center",

        // Spacing
        "px-4 py-3 leading-none",

        // Shape
        "rounded-md",

        // Colors
        "bg-transparent border-transparent",
        "text-yellow-500",

        // Transitions
        "transition-colors duration-200 ease-in-out",

        // States
        "focus:outline-none focus:outline-offset-0 focus:ring",
        "hover:bg-yellow-300/20",

        // Misc
        "cursor-pointer",
      ],
    },
  },
  transition: {
    enterFromClass: "opacity-0 scale-y-[0.8]",
    enterActiveClass: "transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]",
    leaveActiveClass: "transition-opacity duration-100 ease-linear",
    leaveToClass: "opacity-0",
  },
} satisfies CalendarPassThroughOptions;

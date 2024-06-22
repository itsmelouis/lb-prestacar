import type { DataTablePassThroughOptions } from "primevue/datatable";
import type {
  ColumnPassThroughMethodOptions,
  ColumnPassThroughOptionType,
  ColumnSharedPassThroughMethodOptions,
  ColumnState,
} from "primevue/column";
import type { DropdownPassThroughMethodOptions } from "primevue/dropdown";

export default {
  root: ({ props }) => ({
    class: [
      "relative",

      // Flex & Alignment
      { "flex flex-col": props.scrollable && props.scrollHeight === "flex" },

      // Size
      { "h-full": props.scrollable && props.scrollHeight === "flex" },
    ],
  }),
  loadingOverlay: {
    class: [
      // Position
      "absolute",
      "top-0 left-0",
      "z-20",

      // Flex & Alignment
      "flex items-center justify-center",

      // Size
      "w-full h-full",

      // Color
      "bg-slate-100/40",

      // Transition
      "transition duration-200",
    ],
  },
  loadingIcon: {
    class: "w-8 h-8 animate-spin",
  },
  wrapper: ({ props }) => ({
    class: [
      { relative: props.scrollable, "flex flex-col grow": props.scrollable && props.scrollHeight === "flex" },

      // Size
      { "h-full": props.scrollable && props.scrollHeight === "flex" },
    ],
  }),
  header: ({ props }) => ({
    class: [
      "font-bold",

      // Shape
      props.showGridlines ? "border-x border-t border-b-0" : "border-y border-x-0",

      // Spacing
      "p-4",

      // Color
      "bg-slate-50",
      "border-slate-200",
      "text-slate-700",
    ],
  }),
  table: {
    class: "w-full border-spacing-0 border-separate",
  },
  thead: ({ props }) => ({
    class: [
      {
        "bg-slate-50 top-0 z-40 sticky": props.scrollable,
      },
    ],
  }),
  tbody: ({ instance, props }) => ({
    class: [
      {
        "sticky z-20": instance.frozenRow && props.scrollable,
      },
    ],
  }),
  tfoot: ({ props }) => ({
    class: [
      {
        "bg-slate-50 bottom-0 z-0": props.scrollable,
      },
    ],
  }),
  footer: {
    class: [
      "font-bold",

      // Shape
      "border-t-0 border-b border-x-0",

      // Spacing
      "p-4",

      // Color
      "bg-slate-50",
      "border-slate-200",
      "text-slate-700",
    ],
  },
  column: {
    headerCell: ({ context, props }: ColumnPassThroughMethodOptions) => ({
      class: [
        "font-bold",

        // Position
        { "sticky z-20 border-b": props.frozen },

        { relative: context.resizable },

        // Alignment
        "text-left",

        // Shape
        { "first:border-l border-y border-r": context?.showGridlines },
        "border-0 border-b border-solid",

        // Spacing
        context?.size === "small" ? "p-2" : context?.size === "large" ? "p-5" : "p-4",

        // Color
        props.sortable && context.sorted ? "bg-yellow-50 text-yellow-700" : "bg-slate-50 text-slate-700",
        props.sortable && context.sorted
          ? ""
          : "",
        "border-slate-200 ",

        // States
        {
          "hover:bg-slate-100": props.sortable && !context?.sorted,
        },
        "focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:ring focus-visible:ring-inset focus-visible:ring-yellow-400/50",

        // Transition
        { "transition duration-200": props.sortable },

        // Misc
        { "cursor-pointer": props.sortable },
        {
          "overflow-hidden space-nowrap border-y bg-clip-padding": context.resizable, // Resizable
        },
      ],
    }),
    headerContent: {
      class: "flex items-center",
    },
    sort: ({ context }: ColumnPassThroughMethodOptions) => ({
      class: [
        context.sorted ? "text-yellow-500" : "text-slate-700",
        context.sorted ? "" : "",
      ],
    }),
    bodyCell: ({ props, context, state, parent }: ColumnPassThroughMethodOptions & { state: ColumnState }) => ({
      class: [
        //Position
        { "sticky box-border border-b": parent.instance.frozenRow },
        { "sticky box-border border-b": props.frozen },

        // Alignment
        "text-left",

        // Shape
        "border-0 border-b border-solid",
        { "first:border-l border-r border-b": context?.showGridlines },
        { "bg-white": parent.instance.frozenRow || props.frozen },

        // Spacing
        { "p-2": context?.size === "small" && !state.d_editing },
        { "p-5": context?.size === "large" && !state.d_editing },
        { "p-4": context?.size !== "large" && context?.size !== "small" && !state.d_editing },
        { "py-[0.6rem] px-2": state.d_editing },

        // Color
        "border-slate-200",
      ],
    }),
    footerCell: ({ context }: ColumnPassThroughMethodOptions) => ({
      class: [
        // Font
        "font-bold",

        // Alignment
        "text-left",

        // Shape
        "border-0 border-b border-solid",
        { "border-x border-y": context?.showGridlines },

        // Spacing
        context?.size === "small" ? "p-2" : context?.size === "large" ? "p-5" : "p-4",

        // Color
        "border-slate-200",
        "text-slate-700",
        "bg-slate-50",
      ],
    }),
    sortIcon: ({ context }: ColumnPassThroughMethodOptions) => ({
      class: ["ml-2", context.sorted ? "text-yellow-700" : "text-slate-700"],
    }),
    sortBadge: {
      class: [
        // Flex & Alignment
        "flex items-center justify-center align-middle",

        // Shape
        "rounded-full",

        // Size
        "w-[1.143rem] leading-[1.143rem]",

        // Spacing
        "ml-2",

        // Color
        "text-yellow-700",
        "bg-yellow-50",
      ],
    },
    columnFilter: {
      class: "inline-flex items-center ml-auto",
    },
    filterOverlay: {
      class: [
        // Position
        "absolute top-0 left-0",

        // Shape
        "border-0",
        "rounded-md",
        "shadow-md",

        // Size
        "min-w-[12.5rem]",

        // Color
        "bg-white",
        "text-slate-800",
        "",
      ],
    },
    filterMatchModeDropdown: {
      root: ({ state }: { state: ColumnState }) => ({
        class: [
          // Display and Position
          "flex",
          "relative",

          // Spacing
          "my-2",

          // Shape
          "w-full",
          "rounded-md",

          // Color and Background
          "bg-white",
          "border border-slate-300",
          "text-slate-800",
          "placeholder:text-slate-400",

          // Transitions
          "transition-all",
          "duration-200",

          // States
          "hover:border-yellow-500",
          { "outline-none outline-offset-0 ring ring-yellow-400/50": state.focused },

          // Misc
          "cursor-pointer",
          "select-none",
        ],
      }),
    },
    filterRowItems: {
      class: "m-0 p-0 py-3 list-none",
    },
    filterRowItem: ({ context }: ColumnPassThroughMethodOptions) => ({
      class: [
        // Font
        "font-normal",
        "leading-none",

        // Position
        "relative",

        // Shape
        "border-0",
        "rounded-none",

        // Spacing
        "m-0",
        "py-3 px-5",

        // Color
        { "text-slate-700": !context?.highlighted },
        { "bg-white text-slate-700": !context?.highlighted },
        { "bg-yellow-100 text-yellow-700": context?.highlighted },
        { "bg-yellow-50 text-yellow-700": context?.highlighted },

        //States
        { "hover:bg-slate-100": !context?.highlighted },
        {
          "hover:text-slate-700 hover:bg-slate-100":
            !context?.highlighted,
        },
        "focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:ring focus-visible:ring-inset focus-visible:ring-yellow-400/50",

        // Transitions
        "transition-shadow",
        "duration-200",

        // Misc
        "cursor-pointer",
        "overflow-hidden",
        "whitespace-nowrap",
      ],
    }),
    filterOperator: {
      class: [
        // Spacing
        "px-5 py-3",

        // Shape
        "border-b border-solid",
        "rounded-t-md",

        // Color
        "text-slate-700",
        "border-slate-200",
        "bg-white",
      ],
    },
    filterOperatorDropdown: {
      root: ({ state }: DropdownPassThroughMethodOptions<ColumnPassThroughOptionType>) => ({
        class: [
          // Display and Position
          "inline-flex",
          "relative",

          // Shape
          "w-full",
          "rounded-md",

          // Color and Background
          "bg-white",
          "border border-slate-300",

          // Transitions
          "transition-all",
          "duration-200",

          // States
          "hover:border-yellow-500",
          { "outline-none outline-offset-0 ring ring-yellow-400/50": state.focused },

          // Misc
          "cursor-pointer",
          "select-none",
        ],
      }),
      input: () => ({
        class: [
          //Font
          "font-sans",
          "leading-none",

          // Display
          "block",
          "flex-auto",

          // Color and Background
          "bg-transparent",
          "placeholder:text-slate-400",

          // Sizing and Spacing
          "w-[1%]",
          "p-3",

          //Shape
          "rounded-none",

          // Transitions
          "transition",
          "duration-200",

          // States
          "focus:outline-none focus:shadow-none",

          // Misc
          "relative",
          "cursor-pointer",
          "overflow-hidden overflow-ellipsis",
          "whitespace-nowrap",
          "appearance-none",
        ],
      }),
      trigger: {
        class: [
          // Flexbox
          "flex items-center justify-center",
          "shrink-0",

          // Color and Background
          "bg-transparent",
          "text-slate-500",

          // Size
          "w-12",

          // Shape
          "rounded-tr-md",
          "rounded-br-md",
        ],
      },
      panel: {
        class: [
          // Position
          "absolute top-0 left-0",

          // Shape
          "border-0",
          "rounded-md",
          "shadow-md",

          // Color
          "bg-white",
          "text-slate-800",
          "",
        ],
      },
      item: ({ context }: DropdownPassThroughMethodOptions<ColumnPassThroughOptionType>) => ({
        class: [
          // Font
          "font-normal",
          "leading-none",

          // Position
          "relative",

          // Shape
          "border-0",
          "rounded-none",

          // Spacing
          "m-0",
          "py-3 px-5",

          // Color
          { "text-slate-700": !context.focused && !context.selected },
          {
            "bg-slate-50 text-slate-700":
              context.focused && !context.selected,
          },
          {
            "bg-yellow-100 text-yellow-700":
              context.focused && context.selected,
          },
          {
            "bg-yellow-50 text-yellow-700":
              !context.focused && context.selected,
          },

          //States
          { "hover:bg-slate-100": !context.focused && !context.selected },
          {
            "hover:text-slate-700 hover:bg-slate-100":
              context.focused && !context.selected,
          },

          // Transitions
          "transition-shadow",
          "duration-200",

          // Misc
          "cursor-pointer",
          "overflow-hidden",
          "whitespace-nowrap",
        ],
      }),
    },
    filterConstraint: {
      class: [
        // Spacing
        "py-3 px-5",

        // Shape
        "border-b border-solid",

        // Color
        "border-slate-200",
      ],
    },
    filterAddRule: {
      class: "py-3 px-5",
    },
    filterAddRuleButton: {
      root: {
        class: [
          "relative",

          // Alignments
          "items-center inline-flex text-center align-bottom justify-center",

          // Sizes & Spacing
          "text-sm py-2 px-3 w-full",

          // Shape
          "rounded-md",

          "bg-transparent border-transparent",
          "text-yellow-500",
          "hover:bg-yellow-300/20",

          // Transitions
          "transition duration-200 ease-in-out",

          // Misc
          "cursor-pointer overflow-hidden select-none",
        ],
      },
      label: {
        class: "flex-auto grow-0",
      },
      icon: {
        class: "mr-2",
      },
    },
    filterRemoveButton: {
      root: {
        class: [
          "relative",

          // Alignments
          "items-center inline-flex text-center align-bottom justify-center",

          // Sizes & Spacing
          "text-sm py-2 px-3 w-full mt-2",

          // Shape
          "rounded-md",

          "bg-transparent border-transparent",
          "text-red-500",
          "hover:bg-red-300/20",

          // Transitions
          "transition duration-200 ease-in-out",

          // Misc
          "cursor-pointer overflow-hidden select-none",
        ],
      },
      label: {
        class: "flex-auto grow-0",
      },
      icon: {
        class: "mr-2",
      },
    },
    filterButtonbar: {
      class: [
        // Flex & Alignment
        "flex items-center justify-between",

        // Space
        "py-3 px-5",
      ],
    },
    filterClearButton: {
      root: {
        class: [
          "relative",

          // Alignments
          "items-center inline-flex text-center align-bottom justify-center",

          // Sizes & Spacing
          "text-sm py-2 px-3",

          // Shape
          "rounded-md",

          "text-yellow-500 border border-yellow-500",
          "hover:bg-yellow-300/20",

          // Transitions
          "transition duration-200 ease-in-out",

          // Misc
          "cursor-pointer overflow-hidden select-none",
        ],
      },
    },
    filterApplyButton: {
      root: {
        class: [
          "relative",

          // Alignments
          "items-center inline-flex text-center align-bottom justify-center",

          // Sizes & Spacing
          "text-sm py-2 px-3",

          // Shape
          "rounded-md",

          "text-white",
          "bg-yellow-500",
          "hover:bg-yellow-600 hover:border-yellow-600",

          // Transitions
          "transition duration-200 ease-in-out",

          // Misc
          "cursor-pointer overflow-hidden select-none",
        ],
      },
    },
    filterMenuButton: ({ context }: ColumnPassThroughMethodOptions) => ({
      class: [
        "relative",
        // Flex & Alignment
        "inline-flex items-center justify-center",

        // Size
        "w-8 h-8",

        // Spacing
        "ml-2",

        // Shape
        "rounded-full",

        // Color
        { "bg-yellow-50 text-yellow-700": context.active },
        "",

        // States
        "hover:text-slate-700 hover:bg-slate-300/20",
        "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-yellow-400/50",

        // Transition
        "transition duration-200",

        // Misc
        "cursor-pointer no-underline overflow-hidden",
      ],
    }),
    headerFilterClearButton: ({ context }: ColumnPassThroughMethodOptions) => ({
      class: [
        "relative",

        // Flex & Alignment
        "inline-flex items-center justify-center",
        "text-left",

        // Shape
        "border-none",

        // Spacing
        "m-0 p-0 ml-2",

        // Color
        "bg-transparent",

        // Misc
        "cursor-pointer no-underline overflow-hidden select-none",
        {
          invisible: !context.hidden,
        },
      ],
    }),
    rowToggler: {
      class: [
        "relative",

        // Flex & Alignment
        "inline-flex items-center justify-center",
        "text-left",

        // Spacing
        "m-0 p-0",

        // Size
        "w-8 h-8",

        // Shape
        "border-0 rounded-full",

        // Color
        "text-slate-500",
        "bg-transparent",
        "focus-visible:outline-none focus-visible:outline-offset-0",
        "focus-visible:ring focus-visible:ring-yellow-400/50",

        // Transition
        "transition duration-200",

        // Misc
        "overflow-hidden",
        "cursor-pointer select-none",
      ],
    },
    rowGroupToggler: {
      class: [
        "relative",

        // Flex & Alignment
        "inline-flex items-center justify-center",
        "text-left",

        // Spacing
        "m-0 p-0",

        // Size
        "w-8 h-8",

        // Shape
        "border-0 rounded-full",

        // Color
        "text-slate-500",
        "bg-transparent",
        "focus-visible:outline-none focus-visible:outline-offset-0",
        "focus-visible:ring focus-visible:ring-yellow-400/50",

        // Transition
        "transition duration-200",

        // Misc
        "overflow-hidden",
        "cursor-pointer select-none",
      ],
    },
    rowGroupTogglerIcon: {
      class: "inline-block w-4 h-4",
    },
    columnResizer: {
      class: [
        "block",

        // Position
        "absolute top-0 right-0",

        // Sizing
        "w-2 h-full",

        // Spacing
        "m-0 p-0",

        // Color
        "border border-transparent",

        // Misc
        "cursor-col-resize",
      ],
    },
    rowReorderIcon: {
      class: "cursor-move",
    },
    rowEditorInitButton: {
      class: [
        "relative",

        // Flex & Alignment
        "inline-flex items-center justify-center",
        "text-left",

        // Size
        "w-8 h-8",

        // Shape
        "border-0 rounded-full",

        // Color
        "text-slate-700",
        "border-transparent",

        // States
        "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-yellow-400/50",
        "hover:text-slate-700 hover:bg-slate-300/20",

        // Transition
        "transition duration-200",

        // Misc
        "overflow-hidden",
        "cursor-pointer select-none",
      ],
    },
    rowEditorSaveButton: {
      class: [
        "relative",

        // Flex & Alignment
        "inline-flex items-center justify-center",
        "text-left",

        // Size
        "w-8 h-8",

        // Shape
        "border-0 rounded-full",

        // Color
        "text-slate-700",
        "border-transparent",

        // States
        "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-yellow-400/50",
        "hover:text-slate-700 hover:bg-slate-300/20",

        // Transition
        "transition duration-200",

        // Misc
        "overflow-hidden",
        "cursor-pointer select-none",
      ],
    },
    rowEditorCancelButton: {
      class: [
        "relative",

        // Flex & Alignment
        "inline-flex items-center justify-center",
        "text-left",

        // Size
        "w-8 h-8",

        // Shape
        "border-0 rounded-full",

        // Color
        "text-slate-700",
        "border-transparent",

        // States
        "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-yellow-400/50",
        "hover:text-slate-700 hover:bg-slate-300/20",

        // Transition
        "transition duration-200",

        // Misc
        "overflow-hidden",
        "cursor-pointer select-none",
      ],
    },
    radiobuttonWrapper: {
      class: [
        "relative",

        // Flex & Alignment
        "inline-flex align-bottom",

        // Size
        "w-6 h-6",

        // Misc
        "cursor-pointer select-none",
      ],
    },
    radioButton: ({ context }: ColumnPassThroughMethodOptions) => ({
      class: [
        // Flexbox
        "flex justify-center items-center",

        // Size
        "w-[1.571rem] h-[1.571rem]",

        // Shape
        "border-2 rounded-full",

        // Color
        { "text-slate-700": !context.checked },
        { "bg-white": !context.checked },
        { "border-slate-300": !context.checked },
        { "border-yellow-500": context.checked },
        { "bg-yellow-500": context.checked },

        // States
        { "hover:border-yellow-500": !context.disabled },
        {
          "outline-none outline-offset-0 ring ring-yellow-400/50 ring-inset": context.focused,
        },

        // Transition
        "transition duration-200 ease-in-out",

        // Misc
        { "cursor-default opacity-60": context.disabled },
      ],
    }),
    radioButtonIcon: ({ context }: ColumnPassThroughMethodOptions) => ({
      class: [
        "block",

        // Shape
        "rounded-full",

        // Size
        "w-3 h-3",

        // Color
        "bg-white",

        // Transition
        "transition duration-200 transform",
        {
          "backface-hidden scale-10 invisible": !context.checked,
          "transform scale-100 visible": context.checked,
        },
      ],
    }),
    headerCheckboxWrapper: {
      class: [
        "relative",

        // Flex & Alignment
        "inline-flex align-bottom",

        // Size
        "w-6 h-6",

        // Misc
        "cursor-pointer select-none",
      ],
    },
    headerCheckbox: ({ context }: ColumnPassThroughMethodOptions) => ({
      class: [
        // Flex & Alignment
        "flex items-center justify-center",

        // Shape
        "border-2 rounded-lg",

        // Size
        "w-6 h-6",

        // Color
        "text-slate-600",
        {
          "border-slate-200 bg-white": !context.checked,
          "border-yellow-500 bg-yellow-500": context.checked,
        },

        // States
        "focus:outline-none focus:outline-offset-0",
        {
          "ring ring-yellow-400/50": context.focused,
        },

        // Transition
        "transition-colors duration-200",

        // Misc
        { "cursor-default opacity-60": context.disabled },
      ],
    }),
    headerCheckboxIcon: {
      class: [
        // Size
        "w-4 h-4",
        "text-base leading-none",

        // Color
        "text-white",

        // Transition
        "transition-all duration-200",
      ],
    },
    checkboxWrapper: {
      class: [
        "relative",

        // Flex & Alignment
        "inline-flex align-bottom",

        // Size
        "w-6 h-6",

        // Misc
        "cursor-pointer select-none",
      ],
    },
    checkbox: ({ context }: ColumnPassThroughMethodOptions) => ({
      class: [
        // Flex & Alignment
        "flex items-center justify-center",

        // Shape
        "border-2 rounded-lg",

        // Size
        "w-6 h-6",

        // Color
        "text-slate-600",
        {
          "border-slate-200 bg-white": !context.checked,
          "border-yellow-500 bg-yellow-500": context.checked,
        },

        // States
        "focus:outline-none focus:outline-offset-0",
        {
          "ring ring-yellow-400/50": context.focused,
        },

        // Transition
        "transition-colors duration-200",

        // Misc
        { "cursor-default opacity-60": context.disabled },
      ],
    }),
    checkboxIcon: {
      class: [
        // Size
        "w-4 h-4",
        "text-base leading-none",

        // Color
        "text-white",

        // Transition
        "transition-all duration-200",
      ],
    },
    transition: {
      enterFromClass: "opacity-0 scale-y-[0.8]",
      enterActiveClass: "transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]",
      leaveActiveClass: "transition-opacity duration-100 ease-linear",
      leaveToClass: "opacity-0",
    },
  },
  bodyRow: ({ context, props }) => ({
    class: [
      // Color
      "",
      { "bg-yellow-50 text-yellow-700": context.selected },
      { "bg-white text-slate-600": !context.selected },
      {
        "odd:bg-white odd:text-slate-600 even:bg-slate-50 even:text-slate-600":
          context.stripedRows,
      },

      // State
      {
        "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-yellow-400/50 ring-inset":
          context.selectable,
      },
      { "hover:bg-slate-300/20 hover:text-slate-600": props.selectionMode && !context.selected },

      // Transition
      { "transition duration-200": (props.selectionMode && !context.selected) || props.rowHover },

      // Misc
      { "cursor-pointer": props.selectionMode },
    ],
  }),
  rowExpansion: {
    class: "bg-white text-slate-600",
  },
  rowGroupHeader: {
    class: ["sticky z-20", "bg-white text-slate-600", ""],
  },
  rowGroupFooter: {
    class: ["sticky z-20", "bg-white text-slate-600", ""],
  },
  resizeHelper: {
    class: "absolute hidden w-[2px] z-20 bg-yellow-500",
  },
} satisfies DataTablePassThroughOptions;

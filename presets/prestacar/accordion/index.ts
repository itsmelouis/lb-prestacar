import type { AccordionPassThroughOptions } from "primevue/accordion";
import type { AccordionTabPassThroughMethodOptions } from "primevue/accordiontab";

export default {
  accordiontab: {
    header: ({ props }: AccordionTabPassThroughMethodOptions) => ({
      class: [
        // State
        { "select-none pointer-events-none cursor-default opacity-60": props?.disabled },
      ],
    }),
    headerAction: ({ context }: AccordionTabPassThroughMethodOptions) => ({
      class: [
        //Font
        "font-bold",
        "leading-none",

        // Alignments
        "flex items-center justify-between flex-row-reverse",
        "relative",

        // Sizing
        "p-5",

        // Color
        "border-b border-black ",
        "text-slate-600 ",
        { "text-slate-900": context.active },

        // Transition
        "transition duration-200 ease-in-out",
        "transition-shadow duration-200",

        // States
        "hover:bg-slate-50 ",
        "hover:text-slate-900",

        // Misc
        "cursor-pointer no-underline select-none",
      ],
    }),
    headerIcon: {
      class: "inline-block mr-2",
    },
    headerTitle: {
      class: "leading-none",
    },
    content: {
      class: [
        // Spacing
        "p-5",

        // Color
        "text-slate-700 ",
      ],
    },
    transition: {
      enterFromClass: "max-h-0",
      enterActiveClass: "overflow-hidden transition-[max-height] duration-1000 ease-[cubic-bezier(0.42,0,0.58,1)]",
      enterToClass: "max-h-[1000px]",
      leaveFromClass: "max-h-[1000px]",
      leaveActiveClass: "overflow-hidden transition-[max-height] duration-[450ms] ease-[cubic-bezier(0,1,0,1)]",
      leaveToClass: "max-h-0",
    },
  },
} satisfies AccordionPassThroughOptions;

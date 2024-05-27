import type { CheckboxPassThroughOptions } from "primevue/checkbox";

export default {
    root: {
        class: ['relative', 'inline-flex', 'align-bottom', 'w-6', 'h-6', 'cursor-pointer', 'select-none']
    },
    box: ({ props, context }) => ({
        class: [
          // Alignment
          'flex',
          'items-center',
          'justify-center',
          // Size
          'w-6',
          'h-6',
          // Shape
          'rounded-md',
          'border-2',
          // Colors
          {
            'border-slate-200 bg-white': !context.checked && !props.invalid,
            'border-yellow bg-yellow-500': context.checked
          },
          // Invalid State
          { 'border-red-500': props.invalid },
          // States
          {
            'peer-hover:border-yellow-500': !props.disabled && !context.checked && !props.invalid,
            'peer-hover:bg-yellow-hover peer-hover:border-yellow-500': !props.disabled && context.checked,
            'peer-focus-visible:border-yellow-500 peer-focus-visible:ring-2 peer-focus-visible:ring-yellow-400/20': !props.disabled,
            'cursor-default opacity-60': props.disabled
          },
          // Transitions
          'transition-colors',
          'duration-200'
        ]
    }),
    input: {
        class: ['peer', 'w-full ', 'h-full', 'absolute', 'top-0 left-0', 'z-10', 'p-0', 'm-0', 'opacity-0', 'rounded-md', 'outline-none', 'border-2 border-slate-200', 'appearance-none', 'cursor-pointer']
    },
    icon: {
        class: ['text-base leading-none', 'w-4', 'h-4', 'text-white', 'transition-all', 'duration-200']
    }
} satisfies CheckboxPassThroughOptions;

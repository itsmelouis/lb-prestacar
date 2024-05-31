import type { MultiSelectPassThroughOptions } from 'primevue/multiselect';

export default {
    root: ({ props, state }) => ({
        class: [
          // Display and Position
          'inline-flex',
          'relative',
          // Shape
          'rounded-md',
          // Color and Background
          'bg-white',
          'border',
          { 'border-slate-300': !props.invalid },
          // Invalid State
          { 'border-red-500': props.invalid },
          // Transitions
          'transition-all',
          'duration-200',
          // States
          { 'hover:border-yellow': !props.invalid },
          { 'outline-none outline-offset-0 ring ring-yellow-400/50': state.focused },
          // Misc
          'cursor-pointer',
          'select-none',
          { 'opacity-60': props.disabled, 'pointer-events-none': props.disabled, 'cursor-default': props.disabled }
        ]
    }),
    labelContainer: {
        class: 'overflow-hidden flex flex-auto cursor-pointer '
    },
    label: ({ props }) => {
        var _a, _b, _c, _d;
        return {
          class: [
            'leading-[normal]',
            'block ',
            // Spacing
            {
              'p-3': props.display !== 'chip',
              'py-3 px-3': props.display === 'chip' && !((_a = props == null ? void 0 : props.modelValue) != null && _a.length),
              'py-[0.375rem] px-3': props.display === 'chip' && ((_b = props == null ? void 0 : props.modelValue) == null ? void 0 : _b.length) > 0
            },
            // Color
            { 'text-slate-800': (_c = props.modelValue) == null ? void 0 : _c.length, 'text-slate-400': !((_d = props.modelValue) != null && _d.length) },
            'placeholder:text-slate-400',
            // Transitions
            'transition duration-200',
            // Misc
            'overflow-hidden whitespace-nowrap cursor-pointer overflow-ellipsis'
          ]
        };
    },
    token: {
        class: ['inline-flex items-center', 'py-1.5 px-3 mr-2', 'rounded-[1.14rem]', 'bg-slate-200', 'text-slate-700', 'cursor-default']
    },
    removeTokenIcon: {
        class: ['rounded-md leading-6', 'ml-2', 'w-4 h-4', 'transition duration-200 ease-in-out', 'cursor-pointer']
    },
    trigger: {
        class: ['flex items-center justify-center', 'shrink-0', 'bg-transparent', 'text-slate-500', 'w-12', 'rounded-tr-md', 'rounded-br-md']
    },
    panel: {
        class: ['absolute top-0 left-0', 'border-0', 'rounded-md', 'shadow-md', 'bg-white', 'text-slate-800', 'dark:border-slate-700']
    },
    header: {
        class: ['flex items-center justify-between', 'py-3 px-5', 'm-0', 'border-b', 'rounded-tl-md', 'rounded-tr-md', 'text-slate-700', 'bg-slate-100', 'border-slate-300']
    },
    headerCheckbox: {
        root: {
            class: ['relative', 'inline-flex', 'align-bottom', 'w-6', 'h-6', 'mr-2', 'cursor-pointer', 'select-none']
        },
        box: ({ props, context }: any) => ({
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
                  'border-slate-200 bg-white': !context.checked,
                  'border-yellow-500 bg-yellow-500': context.checked
                },
                // States
                {
                  'peer-hover:border-yellow': !props.disabled && !context.checked,
                  'peer-hover:bg-yellow-500 peer-hover:border-yellow-500': !props.disabled && context.checked,
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
    },
    itemCheckbox: {
        root: {
            class: ['relative', 'inline-flex', 'align-bottom', 'w-6', 'h-6', 'mr-2', 'cursor-pointer', 'select-none']
        },
        box: ({ props, context }: any) => ({
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
                  'border-slate-200 bg-white': !context.checked,
                  'border-yellow bg-yellow-500': context.checked
                },
                // States
                {
                  'peer-hover:border-yellow': !props.disabled && !context.checked,
                  'peer-hover:bg-yellow-500 peer-hover:border-yellow-500': !props.disabled && context.checked,
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
    },
    closeButton: {
        class: ['relative', 'flex items-center justify-center', 'mr-2', 'last:mr-0', 'w-8 h-8', 'border-0', 'rounded-full', 'text-slate-500', 'bg-transparent', 'transition duration-200 ease-in-out', 'hover:text-slate-700', 'hover:bg-slate-100', 'focus:outline-none focus:outline-offset-0 focus:ring focus:ring-inset', 'focus:ring-yellow-400/50', 'overflow-hidden']
    },
    closeIcon: {
        class: 'w-4 h-4 inline-block'
    },
    wrapper: {
        class: ['max-h-[200px]', 'overflow-auto']
    },
    list: {
        class: 'py-3 list-none m-0'
    },
    item: ({ context }) => ({
        class: [
          // Font
          'font-normal',
          'leading-none',
          // Flexbox
          'flex items-center',
          // Position
          'relative',
          // Shape
          'border-0',
          'rounded-none',
          // Spacing
          'm-0',
          'py-3 px-5',
          // Color
          { 'text-slate-700': !context.focused && !context.selected },
          { 'bg-slate-200 text-slate-700': context.focused && !context.selected },
          { 'bg-yellow-highlight text-yellow-highlight-inverse': context.selected },
          //States
          { 'hover:bg-slate-100': !context.focused && !context.selected },
          { 'hover:text-slate-700 hover:bg-slate-100': context.focused && !context.selected },
          // Transitions
          'transition-shadow',
          'duration-200',
          // Misc
          'cursor-pointer',
          'overflow-hidden',
          'whitespace-nowrap'
        ]
    }),
    itemGroup: {
        class: ['font-bold', 'm-0', 'p-3 px-5', 'text-slate-800', 'bg-white', 'cursor-auto']
    },
    filterContainer: {
        class: 'relative w-full mx-2'
    },
    filterInput: {
        class: ['leading-[normal]', 'pr-7 py-3 px-3', '-mr-7', 'w-full', 'text-slate-700', 'bg-white', 'border-slate-200', 'placeholder:text-slate-400', 'border', 'rounded-lg', 'appearance-none', 'transition', 'duration-200', 'hover:border-yellow', 'focus:ring focus:outline-none focus:outline-offset-0', 'focus:ring-yellow-400/50', 'appearance-none']
    },
    filterIcon: {
        class: ['absolute', 'top-1/2 right-3', '-mt-2']
    },
    emptyMessage: {
        class: ['leading-none', 'py-3 px-5', 'text-slate-800', 'bg-transparent']
    },
    transition: {
        enterFromClass: 'opacity-0 scale-y-[0.8]',
        enterActiveClass: 'transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]',
        leaveActiveClass: 'transition-opacity duration-100 ease-linear',
        leaveToClass: 'opacity-0'
    }
} satisfies MultiSelectPassThroughOptions;

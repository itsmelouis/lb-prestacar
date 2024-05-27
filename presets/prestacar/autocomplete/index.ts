import type { AutoCompletePassThroughOptions } from "primevue/autocomplete";

export default {
  root: ({ props }) => ({
    class: [
      'relative',
      // Flex
      'inline-flex',
      // Size
      { 'w-full': props.multiple },
      // Color
      'text-surface-900',
      //States
      {
        'opacity-60 select-none pointer-events-none cursor-default': props.disabled
      }
    ]
  }),
  container: ({ props, state }) => ({
    class: [
      // Font
      'text-base leading-[normal]',
      // Flex
      'flex items-center flex-wrap',
      'gap-2',
      // Spacing
      'm-0 list-none',
      'px-3 py-1.5',
      // Size
      'w-full',
      'min-h-[2.877rem]',
      // Shape
      'appearance-none rounded-md',
      // Color
      'text-surface-700',
      'placeholder:text-surface-400',
      'bg-white',
      'border',
      { 'border-surface-300': !props.invalid },
      // Invalid State
      { 'border-red-500': props.invalid },
      // States
      { 'hover:border-primary': !props.invalid },
      'focus:outline-none focus:outline-offset-0',
      { 'ring ring-primary-400/50': state.focused },
      // Transition
      'transition duration-200 ease-in-out',
      // Misc
      'cursor-text overflow-hidden'
    ]
  }),
  inputToken: {
    class: ['py-1.5 px-0', 'inline-flex flex-auto']
  },
  input: ({ props, parent }) => {
    var _a;
    return {
      class: [
        // Font
        'text-base leading-[normal]',
        // Shape
        'appearance-none rounded-md',
        { 'rounded-tr-none rounded-br-none': props.dropdown },
        { 'outline-none shadow-none rounded-none': props.multiple },
        // Size
        { 'w-full': props.multiple },
        // Spacing
        'm-0',
        { 'p-3': !props.multiple, 'p-0': props.multiple },
        // Colors
        'text-surface-700',
        'border',
        {
          'bg-white': !props.multiple,
          ' border-surface-300': !props.multiple && !props.invalid,
          'border-0 bg-transparent': props.multiple
        },
        // Invalid State
        { 'border-red-500': props.invalid },
        // States
        { 'focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-400/50': !props.multiple },
        // Filled State *for FloatLabel
        { filled: ((_a = parent.instance) == null ? void 0 : _a.$name) == 'FloatLabel' && props.modelValue !== '' },
        // Transition
        'transition-colors duration-200'
      ]
    };
  },
  token: {
    class: ['inline-flex items-center', 'py-1.5 px-3', 'rounded-[1.14rem]', 'bg-surface-200', 'text-surface-700', 'cursor-default']
  },
  removeTokenIcon: {
    class: ['rounded-md leading-6', 'ml-2', 'w-4 h-4', 'transition duration-200 ease-in-out', 'cursor-pointer']
  },
  dropdownButton: {
    root: {
      class: ['relative', 'items-center inline-flex text-center align-bottom', 'rounded-r-md', 'px-4 py-3 leading-[normal]', 'text-primary-inverse', 'bg-primary', 'border border-primary', 'focus:outline-none focus:outline-offset-0 focus:ring', 'hover:bg-primary-hover hover:border-primary-hover', 'focus:ring-primary-400/50']
    }
  },
  loadingIcon: {
    class: ['text-surface-500', 'absolute top-[50%] right-[0.5rem] -mt-2 animate-spin']
  },
  panel: {
    class: ['bg-white', 'text-surface-700', 'border-0', 'rounded-md', 'shadow-md', 'max-h-[200px] overflow-auto']
  },
  list: {
    class: 'py-3 px-0 list-none m-0'
  },
  item: ({ context }) => ({
    class: [
      'relative',
      // Font
      'font-normal text-base leading-[normal]',
      // Spacing
      'm-0 px-5 py-3',
      // Shape
      'border-0 rounded-none',
      // Colors
      {
        'text-surface-700': !context.focused && !context.selected,
        'bg-surface-200 text-surface-700': context.focused && !context.selected,
        'text-primary-highlight-inverse': context.selected,
        'bg-primary-highlight': context.selected
      },
      //States
      { 'hover:bg-surface-100': !context.focused && !context.selected },
      { 'hover:bg-primary-highlight-hover': context.selected },
      'focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:ring focus-visible:ring-inset focus-visible:ring-primary-400/50',
      // Transition
      'transition-shadow duration-200',
      // Misc
      'cursor-pointer overflow-hidden whitespace-nowrap'
    ]
  }),
  itemGroup: {
    class: ['font-bold', 'm-0 p-3', 'bg-white', 'text-surface-800', 'cursor-auto']
  },
  emptyMessage: {
    class: ['leading-[normal]', 'py-3 px-5', 'text-surface-800', 'bg-transparent']
  },
  transition: {
    enterFromClass: 'opacity-0 scale-y-[0.8]',
    enterActiveClass: 'transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]',
    leaveActiveClass: 'transition-opacity duration-100 ease-linear',
    leaveToClass: 'opacity-0'
  }
} satisfies AutoCompletePassThroughOptions;

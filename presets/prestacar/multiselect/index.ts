import type { MultiSelectPassThroughOptions } from 'primevue/multiselect';

export default {
    root: ({ props, state, parent }) => ({
        class: [
            // Font
            'leading-none',

            // Display and Position
            'inline-flex',
            'relative',

            // Shape
            'rounded-md',

            // Color and Background
            { 'bg-white dark:bg-slate-950': !props.disabled },
            'border',
            { 'border-slate-300 dark:border-slate-600': !props.invalid },

            // Invalid State
            'invalid:focus:ring-red-200',
            'invalid:hover:border-red-500',
            { 'border-red-500 dark:border-red-400': props.invalid },

            // Transitions
            'transition-all',
            'duration-200',

            // States
            { 'hover:border-slate-400 dark:hover:border-slate-700': !props.invalid },
            { 'outline-none outline-offset-0 z-10 ring-1 ring-yellow-500 dark:ring-yellow-400': state.focused },

            // Misc
            'cursor-pointer',
            'select-none',
            { 'bg-slate-200 dark:bg-slate-700 select-none pointer-events-none cursor-default': props.disabled }
        ]
    }),
    labelContainer: {
        class: 'overflow-hidden flex flex-auto cursor-pointer'
    },
    label: ({ props }) => ({
        class: [
            'leading-none',
            'block',

            // Spacing
            {
                'py-2 px-3': props.display === 'comma' || (props.display === 'chip' && !props?.modelValue?.length),
                'py-1 px-1': props.display === 'chip' && props?.modelValue?.length > 0
            },

            // Color
            { 'text-slate-800 dark:text-dark/80': props.modelValue?.length, 'text-slate-400 dark:text-slate-500': !props.modelValue?.length },
            'placeholder:text-slate-400 dark:placeholder:text-slate-500',

            // Transitions
            'transition duration-200',

            // Misc
            'overflow-hidden whitespace-nowrap cursor-pointer overflow-ellipsis'
        ]
    }),
    token: {
        class: [
            // Flex
            'inline-flex items-center',

            // Spacings
            'py-1 px-3 m-0 mr-1',

            // Shape
            'rounded',

            // Colors
            'bg-slate-100 dark:bg-slate-700',
            'text-slate-700 dark:text-dark',

            // Misc
            'cursor-default'
        ]
    },
    removeTokenIcon: {
        class: [
            // Spacing
            'ml-[0.375rem]',

            // Size
            'w-4 h-4',

            // Misc
            'cursor-pointer'
        ]
    },
    trigger: {
        class: [
            // Flexbox
            'flex items-center justify-center',
            'shrink-0',

            // Color and Background
            'bg-transparent',
            'text-slate-500',

            // Size
            'w-12',

            // Shape
            'rounded-r-md'
        ]
    },
    panel: {
        class: [
            // Colors
            'bg-white dark:bg-slate-900',
            'text-slate-700 dark:text-dark/80',

            // Shape
            'border border-slate-300 dark:border-slate-700',
            'rounded-md',
            'shadow-md'
        ]
    },
    header: {
        class: [
            //Flex
            'flex items-center justify-between',

            // Spacing
            'pt-2 px-4 pb-0',
            'm-0',

            //Shape
            'border-b-0',
            'rounded-tl-md',
            'rounded-tr-md',

            // Color
            'text-slate-700 dark:text-dark/80',
            'bg-white dark:bg-slate-900',
            'border-slate-300 dark:border-slate-700'
        ]
    },
    headerCheckbox: {
        root: {
            class: [
                'relative',

                // Alignment
                'inline-flex',
                'align-bottom',

                // Size
                'w-5',
                'h-5',

                // Spacing
                'mr-2',

                // Misc
                'cursor-pointer',
                'select-none'
            ]
        },
        box: ({ props, context }: { props: any, context: any }) => ({
            class: [
                // Alignment
                'flex',
                'items-center',
                'justify-center',

                // Size
                'w-5',
                'h-5',

                // Shape
                'rounded',
                'border',

                // Colors
                {
                    'border-slate-300 dark:border-slate-700': !context.checked && !props.invalid,
                    'bg-white dark:bg-slate-950': !context.checked && !props.invalid && !props.disabled,
                    'border-yellow bg-yellow': context.checked
                },

                // Invalid State
                'invalid:focus:ring-red-200',
                'invalid:hover:border-red-500',
                { 'border-red-500 dark:border-red-400': props.invalid },

                // States
                {
                    'peer-hover:border-slate-400 dark:peer-hover:border-slate-600': !props.disabled && !context.checked && !props.invalid,
                    'peer-hover:bg-yellow-hover peer-hover:border-yellow-hover': !props.disabled && context.checked,
                    'peer-focus-visible:z-10 peer-focus-visible:outline-none peer-focus-visible:outline-offset-0 peer-focus-visible:ring-1 peer-focus-visible:ring-yellow-500 dark:peer-focus-visible:ring-yellow-400': !props.disabled,
                    'bg-slate-200 dark:bg-slate-700 select-none pointer-events-none cursor-default': props.disabled
                },

                // Transitions
                'transition-colors',
                'duration-200'
            ]
        }),
        input: {
            class: [
                'peer',

                // Size
                'w-full ',
                'h-full',

                // Position
                'absolute',
                'top-0 left-0',
                'z-10',

                // Spacing
                'p-0',
                'm-0',

                // Shape
                'opacity-0',
                'rounded',
                'outline-none',
                'border border-slate-300 dark:border-slate-700',

                // Misc
                'appearance-none',
                'cursor-pointer'
            ]
        },
        icon: {
            class: [
                // Size
                'w-[0.875rem]',
                'h-[0.875rem]',

                // Colors
                'text-dark dark:text-slate-950',

                // Transitions
                'transition-all',
                'duration-200'
            ]
        }
    },
    itemCheckbox: {
        root: {
            class: [
                'relative',

                // Alignment
                'inline-flex',
                'align-bottom',

                // Size
                'w-5',
                'h-5',

                // Spacing
                'mr-2',

                // Misc
                'cursor-pointer',
                'select-none'
            ]
        },
        box: ({ props, context }: { props: any, context: any }) => ({
            class: [
                // Alignment
                'flex',
                'items-center',
                'justify-center',

                // Size
                'w-5',
                'h-5',

                // Shape
                'rounded',
                'border',

                // Colors
                {
                    'border-slate-300 dark:border-slate-700': !context.checked && !props.invalid,
                    'bg-white dark:bg-slate-950': !context.checked && !props.invalid && !props.disabled,
                    'border-yellow bg-yellow': context.checked
                },

                // Invalid State
                'invalid:focus:ring-red-200',
                'invalid:hover:border-red-500',
                { 'border-red-500 dark:border-red-400': props.invalid },

                // States
                {
                    'peer-hover:border-slate-400 dark:peer-hover:border-slate-600': !props.disabled && !context.checked && !props.invalid,
                    'peer-hover:bg-yellow-hover peer-hover:border-yellow-hover': !props.disabled && context.checked,
                    'peer-focus-visible:z-10 peer-focus-visible:outline-none peer-focus-visible:outline-offset-0 peer-focus-visible:ring-1 peer-focus-visible:ring-yellow-500 dark:peer-focus-visible:ring-yellow-400': !props.disabled,
                    'bg-slate-200 dark:bg-slate-700 select-none pointer-events-none cursor-default': props.disabled
                },

                // Transitions
                'transition-colors',
                'duration-200'
            ]
        }),
        input: {
            class: [
                'peer',

                // Size
                'w-full ',
                'h-full',

                // Position
                'absolute',
                'top-0 left-0',
                'z-10',

                // Spacing
                'p-0',
                'm-0',

                // Shape
                'opacity-0',
                'rounded',
                'outline-none',
                'border border-slate-300 dark:border-slate-700',

                // Misc
                'appearance-none',
                'cursor-pointer'
            ]
        },
        icon: {
            class: [
                // Size
                'w-[0.875rem]',
                'h-[0.875rem]',

                // Colors
                'text-dark dark:text-slate-950',

                // Transitions
                'transition-all',
                'duration-200'
            ]
        }
    },
    closeButton: {
        class: [
            'relative',

            // Flexbox and Alignment
            'flex items-center justify-center',

            // Size and Spacing
            'ml-2',
            'last:mr-0',
            'w-8 h-8',

            // Shape
            'border-0',
            'rounded-full',

            // Colors
            'text-slate-500',
            'bg-transparent',

            // Transitions
            'transition duration-200 ease-in-out',

            // States
            'hover:text-slate-700 dark:hover:text-dark/80',
            'hover:bg-slate-100 dark:hover:bg-slate-800/80',
            'focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-inset',
            'focus:ring-yellow-500 dark:focus:ring-yellow-400',

            // Misc
            'overflow-hidden'
        ]
    },
    wrapper: {
        class: [
            // Sizing
            'max-h-[200px]',

            // Misc
            'overflow-auto'
        ]
    },
    list: {
        class: 'p-1 list-none m-0'
    },
    item: ({ context }) => ({
        class: [
            'relative',

            // Font
            'leading-none',

            // Spacing
            'm-0 px-3 py-2',
            'first:mt-0 mt-[2px]',

            // Shape
            'border-0 rounded',

            // Colors
            {
                'text-slate-700 dark:text-dark/80': !context.focused && !context.selected,
                'bg-slate-200 dark:bg-slate-600/60': context.focused && !context.selected,

                'text-yellow-highlight-inverse': context.selected,
                'bg-yellow-highlight': context.selected
            },

            //States
            { 'hover:bg-slate-100 dark:hover:bg-[rgba(255,255,255,0.03)]': !context.focused && !context.selected },
            { 'hover:bg-yellow-highlight-hover': context.selected },
            { 'hover:text-slate-700 hover:bg-slate-100 dark:hover:text-dark dark:hover:bg-[rgba(255,255,255,0.03)]': context.focused && !context.selected },

            // Transition
            'transition-shadow duration-200',

            // Misc 
            'cursor-pointer overflow-hidden whitespace-nowrap'
        ]
    }),
    itemGroup: {
        class: [
            'font-semibold',

            // Spacing
            'm-0 py-2 px-3',

            // Colors
            'text-slate-400 dark:text-slate-500',

            // Misc
            'cursor-auto'
        ]
    },
    filterContainer: {
        class: 'relative'
    },
    filterInput: {
        class: [
            // Font
            'leading-[normal]',

            // Sizing
            'py-2 pl-3 pr-7',
            '-mr-7',
            'w-full',

            //Color
            'text-slate-700 dark:text-dark/80',
            'bg-white dark:bg-slate-950',
            'border-slate-200 dark:border-slate-700',

            // Shape
            'border',
            'rounded-lg',
            'appearance-none',

            // Transitions
            'transition',
            'duration-200',

            // States
            'hover:border-slate-400 dark:hover:border-slate-600',
            'focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-yellow-500 dark:focus:ring-yellow-400 focus:z-10',

            // Misc
            'appearance-none'
        ]
    },
    filterIcon: {
        class: ['absolute', 'top-1/2 right-3', '-mt-2']
    },
    emptyMessage: {
        class: [
            // Font
            'leading-none',

            // Spacing
            'py-2 px-3',

            // Color
            'text-slate-800 dark:text-dark/80',
            'bg-transparent'
        ]
    },
    transition: {
        enterFromClass: 'opacity-0 scale-y-[0.8]',
        enterActiveClass: 'transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]',
        leaveActiveClass: 'transition-opacity duration-100 ease-linear',
        leaveToClass: 'opacity-0'
    }
} satisfies MultiSelectPassThroughOptions;

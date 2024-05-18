import type { RatingPassThroughOptions } from "primevue/rating";

export default {
    root: ({ props }) => ({
        class: [
            'relative',

            // Flex & Alignment
            'flex items-center',
            'gap-2',

            // Misc
            {
                'opacity-60 select-none pointer-events-none cursor-default': props.disabled
            }
        ]
    }),
    cancelItem: ({ context }) => ({
        class: [
            // Flex & Alignment
            'inline-flex items-center',

            //State
            {
                'outline-none ring ring-yellow-500/50 ': context.focused
            },

            // Misc
            'cursor-pointer'
        ]
    }),
    cancelIcon: {
        class: [
            // Size
            'w-5 h-5',

            // Color
            'text-red-500 ',

            // State
            'hover:text-red-600 ',

            // Transition
            'transition duration-200 ease-in'
        ]
    },
    item: ({ props, context }) => ({
        class: [
            // Flex & Alignment
            'inline-flex items-center',

            // State
            {
                'outline-none ring ring-yellow-500/50': context.focused
            },

            // Misc
            {
                'cursor-pointer': !props.readonly,
                'cursor-default': props.readonly
            }
        ]
    }),
    offIcon: ({ props }) => ({
        class: [
            // Size
            'w-5 h-5',

            // Color
            'text-slate-700 ',

            // State
            { 'hover:text-yellow-500 ': !props.readonly },

            // Transition
            'transition duration-200 ease-in'
        ]
    }),
    onIcon: ({ props }) => ({
        class: [
            // Size
            'w-5 h-5',

            // Color
            'text-yellow-500 ',

            // State
            { 'hover:text-yellow-600 ': !props.readonly },

            // Transition
            'transition duration-200 ease-in'
        ]
    })
} satisfies RatingPassThroughOptions;

import type { InputTextPassThroughOptions } from 'primevue/inputtext';

export default {
    root: ({ props, context, parent }) => ({
        class: [
            "block w-full",
            // Font
            'font-sans leading-none',

            // Flex
            { 'flex-1 w-[1%]': parent.instance.$name == 'InputGroup' },

            // Spacing
            'm-0',
            {
                'px-4 py-4': props.size == 'large',
                'px-2 py-2': props.size == 'small',
                'p-3': props.size == null
            },

            // Shape
            { 'rounded-md': parent.instance.$name !== 'InputGroup' },
            { 'first:rounded-l-md rounded-none last:rounded-r-md': parent.instance.$name == 'InputGroup' },
            { 'border-0 border-y border-l last:border-r': parent.instance.$name == 'InputGroup' },
            { 'first:ml-0 -ml-px': parent.instance.$name == 'InputGroup'},

            // Colors
            'text-slate-600',
            'placeholder:text-slate-400',
            'bg-white',
            'border',
            { 'border-slate-300': !props.invalid },

            // Invalid State
            { 'border-red-500': props.invalid },

            // States
            {
                'hover:border-yellow-500': !context.disabled && !props.invalid,
                'focus:outline-none focus:outline-offset-0 focus:ring focus:ring-yellow-500/50 focus:z-10': !context.disabled,
                'opacity-60 select-none pointer-events-none cursor-default': context.disabled
            },

            // Filled State *for FloatLabel
            { 'filled': parent.instance?.$name == 'FloatLabel' && context.filled },

            // Misc
            'appearance-none',
            'transition-colors duration-200',

            // New Styles for Search Input
            'rounded-full border border-gray-300 p-3 pr-10',
            'focus:border-gray-500',
            'placeholder-gray-500',
            'bg-white',
            'relative'
        ]
    })
} satisfies InputTextPassThroughOptions;

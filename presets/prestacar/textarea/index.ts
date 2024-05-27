import type { TextareaPassThroughOptions } from "primevue/textarea";

export default {
    root: ({ context, props }) => ({
        class: [
            // Font
            'font-sans leading-none',

            // Spacing
            'm-0',
            'p-3',

            // Shape
            'rounded-md',

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
                'focus:outline-none focus:outline-offset-0 focus:ring focus:ring-yellow-500/50': !context.disabled,
                'opacity-60 select-none pointer-events-none cursor-default': context.disabled
            },

            // Misc
            'appearance-none',
            'transition-colors duration-200'
        ]
    })
} satisfies TextareaPassThroughOptions;

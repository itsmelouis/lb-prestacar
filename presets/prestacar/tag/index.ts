import type { TagPassThroughOptions } from 'primevue/tag';

export default {
    root: ({ props }) => ({
        class: [
            //Font
            'text-xs font-bold',

            //Alignments
            'inline-flex items-center justify-center',

            //Spacing
            'px-2 py-1',

            //Shape
            {
                'rounded-md': !props.rounded,
                'rounded-full': props.rounded
            },

            //Colors
            'text-black',
            {
                'bg-yellow-500': props.severity == null || props.severity == 'primary',
                'bg-green-500/20 text-green-500': props.severity == 'success',
                'bg-blue-500/20 text-blue-500': props.severity == 'info',
                'bg-orange-500/20 text-orange-500': props.severity == 'warning',
                'bg-red-500/20 text-red-500': props.severity == 'danger'
            }
        ]
    }),
    value: {
        class: 'leading-normal'
    },
    icon: {
        class: 'mr-1 text-sm'
    }
} satisfies TagPassThroughOptions;

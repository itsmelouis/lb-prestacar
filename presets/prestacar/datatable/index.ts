import type { DataTablePassThroughOptions } from 'primevue/datatable';

export default {
    root: ({ props }) => ({
        class: [
            'relative',

            // Flex & Alignment
            { 'flex flex-col': props.scrollable && props.scrollHeight === 'flex' },

            // Size
            { 'h-full': props.scrollable && props.scrollHeight === 'flex' }
        ]
    }),
    loadingOverlay: {
        class: [
            // Position
            'absolute',
            'top-0 left-0',
            'z-20',

            // Flex & Alignment
            'flex items-center justify-center',

            // Size
            'w-full h-full',

            // Color
            'bg-slate-100/40',

            // Transition
            'transition duration-200'
        ]
    },
    loadingIcon: {
        class: 'w-8 h-8 animate-spin'
    },
    wrapper: ({ props }) => ({
        class: [
            { relative: props.scrollable, 'flex flex-col grow': props.scrollable && props.scrollHeight === 'flex' },

            // Size
            { 'h-full': props.scrollable && props.scrollHeight === 'flex' }
        ]
    }),
    header: ({ props }) => ({
        class: [
            'font-bold',

            // Shape
            props.showGridlines ? 'border-x border-t border-b-0' : 'border-y border-x-0',

            // Spacing
            'p-4',

            // Color
            'bg-slate-50',
            'border-slate-200',
            'text-slate-700'
        ]
    }),
    table: {
        class: 'w-full border-spacing-0 border-separate'
    },
    thead: ({ context }) => ({
        class: [
            {
                'bg-slate-50 top-0 z-40 sticky': context.scrollable
            }
        ]
    }),
    tbody: ({ instance, context }) => ({
        class: [
            {
                'sticky z-20': instance.frozenRow && context.scrollable
            }
        ]
    }),
    tfoot: ({ context }) => ({
        class: [
            {
                'bg-slate-50 bottom-0 z-0': context.scrollable
            }
        ]
    }),
    footer: {
        class: [
            'font-bold',

            // Shape
            'border-t-0 border-b border-x-0',

            // Spacing
            'p-4',

            // Color
            'bg-slate-50',
            'border-slate-200',
            'text-slate-700'
        ]
    },
    column: {
        headercell: ({ context, props }) => ({
            class: [
                'font-bold',

                // Position
                { 'sticky z-20 border-b': props.frozen || props.frozen === '' },

                { relative: context.resizable },

                // Alignment
                'text-left',

                // Shape
                { 'first:border-l border-y border-r': context?.showGridlines },
                'border-0 border-b border-solid',

                // Spacing
                context?.size === 'small' ? 'p-2' : context?.size === 'large' ? 'p-5' : 'p-4',

                // Color
                (props.sortable === '' || props.sortable) && context.sorted ? 'bg-yellow-50 text-yellow-700' : 'bg-slate-50 text-slate-700',
                (props.sortable === '' || props.sortable) && context.sorted ? 'dark:text-white' : 'dark:text-white/80',
                'border-slate-200 ',

                // States
                { 'hover:bg-slate-100': (props.sortable === '' || props.sortable) && !context?.sorted },
                'focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:ring focus-visible:ring-inset focus-visible:ring-yellow-400/50',

                // Transition
                { 'transition duration-200': props.sortable === '' || props.sortable },

                // Misc
                { 'cursor-pointer': props.sortable === '' || props.sortable },
                {
                    'overflow-hidden space-nowrap border-y bg-clip-padding': context.resizable // Resizable
                }
            ]
        }),
        headercontent: {
            class: 'flex items-center'
        },
        sort: ({ context }: { context: any }) => ({
            class: [context.sorted ? 'text-yellow-500' : 'text-slate-700', context.sorted ? 'dark:text-yellow-400' : 'dark:text-white/80']
        }),
        bodycell: ({ props, context, state, parent }: { props: any, context: any, state: any, parent: any }) => ({
            class: [
                //Position
                { 'sticky box-border border-b': parent.instance.frozenRow },
                { 'sticky box-border border-b': props.frozen || props.frozen === '' },

                // Alignment
                'text-left',

                // Shape
                'border-0 border-b border-solid',
                { 'first:border-l border-r border-b': context?.showGridlines },
                { 'bg-white': parent.instance.frozenRow || props.frozen || props.frozen === '' },

                // Spacing
                { 'p-2': context?.size === 'small' && !state['d_editing'] },
                { 'p-5': context?.size === 'large' && !state['d_editing'] },
                { 'p-4': context?.size !== 'large' && context?.size !== 'small' && !state['d_editing'] },
                { 'py-[0.6rem] px-2': state['d_editing'] },

                // Color
                'border-slate-200'
            ]
        }),
        footercell: ({ context }: { context: any }) => ({
            class: [
                // Font
                'font-bold',

                // Alignment
                'text-left',

                // Shape
                'border-0 border-b border-solid',
                { 'border-x border-y': context?.showGridlines },

                // Spacing
                context?.size === 'small' ? 'p-2' : context?.size === 'large' ? 'p-5' : 'p-4',

                // Color
                'border-slate-200',
                'text-slate-700',
                'bg-slate-50'
            ]
        }),
        sorticon: ({ context }: { context: any }) => ({
            class: ['ml-2', context.sorted ? 'text-yellow-700' : 'text-slate-700']
        }),
        sortbadge: {
            class: [
                // Flex & Alignment
                'flex items-center justify-center align-middle',

                // Shape
                'rounded-full',

                // Size
                'w-[1.143rem] leading-[1.143rem]',

                // Spacing
                'ml-2',

                // Color
                'text-yellow-700',
                'bg-yellow-50'
            ]
        },
        columnfilter: {
            class: 'inline-flex items-center ml-auto'
        },
        filteroverlay: {
            class: [
                // Position
                'absolute top-0 left-0',

                // Shape
                'border-0',
                'rounded-md',
                'shadow-md',

                // Size
                'min-w-[12.5rem]',

                // Color
                'bg-white',
                'text-slate-800',
                'dark:border-slate-700'
            ]
        },
        filtermatchmodedropdown: {
            root: ({ state }: { state: { focused: boolean } }) => ({
                class: [
                    // Display and Position
                    'flex',
                    'relative',

                    // Spacing
                    'my-2',

                    // Shape
                    'w-full',
                    'rounded-md',

                    // Color and Background
                    'bg-white',
                    'border border-slate-300',
                    'text-slate-800',
                    'placeholder:text-slate-400',

                    // Transitions
                    'transition-all',
                    'duration-200',

                    // States
                    'hover:border-yellow-500',
                    { 'outline-none outline-offset-0 ring ring-yellow-400/50': state.focused },

                    // Misc
                    'cursor-pointer',
                    'select-none'
                ]
            })
        },
        filterrowitems: {
            class: 'm-0 p-0 py-3 list-none'
        },
        filterrowitem: ({ context }: { context: { highlighted?: boolean } }) => ({
            class: [
                // Font
                'font-normal',
                'leading-none',

                // Position
                'relative',

                // Shape
                'border-0',
                'rounded-none',

                // Spacing
                'm-0',
                'py-3 px-5',

                // Color
                { 'text-slate-700': !context?.highlighted },
                { 'bg-white text-slate-700': !context?.highlighted },
                { 'bg-yellow-100 text-yellow-700': context?.highlighted },
                { 'bg-yellow-50 text-yellow-700': context?.highlighted },

                //States
                { 'hover:bg-slate-100': !context?.highlighted },
                { 'hover:text-slate-700 hover:bg-slate-100': !context?.highlighted },
                'focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:ring focus-visible:ring-inset focus-visible:ring-yellow-400/50',

                // Transitions
                'transition-shadow',
                'duration-200',

                // Misc
                'cursor-pointer',
                'overflow-hidden',
                'whitespace-nowrap'
            ]
        }),
        filteroperator: {
            class: [
                // Spacing
                'px-5 py-3',

                // Shape
                'border-b border-solid',
                'rounded-t-md',

                // Color
                'text-slate-700',
                'border-slate-200',
                'bg-white'
            ]
        },
        filteroperatordropdown: {
            root: ({ state }) => ({
                class: [
                    // Display and Position
                    'inline-flex',
                    'relative',

                    // Shape
                    'w-full',
                    'rounded-md',

                    // Color and Background
                    'bg-white',
                    'border border-slate-300',

                    // Transitions
                    'transition-all',
                    'duration-200',

                    // States
                    'hover:border-yellow-500',
                    { 'outline-none outline-offset-0 ring ring-yellow-400/50': state.focused },

                    // Misc
                    'cursor-pointer',
                    'select-none'
                ]
            }),
            input: ({ props }) => ({
                class: [
                    //Font
                    'font-sans',
                    'leading-none',

                    // Display
                    'block',
                    'flex-auto',

                    // Color and Background
                    'bg-transparent',
                    'border-0',
                    { 'text-slate-800': props.modelValue, 'text-slate-400': !props.modelValue },
                    'placeholder:text-slate-400',

                    // Sizing and Spacing
                    'w-[1%]',
                    'p-3',

                    //Shape
                    'rounded-none',

                    // Transitions
                    'transition',
                    'duration-200',

                    // States
                    'focus:outline-none focus:shadow-none',

                    // Misc
                    'relative',
                    'cursor-pointer',
                    'overflow-hidden overflow-ellipsis',
                    'whitespace-nowrap',
                    'appearance-none'
                ]
            }),
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
                    'rounded-tr-md',
                    'rounded-br-md'
                ]
            },
            panel: {
                class: [
                    // Position
                    'absolute top-0 left-0',

                    // Shape
                    'border-0',
                    'rounded-md',
                    'shadow-md',

                    // Color
                    'bg-white',
                    'text-slate-800',
                    'dark:border-slate-700'
                ]
            },
            item: ({ context }) => ({
                class: [
                    // Font
                    'font-normal',
                    'leading-none',

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
                    { 'bg-slate-50 text-slate-700': context.focused && !context.selected },
                    { 'bg-yellow-100 text-yellow-700': context.focused && context.selected },
                    { 'bg-yellow-50 text-yellow-700': !context.focused && context.selected },

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
            })
        },
        filterconstraint: {
            class: [
                // Spacing
                'py-3 px-5',

                // Shape
                'border-b border-solid',

                // Color
                'border-slate-200'
            ]
        },
        filteraddrule: {
            class: 'py-3 px-5'
        },
        filteraddrulebutton: {
            root: {
                class: [
                    'relative',

                    // Alignments
                    'items-center inline-flex text-center align-bottom justify-center',

                    // Sizes & Spacing
                    'text-sm py-2 px-3 w-full',

                    // Shape
                    'rounded-md',

                    'bg-transparent border-transparent',
                    'text-yellow-500',
                    'hover:bg-yellow-300/20',

                    // Transitions
                    'transition duration-200 ease-in-out',

                    // Misc
                    'cursor-pointer overflow-hidden select-none'
                ]
            },
            label: {
                class: 'flex-auto grow-0'
            },
            icon: {
                class: 'mr-2'
            }
        },
        filterremovebutton: {
            root: {
                class: [
                    'relative',

                    // Alignments
                    'items-center inline-flex text-center align-bottom justify-center',

                    // Sizes & Spacing
                    'text-sm py-2 px-3 w-full mt-2',

                    // Shape
                    'rounded-md',

                    'bg-transparent border-transparent',
                    'text-red-500',
                    'hover:bg-red-300/20',

                    // Transitions
                    'transition duration-200 ease-in-out',

                    // Misc
                    'cursor-pointer overflow-hidden select-none'
                ]
            },
            label: {
                class: 'flex-auto grow-0'
            },
            icon: {
                class: 'mr-2'
            }
        },
        filterbuttonbar: {
            class: [
                // Flex & Alignment
                'flex items-center justify-between',

                // Space
                'py-3 px-5'
            ]
        },
        filterclearbutton: {
            root: {
                class: [
                    'relative',

                    // Alignments
                    'items-center inline-flex text-center align-bottom justify-center',

                    // Sizes & Spacing
                    'text-sm py-2 px-3',

                    // Shape
                    'rounded-md',

                    'text-yellow-500 border border-yellow-500',
                    'hover:bg-yellow-300/20',

                    // Transitions
                    'transition duration-200 ease-in-out',

                    // Misc
                    'cursor-pointer overflow-hidden select-none'
                ]
            }
        },
        filterapplybutton: {
            root: {
                class: [
                    'relative',

                    // Alignments
                    'items-center inline-flex text-center align-bottom justify-center',

                    // Sizes & Spacing
                    'text-sm py-2 px-3',

                    // Shape
                    'rounded-md',

                    'text-white',
                    'bg-yellow-500',
                    'hover:bg-yellow-600 hover:border-yellow-600',

                    // Transitions
                    'transition duration-200 ease-in-out',

                    // Misc
                    'cursor-pointer overflow-hidden select-none'
                ]
            }
        },
        filtermenubutton: ({ context }) => ({
            class: [
                'relative',
                // Flex & Alignment
                'inline-flex items-center justify-center',

                // Size
                'w-8 h-8',

                // Spacing
                'ml-2',

                // Shape
                'rounded-full',

                // Color
                { 'bg-yellow-50 text-yellow-700': context.active },
                'dark:text-white/70',

                // States
                'hover:text-slate-700 hover:bg-slate-300/20',
                'focus:outline-none focus:outline-offset-0 focus:ring focus:ring-yellow-400/50',

                // Transition
                'transition duration-200',

                // Misc
                'cursor-pointer no-underline overflow-hidden'
            ]
        }),
        headerfilterclearbutton: ({ context }) => ({
            class: [
                'relative',

                // Flex & Alignment
                'inline-flex items-center justify-center',
                'text-left',

                // Shape
                'border-none',

                // Spacing
                'm-0 p-0 ml-2',

                // Color
                'bg-transparent',

                // Misc
                'cursor-pointer no-underline overflow-hidden select-none',
                {
                    invisible: !context.hidden
                }
            ]
        }),
        rowtoggler: {
            class: [
                'relative',

                // Flex & Alignment
                'inline-flex items-center justify-center',
                'text-left',

                // Spacing
                'm-0 p-0',

                // Size
                'w-8 h-8',

                // Shape
                'border-0 rounded-full',

                // Color
                'text-slate-500',
                'bg-transparent',
                'focus-visible:outline-none focus-visible:outline-offset-0',
                'focus-visible:ring focus-visible:ring-yellow-400/50',

                // Transition
                'transition duration-200',

                // Misc
                'overflow-hidden',
                'cursor-pointer select-none'
            ]
        },
        columnresizer: {
            class: [
                'block',

                // Position
                'absolute top-0 right-0',

                // Sizing
                'w-2 h-full',

                // Spacing
                'm-0 p-0',

                // Color
                'border border-transparent',

                // Misc
                'cursor-col-resize'
            ]
        },
        rowreordericon: {
            class: 'cursor-move'
        },
        roweditorinitbutton: {
            class: [
                'relative',

                // Flex & Alignment
                'inline-flex items-center justify-center',
                'text-left',

                // Size
                'w-8 h-8',

                // Shape
                'border-0 rounded-full',

                // Color
                'text-slate-700',
                'border-transparent',

                // States
                'focus:outline-none focus:outline-offset-0 focus:ring focus:ring-yellow-400/50',
                'hover:text-slate-700 hover:bg-slate-300/20',

                // Transition
                'transition duration-200',

                // Misc
                'overflow-hidden',
                'cursor-pointer select-none'
            ]
        },
        roweditorsavebutton: {
            class: [
                'relative',

                // Flex & Alignment
                'inline-flex items-center justify-center',
                'text-left',

                // Size
                'w-8 h-8',

                // Shape
                'border-0 rounded-full',

                // Color
                'text-slate-700',
                'border-transparent',

                // States
                'focus:outline-none focus:outline-offset-0 focus:ring focus:ring-yellow-400/50',
                'hover:text-slate-700 hover:bg-slate-300/20',

                // Transition
                'transition duration-200',

                // Misc
                'overflow-hidden',
                'cursor-pointer select-none'
            ]
        },
        roweditorcancelbutton: {
            class: [
                'relative',

                // Flex & Alignment
                'inline-flex items-center justify-center',
                'text-left',

                // Size
                'w-8 h-8',

                // Shape
                'border-0 rounded-full',

                // Color
                'text-slate-700',
                'border-transparent',

                // States
                'focus:outline-none focus:outline-offset-0 focus:ring focus:ring-yellow-400/50',
                'hover:text-slate-700 hover:bg-slate-300/20',

                // Transition
                'transition duration-200',

                // Misc
                'overflow-hidden',
                'cursor-pointer select-none'
            ]
        },
        rowRadiobutton: {
            root: {
                class: [
                    'relative',

                    // Flexbox & Alignment
                    'inline-flex',
                    'align-bottom',

                    // Size
                    'w-[1.571rem] h-[1.571rem]',

                    // Misc
                    'cursor-pointer',
                    'select-none'
                ]
            },
            box: ({ props }) => ({
                class: [
                    // Flexbox
                    'flex justify-center items-center',

                    // Size
                    'w-[1.571rem] h-[1.571rem]',

                    // Shape
                    'border-2',
                    'rounded-full',

                    // Transition
                    'transition duration-200 ease-in-out',

                    // Colors
                    {
                        'text-slate-700': !props.modelValue,
                        'bg-white': !props.modelValue,
                        'border-slate-300': !props.modelValue,
                        'border-yellow-500': props.modelValue,
                        'bg-yellow-500': props.modelValue
                    },

                    // States
                    {
                        'peer-hover:border-yellow-500': !props.disabled,
                        'peer-hover:border-yellow-600 peer-hover:bg-yellow-600': !props.disabled && props.modelValue,
                        'peer-focus-visible:border-yellow-500 peer-focus-visible:ring-2 peer-focus-visible:ring-yellow-400/20': !props.disabled,
                        'opacity-60 cursor-default': props.disabled
                    }
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
                    'rounded-md',
                    'outline-none',
                    'border-2 border-slate-200',

                    // Misc
                    'appearance-none',
                    'cursor-pointer'
                ]
            },
            icon: ({ props }) => ({
                class: [
                    'block',

                    // Shape
                    'rounded-full',

                    // Size
                    'w-[0.857rem] h-[0.857rem]',

                    // Colors
                    'bg-white',

                    // Conditions
                    {
                        'backface-hidden scale-10 invisible': !props.modelValue,
                        'transform visible scale-[1.1]': props.modelValue
                    },

                    // Transition
                    'transition duration-200'
                ]
            })
        },
        headercheckbox: {
            root: {
                class: [
                    'relative',

                    // Alignment
                    'inline-flex',
                    'align-bottom',

                    // Size
                    'w-6',
                    'h-6',

                    // Misc
                    'cursor-pointer',
                    'select-none'
                ]
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
                        'border-slate-200 bg-white': !context.checked,
                        'border-yellow-500 bg-yellow-500': context.checked
                    },

                    // States
                    {
                        'peer-hover:border-yellow-500': !props.disabled && !context.checked,
                        'peer-hover:bg-yellow-600 peer-hover:border-yellow-700': !props.disabled && context.checked,
                        'peer-focus-visible:border-yellow-500 peer-focus-visible:ring-2 peer-focus-visible:ring-yellow-400/20': !props.disabled,
                        'cursor-default opacity-60': props.disabled
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
                    'rounded-md',
                    'outline-none',
                    'border-2 border-slate-200',

                    // Misc
                    'appearance-none',
                    'cursor-pointer'
                ]
            },
            icon: {
                class: [
                    // Font
                    'text-base leading-none',

                    // Size
                    'w-4',
                    'h-4',

                    // Colors
                    'text-white',

                    // Transitions
                    'transition-all',
                    'duration-200'
                ]
            }
        },
        rowCheckbox: {
            root: {
                class: [
                    'relative',

                    // Alignment
                    'inline-flex',
                    'align-bottom',

                    // Size
                    'w-6',
                    'h-6',

                    // Misc
                    'cursor-pointer',
                    'select-none'
                ]
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
                        'border-slate-200 bg-white': !context.checked,
                        'border-yellow-500 bg-yellow-500': context.checked
                    },

                    // States
                    {
                        'peer-hover:border-yellow-500': !props.disabled && !context.checked,
                        'peer-hover:bg-yellow-600 peer-hover:border-yellow-700': !props.disabled && context.checked,
                        'peer-focus-visible:border-yellow-500 peer-focus-visible:ring-2 peer-focus-visible:ring-yellow-400/20': !props.disabled,
                        'cursor-default opacity-60': props.disabled
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
                    'rounded-md',
                    'outline-none',
                    'border-2 border-slate-200',

                    // Misc
                    'appearance-none',
                    'cursor-pointer'
                ]
            },
            icon: {
                class: [
                    // Font
                    'text-base leading-none',

                    // Size
                    'w-4',
                    'h-4',

                    // Colors
                    'text-white',

                    // Transitions
                    'transition-all',
                    'duration-200'
                ]
            }
        },
        transition: {
            enterFromClass: 'opacity-0 scale-y-[0.8]',
            enterActiveClass: 'transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]',
            leaveActiveClass: 'transition-opacity duration-100 ease-linear',
            leaveToClass: 'opacity-0'
        }
    },
    bodyrow: ({ context, props }) => ({
        class: [
            // Color
            'dark:text-white/80',
            { 'bg-yellow-50 text-yellow-700': context.selected },
            { 'bg-white text-slate-600': !context.selected },
            { 'font-bold bg-white': props.frozenRow },
            { 'odd:bg-white odd:text-slate-600 even:bg-slate-50 even:text-slate-600': context.stripedRows },

            // State
            { 'focus:outline-none focus:outline-offset-0 focus:ring focus:ring-yellow-400/50 ring-inset': context.selectable },
            { 'hover:bg-slate-300/20 hover:text-slate-600': props.selectionMode && !context.selected },

            // Transition
            { 'transition duration-200': (props.selectionMode && !context.selected) || props.rowHover },

            // Misc
            { 'cursor-pointer': props.selectionMode }
        ]
    }),
    rowexpansion: {
        class: 'bg-white text-slate-600'
    },
    rowgroupheader: {
        class: ['sticky z-20', 'bg-white text-slate-600', 'dark:bg-slate-800']
    },
    rowgroupfooter: {
        class: ['sticky z-20', 'bg-white text-slate-600', 'dark:bg-slate-800']
    },
    rowgrouptoggler: {
        class: [
            'relative',

            // Flex & Alignment
            'inline-flex items-center justify-center',
            'text-left',

            // Spacing
            'm-0 p-0',

            // Size
            'w-8 h-8',

            // Shape
            'border-0 rounded-full',

            // Color
            'text-slate-500',
            'bg-transparent',
            'focus-visible:outline-none focus-visible:outline-offset-0',
            'focus-visible:ring focus-visible:ring-yellow-400/50',

            // Transition
            'transition duration-200',

            // Misc
            'overflow-hidden',
            'cursor-pointer select-none'
        ]
    },
    rowgrouptogglericon: {
        class: 'inline-block w-4 h-4'
    },
    resizehelper: {
        class: 'absolute hidden w-[2px] z-20 bg-yellow-500'
    }
} satisfies (DataTablePassThroughOptions);

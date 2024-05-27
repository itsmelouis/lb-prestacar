import type { CarouselPassThroughOptions } from "primevue/carousel";

export default {
  root: {
    class: ['flex flex-col']
  },
  content: {
    class: ['flex flex-col overflow-auto']
  },
  container: ({ props }) => ({
    class: [
      // Flexbox
      'flex',
      // Orientation
      {
        'flex-row': props.orientation !== 'vertical',
        'flex-col': props.orientation == 'vertical'
      }
    ]
  }),
  previousButton: {
    class: ['flex justify-center items-center self-center', 'overflow-hidden w-8 h-8', 'mx-2', 'rounded-full', 'border-0 bg-transparent', 'text-slate-600', 'transition duration-200 ease-in-out']
  },
  nextButton: {
    class: ['flex justify-center items-center self-center', 'overflow-hidden w-8 h-8', 'mx-2', 'rounded-full', 'border-0 bg-transparent', 'text-slate-600', 'transition duration-200 ease-in-out']
  },
  itemsContent: {
    class: ['overflow-hidden w-full']
  },
  itemsContainer: ({ props }) => ({
    class: [
      // Flexbox
      'flex',
      // Orientation & Sizing
      {
        'flex-row': props.orientation !== 'vertical',
        'flex-col h-full': props.orientation == 'vertical'
      }
    ]
  }),
  item: ({ props }) => ({
    class: [
      // Flexbox
      'flex shrink-0 grow ',
      // Size
      {
        'w-full sm:w-[50%] md:w-[33.333333333333336%]': props.orientation !== 'vertical',
        'w-full h-full': props.orientation == 'vertical'
      }
    ]
  }),
  itemCloned: ({ props }) => ({
    class: [
      // Flexbox
      'flex shrink-0 grow',
      'unvisible',
      // Size
      {
        'w-full sm:w-[50%] md:w-[33.333333333333336%]': props.orientation !== 'vertical',
        'w-full h-full': props.orientation == 'vertical'
      }
    ]
  }),
  indicators: {
    class: ['flex flex-row justify-center flex-wrap']
  },
  indicator: {
    class: ['mr-2 mb-2']
  },
  indicatorButton: ({ context }) => ({
    class: [
      // Sizing & Shape
      'w-8 h-2 rounded-lg',
      // Transitions
      'transition duration-200',
      // Focus Styles
      'focus:outline-none focus:outline-offset-0 focus:ring focus:ring-yellow-400/50',
      // Color & Background
      {
        'bg-slate-200 hover:bg-slate-300': !context.highlighted,
        'bg-yellow-500 hover:bg-yellow-500': context.highlighted
      }
    ]
  })
} satisfies CarouselPassThroughOptions;

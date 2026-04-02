const breakpoints = {
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1440,
} as const

type Breakpoint = keyof typeof breakpoints

export const mq = {
  up: (bp: Breakpoint) => `@media (min-width: ${breakpoints[bp]}px)`,
  down: (bp: Breakpoint) => `@media (max-width: ${breakpoints[bp] - 1}px)`,
  between: (min: Breakpoint, max: Breakpoint) =>
    `@media (min-width: ${breakpoints[min]}px) and (max-width: ${breakpoints[max] - 1}px)`,
}

import props from './props.js'
import conditionalRendering from './conditionalRendering.js'
import listsKeys from './listsKeys.js'
import forms from './forms.js'
import composition from './composition.js'
import liftingState from './liftingState.js'

import useStateDemo from './useStateDemo.js'
import useEffectDemo from './useEffectDemo.js'
import context from './context.js'
import useReducerDemo from './useReducerDemo.js'
import useRefDemo from './useRefDemo.js'
import useMemoDemo from './useMemoDemo.js'
import useCallbackDemo from './useCallbackDemo.js'
import dataFetching from './dataFetching.js'
import customHook from './customHook.js'

import errorBoundary from './errorBoundary.js'
import lazySuspense from './lazySuspense.js'
import portals from './portals.js'

// Each demo module exports { slug, title, category, description, files }.
// `files` follows the Sandpack `files` prop shape (paths -> source code).
// Grouped by category here so first-occurrence order (used for color
// assignment below) matches the reading order: Fundamentals, Hooks, Patterns.
export const demos = [
  props,
  conditionalRendering,
  listsKeys,
  forms,
  composition,
  liftingState,

  useStateDemo,
  useEffectDemo,
  context,
  useReducerDemo,
  useRefDemo,
  useMemoDemo,
  useCallbackDemo,
  dataFetching,
  customHook,

  errorBoundary,
  lazySuspense,
  portals,
]

export const demosBySlug = Object.fromEntries(demos.map((d) => [d.slug, d]))

export const categories = [...new Set(demos.map((d) => d.category))]

// One highlighter per category, assigned in category order. `mark` is the
// highlighter itself — only ever used as a background behind dark text, since
// it's far too light to read as text. `ink` is a deep shade of the same hue
// that's dark enough for text, borders, and the editor's accent color.
const PALETTE = [
  { mark: '#ffe45c', ink: '#7d5f00' }, // yellow
  { mark: '#ffafd2', ink: '#b0135e' }, // pink
  { mark: '#93e6cb', ink: '#08704f' }, // mint
  { mark: '#a9d4ff', ink: '#1a5da6' }, // blue
  { mark: '#ffc48a', ink: '#9a4a00' }, // orange
]

export const categoryColors = Object.fromEntries(
  categories.map((category, i) => [category, PALETTE[i % PALETTE.length].ink])
)

export const categoryMarks = Object.fromEntries(
  categories.map((category, i) => [category, PALETTE[i % PALETTE.length].mark])
)

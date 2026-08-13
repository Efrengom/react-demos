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

// Assigned in category order so each topic group gets a stable, distinct accent.
const PALETTE = ['#7c3aed', '#0ea5e9', '#059669', '#d97706', '#dc2626', '#db2777']

export const categoryColors = Object.fromEntries(
  categories.map((category, i) => [category, PALETTE[i % PALETTE.length]])
)

function hexToRgba(hex, alpha) {
  const n = parseInt(hex.slice(1), 16)
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`
}

export const categorySoftColors = Object.fromEntries(
  categories.map((category) => [category, hexToRgba(categoryColors[category], 0.14)])
)

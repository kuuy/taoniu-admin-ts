import type { PaletteOptions } from '@mui/material'
import { common } from '@mui/material/colors'
import { alpha } from '@mui/material/styles'
import { error, info, neutral, success, warning } from '../colors'
import type { ColorPreset, Contrast } from '../index'
import { getPrimary } from '../utils'

interface Config {
  colorPreset?: ColorPreset
  contrast?: Contrast
}

export const createPalette = (config: Config): PaletteOptions => {
  const { colorPreset, contrast } = config;

  return {
    action: {
      active: neutral[500],
      disabled: alpha(neutral[900], 0.38),
      disabledBackground: alpha(neutral[900], 0.12),
      focus: alpha(neutral[900], 0.16),
      hover: alpha(neutral[900], 0.04),
      selected: alpha(neutral[900], 0.12),
    },
    background: {
      default: contrast === "high" ? neutral[50] : common.white,
      paper: common.white,
    },
    divider: neutral[200],
    error,
    info,
    mode: "light",
    neutral,
    primary: getPrimary(colorPreset),
    success,
    text: {
      primary: neutral[900],
      secondary: contrast === "high" ? neutral[700] : neutral[500],
      disabled: alpha(neutral[900], 0.38),
    },
    warning,
  }
}

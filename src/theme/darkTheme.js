// src/theme/darkTheme.js
import { COLORS } from './colors';
import { TYPOGRAPHY } from './typography';

export const darkTheme = {
  background: COLORS.darkBackground,
  text: COLORS.darkText,
  primary: COLORS.gold,
  typography: {
    ...TYPOGRAPHY,
    h1: { ...TYPOGRAPHY.h1, color: COLORS.darkText },
    // vb. override
  },
};

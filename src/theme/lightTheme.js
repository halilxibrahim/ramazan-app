// src/theme/lightTheme.js
import { COLORS } from './colors';
import { TYPOGRAPHY } from './typography';

export const lightTheme = {
  background: COLORS.beige,
  text: COLORS.darkBackground, // 2C2C2C
  primary: COLORS.gold,
  typography: {
    ...TYPOGRAPHY,
    h1: { ...TYPOGRAPHY.h1, color: COLORS.darkBackground },
    // Gerekiyorsa override
  },
};

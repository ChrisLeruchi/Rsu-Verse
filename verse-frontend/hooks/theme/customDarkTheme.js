import { DefaultTheme } from '@react-navigation/native';

import { ThemeTokens } from '.';

export const CustomDarkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: ThemeTokens.colors.dark.background,
  },
};
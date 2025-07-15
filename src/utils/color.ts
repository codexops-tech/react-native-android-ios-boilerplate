import { ColorSchemeName } from 'react-native';

const commonThemeSettings = {
  borderRadius: {
    lg: 24,
    md: 16,
    sm: 8,
    xs: 4,
  },
  spacing: {
    lg: 32,
    md: 16,
    sm: 8,
    xs: 4,
  },
};

export const color = {
  dark: {
    ...commonThemeSettings,
    colors: {
      background: '#212121',
      border: '#282828',
      card: '#121212',
      primary: '#0a84ff',
      secondary: '#dcdcdc',
      subtext: '#B3B3B3',
      text: '#f8f9fa',
      accent: '#FF375F',
    },
  },
  light: {
    ...commonThemeSettings,
    colors: {
      background: '#f8f9fa',
      border: '#e0e0e0',
      card: '#ffffff',
      primary: '#000080',
      secondary: '#6c757d',
      subtext: '#B3B3B3',
      text: '#343a40',
      accent: '#FF2D55',
    },
  },
  theme1: {
    ...commonThemeSettings,
    colors: {
      background: '#f8f8f8',
      border: '#e0e0e0',

      card: '#ffffff',
      // light pink
      primary: '#ff5a5f',

      // red
      secondary: '#f2c9c9',

      // dark grey
      subtext: '#B3B3B3',

      // off-white
      text: '#424242',
      accent: '#FFB300',
    },
  },
  theme2: {
    ...commonThemeSettings,
    colors: {
      background: '#e5e5e5',
      border: '#cccccc',

      card: '#ffffff',
      // wheat
      primary: '#000080',

      // navy blue
      secondary: '#f5deb3',

      // dark grey
      subtext: '#999999',

      // light beige
      text: '#333333',
      accent: '#FF9500',
    },
  },
  theme3: {
    ...commonThemeSettings,
    colors: {
      background: '#f0f0f0',
      border: '#dddddd',

      card: '#ffffff',
      // light yellow
      primary: '#800000',

      // maroon
      secondary: '#ffffe0',

      // dark slate grey
      subtext: '#666666',

      // light yellow
      text: '#2f4f4f',
      accent: '#FFD600',
    },
  },
  theme4: {
    ...commonThemeSettings,
    colors: {
      background: '#f5f5f5',
      border: '#dddddd',

      card: '#ffffff',
      // misty rose
      primary: '#663399',

      // rebecca purple
      secondary: '#ffe4e1',

      // dark grey
      subtext: '#888888',

      // light rose
      text: '#333333',
      accent: '#FF69B4',
    },
  },
} as const;

export type Palette = (typeof color)[keyof typeof color];
export type Theme = ColorSchemeName | keyof typeof color;

export const getColor = (theme: Theme): Palette => {
  if (theme === 'dark' || theme === 'light') {
    return color[theme];
  }
  return color.dark;
};

export const setColor = (theme: Theme): void => {
  // This function is a placeholder for future theme customization
  // It can be used to dynamically update theme colors
  console.log('Setting theme:', theme);
};

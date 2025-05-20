import { DarkTheme, DefaultTheme } from '@react-navigation/native';

export type ThemeType = 'light' | 'dark';

export interface AppTheme {
  dark: boolean;
  colors: {
    primary: string;
    background: string;
    card: string;
    text: string;
    border: string;
    notification: string;
    secondary: string;
    accent: string;
    error: string;
    success: string;
    warning: string;
    overlay: string;
    placeholder: string;
    disabled: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  typography: {
    h1: {
      fontSize: number;
      fontWeight: string;
    };
    h2: {
      fontSize: number;
      fontWeight: string;
    };
    h3: {
      fontSize: number;
      fontWeight: string;
    };
    body: {
      fontSize: number;
      fontWeight: string;
    };
    caption: {
      fontSize: number;
      fontWeight: string;
    };
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
}

export const lightTheme: AppTheme = {
  borderRadius: {
    lg: 12,
    md: 8,
    sm: 4,
    xl: 16,
  },
  colors: {
    ...DefaultTheme.colors,
    accent: '#FF2D55',
    background: '#FFFFFF',
    border: '#E0E0E0',
    card: '#F8F8F8',
    disabled: '#C7C7CC',
    error: '#FF3B30',
    notification: '#FF3B30',
    overlay: 'rgba(0, 0, 0, 0.5)',
    placeholder: '#8E8E93',
    primary: '#007AFF',
    secondary: '#5856D6',
    success: '#34C759',
    text: '#000000',
    warning: '#FF9500',
  },
  dark: false,
  spacing: {
    lg: 24,
    md: 16,
    sm: 8,
    xl: 32,
    xs: 4,
  },
  typography: {
    body: {
      fontSize: 16,
      fontWeight: 'normal',
    },
    caption: {
      fontSize: 14,
      fontWeight: 'normal',
    },
    h1: {
      fontSize: 32,
      fontWeight: 'bold',
    },
    h2: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    h3: {
      fontSize: 20,
      fontWeight: '600',
    },
  },
};

export const darkTheme: AppTheme = {
  borderRadius: lightTheme.borderRadius,
  colors: {
    ...DarkTheme.colors,
    accent: '#FF375F',
    background: '#000000',
    border: '#38383A',
    card: '#1C1C1E',
    disabled: '#3A3A3C',
    error: '#FF453A',
    notification: '#FF453A',
    overlay: 'rgba(0, 0, 0, 0.7)',
    placeholder: '#8E8E93',
    primary: '#0A84FF',
    secondary: '#5E5CE6',
    success: '#32D74B',
    text: '#FFFFFF',
    warning: '#FF9F0A',
  },
  dark: true,
  spacing: lightTheme.spacing,
  typography: lightTheme.typography,
};

export const getTheme = (themeType: ThemeType): AppTheme => {
  return themeType === 'dark' ? darkTheme : lightTheme;
};

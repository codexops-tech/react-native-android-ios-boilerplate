import React from 'react';
import {
  Image,
  ImageStyle,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';

import { useColor } from '@src/context/ThemeContext';

interface StyledViewProps {
  style?: ViewStyle | ViewStyle[];
  children?: React.ReactNode;
}

interface StyledTextProps {
  style?: TextStyle | TextStyle[];
  children?: React.ReactNode;
  numberOfLines?: number;
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption';
}

interface StyledImageProps {
  style?: ImageStyle | ImageStyle[];
  source: any;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
}

const typographyStyles = {
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
} as const;

export const StyledView: React.FC<StyledViewProps> = ({ children, style }) => {
  const { color } = useColor();
  const defaultStyle: ViewStyle = {
    backgroundColor: color.colors.background,
    borderRadius: color.borderRadius.md,
    padding: color.spacing.md,
  };

  return <View style={[defaultStyle, style]}>{children}</View>;
};

export const StyledText: React.FC<StyledTextProps> = ({
  children,
  numberOfLines,
  style,
  variant = 'body',
}) => {
  const { color } = useColor();
  const defaultStyle: TextStyle = {
    color: color.colors.text,
    ...typographyStyles[variant],
  };

  const combinedStyle: TextStyle = style
    ? { ...defaultStyle, ...style }
    : defaultStyle;

  return (
    <Text style={combinedStyle} numberOfLines={numberOfLines}>
      {children}
    </Text>
  );
};

interface StyledButtonProps extends TouchableOpacityProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
  textStyle?: TextStyle;
  children: React.ReactNode;
}

export const StyledButton: React.FC<StyledButtonProps> = ({
  children,
  size = 'medium',
  style,
  textStyle,
  variant = 'primary',
  ...props
}) => {
  const { color } = useColor();

  const getButtonStyle = (): ViewStyle => {
    const baseStyle = {
      alignItems: 'center' as const,
      borderRadius: color.borderRadius.md,
      justifyContent: 'center' as const,
    };

    const variantStyles = {
      outline: {
        backgroundColor: 'transparent',
        borderColor: color.colors.primary,
        borderWidth: 1,
      },
      primary: {
        backgroundColor: color.colors.primary,
      },
      secondary: {
        backgroundColor: color.colors.secondary,
      },
    };

    const sizeStyles = {
      large: {
        paddingHorizontal: color.spacing.lg,
        paddingVertical: color.spacing.md,
      },
      medium: {
        paddingHorizontal: color.spacing.md,
        paddingVertical: color.spacing.sm,
      },
      small: {
        paddingHorizontal: color.spacing.sm,
        paddingVertical: color.spacing.xs,
      },
    };

    return {
      ...baseStyle,
      ...variantStyles[variant],
      ...sizeStyles[size],
    };
  };

  const getTextStyle = (): TextStyle => {
    const variantTextStyles = {
      outline: {
        color: color.colors.primary,
      },
      primary: {
        color: '#FFFFFF',
      },
      secondary: {
        color: '#FFFFFF',
      },
    };

    return {
      ...typographyStyles.body,
      ...variantTextStyles[variant],
    };
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      activeOpacity={0.7}
      {...props}>
      <StyledText style={[getTextStyle(), textStyle]}>{children}</StyledText>
    </TouchableOpacity>
  );
};

interface StyledCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const StyledCard: React.FC<StyledCardProps> = ({ children, style }) => {
  const { color } = useColor();
  return (
    <View
      style={[
        {
          backgroundColor: color.colors.card,
          borderColor: color.colors.border,
          borderRadius: color.borderRadius.lg,
          borderWidth: 1,
          padding: color.spacing.md,
        },
        style,
      ]}>
      {children}
    </View>
  );
};

export const StyledImage: React.FC<StyledImageProps> = ({
  resizeMode = 'contain',
  source,
  style,
}) => {
  const { color } = useColor();
  const defaultStyle: ImageStyle = {
    borderRadius: color.borderRadius.md,
    height: '100%',
    width: '100%',
  };

  return (
    <Image
      source={source}
      style={[defaultStyle, style]}
      resizeMode={resizeMode}
    />
  );
};

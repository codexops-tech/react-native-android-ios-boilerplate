import { StyleSheet } from 'react-native';

import { Palette, scaledSize, scaleHeight, scaleWidth } from '@src/utils';

export const forceUpdateStyles = ({ colors }: Palette) =>
  StyleSheet.create({
    buttonContainer: {
      marginTop: scaleHeight(40),
    },
    container: {
      backgroundColor: colors.background,
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: scaleWidth(35),
    },
    messageStyle: {
      color: colors.text,
      fontSize: scaledSize(18),
      marginBottom: scaleHeight(40),
      textAlign: 'center',
    },
    retryButton: {
      backgroundColor: colors.primary,
      borderColor: colors.text,
      borderWidth: scaleWidth(1),
      marginTop: scaleHeight(20),
    },
    retryText: {
      color: colors.text,
    },
    updateText: {
      color: colors.background,
    },
  });

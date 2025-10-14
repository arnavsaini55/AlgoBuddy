import { View, ViewProps } from 'react-native';
import { useTheme } from '@react-navigation/native';

export function ThemedView(props: ViewProps) {
  const { colors } = useTheme();
  return <View {...props} style={[{ backgroundColor: colors.background }, props.style]} />;
}
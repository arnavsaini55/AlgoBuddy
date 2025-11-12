declare module 'react-native-vector-icons/Feather' {
  import { ComponentType } from 'react';
  import { TextProps } from 'react-native';

  // Minimal Icon typing: accepts standard Text props plus common icon props
  const Icon: ComponentType<
    TextProps & { name?: string | number; size?: number; color?: string }
  >;

  export default Icon;
}

// Fallback wildcard for other icon families
declare module 'react-native-vector-icons/*' {
  import { ComponentType } from 'react';
  import { TextProps } from 'react-native';

  const Icon: ComponentType<
    TextProps & { name?: string | number; size?: number; color?: string }
  >;

  export default Icon;
}

import React from "react";
import { View, TextInput } from "react-native";
import { styles } from "./style";

interface SearchBarProps {
  placeholder?: string;
  value: string; // current text in the search bar
  onChangeText: (text: string) => void; 
  style?: object;
  secureTextEntry?: boolean;
  placeholderTextColor?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search...",
  value,
  onChangeText,
  style,
  secureTextEntry,
  placeholderTextColor,
}) => {
  return (
    <View style={[styles.container, style]}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor ?? "#999"}
        value={value}           // display current text
        onChangeText={onChangeText} // update text as user types
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

export default SearchBar;

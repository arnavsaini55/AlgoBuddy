import React from "react";
import { View, TextInput,  } from "react-native";
import { styles } from "./style";

interface SearchBarProps {
  placeholder?: string;
  value: string; // current text in the search bar
  onChangeText: (text: string) => void; // called when user types
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search...",
  value,
  onChangeText,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={value}           // display current text
        onChangeText={onChangeText} // update text as user types
      />
    </View>
  );
};

export default SearchBar;

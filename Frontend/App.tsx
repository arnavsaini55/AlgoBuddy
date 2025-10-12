import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import SearchBar from "./Components/SearchBar/SearchBar";

const App = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <View >
      {/* <SearchBar
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Search something..."
      />
      <Text ></Text> */}
    </View>
  );
};

export default App;


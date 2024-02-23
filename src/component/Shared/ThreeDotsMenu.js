import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const ThreeDotsMenu = () => {
  const [showDeleteOption, setShowDeleteOption] = useState(false);

  const toggleDeleteOption = () => {
    setShowDeleteOption(!showDeleteOption);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleDeleteOption}>
        <View style={styles.menuContainer}>
          <View style={styles.dot}></View>
          <View style={styles.dot}></View>
          <View style={styles.dot}></View>
        </View>
      </TouchableOpacity>

      {showDeleteOption && (
        <TouchableOpacity
          onPress={toggleDeleteOption}
          style={styles.deleteOption}
        >
          <Text style={styles.deleteText}>Delete your post</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    alignItems: "flex-end",
  },
  menuContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 4,
    padding: 2,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 3,
    backgroundColor: "#000",
  },
  deleteOption: {
    position: "absolute",
    right: 20,
    backgroundColor: "#fff",
    flexDirection: "row", // Align text horizontally
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#000",
    zIndex: 30,
  },
  deleteText: {
    color: "#000", // Set text color to black
    marginLeft: 5, // Add some space between dot and text
  },
});

export default ThreeDotsMenu;

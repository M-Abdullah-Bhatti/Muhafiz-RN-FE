import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { DeleteSingleData } from "../../axios/NetworkCalls";
import { ShowError } from "../../utils/flashMessages";
import RequestLoader from "../Loader/RequestLoader";

const ThreeDotsMenu = ({ postId, setData, data }) => {
  const [showDeleteOption, setShowDeleteOption] = useState(false);
  const [Loader, setLoader] = useState(false);

  const toggleDeleteOption = () => {
    setShowDeleteOption(!showDeleteOption);
  };

  const handleDelete = async () => {
    setLoader(true);
    try {
      const response = await DeleteSingleData(`/post/deletePost/${postId}`);

      if (response?.status) {
        setLoader(false);
        toggleDeleteOption();
        Alert.alert("SUCCESS", response?.message, [
          {
            text: "Close",
            onPress: () => {
              console.log("post delete successfully");
              const fileteredData = data.filter((item) => item._id != postId);
              setData(fileteredData);
            },
          },
        ]);
      } else {
        ShowError(response);
        toggleDeleteOption();
      }
    } catch (err) {
      ShowError(err.message);
    } finally {
      setLoader(false);
      toggleDeleteOption();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleDeleteOption}>
        <View style={styles.menuContainer}>
          {/* Adjusted for horizontal layout with marginRight for spacing */}
          <View style={[styles.dot, styles.dotSpacing]}></View>
          <View style={[styles.dot, styles.dotSpacing]}></View>
          <View style={styles.dot}></View>
        </View>
      </TouchableOpacity>

      {showDeleteOption && (
        <TouchableOpacity onPress={handleDelete} style={styles.deleteOption}>
          <Text style={styles.deleteText}>
            {Loader ? <RequestLoader /> : "Delete"}
          </Text>
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
    flexDirection: "row", // Arrange dots horizontally
    padding: 10, // Padding around the dots for easier tapping
  },
  dot: {
    width: 6, // Slightly larger dots for better visibility
    height: 6,
    borderRadius: 3, // Fully rounded dots
    backgroundColor: "#000",
    marginLeft: 4, // Space between dots
  },
  deleteOption: {
    width: 60,
    position: "absolute",
    top: 30, // Position below the dots
    right: 0, // Align with the end of the container
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd", // Lighter border color
    zIndex: 30, // Ensure it's above other elements
  },
  deleteText: {
    color: "#000",
  },
});

export default ThreeDotsMenu;

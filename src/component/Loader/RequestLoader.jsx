import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

function RequestLoader({ size }) {
  return (
    <View style={styles.centered}>
      <ActivityIndicator
        size={size === "large" ? "large" : "small"}
        color="blue"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default RequestLoader;

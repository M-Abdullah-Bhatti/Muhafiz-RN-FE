import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

import color from "../../styles/color";
import RequestLoader from "../Loader/RequestLoader";

const SubmitButton = ({ loader, text, onPress, color }) => {
  return (
    <TouchableOpacity
      style={[styles.btn, color ? styles.btnColor : null]}
      onPress={onPress}
    >
      {loader ? <RequestLoader /> : <Text style={styles.btnText}>{text}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: color.maincolor,
    padding: 18,
    borderRadius: 30,
    marginTop: 10,
  },
  btnColor: {
    backgroundColor: color.orange,
  },
  btnText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
});

export default SubmitButton;

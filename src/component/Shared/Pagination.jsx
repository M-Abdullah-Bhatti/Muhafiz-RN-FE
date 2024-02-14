import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
  pageNumbersToShow,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={styles.button}
      >
        <Icon
          name="chevron-left"
          size={18}
          color={currentPage === 1 ? "#00000080" : "#000000"}
        />
      </TouchableOpacity>

      {pageNumbersToShow.map((number) => (
        <TouchableOpacity
          key={number}
          onPress={() => onPageChange(number)}
          style={[
            styles.pageButton,
            currentPage === number ? styles.currentPage : styles.otherPage,
          ]}
        >
          <Text
            style={[
              styles.pageText,
              currentPage === number
                ? styles.currentPageText
                : styles.otherPageText,
            ]}
          >
            {number}
          </Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        onPress={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={styles.button}
      >
        <Icon
          name="chevron-right"
          size={18}
          color={currentPage === totalPages ? "#00000080" : "#000000"}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  button: {
    padding: 10,
  },
  pageButton: {
    marginHorizontal: 2,
    paddingVertical: 8,
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  pageText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  currentPage: {
    backgroundColor: "white",
  },
  otherPage: {
    backgroundColor: "white",
  },
  currentPageText: {
    color: "#00CE3A",
  },
  otherPageText: {
    color: "black",
  },
});

export default Pagination;

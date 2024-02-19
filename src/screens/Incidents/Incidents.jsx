import { View, Text } from "react-native";
import React from "react";
import AllIncidents from "../../component/AllIncidents/AllIncidents";

const Incidents = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#FFF", paddingVertical: 20 }}>
      <AllIncidents />
    </View>
  );
};

export default Incidents;

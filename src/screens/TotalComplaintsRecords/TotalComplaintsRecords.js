import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faShieldAlt,
  faBolt,
  faHandHoldingMedical,
} from "@fortawesome/free-solid-svg-icons";
import { GetAllData } from "../../axios/NetworkCalls";
import { useFocusEffect } from "@react-navigation/native";
import RequestLoader from "../../component/Loader/RequestLoader";

const Data = [
  {
    department: "Theft Department",
    total: 114,
    left: 24,
    solved: 90,
    icon: faShieldAlt,
    color: "#007AFF",
  },
  {
    department: "ASSAULT Department",
    total: 56,
    left: 6,
    solved: 50,
    icon: faBolt,
    color: "#34C759",
  },
  {
    department: "Cyber crime Department",
    total: 64,
    left: "$375 left to spend",
    solved: 23,
    icon: faHandHoldingMedical,
    color: "#AF52DE",
  },
];

const TotalComplaintsRecords = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [Error, setError] = useState(null);

  const renderIcon = (category) => {
    console.log("category: ", category);
    if (category == "Theft") {
      return faShieldAlt;
    }
    if (category == "Assault") {
      return faBolt;
    }
    return faHandHoldingMedical;
  };

  const renderIconWithColor = (category) => {
    if (category == "Theft") {
      return "#007AFF";
    }
    if (category == "Assault") {
      return "#34C759";
    }
    return "#AF52DE";
  };

  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        try {
          setLoading(true);
          //   const response = await GetAllData(
          //     `/incident/getAllIncidents?category=${category}&resolved=${false}`
          //   );

          //   ------------------------
          const response = await GetAllData(`/incident/incidentDashboard`);
          console.log("response: ", response);
          if (response.success) {
            console.log("response:  ", response);
            setData(response?.data);
          } else {
            // console.log("errorrr: ", response);
            setError(response.message);
          }
        } catch (err) {
          console.error("Error fetching data:", err);
          setError(err.message); // Use err.message for consistency
        } finally {
          setLoading(false);
        }
      };

      getData(); // Execute the function instead of returning it
    }, []) // Include currentPage in the dependency array
  );
  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Complaint Boxes</Text>

      {/* Gauge Chart Placeholder */}
      <View style={styles.chartContainer}>
        <Image
          source={require("../../../src/assets/images/chart.png")}
          style={styles.profileImage}
        />
        <Text style={styles.chartText}>
          Total ${Error ? 0 : data?.length} Complaints
        </Text>
      </View>

      {/* Complaint List */}
      {loading ? (
        <RequestLoader size="large" color="yellow" />
      ) : Error ? (
        <Text
          style={{
            textAlign: "center",
            color: "white",
            marginTop: 20,
            fontSize: 16,
          }}
        >
          {Error}
        </Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.department}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.listItem}
              onPress={() => {
                navigation.navigate("SolvedComplaints", {
                  category: item.department,
                });
              }}
            >
              <FontAwesomeIcon
                icon={renderIcon(item.category)}
                size={24}
                style={{ color: renderIconWithColor(item.category) }}
              />
              <View style={styles.textContainer}>
                <Text style={styles.departmentName}>{item?.category}</Text>
                <Text style={styles.complaintText}>{item.total} Total</Text>
                <Text style={styles.leftToSolveText}>
                  {item.left} left to solve
                </Text>
                <Text style={styles.solvedText}>{item.solved} Solved</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    color: "#fff",
    fontSize: 24,
    textAlign: "center",
    marginVertical: 20,
    marginTop: 60,
  },
  chartContainer: {
    alignItems: "center",
  },
  profileImage: {
    width: 200,
    height: 100,
    marginBottom: 80,
  },
  listItem: {
    flexDirection: "row",
    backgroundColor: "#333",
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
  },
  textContainer: {
    marginLeft: 10,
  },
  departmentName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  complaintText: {
    color: "#fff",
    fontSize: 16,
  },
  chartText: {
    color: "#fff",
    fontSize: 16,
  },
  leftToSolveText: {
    color: "#FF3B30",
    fontSize: 16,
  },
  solvedText: {
    color: "#34C759",
    fontSize: 16,
  },
});

export default TotalComplaintsRecords;

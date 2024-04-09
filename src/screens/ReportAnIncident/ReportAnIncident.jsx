import * as React from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import color from "../../styles/color";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import incidentValidation from "../../utils/validations/incidentValidation";
import { ShowError } from "../../utils/flashMessages";
import { CreateIncident } from "../../configs/urls";
import { PostData } from "../../axios/NetworkCalls";
import RequestLoader from "../../component/Loader/RequestLoader";

const ReportAnIncident = ({ route }) => {
  const [name, setName] = React.useState("");
  const [date, setDate] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [description, setDescription] = React.useState("");
  const navigation = useNavigation();
  const { params } = route;
  const [loader, setLoader] = React.useState(false);
  const auth = useSelector((state) => state.AuthReducer);

  // Handlers for the form inputs could be added here
  const handleSubmit = async () => {
    const body = {
      category: params.category,
      user: auth.userData.id,
      name: name,
      dateAndTime: date,
      location: location,
      description: description,
    };

    // console.log("body: ", body);

    const error = incidentValidation(body);
    if (!error) {
      console.log("hot api there");
      try {
        setLoader(true);
        const response = await PostData(CreateIncident, body);
        console.log("response: ", response);

        if (response?.status) {
          setLoader(false);
          Alert.alert("SUCCESS", response?.message, [
            {
              text: "Close",
              onPress: () => {
                // get the id from response and sent to next screen
                navigation.navigate("CaseAssessment", {
                  id: response?.data?._id,
                });
              },
            },
          ]);
        } else {
          ShowError(response);
        }

        setLoader(false);
      } catch (error) {
        console.log("error: ", error);
        ShowError(error.message);
      }
    } else {
      ShowError(error);
    }

    // navigation.navigate("CaseAssessment"); // Ensure 'MapWithButtons' is the name of your target screen
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.backButtonContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={30} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={styles.header}>Report an Incident</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={setName}
            value={name}
            placeholder="Enter your name"
          />
          {/* You can add icons or buttons here */}
        </View>

        <View style={styles.row}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Date and time of the incident</Text>
            <TextInput
              style={styles.input}
              onChangeText={setDate}
              value={date}
              placeholder="Select date and time"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Location</Text>
            <TextInput
              style={styles.input}
              onChangeText={setLocation}
              value={location}
              placeholder="Enter location"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description of the incident</Text>
          <TextInput
            style={styles.descriptionInput}
            onChangeText={setDescription}
            value={description}
            placeholder="Describe the incident"
            
          />
        </View>

        {/* Add buttons or TouchableOpacity for Gallery and Camera here */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          {loader ? (
            <RequestLoader />
          ) : (
            <Text style={styles.buttonText}>Submit</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backButtonContainer: {
    top: 30, // Adjust top and left values as needed
    marginBottom: 20,
  },
  container: {
    padding: 16,
  },
  header: {
    color: color.maincolor,
    marginTop: 30,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 16,
    color: "#000",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
  },
  descriptionInput: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    height: 150, // Adjust the height for multiline input
    textAlignVertical: "top", // Align text to the top for Android
  },
  button: {
    backgroundColor: color.maincolor,
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ReportAnIncident;

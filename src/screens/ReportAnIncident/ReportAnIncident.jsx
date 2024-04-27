import * as React from "react";
import { StyleSheet, SafeAreaView, View, Text,  ScrollView, TextInput,TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import color from "../../styles/color";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import incidentValidation from "../../utils/validations/incidentValidation";
import { ShowError } from "../../utils/flashMessages";
import { CreateIncident } from "../../configs/urls";
import { PostData } from "../../axios/NetworkCalls";
import RequestLoader from "../../component/Loader/RequestLoader";
import MapView, { Marker } from 'react-native-maps';

const ReportAnIncident = ({ route }) => {
  const [name, setName] = React.useState("");
  const [date, setDate] = React.useState("");
  const [location, setLocation] = React.useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });
  const [description, setDescription] = React.useState("");
  const navigation = useNavigation();
  const { params } = route;
  const [loader, setLoader] = React.useState(false);
  const auth = useSelector((state) => state.AuthReducer);

  const handleSubmit = async () => {
    const body = {
      category: params.category,
      user: auth.userData.id,
      name,
      dateAndTime: date,
      location: `${location.latitude},${location.longitude}`,
      description,
    };

    const error = incidentValidation(body);
    if (!error) {
      try {
        setLoader(true);
        const response = await PostData(CreateIncident, body);
        setLoader(false);
        if (response?.status) {
          Alert.alert("Success", response?.message, [{
            text: "Close",
            onPress: () => navigation.navigate("CaseAssessment", { id: response?.data?._id })
          }]);
        } else {
          ShowError(response?.message || "An unexpected error occurred");
        }
      } catch (error) {
        setLoader(false);
        ShowError(error.message);
      }
    } else {
      ShowError(error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
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
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Date and Time of the Incident</Text>
          <TextInput
            style={styles.input}
            onChangeText={setDate}
            value={date}
            placeholder="YYYY-MM-DD HH:MM"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Location</Text>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            onPress={(e) => setLocation(e.nativeEvent.coordinate)}
          >
            <Marker coordinate={location} />
          </MapView>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description of the Incident</Text>
          <TextInput
            style={styles.descriptionInput}
            onChangeText={setDescription}
            value={description}
            placeholder="Describe the incident"
            multiline
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          {loader ? <RequestLoader /> : <Text style={styles.buttonText}>Submit</Text>}
        </TouchableOpacity>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backButtonContainer: {
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
    height: 150,
    textAlignVertical: "top",
  },
  map: {
    width: "100%",
    height: 200,
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

// PostScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
  Image,
  Alert,
} from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import { Video } from "expo-av";
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import color from "../../styles/color";
import SubmitButton from "../../component/ButtonSubmit";
import postValidation from "../../utils/validations/postValidation";
import { ShowError } from "../../utils/flashMessages";
import { useSelector } from "react-redux";
import { PostData } from "../../axios/NetworkCalls";
import { CreatePost } from "../../configs/urls";
import { uploadImage } from "../../utils/helpers";
import RequestLoader from "../../component/Loader/RequestLoader";
import InputAutoComplete from "../../component/Shared/InputAutoComplete";
import DateTimePicker from "@react-native-community/datetimepicker";

const PostScreen = () => {
  const video = React.useRef(null);
  const navigation = useNavigation();
  const auth = useSelector((state) => state.AuthReducer);

  const [loader, setLoader] = React.useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [date, setDate] = React.useState(new Date());
  const [mediaType, setMediaType] = useState(null);
  const [mediaUri, setMediaUri] = useState(null);
  const [uploadingMedia, setUploadingMedia] = useState(false);
  const [location, setLocation] = useState(null);

  const [cameraUploadingImage, setCameraUploadingImage] = React.useState(false);
  const [description, setDescription] = React.useState("");

  const onPlaceSelected = (details) => {
    console.log("Place selected:", details);

    if (details && details.geometry && details.geometry.location) {
      const position = {
        latitude: details.geometry.location.lat || 0,
        longitude: details.geometry.location.lng || 0,
      };
      console.log("Location position:", position);
      setLocation(position);
    } else {
      console.log("No location details found");
    }
  };

  const toggleDatePicker = () => {
    setShowDatePicker((prev) => !prev);
  };

  const pickMedia = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setUploadingMedia(true);
      setMediaType(result.type); // 'image' or 'video'

      const image = await uploadImage(result.uri);

      setMediaUri(image);
      setUploadingMedia(false);
    }
  };

  const openCameraAndUpload = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera permissions to make this work!");
      return;
    }
    // Open the camera
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setCameraUploadingImage(true);
      setMediaType(result.type); // 'image' or 'video'

      const image = await uploadImage(result.uri);

      setMediaUri(image);
      setCameraUploadingImage(false);
    }
  };

  const addPost = async () => {
    // console.log("userId: ", auth.userData.id, token);
    let body = {
      dateAndTime: date,
      description: description,
      user: auth.userData.id,
      imageUrl: mediaUri || "",
      imageType: mediaType || "",
      latitude: location?.coords.latitude || "",
      longitude: location?.coords.longitude || "",
    };

    const error = postValidation(body);
    if (!error) {
      try {
        setLoader(true);
        const response = await PostData(CreatePost, body);
        console.log("response: ", response);

        if (response?.status) {
          setLoader(false);
          Alert.alert("SUCCESS", response?.message, [
            {
              text: "Close",
              onPress: () => {
                setDate("");
                setDescription("");
                setMediaUri("");
                setLocation("");
              },
            },
          ]);
        } else {
          ShowError(response);
        }

        setLoader(false);
      } catch (error) {
        ShowError(error);
      }
      setLoader(false);
    } else {
      ShowError(error);
    }
  };

  const renderMedia = () => {
    if (mediaType === "image") {
      return (
        <Image
          source={{ uri: mediaUri }}
          style={{ width: "100%", height: 120 }}
          resizeMode="contain"
        />
      );
    } else if (mediaType === "video") {
      return (
        <Video
          ref={video}
          source={{ uri: mediaUri }}
          // source={{
          //   uri: "https://firebasestorage.googleapis.com/v0/b/muhafiz-adddb.appspot.com/o/73aaf3e5-b3b2-40a2-adae-c0a11eb43b3d.mp4?alt=media&token=9b711eb8-32ab-4608-b7a1-e1e568b1f01c",
          // }}
          // rate={1.0}
          // volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay={false}
          isLooping
          style={{ width: "100%", height: 120 }}
          useNativeControls // Use native controls
        />
      );
    }
    return null;
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.backButtonContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={30} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={styles.header}>Create a post</Text>

        <View style={styles.row}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Date and time of the incident</Text>
            <TouchableOpacity
              onPress={toggleDatePicker}
              style={{
                flex: 1,
              }}
            >
              <Text style={styles.input}>
                {date ? date.toLocaleString() : "Select date and time"}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="datetime"
                is24Hour={false}
                onChange={(event, selectedDate) => {
                  console.log("selectedDate");
                  console.log(selectedDate);
                  setShowDatePicker(false);
                  setDate(selectedDate || date);
                }}
              />
            )}
          </View>
        </View>

        <ScrollView
          contentContainerStyle={{}}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.label}>Search Crime location </Text>

          <InputAutoComplete
            placeholder="Search..."
            styling={{
              backgroundColor: "#f0f0f0",
              // borderRadius: 8,
              // padding: 16,
              // flex: 1,
            }}
            onPlaceSelected={(details) => {
              onPlaceSelected(details);
            }}
          />
        </ScrollView>

        <View style={{ ...styles.inputGroup, marginTop: 16 }}>
          <Text style={styles.label}>What's in your Mind ? ...</Text>
          <TextInput
            style={styles.descriptionInput}
            onChangeText={setDescription}
            value={description}
            placeholder="Describe the incident"
          />
        </View>

        {mediaUri && (
          <View style={{ width: "100%", height: 120 }}>{renderMedia()}</View>
        )}

        {location && (
          <View
            style={{
              marginTop: 20,
              fontSize: 16,
            }}
          >
            <Text>Latitude: {location.coords.latitude}</Text>
            <Text>Longitude: {location.coords.longitude}</Text>
          </View>
        )}

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.flexButton]}
            onPress={pickMedia}
          >
            {uploadingMedia ? (
              <RequestLoader />
            ) : (
              <>
                <Icon name="image" size={20} color="white" />
                <Text style={styles.buttonText}>Attach Media</Text>
              </>
            )}
          </TouchableOpacity>

          {/* <TouchableOpacity
            style={[styles.button, styles.flexButton]}
            onPress={pinLocation}
          >
            <Icon name="map-pin" size={20} color="white" />
            <Text style={styles.buttonText}>Pin Location</Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            style={[styles.button, styles.flexButton]}
            onPress={openCameraAndUpload}
          >
            {cameraUploadingImage ? (
              <RequestLoader />
            ) : (
              <>
                <Icon name="camera" size={20} color="white" />
                <Text style={styles.buttonText}>Camera</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        <SubmitButton
          loader={loader}
          text="Submit"
          onPress={addPost}
          buttonColor={color.orange}
        />

        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    paddingTop: 50,
  },
  input: {
    height: 150,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    // width: '90%',
    padding: 30,
    marginBottom: 10,
  },
  buttonRow: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    // width: '100%',
    marginBottom: 30,
  },
  flexButton: {
    flex: 1,
    marginHorizontal: 2,
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

    flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    // flex: 1,
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
    flex: 1,

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
    padding: 10,

    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 10,
    bottom: -5,
  },
  imageContainer: {},
});

export default PostScreen;

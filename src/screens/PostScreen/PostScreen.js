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
} from "react-native";
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/FontAwesome";
import { Location } from "expo";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import color from "../../styles/color";
import SubmitButton from "../../component/ButtonSubmit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import postValidation from "../../utils/validations/postValidation";
import { ShowError } from "../../utils/flashMessages";
import { useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import { PostData } from "../../axios/NetworkCalls";
import { CreatePost } from "../../configs/urls";
import axiosInstance from "../../axios";
import { uploadImage } from "../../utils/helpers";
import RequestLoader from "../../component/Loader/RequestLoader";

const PostScreen = () => {
  const [name, setName] = React.useState("");
  const [date, setDate] = React.useState("");
  const [image, setImage] = React.useState("");
  const [uploadingImage, setUploadingImage] = React.useState(false);

  const [location, setLocation] = React.useState("");
  const [description, setDescription] = React.useState("");
  const navigation = useNavigation();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ text: "", imageUri: null });
  const auth = useSelector((state) => state.AuthReducer);

  const pickMedia = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // if (!result.cancelled) {
    //   console.log("resultL ", result);
    //   setNewPost({ ...newPost, imageUri: result.uri });
    // }
    if (!result.cancelled) {
      console.log("result: ", result);
      console.log("result: ", result.uri);
      setUploadingImage(true);
      const image = await uploadImage(result.uri);
      console.log("image: ", image);
      setImage(image);
      setUploadingImage(false);
    }
  };
  const addPost = async () => {
    // console.log("userId: ", auth.userData.id, token);
    let body = {
      dateAndTime: date,
      description: description,
      user: auth.userData.id,
      imageUrl: image || "",
    };

    const error = postValidation(body);
    if (!error) {
      console.log("hit the api hee", CreatePost);
      const response = await PostData(CreatePost, body);
      console.log("response: ", response);
    } else {
      ShowError(error);
    }

    // setPosts([
    //   ...posts,
    //   { ...newPost, id: Date.now(), likes: 0, comments: [] },
    // ]);
    // setNewPost({ text: "", imageUri: null });
  };

  const likePost = (id) => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const addComment = (id, comment) => {
    setPosts(
      posts.map((post) =>
        post.id === id
          ? { ...post, comments: [...post.comments, comment] }
          : post
      )
    );
  };

  const pinLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setNewPost({ ...newPost, location });
  };

  return (
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
          <TextInput
            style={styles.input}
            onChangeText={setDate}
            value={date}
            placeholder="Select date and time"
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>What's in your Mind ? ...</Text>
        <TextInput
          style={styles.descriptionInput}
          onChangeText={setDescription}
          value={description}
          placeholder="Describe the incident"
        />
      </View>
      {image && (
        <View style={{ paddingHorizontal: 15, width: "100%", height: 120 }}>
          <Image
            source={{ uri: image }}
            style={{
              width: "100%",
              height: 120,
            }}
            resizeMode="contain"
          />
        </View>
      )}

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.flexButton]}
          onPress={pickMedia}
        >
          {uploadingImage ? (
            <RequestLoader />
          ) : (
            <>
              <Icon name="image" size={20} color="white" />
              <Text style={styles.buttonText}>Attach Media</Text>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.flexButton]}
          onPress={pinLocation}
        >
          <Icon name="map-pin" size={20} color="white" />
          <Text style={styles.buttonText}>Pin Location</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.flexButton]}
          onPress={pinLocation}
        >
          <Icon name="camera" size={20} color="white" />
          <Text style={styles.buttonText}>Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.flexButton]}
          onPress={pinLocation}
        >
          <Icon name="tag" size={20} color="white" />
          <Text style={styles.buttonText}>Tagging</Text>
        </TouchableOpacity>
      </View>

      <SubmitButton
        text="Submit"
        onPress={addPost}
        buttonColor={color.orange}
      />

      {/* ... existing FlatList component ... */}
      <StatusBar style="auto" />
    </View>
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

// const EventApplication = async (values, actions) => {
//   try {
//     setLoading(true);

//     const response = await PostData(
//       `/api/createEventApplication/${id}`,
//       values
//     );

//     console.log("response: ", response);

//     if (response?.status) {
//       toast.success(response?.message);
//       setLoading(false);
//       actions.resetForm();
//       navigate(`/payment/success/${id}`);
//     } else {
//       toast.error(response);
//       if (response == "You're not logged in. Please login first") {
//         setPreviousRoute("go_back");
//         navigate("/auth/login");
//       }
//     }
//   } catch (error) {
//     toast.error(error?.response?.data?.message);

//     setLoading(true);
//   } finally {
//     setLoading(false);
//   }
// };

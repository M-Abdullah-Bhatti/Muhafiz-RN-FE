import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { GetAllPosts, GetAllPostsEndPoint } from "../../configs/urls";
import { GetAllData } from "../../axios/NetworkCalls";
import { formatDate, getPostLikesText } from "../../utils/helpers";
import { useSelector } from "react-redux";

const colors = {
  white: "#FFFFFF",
  orange: "#1E3EB3",
  black: "#2f3640",
  maincolor: "#1E3EB3",
};

const Postingscreentalal = () => {
  const auth = useSelector((state) => state.AuthReducer);
  const [searchValue, setSearchValue] = useState("");

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        try {
          setLoading(true);
          const response = await GetAllData(`${GetAllPostsEndPoint}`);

          if (response.success) {
            console.log(response?.data);
            setData(response?.data);
          } else {
            setError(response.message);
          }
        } catch (err) {
          console.error("Error fetching data:", err);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      getData();
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <FontAwesome name="search" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchValue}
          onChangeText={(text) => setSearchValue(text)}
        />
      </View>
      <ScrollView>
        {data.map((post, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.userInfo}>
              <Image
                source={require("../../assets/images/otpAvatar.png")}
                style={styles.userImage}
              />
              <View style={styles.userInfoText}>
                <Text style={styles.text}>{post?.user?.username}</Text>
                <Text style={styles.textLite}>
                  {formatDate(post?.createdAt)}
                </Text>
              </View>
            </View>
            <Text style={styles.postText}>{post?.description}</Text>

            <Image source={{ uri: post?.imageUrl }} style={styles.userPost} />
            <View style={styles.interactionWrapper}>
              {/* <TouchableOpacity
                style={styles.interaction}
                // onPress={() => (like === 0 ? setLike(1) : setLike(0))}
              >
                <FontAwesome
                  name={
                    data?.likes && data?.likes.length === 1
                      ? "heart"
                      : "heart-o"
                  }
                  color={
                    data?.likes && data?.likes.length === 0
                      ? colors.black
                      : colors.maincolor
                  }
                  size={30}
                />
                <Text
                  style={[
                    styles.interactionText,
                    data?.likes && data?.likes.length >= 1
                      ? styles.interactionTextLiked
                      : null,
                  ]}
                >
                  {data?.likes && data?.likes.length > 1
                    ? `${data?.likes && data?.likes.length} Likes`
                    : ` Like`}
                </Text>
              </TouchableOpacity> */}
              <TouchableOpacity style={styles.interaction}>
                <FontAwesome
                  name={
                    data?.likes &&
                    data?.likes.some(
                      (like) => like.user._id === auth.userData.id
                    )
                      ? "heart"
                      : "heart-o"
                  }
                  // name={"heart"} // when i like a post and it is filled
                  // name={"heart-o"} // when someone else like a post and it is emtpy blue borderd
                  // name={""} // when no one like a post and it is black
                  color={
                    data?.likes && data?.likes.length === 0
                      ? colors.black
                      : colors.maincolor
                  }
                  // name="heart"
                  // color={
                  //   post?.likes && post.likes.length >= 1
                  //     ? colors.maincolor
                  //     : null
                  // }
                  size={30}
                />
                <Text
                  style={[
                    styles.interactionText,
                    post?.likes && post.likes.length >= 1
                      ? styles.interactionTextLiked
                      : null,
                  ]}
                >
                  {getPostLikesText(post?.likes)}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.interaction}>
                <FontAwesome name="comment-o" color={colors.black} size={30} />
                <Text style={styles.interactionText}>Comment</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 15,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    marginVertical: 8,
    padding: 15,
    marginTop: 50,
    borderRadius: 10,
  },
  searchIcon: {
    fontSize: 20,
    color: colors.black,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    padding: 0,
  },
  card: {
    marginTop: 10,
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 10,
  },
  userInfo: {
    flexDirection: "row",
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userInfoText: {
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: 10,
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
  },
  textLite: {
    fontSize: 12,
    color: colors.grey,
  },
  postText: {
    marginVertical: 10,
    padding: 5,
    fontSize: 15,
  },
  userPost: {
    width: "100%",
    // height: undefined,
    aspectRatio: 1,
    borderRadius: 10,
  },
  interactionWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 15,
  },
  interaction: {
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 5,
    padding: 5,
  },
  interactionText: {
    fontSize: 13,
    fontWeight: "bold",
    marginTop: 5,
    marginLeft: 3,
  },
  interactionTextLiked: {
    color: colors.maincolor,
  },
});

export default Postingscreentalal;

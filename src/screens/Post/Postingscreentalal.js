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
import {
  AddLikeOnPost,
  GetAllPosts,
  GetAllPostsEndPoint,
} from "../../configs/urls";
import { GetAllData, PostData } from "../../axios/NetworkCalls";
import { formatDate, getPostLikesText } from "../../utils/helpers";
import { useSelector } from "react-redux";
import RequestLoader from "../../component/Loader/RequestLoader";

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
            setData(response?.data);
            setLoading(false);
          } else {
            setError(response?.message);
          }
        } catch (err) {
          setError(err?.message);
        } finally {
          setLoading(false);
        }
      };

      getData();
    }, [])
  );

  const handleLikeSubmit = async (postId) => {
    try {
      const response = await PostData(`${AddLikeOnPost}/${postId}`);

      if (response?.status) {
        setData((prevData) =>
          prevData.map((post) => {
            if (post?._id === postId) {
              console.log("response?.data?.likesCount=======");
              console.log(response?.data?.likesCount);
              console.log("{ ...post, likes: response?.data?.likesCount }");
              console.log({ ...post, likes: response?.data?.likesCount });
              return { ...post, likes: response?.data?.likesCount };
            }
            return post;
          })
        );
      }
    } catch (error) {
      ShowError(error?.message);
    }
  };

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

      {loading ? (
        <View style={styles.errorContainer}>
          <RequestLoader size="large" />
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <>
          <ScrollView>
            {data.map((post) => (
              <View key={post?._id} style={styles.card}>
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

                <Image
                  source={{ uri: post?.imageUrl }}
                  style={styles.userPost}
                />
                <View style={styles.interactionWrapper}>
                  <TouchableOpacity
                    style={styles.interaction}
                    onPress={() => handleLikeSubmit(post?._id)}
                  >
                    <FontAwesome
                      name={
                        post.likes &&
                        post.likes.length > 0 &&
                        post.likes.some(
                          (like) => like.user._id === auth.userData.id
                        )
                          ? "heart"
                          : "heart-o"
                      }
                      color={
                        post?.likes && post?.likes.length === 0
                          ? colors.black
                          : colors.maincolor
                      }
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
                    <FontAwesome
                      name="comment-o"
                      color={colors.black}
                      size={30}
                    />
                    <Text style={styles.interactionText}>Comment</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        </>
      )}
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
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.grey,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noDataText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.grey,
    textAlign: "center",
  },
});

export default Postingscreentalal;

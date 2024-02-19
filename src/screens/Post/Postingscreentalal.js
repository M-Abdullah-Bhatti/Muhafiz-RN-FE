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
  AddCommentOnPost,
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

const CommentComponent = ({ comments, onAddComment, toggleComments }) => {
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      onAddComment(newComment);
      toggleComments();
      setNewComment("");
    }
  };
  return (
    <View style={styles.commentContainer}>
      {comments.map((comment, index) => (
        <View key={index} style={styles.comment}>
          <Image
            source={require("../../assets/images/otpAvatar.png")}
            style={styles.commentAvatar}
          />
          <View style={styles.commentContent}>
            <Text style={styles.commentUsername}>
              {comment?.user?.username}
            </Text>
            <Text style={styles.commentText}>{comment.text}</Text>
          </View>
        </View>
      ))}
      {/* Input field for new comment */}
      <View style={styles.newCommentContainer}>
        <TextInput
          style={styles.newCommentInput}
          placeholder="Add a comment..."
          value={newComment}
          onChangeText={setNewComment}
        />
        <TouchableOpacity
          style={styles.addCommentButton}
          onPress={handleAddComment}
        >
          <Text style={styles.addCommentButtonText}>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Postingscreentalal = () => {
  const auth = useSelector((state) => state.AuthReducer);
  const [searchValue, setSearchValue] = useState("");

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  console.log("data++++++++++++++");
  console.log(data);

  const [showComments, setShowComments] = useState(data.map(() => false));

  // Function to toggle comment visibility
  const toggleComments = (index) => {
    setShowComments((prevShowComments) => {
      const newShowComments = [...prevShowComments];
      newShowComments[index] = !newShowComments[index];
      return newShowComments;
    });
  };

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
              // console.log("response?.data?.likesCount=======");
              // console.log(response?.data?.likesCount);
              // console.log("{ ...post, likes: response?.data?.likesCount }");
              // console.log({ ...post, likes: response?.data?.likesCount });
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

  const handleAddCommentToPost = async (postId, newComment) => {
    try {
      const response = await PostData(`${AddCommentOnPost}/${postId}`, {
        text: newComment,
      });

      if (response?.status) {
        const newData = data.map((post) => {
          if (post._id === postId) {
            return {
              ...post,
              comments: [...post.comments, response?.data],
            };
          }
          return post;
        });

        setData(newData);
      }
    } catch (error) {
      console.log("error?.message: ", error?.message);
      // ShowError(error?.message);
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
            {data.map((post, index) => (
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
                        post?.likes &&
                        post?.likes.length > 0 &&
                        post?.likes.some(
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
                  <TouchableOpacity
                    style={styles.interaction}
                    onPress={() => toggleComments(index)}
                  >
                    <FontAwesome
                      name="comment-o"
                      color={colors.black}
                      size={30}
                    />
                    <Text style={styles.interactionText}>{`${
                      post?.comments && post?.comments.length >= 1
                        ? ` ${post?.comments.length} Comments `
                        : ` Comment`
                    }`}</Text>
                  </TouchableOpacity>
                </View>

                {/* Conditionally render the comment component */}
                {showComments[index] && (
                  <CommentComponent
                    comments={post?.comments}
                    toggleComments={() => toggleComments(index)}
                    onAddComment={(newComment) =>
                      handleAddCommentToPost(post._id, newComment)
                    }
                  />
                )}
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
    paddingTop: 15,
    paddingBottom: 45,
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
  commentContainer: {
    paddingHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#CCCCCC",
  },
  comment: {
    flexDirection: "row",
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
  },
  commentAvatar: {
    width: 35,
    height: 35,
    borderRadius: 999,
    marginRight: 10,
  },
  commentContent: {
    flex: 1,
  },
  commentUsername: {
    fontWeight: "bold",

    fontSize: 14,
  },
  commentText: {
    fontSize: 12,
  },
  newCommentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,

    flex: 1,
  },
  newCommentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 5,
    padding: 8,
  },
  addCommentButton: {
    marginLeft: 7,
    backgroundColor: "#1E3EB3",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 5,
  },
  addCommentButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default Postingscreentalal;

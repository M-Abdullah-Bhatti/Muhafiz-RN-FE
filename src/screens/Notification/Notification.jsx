// NotificationScreen.js
import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, ScrollView, FlatList, Image } from "react-native";
import { useSelector } from "react-redux";
import { GetAllData } from "../../axios/NetworkCalls";
import { GetAllNotifications } from "../../configs/urls";
import { formatDate } from "../../utils/helpers";
import RequestLoader from "../../component/Loader/RequestLoader";

const notifications = [
  {
    id: 1,
    text: "John liked your post",
    time: "2 hours ago",
    image: require("../../assets/images/wahab.png"),
  },
  {
    id: 2,
    text: "Jane commented on your photo",
    time: "1 day ago",
    image: require("../../assets/images/talal.jpg"),
  },
  {
    id: 3,
    text: "John liked your post",
    time: "2 hours ago",
    image: require("../../assets/images/wahab.png"),
  },
  {
    id: 4,
    text: "Jane commented on your photo",
    time: "1 day ago",
    image: require("../../assets/images/talal.jpg"),
  },
  {
    id: 5,
    text: "John liked your post",
    time: "2 hours ago",
    image: require("../../assets/images/wahab.png"),
  },
  {
    id: 6,
    text: "Jane commented on your photo",
    time: "1 day ago",
    image: require("../../assets/images/talal.jpg"),
  },
  {
    id: 7,
    text: "John liked your post",
    time: "2 hours ago",
    image: require("../../assets/images/wahab.png"),
  },
  {
    id: 8,
    text: "Jane commented on your photo",
    time: "1 day ago",
    image: require("../../assets/images/talal.jpg"),
  },
  {
    id: 9,
    text: "John liked your post",
    time: "2 hours ago",
    image: require("../../assets/images/wahab.png"),
  },
  {
    id: 10,
    text: "Jane commented on your photo",
    time: "1 day ago",
    image: require("../../assets/images/talal.jpg"),
  },
  {
    id: 11,
    text: "John liked your post",
    time: "2 hours ago",
    image: require("../../assets/images/wahab.png"),
  },
  {
    id: 12,
    text: "Jane commented on your photo",
    time: "1 day ago",
    image: require("../../assets/images/talal.jpg"),
  },
  {
    id: 13,
    text: "John liked your post",
    time: "2 hours ago",
    image: require("../../assets/images/wahab.png"),
  },
  {
    id: 14,
    text: "Jane commented on your photo",
    time: "1 day ago",
    image: require("../../assets/images/talal.jpg"),
  },
  {
    id: 15,
    text: "John liked your post",
    time: "2 hours ago",
    image: require("../../assets/images/wahab.png"),
  },
  {
    id: 16,
    text: "Jane commented on your photo",
    time: "1 day ago",
    image: require("../../assets/images/talal.jpg"),
  },
  {
    id: 18,
    text: "John liked your post",
    time: "2 hours ago",
    image: require("../../assets/images/wahab.png"),
  },
  {
    id: 19,
    text: "Jane commented on your photo",
    time: "1 day ago",
    image: require("../../assets/images/talal.jpg"),
  },

  // Add more notifications as needed
];

const NotificationScreen = () => {
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
          const response = await GetAllData(
            `${GetAllNotifications}/${auth?.userData?.id}`
          );

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
      <Text style={styles.heading}>Notifications</Text>

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
          <FlatList
            data={data}
            keyExtractor={(item) => item?._id.toString()}
            renderItem={({ item }) => (
              <View style={styles.notificationItem}>
                <Image
                  source={require("../../assets/images/otpAvatar.png")}
                  style={styles.notificationImage}
                />
                <View style={styles.notificationContent}>
                  <Text style={styles.notificationText}>{`${
                    item?.type === "like"
                      ? `${item?.initiator?.username} liked your post`
                      : `${item?.initiator?.username} commented on your post`
                  }`}</Text>
                  <Text style={styles.notificationTime}>
                    {formatDate(item?.createdAt)}
                  </Text>
                </View>
              </View>
            )}
          />
        </>
      )}
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 16,
    marginTop: 60,
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
  },
  notificationImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  notificationContent: {
    flex: 1,
  },
  notificationText: {
    fontSize: 16,
  },
  notificationTime: {
    color: "#888",
    marginTop: 4,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
};

export default NotificationScreen;

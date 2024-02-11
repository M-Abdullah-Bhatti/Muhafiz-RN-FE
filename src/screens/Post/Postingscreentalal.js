import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const colors = {
  white: '#FFFFFF',
  orange: '#1E3EB3',
  black: '#2f3640',
  maincolor: '#1E3EB3',
};

const Postingscreentalal = () => {
  const [like, setLike] = useState(0);
  const [searchValue, setSearchValue] = useState('');

  const posts = [
    {
      id: 1,
      username: 'Talal',
      timeAgo: '4min ago',
      postText: 'Hey everyone, just a heads up – something happened in the neighborhood. Stay aware, stay safe, and look out for each other!',
      imageUri: require('../../assets/images/robbery3.png'),
    },
    // Add a second post
    {
      id: 2,
      username: 'Saadullah',
      timeAgo: '10min ago',
      postText: 'It’s a beautiful day to go out and enjoy the park! Just make sure to keep your belongings close.',
      imageUri: require('../../assets/images/robbery2.jpeg'),
    },
    // Add a third post
    {
      id: 3,
      username: 'Sheikh Rasheed',
      timeAgo: '20min ago',
      postText: 'Lost dog in the area. Please keep an eye out. Reward if found!',
      imageUri: require('../../assets/images/robbery3.png'),
    },
    // ...add as many posts as you like
  ];
  

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
        {posts.map((post) => (
          <View key={post.id} style={styles.card}>
            <View style={styles.userInfo}>
              {/* Replace the placeholder image with your actual user image */}
              <Image source={require('../../assets/images/otpAvatar.png')} style={styles.userImage} />
              <View style={styles.userInfoText}>
                <Text style={styles.text}>{post.username}</Text>
                <Text style={styles.textLite}>{post.timeAgo}</Text>
              </View>
            </View>
            <Text style={styles.postText}>{post.postText}</Text>
            {/* Replace the placeholder image with your actual post image */}
            <Image source={post.imageUri} style={styles.userPost} />
            <View style={styles.interactionWrapper}>
              <TouchableOpacity
                style={styles.interaction}
                onPress={() => (like === 0 ? setLike(1) : setLike(0))}
              >
                <FontAwesome
                  name={like === 1 ? 'heart' : 'heart-o'}
                  color={like === 0 ? colors.black : colors.maincolor}
                  size={30}
                />
                <Text
                  style={[
                    styles.interactionText,
                    like === 1 ? styles.interactionTextLiked : null,
                  ]}
                >
                  {like === 1 ? '14 Likes' : 'Like'}
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
    alignItems: 'center',
    padding: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    flexDirection: 'row',
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userInfoText: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 10,
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
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
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    borderRadius: 10,
  },
  interactionWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
  },
  interaction: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 5,
    padding: 5,
  },
  interactionText: {
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 5,
    marginLeft: 3,
  },
  interactionTextLiked: {
    color: colors.maincolor,
  },
});

export default Postingscreentalal;

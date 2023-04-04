import React, { useState, useEffect } from 'react';

import {
  View,
  Image,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Pressable,
} from 'react-native';
import Icon from '@expo/vector-icons/Feather';

const MOCK_POST = [
  {
    postId: 1,
    image: 'https://picsum.photos/200',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    comments: [`Shite, it's cool!`],
    location: 'London',
    coordinates: {
      latitude: 51.5074,
      longitude: 0.1278,
    },
  },
];

const PostsScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState(MOCK_POST);

  const handleComment = (image, comments, postId) => {
    navigation.navigate('Comments', { image, comments, postId });
  };

  const handleLocation = (coordinates, text, location) => {
    navigation.navigate('Map', { coordinates, text, location });
  };

  const MOCK_DATA = {
    image: 'https://picsum.photos/200',
    name: 'John Doe',
    email: 'john@email.com',
  };
  const { image, name, email } = MOCK_DATA;

  return (
    <View style={styles.container}>
      <View style={styles.userData}>
        <View style={styles.avatar}>
          {image ? (
            <Image style={styles.avatar} source={{ uri: image }} />
          ) : null}
        </View>
        <View>
          <Text style={styles.name}>{name ? name : 'User'}</Text>
          <Text style={styles.email}>{email ? email : ''}</Text>
        </View>
      </View>
      <View style={styles.postsList}>
        <SafeAreaView>
          <FlatList
            ListEmptyComponent={() =>
              posts.length <= 0 ? (
                <View style={styles.emptyMessageBox}>
                  <Text style={styles.emptyMessageStyle}>
                    No posts added yet
                  </Text>
                </View>
              ) : null
            }
            data={posts}
            renderItem={({ item }) => (
              <View style={styles.postsListItem}>
                <Image style={styles.postImage} source={{ uri: item.image }} />
                <Text style={styles.postText}>{item.text}</Text>
                <View style={styles.postDataWrapper}>
                  <Pressable
                    onPress={() => {
                      handleComment(item.image, item.comments, item.postId);
                    }}
                  >
                    <View style={styles.postDataCommentsWrapper}>
                      <Icon name="message-circle" size={24} color="#BDBDBD" />
                      <Text style={styles.postComments}>
                        {item.comments.length}
                      </Text>
                    </View>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      handleLocation(
                        item.coordinates,
                        item.text,
                        item.location
                      );
                    }}
                  >
                    <View style={styles.postLocationWrapper}>
                      <Icon name="map-pin" size={24} color="#BDBDBD" />
                      <Text style={styles.postLocation}>{item.location}</Text>
                    </View>
                  </Pressable>
                </View>
              </View>
            )}
            keyExtractor={item => item.postId}
          />
        </SafeAreaView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  userData: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: '#E8E8E8',
  },

  name: {
    fontFamily: 'Roboto-Bold',
    fontSize: 13,
    color: '#212121',
    fontWeight: 700,
    lineHeight: 15,
    textAlign: 'center',
  },
  email: {
    fontFamily: 'Roboto-Regular',
    fontSize: 11,
    color: '#212121',
    fontWeight: 400,
    lineHeight: 13,
    textAlign: 'center',
  },
  postsList: {
    marginTop: 32,
    paddingBottom: 50,
  },
  postsListItem: {
    marginBottom: 32,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  postImage: {
    width: 434,
    height: 240,
  },
  postText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    color: '#212121',
    fontWeight: 500,
    lineHeight: 19,
  },
  postDataWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  postDataCommentsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 6,
  },
  postComments: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#BDBDBD',
    fontWeight: 400,
    lineHeight: 19,
  },
  postLocationWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 6,
  },
  postLocation: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#212121',
    fontWeight: 400,
    lineHeight: 19,
    textDecorationLine: 'underline',
  },
});
export default PostsScreen;

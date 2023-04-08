import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

import Spinner from '../Components/Spinner';
import { userIdSelector } from '../redux/auth/authSelectors';
import { addLike, getPosts, removeLike } from '../redux/core/coreOperations';
import {
  isDataFetchingSelector,
  postsSelector,
} from '../redux/core/coreSelectors';
import isLikedByCurrentUser from '../utils/isLikedByCurrentUser';
import setDateTimeFromString from '../utils/setDateTimeFromString';

const PostsScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const userId = useSelector(userIdSelector);
  const isLoading = useSelector(isDataFetchingSelector);
  const posts = useSelector(postsSelector);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getPosts());
    });
    return () => {
      unsubscribe();
    };
  }, [navigation]);

  const handleComment = (image, comments, postId) => {
    navigation.navigate('Comments', { image, comments, postId });
  };

  const handleLike = (postId, userId, likes) => {
    if (!isLikedByCurrentUser(likes, userId)) {
      dispatch(addLike({ postId, userId }));
    } else {
      dispatch(removeLike({ postId, userId }));
    }
  };

  const handleLocation = (coordinates, text, location) => {
    navigation.navigate('Map', { coordinates, text, location });
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Spinner />
      ) : (
        <View style={styles.postsList}>
          <SafeAreaView>
            <FlatList
              ListEmptyComponent={() =>
                posts.length <= 0 ? (
                  <View style={styles.emptyMessageBox}>
                    <Text style={styles.emptyMessageStyle}>
                      You're at the very beginning of the project! There are no
                      any posts yet. Please, add some posts to see them here.
                    </Text>
                  </View>
                ) : null
              }
              data={posts}
              renderItem={({ item }) => (
                <>
                  <View style={styles.userData}>
                    <View style={styles.avatar}>
                      <Image
                        style={styles.avatar}
                        source={{ uri: item.userAvatar }}
                      />
                    </View>
                    <View>
                      <Text style={styles.name}>{item.userName}</Text>
                      <Text style={styles.email}>
                        {setDateTimeFromString(item.createdAt)}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.postsListItem}>
                    <Image
                      style={styles.postImage}
                      source={{ uri: item.imageUrl }}
                    />
                    <Text style={styles.postText}>{item.title}</Text>
                    <View style={styles.postDataWrapper}>
                      <Pressable
                        onPress={() => {
                          handleComment(item.imageUrl, item.comments, item.id);
                        }}
                      >
                        <View style={styles.postDataCommentsWrapper}>
                          <Icon
                            name="message-circle"
                            size={24}
                            color="#BDBDBD"
                          />
                          <Text style={styles.postComments}>
                            {item.comments.length}
                          </Text>
                        </View>
                      </Pressable>
                      {/* Under construction */}
                      <Pressable
                        onPress={() => {
                          handleLike(item.id, userId, item.likes);
                        }}
                      >
                        <View style={styles.postDataCommentsWrapper}>
                          <Icon
                            name="thumbs-up"
                            size={24}
                            color={
                              isLikedByCurrentUser(item.likes, userId)
                                ? '#FF6C00'
                                : '#BDBDBD'
                            }
                          />
                          <Text style={styles.postComments}>
                            {item.likes.length ? item.likes.length : null}
                          </Text>
                        </View>
                      </Pressable>

                      <Pressable
                        onPress={() => {
                          handleLocation(
                            item.coordinates,
                            item.title,
                            item.location
                          );
                        }}
                      >
                        <View style={styles.postLocationWrapper}>
                          <Icon name="map-pin" size={24} color="#BDBDBD" />
                          <Text style={styles.postLocation}>
                            {item.location}
                          </Text>
                        </View>
                      </Pressable>
                    </View>
                  </View>
                </>
                // The end of list
              )}
              keyExtractor={item => item.id}
            />
          </SafeAreaView>
        </View>
      )}
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
    paddingTop: 0,
  },
  userData: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 4,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#E8E8E8',
  },

  name: {
    fontFamily: 'Roboto-Bold',
    fontSize: 14,
    color: '#212121',
    fontWeight: 700,
    lineHeight: 15,
    textAlign: 'left',
  },
  email: {
    fontFamily: 'Roboto-Regular',
    fontSize: 11,
    color: '#212121',
    fontWeight: 400,
    lineHeight: 13,
    textAlign: 'left',
  },
  postsList: {
    width: '100%',
    marginTop: 8,
    paddingBottom: 8,
  },
  postsListItem: {
    marginBottom: 32,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  postImage: {
    width: '100%',
    height: 240,
    borderRadius: 8,
  },
  postText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    color: '#212121',
    fontWeight: 500,
    lineHeight: 19,
  },
  postDataWrapper: {
    maxHeight: 24,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 8,
  },
  postDataCommentsWrapper: {
    width: 65,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
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
    justifySelf: 'flex-end',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 6,
    marginLeft: 'auto',
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

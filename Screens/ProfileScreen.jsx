import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ImageBackground,
  View,
  Image,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  FlatList,
} from 'react-native';
import Icon from '@expo/vector-icons/Feather';
import {
  userAvatarSelector,
  userNameSelector,
  userIdSelector,
} from '../redux/auth/authSelectors';
//import { addLike, getCurrentUsersPosts, removeLike } from "../redux/dashboard/dbOperations";
import { logOut } from '../redux/auth/authOperations';
import {
  addLike,
  getCurrentUsersPosts,
  removeLike,
} from '../redux/core/coreOperations';
import {
  isDataFetchingSelector,
  postsSelector,
} from '../redux/core/coreSelectors';
import isLikedByCurrentUser from '../utils/isLikedByCurrentUser';

const ProfileScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const posts = useSelector(postsSelector);
  const isLoading = useSelector(isDataFetchingSelector);

  const userId = useSelector(userIdSelector);
  const image = useSelector(userAvatarSelector);
  const name = useSelector(userNameSelector);

  const handleLogout = () => {
    dispatch(logOut());
    navigation.navigate('Login');
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

  const handleComment = (image, comments, postId) => {
    navigation.navigate('Comments', { image, comments, postId });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getCurrentUsersPosts({ userId: userId }));
    });
    return () => {
      unsubscribe();
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.bgImage}
        source={require('../assets/img/bg.jpg')}
      >
        <View style={styles.contentBox}>
          <View style={styles.avatarWrapper}>
            {image ? (
              <Image style={styles.avatar} source={{ uri: image }} />
            ) : null}
          </View>
          <Text style={styles.title}>{name ? name : 'Dear User'}</Text>
          <Pressable style={styles.logoutBtn} onPress={handleLogout}>
            <Icon name="log-out" size={24} color="#BDBDBD" />
          </Pressable>

          {posts && posts.length > 0 && (
            <SafeAreaView style={styles.postsList}>
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
                    <Image
                      style={styles.postImage}
                      source={{ uri: item.imageUrl }}
                    />
                    <Text style={styles.postText}>{item.title}</Text>
                    <View style={styles.postDataWrapper}>
                      <View style={styles.postDataAchievesWrapper}>
                        <Pressable
                          onPress={() => {
                            handleComment(
                              item.imageUrl,
                              item.comments,
                              item.id
                            );
                          }}
                        >
                          <View style={styles.postDataCommentsWrapper}>
                            <Icon
                              name="message-circle"
                              size={24}
                              color={
                                item.comments.length > 0 ? '#FF6C00' : '#BDBDBD'
                              }
                            />
                            <Text style={styles.postComments}>
                              {item.comments.length ?? item.comments.length}
                            </Text>
                          </View>
                        </Pressable>
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
                              {item.likes ? item.likes.length : null}
                            </Text>
                          </View>
                        </Pressable>
                      </View>
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
                          <Text style={styles.postLocation}>
                            {`${item.location}`.split(',')[0]}
                          </Text>
                        </View>
                      </Pressable>
                    </View>
                  </View>
                )}
                keyExtractor={item => item.id}
              />
            </SafeAreaView>
          )}
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  bgImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  contentBox: {
    maxHeight: '75%',
    position: 'relative',
    justifyContent: 'flex-start',
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 32,
    paddingHorizontal: 16,
    paddingBottom: 153,
  },
  title: {
    fontFamily: 'Roboto-Medium',
    fontSize: 30,
    color: '#212121',
    fontWeight: 500,
    lineHeight: 35,
    textAlign: 'center',
    letterSpacing: 0.01,
    marginBottom: 32,
  },
  avatarWrapper: {
    position: 'relative',
    alignSelf: 'center',
    marginTop: -92,
    marginBottom: 32,
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
    width: 120,
    height: 120,
  },
  avatar: {
    borderRadius: 16,
    width: 120,
    height: 120,
  },
  logoutBtn: {
    position: 'absolute',
    top: 22,
    right: 18,
  },
  postsList: {},
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
    alignSelf: 'center',
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
    color: '#212121',
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
  postDataAchievesWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 24,
  },
});

export default ProfileScreen;

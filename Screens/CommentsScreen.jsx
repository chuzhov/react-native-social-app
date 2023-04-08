import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  TextInput,
  FlatList,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';

import { AntDesign } from '@expo/vector-icons';
import {
  userIdSelector,
  userAvatarSelector,
} from '../redux/auth/authSelectors';
import { addComment } from '../redux/core/coreOperations';
import useSpecificPostComments from '../hooks/useSpecificPostComments';
import setDateTimeFromString from '../utils/setDateTimeFromString';
import Spinner from '../Components/Spinner';
import { isDataFetchingSelector } from '../redux/core/coreSelectors';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { resetCoreError } from '../redux/core/coreSlice';

const CommentsScreen = ({ navigation, route }) => {
  const { image, postId } = route.params;
  const userId = useSelector(userIdSelector);
  const userAvatar = useSelector(userAvatarSelector);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [text, setText] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const dispatch = useDispatch();
  const isLoading = useSelector(isDataFetchingSelector);
  const comments = useSpecificPostComments(postId);

  useEffect(() => {
    text ? setSubmitDisabled(false) : setSubmitDisabled(true);
  }, [text]);

  const textHandler = text => {
    setText(text);
  };

  const handleKeyboard = () => {
    Keyboard.dismiss();
    setKeyboardVisible(false);
  };

  const handlePostComment = async event => {
    event.preventDefault();

    const commentData = {
      text,
      userId,
      postId,
      userAvatar,
    };
    const addResult = await dispatch(addComment({ postId, commentData }));
    if (addResult.error) {
      Toast.show({
        type: 'error',
        text1: setErrorMsg(addResult.error),
      });
      resetCoreError();
    } else {
      setText('');
      handleKeyboard();
    }
  };

  const keyExtractor = (item, index) => index.toString();

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Spinner />
      ) : (
        <KeyboardAvoidingView keyboardVerticalOffset={40} behavior="position">
          <TouchableWithoutFeedback onPress={handleKeyboard}>
            <View style={styles.imageWrapper}>
              <Image style={styles.postImage} source={{ uri: image }} />
            </View>
          </TouchableWithoutFeedback>

          <View style={styles.dataWrapper}>
            <SafeAreaView style={styles.postsList}>
              <FlatList
                ListEmptyComponent={() =>
                  comments.length <= 0 ? (
                    <View style={styles.emptyMessageBox}>
                      <Text style={styles.emptyMessageStyle}>
                        No comments added yet
                      </Text>
                    </View>
                  ) : null
                }
                data={comments}
                renderItem={({ item }) => (
                  <TouchableWithoutFeedback onPress={handleKeyboard}>
                    <View
                      style={
                        item.userId === userId
                          ? styles.commentBox
                          : {
                              ...styles.commentBox,
                              flexDirection: 'row-reverse',
                            }
                      }
                    >
                      <View style={styles.commentTextWrapper}>
                        <Text style={styles.commentText}>{item.text}</Text>
                        <Text style={styles.commentDate}>
                          {setDateTimeFromString(item.createdAt)}
                        </Text>
                      </View>
                      <View style={styles.commentAvatar}>
                        <Image
                          style={styles.commentAvatar}
                          source={{ uri: item.userAvatar }}
                        />
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                )}
                keyExtractor={keyExtractor}
              />
            </SafeAreaView>
            <View
              style={{
                ...styles.commentInputWrapper,
                paddingBottom:
                  keyboardVisible && Platform.OS == 'android' ? 32 : 16,
              }}
            >
              <TextInput
                style={
                  text
                    ? { ...styles.commentInput, color: '#212121' }
                    : styles.commentInput
                }
                value={text}
                multiline
                autoFocus={false}
                selectionColor="#FF6C00"
                blurOnSubmit={true}
                placeholderTextColor="#BDBDBD"
                onChangeText={textHandler}
                onFocus={() => {
                  setKeyboardVisible(true);
                }}
                onBlur={() => {
                  setKeyboardVisible(false);
                }}
                placeholder="Comment..."
              ></TextInput>
              <Pressable
                style={{
                  ...styles.addCommentBtn,
                  opacity: submitDisabled ? 0.5 : 1,
                }}
                onPress={handlePostComment}
                disabled={submitDisabled}
              >
                <AntDesign name="arrowup" size={20} color="#ffffff" />
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      )}
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 16,
  },
  dataWrapper: {},
  imageWrapper: {
    alignItems: 'center',
  },
  postImage: {
    width: 343,
    height: 240,
    borderRadius: 8,
  },
  postsList: {
    marginTop: 24,
    maxHeight: '60%',
    minHeight: '60%',
    width: '100%',
  },
  commentBox: {
    marginBottom: 24,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  commentTextWrapper: {
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderRadius: 6,
    padding: 16,
    width: 300,
    flexGrow: 1,
  },
  commentText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 13,
    color: '#212121',
    fontWeight: 400,
    lineHeight: 18,
  },
  commentDate: {
    fontFamily: 'Roboto-Regular',
    fontSize: 10,
    color: '#BDBDBD',
    fontWeight: 400,
    lineHeight: 12,
    textAlign: 'right',
  },

  commentAvatar: {
    borderRadius: 14,
    width: 28,
    height: 28,
    backgroundColor: '#BDBDBD',
  },
  commentInputWrapper: {
    position: 'relative',
    alignSelf: 'flex-end',
    width: '100%',
    marginTop: 16,
  },
  commentInput: {
    width: '100%',
    paddingLeft: 16,
    paddingRight: 50,
    paddingTop: 16,
    height: 50,
    backgroundColor: '#F6F6F6',
    borderRadius: 100,
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    color: '#BDBDBD',
    fontWeight: 500,
    lineHeight: 19,
    textAlignVertical: 'center',
  },
  addCommentBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 34,
    height: 34,
    borderRadius: '50%',
    backgroundColor: '#FF6C00',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyMessageBox: {
    marginTop: 24,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyMessageStyle: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    color: '#212121',
    fontWeight: 500,
    lineHeight: 19,
    textAlign: 'center',
  },
});
export default CommentsScreen;

const isLikedByCurrentUser = (likes, currentUser) => {
  return likes.find(liker => liker === currentUser);
};
export default isLikedByCurrentUser;

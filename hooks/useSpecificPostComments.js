import { useSelector } from 'react-redux';

export const useSpecificPostComments = postId => {
  return useSelector(state => {
    const post = state.core.posts.find(p => p.id === postId);
    return post ? post.comments : [];
  });
};

export default useSpecificPostComments;

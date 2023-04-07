import { useSelector } from 'react-redux';

export const postsSelector = state => state.core.posts;
export const isDataFetchingSelector = state => state.core.isDataFetching;

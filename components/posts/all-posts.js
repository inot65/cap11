import React from 'react';
import PostsGrid from './posts-grid';
import classes from './all-posts.module.css';

const AllPosts = (props) => {
  return (
    <section className={classes.posts}>
      <h2>All Posts</h2>
      <PostsGrid posts={props.posts} />
    </section>
  );
};

export default AllPosts;

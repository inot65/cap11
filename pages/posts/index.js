import React from 'react';
import Head from 'next/head';
import AllPosts from '../../components/posts/all-posts';
import {getAllPosts} from '../../lib/posts-util';

const AllPostsPage = (props) => {
  return (
    <>
      <Head>
        <title>Toate posturi publicate</title>
        <meta
          name='description'
          content='Aici gasesti toate posturile publicate pe Blogul lui Toni'
        />
      </Head>
      <AllPosts posts={props.posts} />
    </>
  );
};

export function getStaticProps() {
  const allPosts = getAllPosts();

  return {
    props: {
      posts: allPosts,
    },
  };
}

export default AllPostsPage;

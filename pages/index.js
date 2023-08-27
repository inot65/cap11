import React from 'react';
import Head from 'next/head';
import FeaturedPostsPage from '../components/home-page/featured-posts';
import Hero from '../components/home-page/hero';
import {getFeaturedPosts} from '../lib/posts-util';

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>Toni Blog</title>
        <meta name='description' content='Blogul lui Toni' />
      </Head>
      <Hero />
      <FeaturedPostsPage posts={props.posts} />
    </>
  );
};

export function getStaticProps() {
  const featuredPosts = getFeaturedPosts();

  return {
    props: {
      posts: featuredPosts,
    },
  };
}

export default HomePage;

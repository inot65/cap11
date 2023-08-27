import fs from 'fs';
// import path from 'path';
import matter from 'gray-matter';

// const postsDirectory = path.join(process.cwd(), 'posts');
const postsDirectory = `${process.cwd()}/posts`.replace('//', '/');
// console.log('-> postsDirectory: ', postsDirectory);

// acum merge ca parametru si cu slug simplu , si cu nume de fisier cu extensie
export const getPostData = (postIdentifier) => {
  // const filePath = path.join(postsDirectory, fileName);
  const postSlug = postIdentifier.replace(/\.md$/, ''); // sterge extensia de fisier (daca o are) si obtin slug
  const filePath = `${postsDirectory}/${postSlug}.md`;
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const {data, content} = matter(fileContent);

  const postData = {
    slug: postSlug,
    ...data,
    content,
  };

  return postData;
};

export const getPostsFiles = () => {
  return fs.readdirSync(postsDirectory); // citirea unui director in mod sincron
};

export const getAllPosts = () => {
  const postsFiles = getPostsFiles();

  // console.log('getAllPosts() -> postsFiles : ', postsFiles);

  const allPosts = postsFiles.map((postFile) => {
    return getPostData(postFile);
  });

  const sortedPosts = allPosts.sort((postA, postB) =>
    postA.date > postB.date ? -1 : 1
  );

  return sortedPosts;
};

export const getFeaturedPosts = () => {
  const allPosts = getAllPosts();
  // console.log('getFeaturedPosts() -> allPosts : ', allPosts);

  const featuredPosts = allPosts.filter((post) => post.isFeatured);

  return featuredPosts;
};

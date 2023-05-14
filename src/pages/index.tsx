import * as React from 'react';
import AddPost from "@/components/AddPost";
import Post from "@/components/Post";
import { InferGetStaticPropsType } from 'next';

const API_URL: string = 'https://jsonplaceholder.typicode.com/posts'

export default function Home({
  posts,
  // provided by Next.js, allows us to set the type on the method getStaticProps.
  // It will infer the type defined on the props returned by getStaticProps
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [postList, setPostList] = React.useState(posts)

  const addPost = async (e: React.FormEvent, formData: IPost) => {
    e.preventDefault()
    const post: IPost = {
      id: Math.random(),
      title: formData.title,
      body: formData.body,
    }
    console.log(post)
    setPostList([post, ...postList])
  }
  const deletePost = async (id: number) => {
    const posts: IPost[] = postList.filter((post: IPost) => post.id !== id)
    console.log(posts)
    setPostList(posts)
  }
  if (!postList) return <h1>Loading...</h1>
  return (
    <main className='container'>
      <h1 className='italic text-3xl font-extrabold'>My posts</h1>
      <AddPost savePost={addPost} />
      {postList.map((post: IPost) => (
        <Post key={post.id} deletePost={deletePost} post={post} />
      ))}
    </main>
  )
}
// can alternatively use the getServerSideProps method, Fetch, or a library to fetch the data.
export async function getStaticProps() {
  const res = await fetch(API_URL)
  const posts: IPost[] = await res.json()
  return {
    props: {
      posts,
    },
  }
}
// Server-side rendering is also an option; 
// this method generates a fresh HTML file whenever a request is made to the server. 
// This is the mode you would use getServerSideProps for.
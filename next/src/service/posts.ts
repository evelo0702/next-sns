import { FullPost, SimplePost } from "@/app/model/post";
import { assetsURL, client, urlFor } from "./sanity";

export async function getFollowingPostsOf(id: string) {
  return client
    .fetch(
      `*[_type =='post' && author->id == "${id}"
  || author._ref in *[_type == 'user' && id == "${id}"].following[]._ref]
  | order(_createdAt desc){
       ...,
   "id": author->id,
    "userImage" : author->image,
    "image1" : photo1,
     "image2" : photo2 ,
     "image3" : photo3 ,
    "image4" : photo4 ,
     "likes": likes[]->id,
     "likesCount":count(likes),
 "content": content,
     "commentsCount": count(comments),
     comments[]{comment, "id": author->id, "image": author->image},
     "postId":_id,
     "createdAt":_createdAt
 }
 `
    )
    .then((posts) =>
      posts.map((post: SimplePost) => ({
        ...post,
        likes: post.likes ?? [],
        image1: urlFor(post.image1),
        image2: urlFor(post.image2),
        image3: urlFor(post.image3),
        image4: urlFor(post.image4),
      }))
    );
}

export function getUserPost(id: string) {
  return client
    .fetch(
      `*[_type =='post' 
    && author->id == "${id}"] 
    | order(_createdAt desc)
    {
      ...,
    "id":author->id,
    "postId":_id,
    "userImage" : author->image,
    "image1" : photo1,
    "image2" : photo2 ,
    "image3" : photo3 ,
    "image4" : photo4 ,     
    "likes": likes[]->id,
    "likesCount":count(likes),
     "content": content,
     "commentsCount": count(comments),
     comments[]{comment, "id": author->id, "image": author->image},
     "createdAt":_createdAt}`
    )
    .then((posts) =>
      posts.map((post: SimplePost) => ({
        ...post,
        likes: post.likes ?? [],
        image1: urlFor(post.image1),
        image2: urlFor(post.image2),
        image3: urlFor(post.image3),
        image4: urlFor(post.image4),
      }))
    );
}
export function getUserBookmarks(id: string) {
  return client
    .fetch(
      `*[_type =='post' 
    && _id in *[_type=='user' && id == '${id}'].bookmarks[]._ref] 
    | order(_createdAt desc)
    {
      ...,
    "id":author->id,
    "userImage" : author->image,
    "image1" : photo1,
    "image2" : photo2 ,
    "image3" : photo3 ,
    "image4" : photo4 ,     
    "likes": likes[]->id,
    "likesCount":count(likes),
     "content": content,
     "commentsCount": count(comments),
     comments[]{comment, "id": author->id, "image": author->image},
     "createdAt":_createdAt}`
    )
    .then((posts) =>
      posts.map((post: SimplePost) => ({
        ...post,
        likes: post.likes ?? [],
        image1: urlFor(post.image1),
        image2: urlFor(post.image2),
        image3: urlFor(post.image3),
        image4: urlFor(post.image4),
      }))
    );
}
export function getUserLikes(id: string) {
  return client
    .fetch(
      `*[_type =='post' 
    && "${id}" in likes[]->id] 
    | order(_createdAt desc)
    {
      ...,
    "id":author->id,
    "userImage" : author->image,
    "image1" : photo1,
    "image2" : photo2 ,
    "image3" : photo3 ,
    "image4" : photo4 ,     
    "likes": likes[]->id,
    "likesCount":count(likes),
     "content": content,
     "commentsCount": count(comments),
     comments[]{comment, "id": author->id, "image": author->image},
     "createdAt":_createdAt}`
    )
    .then((posts) =>
      posts.map((post: SimplePost) => ({
        ...post,
        likes: post.likes ?? [],
        image1: urlFor(post.image1),
        image2: urlFor(post.image2),
        image3: urlFor(post.image3),
        image4: urlFor(post.image4),
      }))
    );
}
export function likePost(postId: string, userId: string) {
  return client
    .patch(postId) //
    .setIfMissing({ likes: [] })
    .append("likes", [
      {
        _ref: userId,
        _type: "reference",
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}
export function dislikePost(postId: string, userId: string) {
  return client
    .patch(postId)
    .unset([`likes[_ref=="${userId}"]`])
    .commit();
}
export function addComment(postId: string, userId: string, comment: string) {
  return client
    .patch(postId) //
    .setIfMissing({ comments: [] })
    .append("comments", [
      {
        comment,
        author: {
          _ref: userId,
          _type: "reference",
        },
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}

export async function createPost(
  userId: string,
  content: string,
  files0: Blob,
  files1?: Blob,
  files2?: Blob,
  files3?: Blob
) {
  const files = [files0, files1, files2, files3];

  return fetch(assetsURL, {
    method: "POST",
    headers: {
      "content-type": files0.type,
      authorization: `Bearer ${process.env.SANITY_SECRET_TOKEN}`,
    },
    body: files0,
  })
    .then((res) => res.json())
    .then((result) => {
      return client.create(
        {
          _type: "post",
          author: { _ref: userId },
          photo1: { asset: { _ref: result.document._id } },
          content: content,
          likes: [],
        },
        { autoGenerateArrayKeys: true }
      );
    });
}

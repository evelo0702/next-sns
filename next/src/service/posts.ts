import { SimplePost } from "@/app/model/post";
import { client, urlFor } from "./sanity";

export async function getFollowingPostsOf(email: string) {
  return client
    .fetch(
      `*[_type =='post' && author->email == "${email}"
  || author._ref in *[_type == 'user' && email == "${email}" ].following[]._ref]
  | order(_createAt desc){
       ...,
   "id": author->id,
    "userImage" : author->image,
    "image1" : photo1,
     "image2" : photo2 ,
     "image3" : photo3 ,
    "image4" : photo4 ,
     "likes": likes[]->id,
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
        image1: urlFor(post.image1),
        image2: urlFor(post.image2),
        image3: urlFor(post.image3),
        image4: urlFor(post.image4),
      }))
    );
}

import { SearchUser } from "@/app/model/user";
import { client } from "./sanity";
type OAuthUser = {
  id: string;
  email: string;
  name: string;
  username: string;
  image?: string | null;
};
export async function addUser(user: OAuthUser) {
  return client.createIfNotExists({
    _id: user.id,
    _type: "user",
    id: user.username,
    image: user.image,
    email: user.email,
    name: user.name,
    following: [],
    followers: [],
    bookmarks: [],
  });
}

export async function getUserByUsername(email: string) {
  return client.fetch(`*[_type == 'user' && email == "${email}"][0]{
    ...,
    "id": _id,
    following[]->{id,image},
    followers[]->{id,image},
    "bookmarks":bookmarks[]->_id
  }`);
}

export function searchUsers(keyword?: string) {
  const query = keyword
    ? `&& (name match "${keyword}") || (id match "${keyword}")`
    : "";
  return client
    .fetch(
      `*[_type == 'user' ${query}][0]{
    ...,
    following[]->{id,image},
    followers[]->{id,image},
    "followingNum":count(following),
    "followersNum":count(followers),
    "posts":count(*[_type=='post' && author->id =="${keyword}"]),
    bookmarks[]->{_id}
  }`
    )
    .then((user) => ({
      ...user,
      followingNum: user.followingNum ?? 0,
      followersNum: user.followersNum ?? 0,
    }))
    .catch((error) => console.error(error));
}
export async function searchUsers2(keyword?: string) {
  const query = keyword
    ? `&& (name match "${keyword}") || (username match "${keyword}")`
    : "";
  return client
    .fetch(
      `*[_type =="user" ${query}]{
      ...,
      following[]->{id,image},
      followers[]->{id,image},
      "followingNum":count(following),
      "followersNum":count(followers),
      "posts":count(*[_type=='post' && author->id =="${keyword}"]),
      bookmarks[]->{_id}
    }
    `
    )
    .then((users) =>
      users.map((user: SearchUser) => ({
        ...user,
        followingNum: user.followingNum ?? 0,
        followersNum: user.followersNum ?? 0,
      }))
    );
}
export function addBookmark(userId: string, postId: string) {
  return client
    .patch(userId) //
    .setIfMissing({ bookmarks: [] })
    .append("bookmarks", [
      {
        _ref: postId,
        _type: "reference",
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}
export function removeBookmark(userId: string, postId: string) {
  return client
    .patch(userId)
    .unset([`bookmarks[_ref=="${postId}"]`])
    .commit();
}

export async function follow(myId: string, targetId: string) {
  return client
    .transaction() //
    .patch(myId, (user) =>
      user
        .setIfMissing({ following: [] })
        .append("following", [{ _ref: targetId, _type: "reference" }])
    )
    .patch(targetId, (user) =>
      user
        .setIfMissing({ followers: [] })
        .append("followers", [{ _ref: myId, _type: "reference" }])
    )
    .commit({ autoGenerateArrayKeys: true });
}

export async function unfollow(myId: string, targetId: string) {
  return client
    .transaction() //
    .patch(myId, (user) => user.unset([`following[_ref=="${targetId}"]`]))
    .patch(targetId, (user) => user.unset([`followers[_ref=="${myId}"]`]))
    .commit({ autoGenerateArrayKeys: true });
}

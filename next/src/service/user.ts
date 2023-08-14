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
      `*[_type == 'user' ${query}]{
    ...,
    "following":count(following),
    "followers":count(followers)
  }`
    )
    .then((users) =>
      users.map((user: SearchUser) => ({
        ...user,
        following: user.following ?? 0,
        followers: user.followers ?? 0,
      }))
    );
}

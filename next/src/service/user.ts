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

export async function getUserByUsername(id: string) {
  return client.fetch(`*[_type == 'user' && id == "${id}"][0]{
    ...,
    "id": _id,
    following[]->{id,image},
    followers[]->{id,image},
    "bookmarks":bookmarks[]->_id
  }`);
}

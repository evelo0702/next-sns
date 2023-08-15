export type User = {
  name: string;
  id: string;
  email: string;
  image?: string;
};
export type simpleUser = Pick<User, "id" | "image">;
export type DetailUser = User & {
  following: simpleUser[];
  followers: simpleUser[];
  bookmarks: string[];
};

export type SearchUser = User & {
  following: simpleUser[];
  followers: simpleUser[];
  followingNum: number;
  followersNum: number;
};

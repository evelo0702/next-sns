export type Comment = {
  comment: string;
  id: string;
  image: string;
};
export type SimplePost = Omit<FullPost, "comments"> & {
  commentsCount: number;
};
export type FullPost = {
  postId: string;
  id: string;
  userImage: string;
  image1: string;
  image2: string | null;
  image3: string | null;
  image4: string | null;
  content: string;
  createdAt: string;
  likes: string[];
  likesCount: number;
  commentsCount: number;
  comments: Comment[];
  _id: string;
};

import UserSearch from "@/components/UserSearch";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Search",
  description: "Search users to follow",
};
const SearchPage = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    redirect("/auth/signin");
  }

  return (
    <div>
      <UserSearch />
    </div>
  );
};

export default SearchPage;

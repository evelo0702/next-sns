import UserDetail from "@/components/UserDetail";
import React from "react";
type Props = {
  params: {
    userId: string;
  };
};
const UserDetailPage = ({ params }: Props) => {
  return (
    <div>
      <UserDetail userId={params.userId} />
    </div>
  );
};

export default UserDetailPage;

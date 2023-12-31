import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { getProviders } from "next-auth/react";
import Signin from "@/components/ui/Signin";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Signin",
  description: "Signup or Login to BLISS",
};
type Props = {
  searchParams: {
    callbackUrl: string;
  };
};
const SignPage = async ({ searchParams: { callbackUrl } }: Props) => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }
  const providers = (await getProviders()) ?? {};
  return (
    <section className="mt-24 mb-24">
      <Signin providers={providers} callbackUrl={callbackUrl ?? "/"} />
    </section>
  );
};

export default SignPage;

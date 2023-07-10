// import Image from 'next/image'
import { Button } from "@/components/ui/button.tsx";

import graphqlRequestClient from "@/lib/graphqlRequestClient";
import { useGetAllProductsQuery } from "@/src/__generated__/graphql";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";

const LandingPageContent = () => {
  return (
    <section className="text-gray-600 body-font h-[calc(92vh-2rem)] grid place-items-center">
      <div className="container mx-auto flex px-5 py-20 md:flex-row flex-col items-center">
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
          <img
            className="object-cover object-center rounded"
            alt="hero"
            src="https://dummyimage.com/720x600"
          />
        </div>
        <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            Before they sold out
            <br className="hidden lg:inline-block" />
            readymade gluten
          </h1>
          <p className="mb-8 leading-relaxed">
            Copper mug try-hard pitchfork pour-over freegan heirloom neutra air
            plant cold-pressed tacos poke beard tote bag. Heirloom echo park
            mlkshk tote bag selvage hot chicken authentic tumeric truffaut
            hexagon try-hard chambray.
          </p>
          <div className="flex justify-center">
            <Button
              type="button"
              className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              <Link href="/auth/signin">Sign In</Link>
            </Button>
            <Button
              type="button"
              className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg"
            >
              <Link href="/auth/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  const { data: session } = useSession();
  console.log("🚀 ~ Home ~ session:", session);
  // GetAllProductsDocument

  const { data, error, isLoading } =
    useGetAllProductsQuery(graphqlRequestClient);

  useEffect(() => {
    console.log("🚀 ~ Home ~ loading:", isLoading);
    console.log("🚀 ~ Home ~ loading:", data);
    if (error) {
      console.log("🚀 ~ useEffect ~ error:", error);
    }
  }, [data, isLoading, error]);

  return <LandingPageContent />;
}

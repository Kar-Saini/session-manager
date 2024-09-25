import Image from "next/image";
import image from "./public/image.png";
import React from "react";
import Form from "./components/Form";

const Page = () => {
  return (
    <div className="flex justify-center items-center h-full flex-col gap-y-11 ">
      <Image alt="" src={image} width={400} height={400} />
      <Form />
    </div>
  );
};

export default Page;

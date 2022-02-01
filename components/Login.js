import React from "react";
import Button from "@material-tailwind/react/Button";
import Image from "@material-tailwind/react/Image";
import { signIn } from "next-auth/client";

function Login() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image
        src="https://links.papareact.com/1ui"
        height="300"
        width="550"
        objectFit="contained"
      />
      <Button
        className="w-44 mt-10"
        color="blue"
        buttonType="filled"
        ripple="light"
        onClick={signIn}
      >
        {" "}
        Login
      </Button>
    </div>
  );
}

export default Login;

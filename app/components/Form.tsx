"use client";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";
import { useUser } from "../context/UserContext";
import { useRouter } from "next/navigation";

const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1, "Name is required"),
});

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const Form = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [variant, setVariant] = useState<"register" | "login">("login");
  const { setUserName, setSession } = useUser();
  const router = useRouter();

  function toggleVariant() {
    if (variant === "login") {
      setVariant("register");
    } else {
      setVariant("login");
    }
  }

  async function handleSubmit() {
    const zodValidation =
      variant === "register"
        ? RegisterSchema.safeParse({ name, email, password })
        : LoginSchema.safeParse({ email, password });

    if (zodValidation.success) {
      setLoading(true);
      try {
        if (variant === "register") {
          const result = await axios.post("/api/register", {
            email,
            password,
            name,
          });
          if (result.status === 200) {
            toast.success(
              `Welcome ${result.data.name} !! Registered successfully`
            );
            setVariant("login");
            setEmail("");
            setPassword("");
            setName("");
          }
        } else {
          const result = await axios.post("/api/login", { email, password });
          if (result.status === 200) {
            console.log(result);
            setUserName(result.data.name);
            setSession(result.data.session);
            router.push("/dashboard");
          }
        }
      } catch (error: any) {
        if (error.response && error.response.status === 400) {
          toast.error("Email ID already exists or invalid login");
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      }
      setLoading(false);
    } else {
      toast.error("Invalid credentials format");
    }
  }

  return (
    <div className=" flex flex-col border-[1px] border-black px-2 py-4 w-[300px] gap-y-2 rounded-md p-4">
      {variant === "register" && (
        <input
          type="name"
          name=""
          id=""
          placeholder="Name"
          className="outline-none mx-4 my-1 bg-neutral-200 py-2 px-4 rounded-md"
          disabled={loading}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      )}
      <input
        type="email"
        name=""
        id=""
        placeholder="Email"
        disabled={loading}
        className="outline-none mx-4 my-1 bg-neutral-200 py-2 px-4 rounded-md"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        name=""
        id=""
        placeholder="Password"
        className="outline-none mx-4 my-1 bg-neutral-200 py-2 px-4 rounded-md"
        value={password}
        disabled={loading}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className={`bg-neutral-700 px-4 py-2 mt-4 text-neutral-200 mx-4 rounded-md 
    ${
      !loading &&
      `hover:scale-105 transition hover:bg-neutral-800 hover:text-neutral-100 hover:cursor-pointer`
    }
  `}
        onClick={handleSubmit}
        disabled={
          loading || !email || !password || (variant === "register" && !name)
        }
      >
        Submit
      </button>

      <div className="text-center border-t mt-4 pt-2  border-neutral-400 mx-4 border-dashed text-sm text-neutral-500  ">
        <p
          className="transition hover:scale-105 hover:cursor-pointer hover:text-neutral-800 "
          onClick={toggleVariant}
        >
          {variant === "login" ? "Register here" : "Login"}
        </p>
      </div>
    </div>
  );
};

export default Form;

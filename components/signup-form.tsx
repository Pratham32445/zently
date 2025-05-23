"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: "",
    userName: "",
    password: "",
  });
  const [errorInfo, setErrorInfo] = useState({
    email: "",
    userName: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorInfo({ email: "", password: "", userName: "" });
    try {
      const { email, password, userName } = formData;
      if (email.length > 0 && password.length > 0 && userName.length > 0) {
        const res = await axios.post("/api/auth/sign-up", formData);
        console.log(res);
        if (res.status == 200) {
          const isSignIn = await signIn("credentials", {
            email,
            password,
            redirect: false,
          });
          if (isSignIn?.ok) {
            router.push("/dashboard");
          }
        }
      } else {
        toast({
          title: "Please provide all the field",
          variant: "destructive",
        });
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        const type = error.response?.data.type;
        if (type == "toast-error") {
          const message = error.response?.data.message;
          toast({
            title: message,
            variant: "destructive",
          });
        } else if (type == "show-error") {
          setErrorInfo(error.response?.data.errors);
        }
      }
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                  Create New Account
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
                <span className="text-xs text-red-600">{errorInfo.email}</span>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="userName">UserName</Label>
                <Input
                  id="userName"
                  type="text"
                  placeholder="Enter your UserName"
                  value={formData.userName}
                  onChange={handleChange}
                />
                <span className="text-xs text-red-600">
                  {errorInfo.userName}
                </span>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your Password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <span className="text-xs text-red-600">
                  {errorInfo.password}
                </span>
              </div>
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
              <div>
                <Button variant="outline" className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  <span>Login with Google</span>
                </Button>
              </div>
              <div className="text-center text-sm">
                Already have an Account?{" "}
                <Link href="/sign-in" className="underline underline-offset-4">
                  Sign In
                </Link>
              </div>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <Image
              src="/slot2.jpg"
              alt="Login Background"
              fill
              className="object-cover"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}

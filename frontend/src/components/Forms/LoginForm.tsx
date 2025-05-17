import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { loginSchema } from "@/validations/auth";
import { UserContext } from "@/context/UserContext";
import { CartContext } from "@/context/CartContext";

const LoginForm = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const navigate = useNavigate();
  const userContext = React.useContext(UserContext);
  const cartContext = React.useContext(CartContext);
  if (!cartContext) {
    throw new Error("UpdateUserComponent must be used within a UserProvider");
  }

  const { fetchCart } = cartContext;

  if (!userContext) {
    throw new Error("UpdateUserComponent must be used within a UserProvider");
  }

  const { setUser } = userContext;
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "test@gmail.com",
      password: "123456",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    setLoading(true);
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URI}/api/auth/login`,
        data,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        toast.success("Logged in successfully");
        setUser(response.data.data.userWithoutPassword);
        navigate("/");
        fetchCart();
      }

      //set error here from response
      setError("Unexpected Error");
    } catch (err) {
      console.log("Internal server error", err);
    } finally {
      setLoading(false);
      form.reset();
    }
  };

  return (
    <>
      {error && (
        <Alert variant={"destructive"}>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="example@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="*********" {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={loading}
            type="submit"
            className="rounded-full bg-[#98F9B3] px-8 py-2 text-black hover:bg-[#98F9B3]/90"
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
};

export default LoginForm;

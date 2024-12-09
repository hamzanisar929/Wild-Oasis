import { useMutation } from "@tanstack/react-query";
import { login } from "../../services/apiLogin";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: Login, isLoading: isLoggingIn } = useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueriesData(["user"], user);
      toast.success(`User Logged in successfully!`);
      navigate("/dashboard");
    },
    onError: (err) => {
      console.log("ERROR || ", err);
      toast.error("Provided email or password is incorrect");
    },
  });

  return { Login, isLoggingIn };
}

import { useMutation } from "@tanstack/react-query";
import { logOut as logOutApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

export function useLogOut() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logOut, isLoading: isLoggingOut } = useMutation({
    mutationFn: logOutApi,
    onSuccess: () => {
      queryClient.removeQueries();
      toast.success("User logged out successfully!");
      navigate("/login", { replace: true });
    },
  });

  return { logOut, isLoggingOut };
}

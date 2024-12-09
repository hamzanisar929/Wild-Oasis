import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { useLogOut } from "../features/authentication/useLogout";
import ButtonIcon from "../ui/ButtonIcon";
import SpinnerMini from "./SpinnerMini";

function LogOut() {
  const { logOut, isLoggingOut } = useLogOut();

  return (
    <ButtonIcon disabled={isLoggingOut} onClick={logOut}>
      {!isLoggingOut ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
}

export default LogOut;

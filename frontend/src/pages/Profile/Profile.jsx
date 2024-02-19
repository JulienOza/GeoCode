import VisitorProfile from "./VisitorProfile";
import ConnectedProfile from "./ConnectedProfile";
import useStore from "../../store/AuthProvider";

function Profile() {
  const { auth } = useStore();

  return auth.user.status === "user" ? (
    <ConnectedProfile />
  ) : (
    <VisitorProfile />
  );
}

export default Profile;

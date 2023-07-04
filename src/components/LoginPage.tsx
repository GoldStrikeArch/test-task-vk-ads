import { useAuthState } from "react-firebase-hooks/auth";
import { auth, login } from "../firebase";

const LoginPage = () => {
  const [user] = useAuthState(auth);

  if (user) {
    window.location.assign("/");

    return null;
  }

  return <button onClick={login}>Login</button>;
};

export default LoginPage;

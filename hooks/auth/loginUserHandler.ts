import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../config/firebase";

export default async function loginUserHandler(
  email: string,
  password: string,
) {
  const auth = getAuth(app);
  return await signInWithEmailAndPassword(auth, email, password);
}

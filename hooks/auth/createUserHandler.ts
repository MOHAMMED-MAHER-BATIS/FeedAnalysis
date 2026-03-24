import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../../config/firebase";

export default async function createUserHandler(
  email: string,
  password: string,
) {
  const auth = getAuth(app);

  // Let caller handle success and errors.
  return await createUserWithEmailAndPassword(auth, email, password);
}

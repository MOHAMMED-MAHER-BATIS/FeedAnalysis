import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default async function loginUserHandler(
  email: string,
  password: string,
) {
  const auth = getAuth();
  return await signInWithEmailAndPassword(auth, email, password);
}

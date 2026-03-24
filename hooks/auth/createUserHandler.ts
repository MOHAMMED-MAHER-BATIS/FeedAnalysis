import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default async function createUserHandler(
  email: string,
  password: string,
) {
  const auth = getAuth();

  // Let caller handle success and errors.
  return await createUserWithEmailAndPassword(auth, email, password);
}

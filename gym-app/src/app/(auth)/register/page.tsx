"use client";

import { FormEvent, useState } from "react";
import { register } from "@/api/controllers/auth";
import styles from "@/app/(auth)/auth.module.scss";
import Link from "next/link";
import { Input } from "@/common/components";
import Button from "@/common/components/Button/Button";
import { useRouter } from "next/navigation";
import { ApiError } from "@/common/lib/ApiError";
import Loader from "@/common/components/Loader/Loader";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      await register({ email: email, password: password }, router);
      router.push("/register-confirmation");
    } catch (error) {
      if (error instanceof ApiError) {
        setError(error.message);
      } else {
        setError("Coś poszło nie tak. Spróbuj ponownie.");
      }
    }
    setLoading(false);
  }

  return (
    <>
      <form onSubmit={onRegister} className={styles.form}>
        <h1 className={styles.headerText}>Tworzenie konta</h1>
        <div className={styles.inputContainer}>
          {error && <p className={styles.error}>{error}</p>}
          <Input
            value={email}
            name={"email"}
            type="email"
            pattern="[^@]+@[^@]+\.[a-zA-Z]{2,6}"
            errorMessage={"To nie jest mail"}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            placeholder="Email"
            className={styles.input}
            required
          />
          <Input
            value={password}
            name={"password"}
            type="password"
            pattern="^(?=.*[A-Za-z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$"
            errorMessage={"Hasło musi zawierać przynajmniej 8 znaków w tym 1 literę i 1 cyfrę"}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            placeholder="Hasło"
            className={styles.input}
            required
          />
          <Input
            value={confirmPassword}
            name={"confirmPassword"}
            type="password"
            pattern={password}
            errorMessage={"Hasła różnią się"}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setError("");
            }}
            placeholder="Potwierdź hasło"
            className={styles.input}
            required
          />
        </div>
        <Button type={"submit"} className={styles.button}>
          Załóż konto
        </Button>
        <Link href={"/sign-in"} className={styles.registerLink}>
          Masz już konto? Zaloguj się!
        </Link>
      </form>
      {loading && <Loader className={styles.loader} />}
    </>
  );
}

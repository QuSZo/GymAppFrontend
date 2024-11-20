"use client";

import styles from "../auth.module.scss";
import { Input } from "@/common/components";
import Button from "@/common/components/Button/Button";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { useAuthContext } from "@/common/contexts/authContext";
import { ApiError } from "@/common/lib/ApiError";
import Loader from "@/common/components/Loader/Loader";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuthContext();
  const [loading, setLoading] = useState(false);

  async function onSignIn(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
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
      <form onSubmit={onSignIn} className={styles.form}>
        <h1 className={styles.headerText}>Zaloguj się</h1>
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
            errorMessage={"Hasło nie może być puste"}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            placeholder="Hasło"
            className={styles.input}
            required
          />
          <div className={styles.passwordRecoveryLink}>
            <Link href={"/forgot-password"}>Odzyskaj hasło</Link>
          </div>
        </div>
        <Button type={"submit"} className={styles.button}>
          Zaloguj się
        </Button>
        <Link href={"/register"} className={styles.registerLink}>
          Pierwszy raz w GymNotes? Załóż konto!
        </Link>
      </form>
      {loading && <Loader className={styles.loader} />}
    </>
  );
}

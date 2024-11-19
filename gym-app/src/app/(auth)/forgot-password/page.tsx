"use client";

import { FormEvent, useState } from "react";
import { forgotPassword } from "@/api/controllers/auth";
import styles from "@/app/(auth)/auth.module.scss";
import Link from "next/link";
import { Input } from "@/common/components";
import Button from "@/common/components/Button/Button";
import { useRouter } from "next/navigation";
import { ApiError } from "@/common/lib/ApiError";
import Loader from "@/common/components/Loader/Loader";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onForgotPassword(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      await forgotPassword({ email }, router);
      router.push("/check-email");
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.code === "invalid_credentials") {
          setError("Email nie istnieje.");
        } else {
          setError(error.message);
        }
      } else {
        setError("Coś poszło nie tak. Spróbuj ponownie.");
      }
    }
    setLoading(false);
  }

  return (
    <>
      <form onSubmit={onForgotPassword} className={styles.form}>
        <h1 className={styles.headerText}>Resetowanie hasła</h1>
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
        </div>
        <Button type={"submit"} className={styles.button}>
          Prześlij link do resetu
        </Button>
        <Link href={"/sign-in"} className={styles.registerLink}>
          Powróć, aby się zalogować.
        </Link>
      </form>
      {loading && <Loader className={styles.loader} />}
    </>
  );
}

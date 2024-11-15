"use client";

import { FormEvent, useState } from "react";
import { forgotPassword } from "@/api/controllers/auth";
import styles from "@/app/(auth)/auth.module.scss";
import Link from "next/link";
import { Input } from "@/common/components";
import Button from "@/common/components/Button/Button";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function onForgotPassword(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await forgotPassword({ email }, router);
      router.push("/check-email");
    } catch {
      setError("Nieprawidłowy email");
    }
  }

  return (
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
        Powróć, aby się zalogować!
      </Link>
    </form>
  );
}

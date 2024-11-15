"use client";

import { FormEvent, useState } from "react";
import { register } from "@/api/auth";
import styles from "@/app/(auth)/auth.module.scss";
import Link from "next/link";
import { Input } from "@/common/components";
import Button from "@/common/components/Button/Button";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function onRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await register({ email: email, password: password });
  }

  return (
    <form onSubmit={onRegister} className={styles.form}>
      <h1 className={styles.headerText}>Tworzenie konta</h1>
      <div className={styles.inputContainer}>
        <Input
          value={email}
          name={"email"}
          type="email"
          pattern="[^@]+@[^@]+\.[a-zA-Z]{2,6}"
          errorMessage={"To nie jest mail"}
          onChange={(e) => {
            setEmail(e.target.value);
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
  );
}

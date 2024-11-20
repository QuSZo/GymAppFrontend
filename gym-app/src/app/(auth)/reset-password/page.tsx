"use client";

import { FormEvent, useState } from "react";
import { resetPassword } from "@/api/controllers/auth";
import styles from "@/app/(auth)/auth.module.scss";
import { Input } from "@/common/components";
import Button from "@/common/components/Button/Button";
import { useRouter } from "next/navigation";
import Loader from "@/common/components/Loader/Loader";

type WorkoutForDatePageProps = {
  searchParams: {
    token: string;
    email: string;
  };
};

export default function Page({ searchParams }: WorkoutForDatePageProps) {
  const [email, setEmail] = useState(searchParams.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onResetPassword(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    resetPassword({ token: searchParams.token, email: email, password: password }, router)
      .then(() => router.push("/reset-password-confirmation"))
      .finally(() => setLoading(false));
  }

  return (
    <>
      <form onSubmit={onResetPassword} className={styles.form}>
        <h1 className={styles.headerText}>Reset hasła</h1>
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
            disabled
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
            placeholder="Nowe hasło"
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
          Resetuj hasło
        </Button>
      </form>
      {loading && <Loader className={styles.loader} />}
    </>
  );
}

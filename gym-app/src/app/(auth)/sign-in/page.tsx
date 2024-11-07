"use client";

import Image from "next/image";
import styles from "../auth.module.scss";
import { Input } from "@/common/components";
import Button from "@/common/components/Button/Button";
import { FormEvent, useState } from "react";
import { signIn } from "@/api/auth";
import Link from "next/link";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onSignIn(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    signIn(email, password);
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href={"/gym-app/public"}>GYMAPP</Link>
      </div>
      <div className={styles.left}>
        <form onSubmit={onSignIn} className={styles.form}>
          <h1 className={styles.headerText}>Zaloguj się</h1>
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
              errorMessage={"Hasło nie może być puste"}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Hasło"
              className={styles.input}
              required
            />
            <div className={styles.passwordRecoveryLink}>
              <Link href={"/reset-password"}>Odzyskaj hasło</Link>
            </div>
          </div>
          <Button type={"submit"} className={styles.button}>
            Zaloguj się
          </Button>
          <Link href={"/register"} className={styles.registerLink}>
            Pierwszy raz w GymApp? Załóż konto!
          </Link>
        </form>
      </div>
      <div className={styles.imageWrapper}>
        <Image src="/assets/gym.jpg" alt="Gym photo" fill className={styles.image}></Image>
      </div>
    </div>
  );
}

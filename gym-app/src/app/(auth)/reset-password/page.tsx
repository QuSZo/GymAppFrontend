"use client";

import { FormEvent, useState } from "react";
import { resetPassword } from "@/api/auth";
import styles from "@/app/(auth)/auth.module.scss";
import Link from "next/link";
import { Input } from "@/common/components";
import Button from "@/common/components/Button/Button";
import Image from "next/image";

export default function ResetPassword() {
  const [email, setEmail] = useState("");

  function onRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    resetPassword(email);
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href={"/gym-app/public"}>GYMAPP</Link>
      </div>
      <div className={styles.left}>
        <form onSubmit={onRegister} className={styles.form}>
          <h1 className={styles.headerText}>Resetowanie hasła</h1>
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
          </div>
          <Button type={"submit"} className={styles.button}>
            Prześlij link do resetu
          </Button>
          <Link href={"/sign-in"} className={styles.registerLink}>
            Powróć, aby się zalogować!
          </Link>
        </form>
      </div>
      <div className={styles.imageWrapper}>
        <Image src="/assets/gym.jpg" alt="Gym photo" fill className={styles.image}></Image>
      </div>
    </div>
  );
}

// "use client";
//
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";
//
// export default function MainPage() {
//   const router = useRouter();
//   useEffect(() => {
//     function redirect() {
//       const today = new Date().toLocaleDateString("sv-SE");
//       router.push(`/workout/${today}`);
//     }
//
//     redirect();
//   }, []);
// }

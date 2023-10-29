import Image from "next/image";
import Link from "next/link";
import styles from "./app.module.scss";

export default function Home() {
  return (
    // <main className="flex min-h-screen flex-col items-center justify-between border-2 border-red-500">
    <main className="min-h-full border-2 border-red-500">
      <p>Main Page</p>
      {/* <Link href="/education">Education</Link>
      <Link href="/setting">Setting</Link> */}
    </main>
  );
}

import Link from "next/link";
import styles from "./education.module.scss";

export default function EducationLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className={styles.nav}>
        <Link href="/education/nouns" className={styles.nav_button}>
          <span>Nomen</span>
        </Link>
        <Link href="/education/nouns" className={styles.nav_button}>
          <span>Verben</span>
        </Link>
        <Link href="/education/nouns" className={styles.nav_button}>
          <span>Adjektive</span>
        </Link>
      </div>
      {children}
    </div>
  );
}

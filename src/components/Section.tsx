import { FC, ReactNode } from "react";
import styles from "./Section.module.css";

type SectionProps = {
  title: string;
  className?: string;
  children?: ReactNode;
};

const Section: FC<SectionProps> = ({ children, className, title }) => (
  <section className={`${styles.root} ${className}`}>
    <h2 className={styles.title}>{title}</h2>
    {children}
  </section>
);

export default Section;

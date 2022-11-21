import React from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.css"

export default function Header() {
  return (
    <header className={styles.container}>
      <span>youtube</span>
      <ul>
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/about">
          <li>About</li>
        </Link>
      </ul>
    </header>
  );
}
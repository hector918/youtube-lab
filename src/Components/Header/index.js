import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      youtube
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

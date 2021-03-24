import Link from "next/link";

import classes from "./button.module.css";

export default function button({ link, children }) {
  return (
    <Link href={link}>
      <a className={classes.btn}>{children}</a>
    </Link>
  );
}

import { Fragment } from "react";
import MainHeader from "./MainHeader";

export default function Layout({ children }) {
  return (
    <Fragment>
      <MainHeader />
      <main>{children}</main>
    </Fragment>
  );
}

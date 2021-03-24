import { Fragment } from "react";

import Button from "../ui/Button";
import ErrorAlert from "../ui/ErrorAlert";

export default function Alert({ alert, link, title }) {
  return (
    <Fragment>
      <ErrorAlert>
        <p>{alert}</p>
      </ErrorAlert>
      <div className="center">
        <Button link={link}>{title}</Button>
      </div>
    </Fragment>
  );
}

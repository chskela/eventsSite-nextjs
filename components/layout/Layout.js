import { Fragment, useContext } from "react";
import NotificationContext from "../../store/NotificationContext";
import Notification from "../ui/Notification";
import MainHeader from "./MainHeader";

export default function Layout({ children }) {
  const notificationCtx = useContext(NotificationContext);
  const activeNotification = notificationCtx.notification;

  return (
    <Fragment>
      <MainHeader />
      <main>{children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </Fragment>
  );
}

import { useEffect, useContext } from "react";
import NotificationContext from "../NotificationContext";

const Notification = () => {
  const { notificationState, notificationDispatch } =
    useContext(NotificationContext);

  useEffect(() => {
    if (notificationState) {
      const timer = setTimeout(() => {
        notificationDispatch({ type: "CLEAR" });
      }, 3000);
      return () => {
        clearTimeout(timer);
        notificationDispatch({ type: "CLEAR" });
      };
    }
  }, [notificationState, notificationDispatch]);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  if (notificationState) {
    return <div style={style}>{notificationState}</div>;
  } else {
    return null;
  }
};

export default Notification;

import { useReducer, createContext } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "NOTIFY":
      return `Anecdote ${action.payload} created`;
    case "VOTE":
      return `Anecdote ${action.payload} voted`;
    case "ERROR":
      return action.payload;
    case "CLEAR":
      return null;
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notificationState, notificationDispatch] = useReducer(
    notificationReducer,
    null
  );
  return (
    <NotificationContext.Provider
      value={{ notificationState, notificationDispatch }}
    >
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;

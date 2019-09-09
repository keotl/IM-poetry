import { User } from "../chat/Types";
import { createContext } from "react";

import * as React from "react";

export type UserStore = {
  getUser: (id: string) => User;
};

export const UserStoreContext = createContext<UserStore>({
  getUser: () => {
    /* empty */
  },
} as any);

export function UserStoreContextContainer(props: {
  users: User[];
  children: any;
}) {
  return (
    <UserStoreContext.Provider
      value={{
        getUser: (id: string) => props.users.find(u => u.id === id)!,
      }}
    >
      {props.children}
    </UserStoreContext.Provider>
  );
}

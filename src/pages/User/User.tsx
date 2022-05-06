import React, { useEffect } from "react";
import Layout from "src/components/Layout/Layout";
import ContentModel from "src/components/Content/ContentModel";
import { useAppStore } from "@project/store";

export interface IUserWording {
  table?: wording;
  page?: wording;
  type:any;
}

export interface IUserComponent {
  className?: string;
  wording: IUserWording;
  pageName?: string;
}

/**
 * User page component
 * @param {string} className            (Optional) Override default table className
 * @returns                             User react component
 */
const User: React.FC<IUserComponent> = ({ className, wording }) => {
  const {
    UserStore: {
      users,
      getUser,
      deleteUser,
      addUser,
      updateUser,
    },
  } = useAppStore();

  useEffect(() => {
  }, [users]);
  return (
    <Layout>
      <ContentModel
        tableSource={users}
        wording={wording}
        addItem={addUser}
        getItem={getUser}
        editItem={updateUser}
        deleteItem={deleteUser}
      />
    </Layout>
  );
};

export default User;

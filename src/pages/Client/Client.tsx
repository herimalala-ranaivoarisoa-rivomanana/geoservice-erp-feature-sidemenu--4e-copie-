import React, { useEffect } from "react";
import Layout from "src/components/Layout/Layout";
import ContentModel from "src/components/Content/ContentModel";
import { useAppStore } from "@project/store";

export interface IClientWording {
  table?: wording;
  page?: wording;
  type:any;
}

export interface IClientComponent {
  className?: string;
  wording: IClientWording;
  pageName?: string;
}

/**
 * Client page component
 * @param {string} className            (Optional) Override default table className
 * @returns                             Client react component
 */
const Client: React.FC<IClientComponent> = ({ className, wording }) => {
  const {
    ClientStore: {
      clients,
      getClient,
      deleteClient,
      addClient,
      updateClient,
      searchClient
    },
  } = useAppStore();

  useEffect(() => {
  }, [clients]);
  return (
    <Layout>
      <ContentModel
        tableSource={clients}
        wording={wording}
        addItem={addClient}
        getItem={getClient}
        editItem={updateClient}
        deleteItem={deleteClient}
        search={searchClient}
      />
    </Layout>
  );
};

export default Client;

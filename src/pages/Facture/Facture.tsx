import React from "react";
import Layout from "src/components/Layout/Layout";
import ContentModel from "src/components/Content/ContentModel";
import { useAppStore } from "@project/store";

export interface IFactureWording {
  table?: wording;
  page?: wording;
  type:any;
}

export interface IFactureComponent {
  className?: string;
  wording: IFactureWording;
  pageName?: string;
}

/**
 * Facture page component
 * @param {string} className            (Optional) Override default table className
 * @returns                             Facture react component
 */
const Facture: React.FC<IFactureComponent> = ({ className, wording }) => {
  const {
    FactureStore: {
      factures,
      getFacture,
      deleteFacture,
      addFacture,
      updateFacture,
      searchFacture,
    },
  } = useAppStore();
  const {
    ChauffeurStore: {
      chauffeurs,
    },
  } = useAppStore();

  const {
    MedecineStore: {
      medecines,
    },
  } = useAppStore();
  const {
    PharmacienStore: {
      pharmaciens,
    },
  } = useAppStore();
  const {
    ClientStore: {
      clients,
    },
  } = useAppStore();


  return (
    <Layout>
      <ContentModel
        tableSource={factures}
        wording={wording}
        addItem={addFacture}
        getItem={getFacture}
        editItem={updateFacture}
        deleteItem={deleteFacture}
        search={searchFacture}
        relatedTable={[{name:"chauffeurs",table:chauffeurs},{name:"medecines",table:medecines},{name:"pharmaciens",table:pharmaciens},{name:"clients",table:clients}]}
      />
    </Layout>
  );
};

export default Facture;

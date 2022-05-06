import React, { useEffect } from "react";
import Layout from "src/components/Layout/Layout";
import ContentModel from "src/components/Content/ContentModel";
import { useAppStore } from "@project/store";


export interface IChauffeurWording {
  table?: wording;
  page?: wording;
  type:any;
}

export interface IChauffeurComponent {
  className?: string;
  wording: IChauffeurWording;
  pageName?: string;
}

/**
 * Chauffeur page component
 * @param {string} className            (Optional) Override default table className
 * @returns                             Chauffeur react component
 */
const Chauffeur: React.FC<IChauffeurComponent> = ({ className, wording }) => {
  const {
    ChauffeurStore: {
      chauffeurs,
      getChauffeur,
      deleteChauffeur,
      addChauffeur,
      updateChauffeur,
      searchChauffeur
    },
  } = useAppStore();

  useEffect(() => {
  }, [chauffeurs]);
  return (
    <Layout>
      <ContentModel
        tableSource={chauffeurs}
        wording={wording}
        addItem={addChauffeur}
        getItem={getChauffeur}
        editItem={updateChauffeur}
        deleteItem={deleteChauffeur}
        search={searchChauffeur}
      />
    </Layout>
  );
};

export default Chauffeur;

import React from "react";
import Layout from "src/components/Layout/Layout";
import ContentModel from "src/components/Content/ContentModel";
import { useAppStore } from "@project/store";


export interface IPharmacienWording {
  table?: wording;
  page?: wording;
  type:any;
}

export interface IPharmacienComponent {
  className?: string;
  wording: IPharmacienWording;
  pageName?: string;
}

/**
 * Pharmacien page component
 * @param {string} className            (Optional) Override default table className
 * @returns                             Pharmacien react component
 */
const Pharmacien: React.FC<IPharmacienComponent> = ({ className, wording }) => {
  const {
    PharmacienStore: {
      pharmaciens,
      getPharmacien,
      deletePharmacien,
      addPharmacien,
      updatePharmacien,
    },
  } = useAppStore();

  return (
    <Layout>
      <ContentModel
        tableSource={pharmaciens}
        wording={wording}
        addItem={addPharmacien}
        getItem={getPharmacien}
        editItem={updatePharmacien}
        deleteItem={deletePharmacien}
      />
    </Layout>
  );
};

export default Pharmacien;

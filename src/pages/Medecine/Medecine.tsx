import Layout from "src/components/Layout/Layout";
import ContentModel from "src/components/Content/ContentModel";
import { useAppStore } from "@project/store";


export interface IMedecineType{
  id:string,
  name:string,
  price:number
}

export interface IMedecineWording {
  table?: wording;
  page?: wording;
  type:IMedecineType
}

export interface IMedecineComponent {
  className?: string;
  wording: IMedecineWording;
  pageName?: string;
}

/**
 * Medecine page component
 * @param {string} className            (Optional) Override default table className
 * @returns                             Medecine react component
 */
const Medecine: React.FC<IMedecineComponent> = ({ className, wording }) => {
  const {
    MedecineStore: {
      medecines,
      getMedecine,
      deleteMedecine,
      addMedecine,
      updateMedecine,
    },
  } = useAppStore();

  return (
    <Layout>
      <ContentModel
        tableSource={medecines}
        wording={wording}
        addItem={addMedecine}
        getItem={getMedecine}
        editItem={updateMedecine}
        deleteItem={deleteMedecine}
      />
    </Layout>
  );
};

export default Medecine;

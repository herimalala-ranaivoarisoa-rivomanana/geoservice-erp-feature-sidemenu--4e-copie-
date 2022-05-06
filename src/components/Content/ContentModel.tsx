import List from "src/components/Content/List/List";
import styled from "styled-components";

import {IChauffeurWording,IClientWording,IFactureWording,IMedecineWording,IPharmacienWording, IUserWording } from "@project/pages";
import { IChauffeur } from "src/store/chauffeur/chauffeur.store";
import { IFacture } from "src/store/facture/facture.store";
import { IClient } from "src/store/client/client.store";
import { IMedecine } from "src/store/medecine/medecine.store";
import { IPharmacien } from "src/store/pharmacien/pharmacien.store";
import { IUser } from "src/store/user/user.store";

export interface IContentModel {
  className?: string;
  wording:  IChauffeurWording | IUserWording | IClientWording | IFactureWording | IMedecineWording | IPharmacienWording;
  tableSource: IChauffeur[] | IUser[] |IFacture[] | IClient[]|IMedecine[]|IPharmacien[];
  addItem?: any;
  getItem?: any;
  editItem?: any;
  deleteItem?: any;
  search?:any;
  relatedTable?:any[];

}

/**
 * Chauffeur page component
 * @param {string} className            (Optional) Override default table className
 * @returns                             Chauffeur react component
 */
const ContentModel: React.FC<IContentModel> = ({
  tableSource,
  className,
  wording,
  addItem,
  getItem,
  editItem,
  deleteItem,
  search,
  relatedTable,

}) => {
  return (
    <>
      <PageName className="page__name">{wording.page}</PageName>
      <List
        wording={wording}
        source={tableSource}
        addItem={addItem}
        getItem={getItem}
        editItem={editItem}
        deleteItem={deleteItem}
        search={search}
        relatedTable={relatedTable}
      />
    </>
  );
};

export default ContentModel;

const PageName = styled.div`
  &.page__name {
    margin-top: 12px;
    padding-left: 20px;
    width: 100%;
    height: 57px;
    display: flex;
    align-items: center;
    font-family: Poppins;
    font-size: 24px;
    font-weight: 700;
    line-height: 36px;
    letter-spacing: 0em;
    text-align: left;
  }
`;

const TableName = styled.div`
  &.table__name {
    padding-left: 20px;
    width: 100%;
    height: 57px;
    display: flex;
    align-items: center;
    font-family: Poppins;
    font-size: 18px;
    font-weight: 700;
    line-height: 27px;
    letter-spacing: 0em;
    text-align: left;
    margin-bottom: 30px;
  }
`;

import React, { useState } from "react";

import styled from "styled-components";

import { Modal } from "../Modal/Modal";

import { useModal } from "../Modal/useModal";

import {
  IChauffeurWording,
  IUserWording,
  IClientWording,
  IFactureWording,
  IMedecineWording,
  IPharmacienWording,
} from "@project/pages";

import Form from "../Form/Form";
import { IChauffeur } from "src/store/chauffeur/chauffeur.store";
import { IUser } from "src/store/user/user.store";
import { IFacture } from "src/store/facture/facture.store";
import { IClient } from "src/store/client/client.store";
import { IMedecine } from "src/store/medecine/medecine.store";
import { IPharmacien } from "src/store/pharmacien/pharmacien.store";
import Button from "src/components/Layout/buttons/Button";

export interface IProps {
  wording:
    | IChauffeurWording
    | IUserWording
    | IClientWording
    | IFactureWording
    | IMedecineWording
    | IPharmacienWording;
  source:
    | IChauffeur[]
    | IUser[]
    | IFacture[]
    | IClient[]
    | IMedecine[]
    | IPharmacien[];
  className?: string;
  toggleVisibility?: any;
  setMode?: any;
  addItem?: any;
  getItem?: any;
  editItem?: any;
  deleteItem?: any;
  search?: any;
  parentRow?: any;
  parentKey?: any;
  relatedTable?: any;
}

/**
 * TableViewer page component
 * @param {string} className            (Optional) Override default class
 * @returns                             Home react component
 */
const List: React.FC<IProps> = ({
  wording,
  source,
  className,
  toggleVisibility,
  setMode,
  addItem,
  getItem,
  editItem,
  deleteItem,
  search,
  parentRow,
  parentKey,
  relatedTable,
}) => {
  const [modalIsVisible, toggleModalVisibility] = useModal();
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(
    null
  );
  const [modalTitle, setModalTitle] = useState("");
  const [searchText, setSearchText] = useState("");

  const showDetails = (parentRow: any, parentKey: any, content: any) => {
    setModalTitle("Details");
    setModalContent(
      <List
        toggleVisibility={toggleModalVisibility}
        wording={wording}
        source={content}
        setMode={setMode}
        addItem={addItem}
        getItem={getItem}
        editItem={editItem}
        deleteItem={deleteItem}
        search={search}
        parentRow={parentRow}
        parentKey={parentKey}
        relatedTable={relatedTable}
      />
    );
    toggleModalVisibility();
  };

  const edit = (parentRow: any, parentKey: any, content: any) => {
    setModalTitle(
      `Mise à jour    ${
        !parentRow
          ? wording.table
            ? wording.table.toString().slice(0, -1)
            : ""
          : parentKey.toString().slice(0, -1)
      }`
    );
    setModalContent(
      <Form
        toggleModalVisibility={toggleModalVisibility}
        wording={wording}
        addMethod={addItem}
        updateMethod={editItem}
        mode={"edit"}
        row={content}
        source={source}
        path={""}
        parentRow={parentRow}
        parentKey={parentKey}
        relatedTable={relatedTable}
      />
    );
    toggleModalVisibility();
  };

  const add = (parentRow: any, parentKey: any) => {
    setModalTitle(
      `Ajout   ${
        !parentRow
          ? wording.table
            ? wording.table.toString().slice(0, -1)
            : ""
          : parentKey.toString().slice(0, -1)
      }`
    );
    setModalContent(
      <Form
        toggleModalVisibility={toggleModalVisibility}
        wording={wording}
        addMethod={addItem}
        updateMethod={editItem}
        mode={"add"}
        row={null}
        source={source}
        path={""}
        parentRow={parentRow}
        parentKey={parentKey}
        relatedTable={relatedTable}
      />
    );
    toggleModalVisibility();
  };

  const del = (parentRow: any, parentKey: any, content: any) => {
    if (parentRow && parentKey) {
      source.splice(source.indexOf(content), 1);
      console.log(source);
      parentRow[parentKey] = source;
      editItem(parentRow);
    } else deleteItem(content);
  };

  function displayArray(arr: any, className: string = "table") {
    let set: any = new Set();
    /*     if (!!arr) {
      arr !== [] &&
        arr.map((line: any) => {
          return Object.keys(line).map((col: any) => {
            return set.add(col);
          });
        });
    } */
    if (!parentRow) {
      Object.keys(wording.type).forEach((key: any) => {
        set.add(key);
      });
    } else {
      Object.keys(wording.type[parentKey][0]).forEach((key: any) => {
        set.add(key);
      });
    }
    const keys = Array.from(set);

    return (
      <Table className={className}>
        <thead>
          <tr>
            {!!keys &&
              Array.from(keys).map((key: any) =>
                !key.endsWith("Id") ||
                (key.endsWith("Id") && !keys.includes(key.slice(0, -2))) ? (
                  key.endsWith("Id") ? (
                    <th key={key}>
                      {(key.charAt(0).toUpperCase() + key.slice(1)).slice(
                        0,
                        -2
                      )}
                    </th>
                  ) : (
                    <th key={key}>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </th>
                  )
                ) : null
              )}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {!!arr &&
            arr.map((row: any, indexOfRow: number) => {
           
              return (
                <tr key={indexOfRow}>
                  {Array.from(keys).map((ObjectKey: any, indexOfColumn) =>
                    !ObjectKey.endsWith("Id") ||
                    (ObjectKey.endsWith("Id") &&
                      !keys.includes(ObjectKey.slice(0, -2))) ? (
                      ObjectKey.endsWith("Id") ? (
                        <td key={indexOfColumn}>
                          {
                            parentRow?relatedTable
                              .find(
                                (table: any) =>
                                  table.name === ObjectKey.slice(0, -2) + "s"
                              )
                              .table.find(
                                (item: any) => item.id === row[ObjectKey]
                              )?.name:row[ObjectKey.slice(0, -2)].name
                          } 
                        </td>
                      ) : (
                        <td key={indexOfColumn}>
                          {typeof row[ObjectKey] !== "object" ? (
                            row[ObjectKey]
                          ) : keys.includes(ObjectKey + "Id") ? (
                            row[ObjectKey].name
                          ) : (
                            <>
                              <button
                                onClick={() => {
                                  if (row[ObjectKey] !== [])
                                    showDetails(row, ObjectKey, row[ObjectKey]);
                                }}
                              >
                                Details
                              </button>
                            </>
                          )}
                        </td>
                      )
                    ) : null
                  )}
                  <td>
                    <button onClick={() => edit(parentRow, parentKey, row)}>
                      Edit
                    </button>
                    <button onClick={() => del(parentRow, parentKey, row)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    );
  }
  return (
    <PageWrapper>
      <ContentWrapper className="content__wrapper">
        <ListHeader className="list__header">
          <div className="list__header__button">
            <Button
              className="button__secondary"
              text="Ajouter"
              action={() => add(parentRow, parentKey)}
            />
          </div>
          <div className="list__header__bottom">
            <div className="list__header__title">
              {`Liste des   ${
                !parentRow
                  ? wording.table
                    ? wording.table.toString()
                    : ""
                  : parentKey.toString()
              }`}
            </div>
            <input
              className="toolbar__search"
              placeholder="Rechercher"
              value={searchText}
              onChange={(e) =>{ setSearchText(e.target.value!);search({searchText:e.target.value!.trim()})}}
            ></input>
          </div>
        </ListHeader>
        {displayArray(source, className)}
      </ContentWrapper>
      <Modal
        title={modalTitle}
        isVisible={modalIsVisible}
        toggleVisibility={toggleModalVisibility}
        modalContent={modalContent}
      />
    </PageWrapper>
  );
};

export default List;

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ListHeader = styled.div`
  width: 100%;
  &.list__header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .list__header__button {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
    }
    .list__header__bottom {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      .toolbar__search {
        width: 32.43vw;
        max-width: 467px;
        height: 35px;
        margin-bottom: 10px;
      }
      .list__header__title {
        font-family: Poppins;
        font-size: 18px;
        font-weight: 700;
        line-height: 27px;
        letter-spacing: 0em;
        text-align: left;
      }
    }
  }
`;
const ContentWrapper = styled.div`
  &.content__wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    padding-left: 20px;
    padding-right: 20px;
  }
`;

const Table = styled.table`
  width: 100%;
  table-layout: fixed;
  td {
    height: 40px;
    text-align: center;
    button {
      border: 1px solid #61666b;
      border-radius: 3px;
      width: 70px;
      height: 20px;
      padding: 0px;
      margin: 10px;
      cursor: pointer;
    }
  }
  &.table {
    th {
      height: 57px;
      background-color: #303a43;
      color: #ffffff;
    }
    tr:nth-child(even) {
      background: #b4b1b1;
    }
    tr:nth-child(odd) {
      background: #e5e5e5;
    }
  }
  &.child {
    th {
      height: 57px;
      background-color: #303a43;
      color: #ffffff;
    }
    tr:nth-child(even) {
      background: #c8dcef;
    }
    tr:nth-child(odd) {
      background: #e5e5e5;
    }
  }
`;

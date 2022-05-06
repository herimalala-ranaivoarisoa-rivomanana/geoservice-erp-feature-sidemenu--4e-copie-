import React, { useEffect, useState } from "react";

import styled from "styled-components";
import {
  IChauffeurWording,
  IUserWording,
  IClientWording,
  IFactureWording,
  IMedecineWording,
  IPharmacienWording,
} from "@project/pages";

import { IChauffeur } from "src/store/chauffeur/chauffeur.store";
import { IFacture } from "src/store/facture/facture.store";
import { IClient } from "src/store/client/client.store";
import { IMedecine } from "src/store/medecine/medecine.store";
import { IPharmacien } from "src/store/pharmacien/pharmacien.store";
import Button from "src/components/Layout/buttons/Button";
import { IUser } from "src/store/user/user.store";

export interface IProps {
  className?: string;
  wording:
    | IChauffeurWording
    | IUserWording
    | IClientWording
    | IFactureWording
    | IMedecineWording
    | IPharmacienWording;
  toggleModalVisibility: any;
  source:
    | IChauffeur[]
    | IUser[]
    | IFacture[]
    | IClient[]
    | IMedecine[]
    | IPharmacien[];
  row?: any;
  addMethod: any;
  updateMethod: any;
  mode: string;
  path: any;
  parentRow?: any;
  parentKey?: any;
  relatedTable?: any;
}
/**
 * TableViewer page component
 * @param {string} className            Override default class
 * @returns                             Home react component
 */
const Form: React.FC<IProps> = ({
  className,
  wording,
  toggleModalVisibility,
  source,
  row = null,
  addMethod,
  updateMethod,
  mode,
  path,
  parentRow,
  parentKey,
  relatedTable,
}) => {
  const [newRow, setNewRow] = useState<any>();
  const [keys, setKeys] = useState<any[]>([]);
  const [rowIndex, setRowIndex] = useState(-1);
  const [relatedTableNames, setRelatedTableNames] = useState<any[]>([]);

  const handleUpdate = (rowInput: any) => {
    if (parentRow && parentKey) {
      source.splice(rowIndex, 1, rowInput);
      parentRow[parentKey] = source;
      updateMethod(parentRow);
    } else updateMethod(rowInput);
    toggleModalVisibility();
  };

  const handleAdd = (rowInput: any) => {
    console.log(rowInput);
    source.push(rowInput);
    if (parentRow && parentKey) {
      parentRow[parentKey] = source;
      updateMethod(parentRow);
    } else addMethod(rowInput);
    toggleModalVisibility();
  };

  useEffect(() => {
    if (row) {
      setRowIndex(source.indexOf(row));
      setNewRow(row);
    }
  }, [source, parentRow, parentKey, row, keys]);

  useEffect(() => {
    if (!parentRow) {
      let set: any = new Set();
      Object.keys(wording.type).forEach((tableCol) => {
        set.add(tableCol);
        if (typeof wording["type"][tableCol] === "object")
          setNewRow(
            Object.assign({}, newRow, {
              [tableCol]: [],
            })
          );
        set.add(tableCol);
      });
      setKeys(Array.from(set));
    } else {
      let set: any = new Set();
      Object.keys(wording.type[parentKey][0]).forEach((key: any) => {
        setNewRow(
          Object.assign({}, newRow, {
            [key]: [],
          })
        );
        set.add(key);
      });
      setKeys(Array.from(set));
    }
    if (relatedTable && relatedTable !== []) {
      let array: any[] = [];
      relatedTable.map((object: any) => array.push(object.name));
      setRelatedTableNames(array);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FormContainer className="form">
      <div className="form__nestedObject__add__button">
        {parentRow && (
          <Button
            className="button__primary"
            text="Ajouter"
            action={() => null}
          />
        )}
      </div>

      <FormContent className="form__content">
        {!!keys &&
          Array.from(keys).map(
            (ObjectKey: any, indexOfColumn: number) =>
              (!ObjectKey.endsWith("Id") ||
                (ObjectKey.endsWith("Id") &&
                  relatedTableNames.includes(ObjectKey.slice(0, -2) + "s"))) &&
              typeof wording["type"][ObjectKey] !== "object" &&
             ( ObjectKey !== "id"||ObjectKey === "id"&&mode==="add") && (
                <Row className="form__row" key={ObjectKey}>
                  <label>
                    {relatedTableNames.includes(ObjectKey.slice(0, -2) + "s")
                      ? ObjectKey.slice(0, -2).charAt(0).toUpperCase() +
                        ObjectKey.slice(0, -2).slice(1)
                      : ObjectKey.charAt(0).toUpperCase() + ObjectKey.slice(1)}
                    :{" "}
                  </label>

                  {mode === "add" ? (
                    !relatedTableNames.includes(
                      ObjectKey.slice(0, -2) + "s"
                    ) ? (
                      <input
                        type={"text"}
                        onChange={(e) =>
                          setNewRow(
                            Object.assign({}, newRow, {
                              [ObjectKey]: e.target.value,
                            })
                          )
                        }
                        placeholder={
                          ObjectKey.charAt(0).toUpperCase() + ObjectKey.slice(1)
                        }
                      />
                    ) : (
                      <select
                        onChange={(e) => {
                          setNewRow(
                            Object.assign({}, newRow, {
                              [ObjectKey]: e.target.value,
                            })
                          );
                        }}
                      >
                        <option>---Select---</option>
                        {relatedTable
                          .find(
                            (table: any) =>
                              table.name === ObjectKey.slice(0, -2) + "s"
                          )
                          .table.map((item: any) => {
                            return (
                              <option key={item.id} value={item.id}>
                                {item.name}
                              </option>
                            );
                          })}
                      </select>
                    )
                  ) : typeof row[ObjectKey] !== "object" ? (
                    <input
                      disabled={
                        mode === "edit" &&
                        ObjectKey &&
                        ObjectKey.toLowerCase().endsWith("id")
                      }
                      defaultValue={
                        ObjectKey && ObjectKey.endsWith("Id")
                          ? parentRow
                            ? relatedTable
                                .find(
                                  (table: any) =>
                                    table.name === ObjectKey.slice(0, -2) + "s"
                                )
                                .table.find(
                                  (item: any) => item.id === row[ObjectKey]
                                )?.name
                            : row[ObjectKey.slice(0, -2)].name
                          : row[ObjectKey]
                      }
                      onChange={(e) =>
                        setNewRow(
                          Object.assign({}, newRow, {
                            [ObjectKey]: e.target.value,
                          })
                        )
                      }
                      placeholder={
                        ObjectKey.charAt(0).toUpperCase() + ObjectKey.slice(1)
                      }
                    />
                  ) : (
                    <button>{`Add new ${ObjectKey}`}</button>
                  )}
                </Row>
              )
          )}
      </FormContent>
      <ButtonGroup className="button__group">
        <Button className="button__secondary" text={"Annuler"} action={()=>toggleModalVisibility()}/>
        <div className="spacer" />
        <Button
          className="button__primary"
          text={mode === "add" ? `Sauvegarder` : `  Sauvegarder  `}
          action={() =>
            mode === "add"
              ? handleAdd(newRow)
              : mode === "edit"
              ? handleUpdate(newRow)
              : null
          }
        />
      </ButtonGroup>
    </FormContainer>
  );
};

export default Form;

const FormContainer = styled.div`
  &.form {
    position: relative;
    z-index: 1000;
    top: 0;
    left: 0;
    width: calc(100% + 10px);
    height: 100%;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    .form__nestedObject__add__button {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
    }
  }
`;
const FormContent = styled.div`
  width: 100%;
  .form__content {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
`;

const Row = styled.div`
  &.form__row {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    font-family: Poppins;
    font-size: 18px;
    font-weight: 400;
    line-height: 27px;
    letter-spacing: 0em;
    text-align: left;
    label {
      width: 150px;
      margin-bottom: 10px;
    }
    & input {
      padding-left: 8px;
      width: 100%;
      min-height: 30px;
      height: 45px;
      margin-bottom: 10px;
    }
    & option {
      padding-left: 8px;
      width: 100%;
      min-height: 30px;
      height: 45px;
      margin-bottom: 10px;
    }
    & select {
      padding-left: 8px;
      width: 100%;
      min-height: 30px;
      height: 45px;
      margin-bottom: 10px;
    }
  }
`;

const ButtonGroup = styled.div`
  &.button__group {
    position: absolute;
    bottom: 0;
    left:0;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    .spacer {
      width: 10px;
    }
  }
`;
/* 
const Button = styled.div`
    height: 37px;
    width: 116px;
    padding: 10px;
    border-radius: 5px;
    margin-right:10px;
    display: flex;
    justify-content: center;
    align-items: center;
  &.button__primary {
    background: rgba(48, 58, 67, 1);
    background: linear-gradient(to right, #61666b 50%, #303a43 50%);
    background-size: 200% 100%;
    background-position: right bottom;
    transition: all 0.5s ease-out;
    cursor: pointer;
    &:hover {
      background-position: left bottom;
    }
    .text {
      font-family: Poppins;
      font-size: 15px;
      font-weight: 700;
      line-height: 23px;
      letter-spacing: 0em;
      text-align: center;
      color: #e5e5e5;
      transition: all 0.6s ease-out;
      display: block;
    }
    .text:hover {
      color: #e5e5e5;
    }
  }
  &.button__secondary {
    border: 1px solid rgba(48, 58, 67, 1);
    background:#FFFFFF;
    background: linear-gradient(to right, #61666b 50%, #FFFFFF 50%);
    background-size: 200% 100%;
    background-position: right bottom;
    transition: all 0.5s ease-out;
    cursor: pointer;
    &:hover {
      background-position: left bottom;
    }
    .text {
      font-family: Poppins;
      font-size: 15px;
      font-weight: 700;
      line-height: 23px;
      letter-spacing: 0em;
      text-align: center;
      color:rgba(48, 58, 67, 1);

      transition: all 0.6s ease-out;
      display: block;
    }
    .text:hover {
      color:rgba(48, 58, 67, 1);
    }
  }
`; */

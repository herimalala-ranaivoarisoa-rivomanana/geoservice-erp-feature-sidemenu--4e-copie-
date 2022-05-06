import React from "react";
import { FactureService, MedecineService } from "@project/services";
import { IChauffeur } from "../chauffeur/chauffeur.store";
import { IPharmacien } from "../pharmacien/pharmacien.store";
import { IClient } from "../client/client.store";


export interface IDetails {
  medecineId: string;
  quantity: number;
}

export interface IFacture {
  factureId: string;
  chauffeur: IChauffeur;
  pharmacien: IPharmacien;
  client: IClient;
  date: Date;
  details: IDetails[];
}

export interface IFactureStore {
  factures: any;
  getFacture: (facture: IFacture) => void;
  deleteFacture: (facture: IFacture) => void;
  addFacture: (facture: IFacture) => void;
  updateFacture: (facture: IFacture) => void;
  searchFacture: (text: any) => void;
}

const useFactureStore = () => {
  const [factures, setFacture] = React.useState<IFacture[]>([]);

  const updateFacture = (data: IFacture) => {
    FactureService.UpdateFacture(data)
      .then((result) => {
        return setFacture(result);
      })
      .catch((err: any) => console.log("Update failed", err));
  };

  const getFacture = (data?: IFacture) => {
    FactureService.GetFacture(data)
      .then((result) => {
        return setFacture(result);
      })
      .catch((err: any) => console.log("Update failed", err));
  };
  const searchFacture = (data: object) => {
    let setResult = new Set<IFacture>();
    let searchObject = { searchText: "" };
    searchObject = Object.assign({}, searchObject, data);
    FactureService.GetFacture()
      .then((result) => {
        result.map((facture: IFacture) =>
          Object.values(facture).forEach((value: string | object) => {
            if (value.toString().indexOf(searchObject.searchText) > -1) setResult.add(facture);
            else if (typeof value === "object") {
              Object.values(value)
                .filter((el) => Object.keys(el).length > 0)
                .forEach((child: any) => {
                  if (child.medecineId) {
                    MedecineService.GetMedecine({ id: child.medecineId })
                      .then((medecineResult) => {
                        Object.values(medecineResult).forEach((val: string) => {
                          if (val.toString().indexOf(searchObject.searchText) > -1)
                          setResult.add(facture);
                            return setFacture(Array.from(setResult));
                        });
                      })
                      .catch((err: any) => console.log("Update failed", err));
                  }
                  Object.values(child).forEach((childValue: any) => {
                    if (childValue.toString().indexOf(searchObject.searchText) > -1)
                    setResult.add(facture);
                  });
                });
            }
          })
        );
        return setFacture(Array.from(setResult));
      })
      .catch((err: any) => console.log("Update failed", err));
  };

  const deleteFacture = (data: IFacture) => {
    FactureService.DeleteFacture(data)
      .then((result) => {
        return setFacture(result);
      })
      .catch((err: any) => console.log("Update failed", err));
  };

  const addFacture = (data: IFacture) => {
    FactureService.SetFacture(data)
      .then((result) => {
        return setFacture(result);
      })
      .catch((err: any) => console.log("Add failed", err));
  };

  React.useEffect(() => {
    // init google service auth plugin
    FactureService.GetFacture()
      .then((result) => {
        setFacture(result);
      })
      .catch((err: any) => console.log("Failed getting factures list", err));
  }, []);

  return {
    factures,
    getFacture,
    deleteFacture,
    addFacture,
    updateFacture,
    searchFacture,
  } as IFactureStore;
};

export default useFactureStore;

import React from 'react';
import { ChauffeurService } from '@project/services';

export interface IChauffeur {
  chauffeurId: string,
  name:string,
  cin:string,
  adresse:string,
  téléphone:string,
}

export interface IChauffeurStore {
  chauffeurs: IChauffeur[],
  getChauffeur: (chaufeur:IChauffeur) => void,
  deleteChauffeur: (chaufeur:IChauffeur) => void,
  addChauffeur:(chaufeur: IChauffeur) => void,
  updateChauffeur: (chaufeur: IChauffeur) => void,
  searchChauffeur:(text:string)=>void
}

const useChauffeurStore = () => {
  const [chauffeurs, setChauffeur] = React.useState<IChauffeur[]>([]);
  
  const updateChauffeur = (data: IChauffeur) => {
    ChauffeurService.UpdateChauffeur(data)
    .then((result) => {
      return setChauffeur(result)
    })
    .catch((err: any) => console.log('Update failed', err));
  }

  const getChauffeur = (data?: IChauffeur) => {
    ChauffeurService.GetChauffeur(data)
    .then((result) => {
      return  setChauffeur(result)
    })
    .catch((err: any) => console.log('Update failed', err));
  }

  const searchChauffeur = (text: string) => {
    ChauffeurService.SearchChauffeur(text)
    .then((result) => {
      return  setChauffeur(result)
    })
    .catch((err: any) => console.log('Update failed', err));
  }

  const deleteChauffeur = (data: IChauffeur) => {
    ChauffeurService.DeleteChauffeur(data)
    .then((result) => {
      return setChauffeur(result)
    })
    .catch((err: any) => console.log('delete failed', err));
  }

  const addChauffeur = (data: IChauffeur) => {
    ChauffeurService.AddChauffeur(data)
      .then((result) => {
        return setChauffeur(result)
      })
      .catch((err: any) => console.log('Add failed', err));
  }

  React.useEffect(() => {
    ChauffeurService.GetChauffeur()
      .then((result) => {
       setChauffeur(result);
      })
      .catch((err: any) => console.log('Ffailed getting chauffeurs list', err));
  }, []);

  return {
    chauffeurs,
    getChauffeur,
    deleteChauffeur,
    addChauffeur,
    updateChauffeur,
    searchChauffeur,
  } as IChauffeurStore;
}

export default useChauffeurStore;
import React from 'react';
import { MedecineService } from '@project/services';
export interface IMedecine {
  medecineId: string,
  name:string,
  price:number,
}

export interface IMedecineStore {
  medecines: IMedecine[],
  getMedecine:(medecine: IMedecine) => void,
  deleteMedecine:(medecine: IMedecine) => void,
  addMedecine:(medecine: IMedecine) => void,
  updateMedecine: (medecine: IMedecine) => void,
}

const useMedecineStore = () => {
  const [medecines, setMedecine] = React.useState<IMedecine[]>([]);
  
  const updateMedecine = (data: IMedecine) => {
    MedecineService.UpdateMedecine(data)
    .then((result) => {
      return setMedecine(result)
    })
    .catch((err: any) => console.log('Update failed', err));
  }

  
  const getMedecine = (data: IMedecine) => {
    MedecineService.GetMedecine(data)
    .then((result) => {
      return setMedecine(result)
    })
    .catch((err: any) => console.log('Update failed', err));
  }

  const deleteMedecine = (data: IMedecine) => {
    MedecineService.DeleteMedecine(data)
    .then((result) => {
      return setMedecine(result)
    })
    .catch((err: any) => console.log('Update failed', err));
  }


  const addMedecine = (data: IMedecine) => {
    MedecineService.SetMedecine(data)
      .then((result) => {
        return setMedecine(result)
      })
      .catch((err: any) => console.log('Add failed', err));
  }

  React.useEffect(() => {
    // init google service auth plugin
    MedecineService.GetMedecine()
      .then((result) => {
       setMedecine(result);
      })
      .catch((err: any) => console.log('Failed getting medecines list', err));
  }, []);

  return {
    medecines,
    getMedecine,
    deleteMedecine,
    addMedecine,
    updateMedecine,
  } as IMedecineStore;
}

export default useMedecineStore;
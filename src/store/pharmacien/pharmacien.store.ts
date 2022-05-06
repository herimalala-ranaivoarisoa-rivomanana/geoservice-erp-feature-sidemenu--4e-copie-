import React from 'react';
import { PharmacienService } from '@project/services';




export interface ILocation{
  lat:number,
  lng:number
}

export interface IPharmacien {
  pharmacienId: string,
  name:string,
  address:string
  telephone:string,
  addressLatLng:ILocation,
}

export interface IPharmacienStore {
  pharmaciens: IPharmacien[],
  getPharmacien:(pharmacien: IPharmacien) => void,
  deletePharmacien:(pharmacien: IPharmacien) => void,
  addPharmacien:(pharmacien: IPharmacien) => void,
  updatePharmacien: (pharmacien: IPharmacien) => void,
}

const usePharmacienStore = () => {
  const [pharmaciens, setPharmacien] = React.useState<IPharmacien[]>([]);
  
  const updatePharmacien = (data: IPharmacien) => {
    PharmacienService.UpdatePharmacien(data)
    .then((result) => {
      return setPharmacien(result)
    })
    .catch((err: any) => console.log('Update failed', err));
  }

  
  const getPharmacien = (data: IPharmacien) => {
    PharmacienService.GetPharmacien(data)
    .then((result) => {
      return setPharmacien(result)
    })
    .catch((err: any) => console.log('Update failed', err));
  }

  const deletePharmacien = (data: IPharmacien) => {
    PharmacienService.DeletePharmacien(data)
    .then((result) => {
      return setPharmacien(result)
    })
    .catch((err: any) => console.log('Update failed', err));
  }


  const addPharmacien = (data: IPharmacien) => {
    PharmacienService.SetPharmacien(data)
      .then((result) => {
        return setPharmacien(result)
      })
      .catch((err: any) => console.log('Add failed', err));
  }

  React.useEffect(() => {
    // init google service auth plugin
    PharmacienService.GetPharmacien()
      .then((result) => {
       setPharmacien(result);
      })
      .catch((err: any) => console.log('Failed getting pharmaciens list', err));
  }, []);

  return {
    pharmaciens,
    getPharmacien,
    deletePharmacien,
    addPharmacien,
    updatePharmacien,
  } as IPharmacienStore;
}

export default usePharmacienStore;
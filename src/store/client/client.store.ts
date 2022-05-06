import React from 'react';
import { ClientService } from '@project/services';

export interface IClient {
  clientId: string,
  name:string,
  cin:string,
  adresse:string,
  téléphone:string,
}

export interface IClientStore {
  clients: IClient[],
  getClient: (client:IClient) => void,
  deleteClient: (client:IClient) => void,
  addClient:(client: IClient) => void,
  updateClient: (client: IClient) => void,
  searchClient: (text: string) => void
}

const useClientStore = () => {
  const [clients, setClient] = React.useState<IClient[]>([]);
  
  const updateClient = (data: IClient) => {
    ClientService.UpdateClient(data)
    .then((result) => {
      return setClient(result)
    })
    .catch((err: any) => console.log('Update failed', err));
  }

  const getClient = (data?: IClient) => {
    ClientService.GetClient(data)
    .then((result) => {
      return  setClient(result)
    })
    .catch((err: any) => console.log('Update failed', err));
  }

  const searchClient = (text: string) => {
    ClientService.SearchClient(text)
    .then((result) => {
      return  setClient(result)
    })
    .catch((err: any) => console.log('Update failed', err));
  }

  const deleteClient = (data: IClient) => {
    ClientService.DeleteClient(data)
    .then((result) => {
      return setClient(result)
    })
    .catch((err: any) => console.log('delete failed', err));
  }

  const addClient = (data: IClient) => {
    ClientService.AddClient(data)
      .then((result) => {
        return setClient(result)
      })
      .catch((err: any) => console.log('Add failed', err));
  }

  React.useEffect(() => {
    ClientService.GetClient()
      .then((result) => {
       setClient(result);
      })
      .catch((err: any) => console.log('Ffailed getting clients list', err));
  }, []);

  return {
    clients,
    getClient,
    deleteClient,
    addClient,
    updateClient,
    searchClient
  } as IClientStore;
}

export default useClientStore;
import React from 'react';
import { UserService } from '@project/services';

export interface IUser {
  userId: string,
  name:string,
  cin:string,
  adresse:string,
  téléphone:string,
}

export interface IUserStore {
  users: IUser[],
  getUser: (user:IUser) => void,
  deleteUser: (user:IUser) => void,
  addUser:(user: IUser) => void,
  updateUser: (user: IUser) => void,
}

const useUserStore = () => {
  const [users, setUser] = React.useState<IUser[]>([]);
  
  const updateUser = (data: IUser) => {
    UserService.UpdateUser(data)
    .then((result) => {
      return setUser(result)
    })
    .catch((err: any) => console.log('Update failed', err));
  }

  const getUser = (data?: IUser) => {
    UserService.GetUser(data)
    .then((result) => {
      return  setUser(result)
    })
    .catch((err: any) => console.log('Update failed', err));
  }

  const deleteUser = (data: IUser) => {
    UserService.DeleteUser(data)
    .then((result) => {
      return setUser(result)
    })
    .catch((err: any) => console.log('delete failed', err));
  }

  const addUser = (data: IUser) => {
    UserService.AddUser(data)
      .then((result) => {
        return setUser(result)
      })
      .catch((err: any) => console.log('Add failed', err));
  }

  React.useEffect(() => {
    UserService.GetUser()
      .then((result) => {
       setUser(result);
      })
      .catch((err: any) => console.log('Ffailed getting users list', err));
  }, []);

  return {
    users,
    getUser,
    deleteUser,
    addUser,
    updateUser,
  } as IUserStore;
}

export default useUserStore;
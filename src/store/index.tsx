import React, { memo } from 'react';
// import your hook handlers
import useAuthStore, { IAuthStore } from './auth/auth.store';
import useChauffeurStore, { IChauffeurStore } from './chauffeur/chauffeur.store';
import useFactureStore, {IFactureStore} from './facture/facture.store';
import useMedecineStore,{IMedecineStore} from './medecine/medecine.store';
import usePharmacienStore,{IPharmacienStore} from './pharmacien/pharmacien.store';
import useClientStore,{IClientStore} from './client/client.store';
import useUserStore,{IUserStore} from './user/user.store'

// App store interface definition, always update this to avoid conflict
export interface IAppContext {
  parentProps: any;
  AuthStore: IAuthStore;
  ChauffeurStore: IChauffeurStore;
  FactureStore: IFactureStore;
  MedecineStore: IMedecineStore;
  PharmacienStore: IPharmacienStore;
  ClientStore: IClientStore;
  UserStore:IUserStore;
}

// create a global store 
export const appStore = React.createContext<IAppContext>({} as any);

/**
 * Store Provider component
 * Use this component at top level of the app to make sur all children components can consume the store
 * @param { any } props         Component props, available in the context store as `parentProps`
 * @returns 
 */
export const AppStoreProvider: React.FC = memo(({
  children,
  ...rest
}) => {

  // this part is really important, to split code that handle different type of data and logics, create a custom hook for them and call them over here
  // this way, all your data will be available in the app through the store
  const AuthStore = useAuthStore();
  const ChauffeurStore = useChauffeurStore();
  const FactureStore = useFactureStore();
  const MedecineStore = useMedecineStore();
  const PharmacienStore = usePharmacienStore();
  const ClientStore = useClientStore();
  const UserStore = useUserStore();


  // create store value, app your hooks value here
  const value: IAppContext = {
    parentProps: rest,
    AuthStore,
    ChauffeurStore,
    FactureStore,
    MedecineStore,
    PharmacienStore,
    ClientStore,
    UserStore
  };

  return (
    <appStore.Provider value={value}>
      {children}
    </appStore.Provider>
  );
});

/**
 * Store consumer, 
 * @returns 
 */
export const useAppStore = () => {
  return React.useContext(appStore);
};


export type {
  IAuthStore,
  IChauffeurStore,
  IFactureStore,
  IMedecineStore,
  IPharmacienStore,
  IClientStore,
  IUserStore,
}
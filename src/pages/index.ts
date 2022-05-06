/* Export Component and export Interface, Types here */
export { default as Home } from './Home/Home';
export { default as HomeWording } from './Home/Home.wording';
export type { IHomeComponent } from './Home/Home';

export { default  as Login } from './Login/Login';
export { default as LoginWording } from './Login/Login.wording';
export type { ILoginComponent} from './Login/Login';

export {default as Chauffeur} from './Driver/Diver';
export { default as ChauffeurWording } from './Driver/Driver.wording';
export type { IChauffeurComponent,IChauffeurWording } from './Driver/Diver';

export {default as User} from './User/User';
export {default as UserWording} from './User/User.wording';
export type {IUserComponent,IUserWording} from './User/User'

export {default as Facture} from './Facture/Facture';
export { default as FactureWording } from './Facture/Facture.wording';
export type { IFactureComponent, IFactureWording } from './Facture/Facture';

export {default as Pharmacien} from './Pharmacien/Pharmacien';
export {default as PharmacienWording} from './Pharmacien/Pharmacien.wording'
export type {IPharmacienComponent, IPharmacienWording} from './Pharmacien/Pharmacien';

export {default as Medecine} from './Medecine/Medecine';
export {default as MedecineWording} from './Medecine/Medecine.wording'
export  type {IMedecineComponent, IMedecineWording} from './Medecine/Medecine'


export {default as Client} from './Client/Client';
export {default as ClientWording} from './Client/Client.wording';
export type {IClientComponent, IClientWording} from './Client/Client'

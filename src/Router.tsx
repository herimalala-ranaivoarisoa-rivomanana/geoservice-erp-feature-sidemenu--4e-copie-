import React from "react";
import * as Pages from "@project/pages";
import { IonRouterOutlet } from "@ionic/react";
import { Route } from "react-router-dom";
import { useAppStore } from '@project/store';

/**
 * Main routing structure
 * @returns - Liste of configured routes
 */
const MainRoute: React.FC = () => {
  // way to consume store in component
  const {
    AuthStore: {
      isAuthenticated,
    }
  } = useAppStore();

  /**
   * Implement routing protected condition here
   * call auth state from store context hooks
   */
  const renderAuth = (Component: React.ReactNode, beforeCheck?: Function) => {
    return (isAuthenticated() ? Component : <Pages.Login wording={Pages.LoginWording} /> as any)
  }

  return (
    <IonRouterOutlet>
      <Route exact path="/" render={() => renderAuth(<Pages.Home pageName="HomePage" wording={Pages.HomeWording} />)}/>
      <Route exact path="/home" render={() => renderAuth(<Pages.Home pageName="HomePage" wording={Pages.HomeWording} />)}/>
      <Route exact path="/taxis/chauffeurs" render={() => renderAuth(<Pages.Chauffeur  pageName="ChauffeurPage" wording={Pages.ChauffeurWording}/>)}/>
      <Route exact path="/users" render={() => renderAuth(<Pages.User  pageName="UserPage" wording={Pages.UserWording}/>)}/>
      <Route exact path="/clients" render={() => renderAuth(<Pages.Client  pageName="ClientPage" wording={Pages.ClientWording}/>)}/>
     <Route exact path="/taxis/facturations" render={() => renderAuth(<Pages.Facture  pageName="FacturePage" wording={Pages.FactureWording}/>)}/>
    <Route exact path="/pharmaciens" render={() => renderAuth(<Pages.Pharmacien  pageName="PharmacienPage" wording={Pages.PharmacienWording}/>)}/> 
    </IonRouterOutlet>
  );
};

export default MainRoute;

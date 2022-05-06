/* Use this component as reference and guide line when creating components or pages */
import React from 'react';
import {
  IonPage,
  IonButton,
} from '@ionic/react';
import styled from 'styled-components';
import { useAppStore } from '@project/store';

/*
 * 1. Document your component with all properties
 * 2. Always add safecheck on optional variables to avoid runtime error on render or build
 * 3. Use PascalCase for Component naming
 * 4. use camelCase for internal variable and functions, PascalCase for props variable and functions
 * 5. prefer de the of hooks instead of HOCs
 * 6. Always define an exportable interface for your component's props
 * 7. No hardcoded value written in the component.
*/

export interface ILoginWording {
  title: wording;
  subtitle?: wording;
  loginCta?: wording;
}

export interface ILoginComponent {
  className?: string;
  wording: ILoginWording;
}

/**
 * Logins page component
 * @param {string} className            (Optional) Override className internal configuration
 * @returns                             Logins react component
 */
const Login: React.FC<ILoginComponent> = ({
  className,
  wording,
}) => {

  const {
    AuthStore: {
      signInGoogle,
    }
  } = useAppStore();

  return (
    <LoginWrapper className={`login ${className || ''}`}>
      <h1 className='login__title'>
        {wording?.title && wording.title}
      </h1>
      {wording?.subtitle && <p className='login__subtitle'>{wording.subtitle}</p>}
      {wording.loginCta && <IonButton onClick={signInGoogle}>{wording.loginCta}</IonButton>}
    </LoginWrapper>
  );
};

/**
 * Styling guide line
 * Always write mobile first approach
 * never use more than 3 nested property definition for readability
 * never use an 'id' as a css selector
 * use BEM naming convention, and avoid using camelCase or PascalCase for css naming
 * use variable definition as much as possible for color, font-size, font family
 * only repeat property for specifique case (ex: desktop configuration, variant configuration)
 */
export const LoginWrapper = styled(IonPage)`
  &.login {
    background: #fff;
    justify-content: center;
    align-items: center;
  }

  @media (min-width: 992px) {
    &.login {
      padding: 20px;
    }
  }
`;

export default Login;

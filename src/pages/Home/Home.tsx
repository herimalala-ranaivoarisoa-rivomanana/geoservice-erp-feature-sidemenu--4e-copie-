/* Use this component as reference and guide line when creating components or pages */
import React from "react";
import styled from "styled-components";
import Layout from "src/components/Layout/Layout";

/*
 * 1. Document your component with all properties
 * 2. Always add safecheck on optional variables to avoid runtime error on render or build
 * 3. Use PascalCase for Component naming
 * 4. use camelCase for internal variable and functions, PascalCase for props variable and functions
 * 5. prefer de the of hooks instead of HOCs
 * 6. Always define an exportable interface for your component's props
 * 7. No hardcoded value written in the component.
 */

export interface IHomeWording {
  title(args: any): wording;
  subtitle?: wording;
}

export interface IHomeComponent {
  className?: string;
  wording: IHomeWording;
  pageName?: string;
}

/**
 * Home page component
 * @param {string} className            (Optional) Override className internal configuration
 * @returns                             Home react component
 */
const Home: React.FC<IHomeComponent> = ({ className, wording, pageName }) => {
  return (
    <Layout>
      <PageWrapper className="">
        <ContentWrapper className={`home__content ${className || ""}`}>
          <PageTitle className="content__title">
            {pageName && wording?.title && (wording?.title({ pageName }) || "")}
          </PageTitle>
          {wording?.subtitle && (
            <p className="content__subtitle">{wording.subtitle}</p>
          )}
        </ContentWrapper>
      </PageWrapper>
    </Layout>
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

export const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
`;

export const ContentWrapper = styled.div`
  &.home__content {
    width: 100%;
    height: 100%;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #fff;
    padding: 10px;

    @media (min-width: 992px) {
      .content__title {
        margin-bottom: 30px;
      }
    }

    .content__title span {
      color: var(--ion-color-primary);
    }

    .content__subtitle {
      text-align: center;
    }
  }

  @media (min-width: 992px) {
    &.content {
      padding: 20px;
    }
  }
`;

export const PageTitle = styled.h1`
  &.content__title {
    font-weight: 500;
    font-size: var(--font-xl);
    margin-bottom: 18px;
    text-align: left;
  }
`;

export default Home;

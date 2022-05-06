// This file is Optional
// Use wording file to define any text and fixed to show on front for readability, editing, localization
// You could use a cms api to fetch to wording value
// No hardcoded value should be defined inside react components

const HomeWording = {
  title: (args: any) => `Welcome to our ${args?.pageName || ''}`,
  subtitle: 'We are truly happy to have you on our brand new application, please enjoy !'
};

export default HomeWording;

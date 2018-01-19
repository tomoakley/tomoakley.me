/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

const navbari18nStrings = (names) => {
  const i18nObj = {};
  const path = ['HEADER', 'NAVIGATION'];
  names.forEach((name) => {
    i18nObj[name.toLowerCase()] = {
      label: {
        id: [...path, name.toUpperCase(), 'LABEL'].join('.'),
        defaultMessage: name
      },
      tag: {
        id: [...path, name.toUpperCase(), 'TAG'].join('.'),
        defaultMessage: name
      }
    };
  });
  return i18nObj;
};

export default (pageTitles) => defineMessages(navbari18nStrings(pageTitles));

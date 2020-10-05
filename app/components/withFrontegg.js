import React from 'react';
import { FronteggProvider } from '@frontegg/react-core';
import { uiLibrary } from '@frontegg/react-elements-semantic';
import { AuthPlugin } from '@frontegg/react-auth';

/**
 * use this object to config Frontegg global context object
 */
const contextOptions = {
  baseUrl: `http://localhost:8080`,
  requestCredentials: 'include',
};

const plugins = [
  // add frontegg plugin here
  AuthPlugin({
    /* auth options, find more information at https://github.com/frontegg/frontegg-react/tree/master/packages/auth */
  })
];

/**
 *  Wrap you entire application with this HOC.
 *  NOTE: Make sure to remove any BrowserRouter in your application if you use ```withRouter``` option
 */
// eslint-disable-next-line react/display-name
export const withFrontegg = (AppComponent) => (props) => {
  return <FronteggProvider
    withRouter={true}
    plugins={plugins}
    context={contextOptions}
    uiLibrary={uiLibrary}>
    <AppComponent {...props} />
  </FronteggProvider>;
};
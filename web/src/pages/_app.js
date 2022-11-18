import '../styles/globals.css';

import { NavigationMenu } from '@shopify/app-bridge-react';
import {
  AppBridgeProvider,
  QueryProvider,
  PolarisProvider,
} from '../components';

function MyApp({ Component, pageProps }) {
  return (
    <PolarisProvider>
      <AppBridgeProvider>
        <QueryProvider>
          <NavigationMenu
            navigationLinks={[
              {
                label: 'Page name',
                destination: '/pagename',
              },
            ]}
          />
          <Component {...pageProps} />
        </QueryProvider>
      </AppBridgeProvider>
    </PolarisProvider>
  );
}

export default MyApp;

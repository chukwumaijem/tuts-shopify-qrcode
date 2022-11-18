import { Redirect } from '@shopify/app-bridge/actions';
import { useAppBridge, Loading } from '@shopify/app-bridge-react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function ExitIframe() {
  const app = useAppBridge();
  const query = useRouter().query;

  useEffect(() => {
    if (!!app && !!search) {
      const params = new URLSearchParams(query);
      const redirectUri = params.get('redirectUri');
      const url = new URL(decodeURIComponent(redirectUri));

      if (url.hostname === location.hostname) {
        const redirect = Redirect.create(app);
        redirect.dispatch(
          Redirect.Action.REMOTE,
          decodeURIComponent(redirectUri)
        );
      }
    }
  }, [app, search]);

  return <Loading />;
}

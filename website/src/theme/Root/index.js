import {useEffect} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';



export default function Root({children}) {
  const icon = useBaseUrl('/Fluence_Icon.ico');

  useEffect(() => {
    if (typeof window !== 'undefined' && !window.gtag) {
        window.gtag = function() {};
      }

    let favicon = document.querySelector('link[rel="icon"]');
    if (!favicon) {
      favicon = document.createElement('link');
      favicon.rel = 'icon';
      document.head.appendChild(favicon);
    }
    favicon.href = icon;
  }, [icon]);

  return <>{children}</>;
}

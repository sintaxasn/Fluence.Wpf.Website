import {useEffect} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';



export default function Root({children}) {
  const lightIcon = useBaseUrl('/Fluence_Icon_Light.ico');
  const darkIcon = useBaseUrl('/Fluence_Icon_Dark.ico');

  useEffect(() => {
    if (typeof window !== 'undefined' && !window.gtag) {
        window.gtag = function() {};
      }

    const applyIcon = () => {
      let favicon = document.querySelector('link[rel="icon"]');
      if (!favicon) {
        favicon = document.createElement('link');
        favicon.rel = 'icon';
        document.head.appendChild(favicon);
      }
      favicon.href = document.documentElement.dataset.theme === 'dark' ? darkIcon : lightIcon;
    };

    applyIcon();
    const observer = new MutationObserver(applyIcon);
    observer.observe(document.documentElement, {attributes: true, attributeFilter: ['data-theme']});
    return () => observer.disconnect();
  }, [darkIcon, lightIcon]);

  return <>{children}</>;
}

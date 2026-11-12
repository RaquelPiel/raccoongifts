/* Registro do Service Worker (funciona offline depois da primeira visita). */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {
      /* ambiente sem suporte/HTTPS — segue funcionando online normalmente */
    });
  });
}

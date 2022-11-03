//const CACHE_NAME = 'cache-1';
importScripts('js/sw-utils.js')

const CACHE_STATIC = 'static-v1';
const CACHE_DYNAMIC = 'dynamic-v1';
const CACHE_INMUTABLE = 'inmutable-v2';

function limpiarCache(cacheName, numeroItems){

   caches.open( cacheName)
   .then( cache => {

 return cache.keys()
   .then( keys => {

    if(keys.length > numeroItems){
        cache.delete( keys[0] )
        .then( limpiarCache(cacheName, numeroItems) )
    }

   })

   })

}

self.addEventListener( 'install', e => {

    const cacheprom = caches.open(CACHE_STATIC)
    .then( cache => {
    
    return cache.addAll([
        '/',
        'index.html',
        'estilos/formularios.css',
        'imagenes/bac-imag.webp',
        'imagenes/ElCerezoOriginal.webp',
        'imagenes/icons/icon-72x72.png',
        'imagenes/icons/icon-96x96.png',
        'imagenes/icons/icon-128x128.png',
        'imagenes/icons/icon-144x144.png',
        'imagenes/icons/icon-152x152.png',
        'imagenes/icons/icon-192x192.png',
        'imagenes/icons/icon-384x384.png',
        'imagenes/icons/icon-512x512.png',
        'js/suelos.js',
        'js/ciclos.js',
        'js/estaciones.js',
        'js/app.js',
        'js/sw-utils.js',
        //'https://api.gec.org.mx/api/riegos/getFormCiclos',
        //'https://api.gec.org.mx/api/riegos/getFormEstaciones',
        //'https://api.gec.org.mx/api/riegos/getFormSuelos',
        'https://api.gec.org.mx/api/getCecos/',
        'http://localhost:3001/api/riegos/getFormSuelos',
        'http://localhost:3001/api/riegos/getFormCiclos',
        'http://localhost:3001/api/riegos/getFormEstaciones'
       ]);

    });

    const cacheinmutable = caches.open(CACHE_INMUTABLE)
    .then( cache => {
       
       return cache.addAll([
            'https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js',
            '//cdn.jsdelivr.net/npm/sweetalert2@11',
            'https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js',
            'https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css',
            'https://cdn.jsdelivr.net/npm/pouchdb@7.3.0/dist/pouchdb.min.js'
       ]);

    })

    e.waitUntil(Promise.all([cacheinmutable, cacheprom]));
});

//SI CAMBIA LA VERSION DEL CACHE HACER LA ELIMINACIÓN
self.addEventListener('activate', e => {

  const respuesta = caches.keys().then( keys => {

    keys.forEach(key => {
        if (key  !== CACHE_STATIC && key.includes('static') ) {
            return caches.delete(key)
        }

        if (key  !== CACHE_DYNAMIC && key.includes('dynamic') ) {
          return caches.delete(key)
      }
    })
  } )


  e.waitUntil(respuesta)
})

self.addEventListener( 'fetch', e => {

 const respuesta = caches.match(e.request ).then( res => {

if(res){
    return res;
}else{
    
  return fetch(e.request).then( newRes => {

    return actaulizaCacheDinamico(CACHE_DYNAMIC, e.request, newRes)

  })
}

  })

  e.respondWith( respuesta )

} )
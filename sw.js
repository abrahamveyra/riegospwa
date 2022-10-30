
//const CACHE_NAME = 'cache-1';
importScripts('js/sw-utils.js')

const CACHE_STATIC = 'static-v2';
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
        //'/',
        'index.html',
        'estilos/formularios.css',
        'imagenes/bac-imag.webp',
        'imagenes/ElCerezoOriginal.webp',
        'js/suelos.js',
        'js/ciclos.js',
        'js/estaciones.js',
        'js/app.js',
        'https://api.gec.org.mx/api/riegos/getFormCiclos',
        'https://api.gec.org.mx/api/riegos/getFormEstaciones',
        'https://api.gec.org.mx/api/riegos/getFormSuelos',
        'https://api.gec.org.mx/api/getCecos/'
       ]);

    });

    const cacheinmutable = caches.open(CACHE_INMUTABLE)
    .then( cache => {
       
       return cache.addAll([
            'https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js',
            '//cdn.jsdelivr.net/npm/sweetalert2@11',
            'https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js',
            'https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css'
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
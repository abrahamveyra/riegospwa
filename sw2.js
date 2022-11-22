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
      'css/style.css',
      'img/main-patas-arriba.jpg',
      'img/main.jpg',
      'js/app.js',
       ]);

    });

    const cacheinmutable = caches.open(CACHE_INMUTABLE)
    .then( cache => {
       
       return cache.add([
        'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'
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
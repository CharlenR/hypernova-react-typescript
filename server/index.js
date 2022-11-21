import hypernova from 'hypernova/server.js'

import Main from '../dist-ssr/main.js'

hypernova({
    devMode: true,
  
    getComponent(name) {
      if (name === 'Main') {
        return Main;
      }
      return null;
    },
  
    port: 3030,
});
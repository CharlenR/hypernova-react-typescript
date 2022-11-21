import express from 'express';
import path from 'path';
import axios from 'axios'
import template from './template/pdp.js'
import fs from 'fs'
const app = express();
const __dirname = path.dirname(import.meta.url.replace('file:///',''));
console.log(__dirname)
const port = 3035;
let pathStaticSsr = path.resolve(path.join(__dirname, '../dist-ssr'))
let pathToAssets = path.resolve(path.join(__dirname, '../dist/assets'))

//console.log( pathStaticSsr )

//app.use('/assets', express.static(pathStaticSsr));
app.use('/assets', express.static(pathToAssets));

app.get('/', (req, res) => {
    axios.post('http://localhost:3030/batch', {
        //body: {
            component: {
                name: "Main",
                data: {}
            }
        //}
    }).then( result => {
        return result.data
    })    
    .then( data => {
        console.log( data )
        if( data.success == true){
            let html = data.results.component.html;
            res.send(template(html));
        }
    })    
    .catch( error => {
        console.log( error )
        res.send('Error')
    })
})



app.listen(port, () => {
    console.log('Running over', port, 'port.')
});



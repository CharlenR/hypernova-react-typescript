export default function pdp(htmlContent){
    return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Vite + React + TS</title>
        <script type="module" crossorigin src="/assets/index.58b623c4.js"></script>
      </head>
      <body>
        <div id="root">
            ${htmlContent}
        </div>
      </body>
    </html>`
}
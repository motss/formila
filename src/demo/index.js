// @ts-check

import path from 'path';
import restify from 'restify';
import parse5 from 'parse5';

import { formila } from '../../dist';
import { formOpts } from './form-opts';
import { shopPolymerFormOpts } from './shop-polymer-form-opts';

const server = restify.createServer();

async function renderFullContent(formOpts) {
  const d = await formila(formOpts);

  return parse5.serialize(parse5.parse(`<link rel="stylesheet" href="/index.css">
<body>
  <style>
    html,
    body {
      width: 100%;
      min-height: 100vh;
      margin: 0;
      padding: 0;
      background-color: #0070fb;
      color: #000;
      font-size: 16px;
      font-family: sans-serif;
      box-sizing;
    }

    * {
      box-sizing: border-box;
    }

    body {
      background-color: #fff;
    }

    main {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      width: 100%;
      min-height: 100vh;
    }

    form {
      max-width: calc(100% / 16 * 9);
      width: 100%;
      margin: 0 auto;
      padding: 16px 24px;
      box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14),
                  0 3px 14px 2px rgba(0, 0, 0, 0.12),
                  0 5px 5px -3px rgba(0, 0, 0, 0.4);
    }

    .is-student-container {
      margin: 10px 0 0;
    }

    .input-file__file-size {
      color: #0070fb;
      font-style: italic;
    }

    /** Shop polymer */
    .hidden-different-ship-address {
      display: none;
    }

    @media screen and (max-width: 600px) {
      form {
        max-width: 100%;
      }
    }
  </style>
  <main>${d}</main>
  <script src="./scripts/form.mjs" async></script>
</body>`))
}

server.use(restify.plugins.bodyParser({
  mapParams: true,
  mapFiles: true,
  keepExtensions: true,
}));

server.get('/healthcheck', async (_, res) => {
  return res.send('ok');
});
server.get('/index.css', restify.plugins.serveStatic({
  maxAge: 10 * 60,
  appendRequestPath: false,
  directory: './dist',
}));
server.get('/scripts/*.m*js', restify.plugins.serveStatic({
  maxAge: 10 * 60, /** 10 minutes */
  appendRequestPath: false,
  directory: './dist/demo',
}));

server.get('/demo', async (_, res, next) => {
  const rendered = await renderFullContent(formOpts);

  return res.end(rendered);
});
server.get('/shop-polymer', async (_, res, next) => {
  const rendered = await renderFullContent(shopPolymerFormOpts);

  res.writeHead(200, { 'content-type': 'text/html' });
  return res.end(rendered);
});
server.post('/demo', (req, res) => {
  const uploadedFiles = Object.keys(req.files)
    .reduce((p, n) => {
      return {
        ...p,
        [n]: {
          filename: req.files[n].name,
          mimetype: req.files[n].type,
          filesize: req.files[n].size,
          base64: req.params[n].toString('base64'),
        },
      };
    }, {});

  res.setHeader('content-type', 'application/json');
  return res.send({
    ...req.body,
    uploadedFiles,
  });
});

server.listen(4040, () => {
  console.info('Demo Restify is running at port 4040...');
});

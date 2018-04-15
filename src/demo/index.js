// @ts-check

import path from 'path';
import restify from 'restify';
import parse5 from 'parse5';

import { formila } from '../../dist';
// @ts-ignore
import formOpts from './json/form.json';

const server = restify.createServer();

server.use(restify.plugins.bodyParser({
  mapParams: true,
  mapFiles: true,
  keepExtensions: true,
}));

server.get('/healthcheck', async (_, res) => {
  return res.send('ok');
});
server.get('/scripts/*.m*js', restify.plugins.serveStatic({
  maxAge: 10 * 60, /** 10 minutes */
  appendRequestPath: false,
  directory: './src/demo',
}));

server.get('/demo', async (_, res, next) => {
  const d = await formila(formOpts);
  const rendered = parse5.serialize(parse5.parse(`<body>
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
      width: auto;
      margin: 0 auto;
      padding: 16px 24px;
      box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14),
                  0 3px 14px 2px rgba(0, 0, 0, 0.12),
                  0 5px 5px -3px rgba(0, 0, 0, 0.4);
    }
  </style>
  ${d.style}
  <main>${d.html}</main>
  <script src="./scripts/form.mjs" async></script>
</body>`));

  res.writeHead(200, {
    'content-type': 'text/html',
  });
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

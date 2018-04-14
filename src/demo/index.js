// @ts-check

import fastify from 'fastify';
import formBody from 'fastify-formbody';

import { ntml } from 'lit-ntml';
import { formila } from '../../dist';

const formOpts = {
  title: 'form title',
  subtitle: 'form subtitle',
  attrTag: `class="form__test"
  method="POST"
  action="/demo"
  enctype="application/x-www-urlencoded"`,

  hidden: [
    {
      name: '_csrf',
      value: Math.random().toString(16).slice(-7),
    },
    {
      name: 'signed_request',
      value: Math.random().toString(16).slice(-7),
    },
  ],
  fieldset: [
    {
      title: 'fieldset title 001',
      field: [
        {
          // type: 'input',
          isPrefixed: true,
          // attrs: {
          //   name: 'first_name',
          //   type: 'text',
          //   'aria-invalid': false,
          //   pattern: '^[\w\s]+',
          //   minlength: 1,
          //   maxlength: 40,
          // },
          attrTag: `for="first_name"`,
          title: 'First name',
          fieldTag: `<span>#</span><input id="first_name"
            type="text"
            name="first_name"
            aria-required="true"
            aria-invalid="false"
            pattern="^[\\w\\s]+"
            minlength="1"
            maxlength="40"></input>`,
          description: 'Please fill in your first name',
          errorMessage: 'Invalid first name',
          // validateFn: (el /** @type HTMLInputElement */) => {
          //   if (/[0-9]/i.test(el.value)) {
          //     el.setAttribute('aria-invalid', 'true');
          //     return false;
          //   }

          //   return true;
          // },
          // eventHandler: (el /** @type HTMLInputElement */) => {
          //   el.addEventListener('input', (ev) => {
          //     console.log('# input', ev.target.value);
          //   });
          // },
        },
        {
          isPrefixed: false,
          attrTag: 'for="last_name"',
          title: 'Last name',
          fieldTag: `<input id="last_name"
            type="text"
            name="last_name"
            pattern="^[\\w\\s]*"
            minlength="1"
            maxlength="40"
            aria-required="true"
            aria-invalid="false"></input>`,
          // description: 'Please fill in your last name',
          errorMessage: 'Invalid last name',
        }
      ]
    }
  ],
  submitTitle: 'submit',
};

async function main(opts) {
  return formila(opts);
};

const html = ntml({
  parseHtml: true,
  minify: true,
});

const server = fastify();

server.register(formBody);

server.get('/healthcheck', async (_, res) => {
  return 'ok';
});
server.get('/demo', async (_, res) => {
  const d = await formila(formOpts);

  res.header('content-type', 'text/html');
  return html`<body>
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
  </body>`;
});
server.post('/demo', async (req, res) => {
  return { ...req.body };
});

server.listen(4040, () => {
  console.info('Demo Fastify is running at port 4040...');
});

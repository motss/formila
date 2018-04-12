// @ts-check

import { ntml } from 'lit-ntml';

const html = ntml({
  parseHtml: false,
  minify: false,
});
const data = {
  title: 'form title',
  subtitle: 'form subtitle',

  hidden: [
    {
      name: '_csrf',
      value: Math.random().toString(16).slice(-7),
    },
    {
      name: 'signed_request',
      value: Math.random().toString(16).slice(-7),
    },
  ];
  fieldset: [
    {
      title: 'fieldset title 001',
      field: [
        {
          isPrefixed: true,
          attrs: {
            name: 'first_name',
            type: 'text',
            'aria-invalid': false,
            pattern: '^[\w\s]+',
            minlength: 1,
            maxlength: 40,
          },
          description: 'Please fill in your first name',
          errorMessage: 'Invalid first name',
          validateFn: (el /** @type HTMLInputElement */) => {
            if (/[0-9]/i.test(el.value)) {
              el.setAttribute('aria-invalid', 'true');
              return false;
            }

            return true;
          },
          eventHandler: (el /** @type HTMLInputElement */) => {
            el.addEventListener('input', (ev) => {
              console.log('# input', ev.target.value);
            });
          },
        }
      ]
    }
  ],
};



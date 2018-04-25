<div align="center" style="text-align: center;">
  <h1 style="border-bottom: none;">@motss/formila</h1>

  <p>What if you could SSR HTML form with Node.js</p>
</div>

<hr />

[![NPM][nodei-badge]][nodei-url]

[![Version][version-badge]][version-url]
[![Downloads][downloads-badge]][downloads-url]
[![MIT License][mit-license-badge]][mit-license-url]
[![Code of Conduct][coc-badge]][coc-url]

[![Build Status][travis-badge]][travis-url]
[![CircleCI][circleci-badge]][circleci-url]
[![Dependency Status][daviddm-badge]][daviddm-url]
[![NSP Status][nsp-badge]][nsp-url]
[![codecov][codecov-badge]][codecov-url]
[![Coverage Status][coveralls-badge]][coveralls-url]

[![codebeat-badge]][codebeat-url]
[![codacy-badge]][codacy-url]

> Server-rendering HTML forms with just plain JS object or with JSON object. Do note that not every rough edges are covered. This package can be helpful in making you a little bit more productive if you find yourself dealing with many different HTML forms quite often. Enjoy! :smiley:

## Table of contents

- [Table of contents](#table-of-contents)
- [Pre-requisites](#pre-requisites)
- [Setup](#setup)
  - [Install](#install)
  - [Usage](#usage)
    - [Node.js](#nodejs)
    - [Native ES modules or TypeScript](#native-es-modules-or-typescript)
- [API Reference](#api-reference)
  - [FormilaData](#formiladata)
  - [FormilaOpts](#formilaopts)
  - [formila(data[, options])](#formiladata-options)
  - [formilaSync(data[, options])](#formilasyncdata-options)
- [License](#license)

## Pre-requisites

- [Node.js][nodejs-url] >= 8.9.0
- [NPM][npm-url] >= 5.5.1 ([NPM][npm-url] comes with [Node.js][nodejs-url] so there is no need to install separately.)

## Setup

### Install

```sh
# Install via NPM
$ npm install --save @motss/formila
```

### Usage

#### Node.js

```js
const { formila } = require('@motss/formila');

const testForm = {
  // attr: {}, // Attributes
  title: 'Test title',
  subtitle: 'Test subtitle',

  hiddenList: [
    {
      name: '_csrf',
      value: '8601779472171008',
    },
  ],

  sectionList: [
    {
      // attr: {}, // Attributes
      fieldsetList: [
        {
          // attr: {}, // Attributes
          title: 'Personal Information',
          subtitle: 'Particulars',
          fieldList: [
            {
              // attr: {}, // Attributes
              elementList: [
                {
                  title: 'Email',
                  fieldTag: `<input id="email"
                  type="email"
                  name="email">`,
                  description: 'Enter your email',
                  errorMessage: 'Invalid email',
                },
              ],
              // Non-validatable (input, select) elements
              // nonElementList: [
              //   '<div>Email:</div><div></div>',
              // ],
            },
          ],
        },
      ],
    },
  ],

  errorMessage: 'Form contains invalid field',
  submitTitle: 'Next',
};

async function main() {
  try {
    // const options = { minify: true };
    const renderedForm = await formila(testForm/** options */);

    return renderedForm;
  } catch (e) {
    console.error('Error rendering form', e);
  }
}
```

#### Native ES modules or TypeScript

```ts
// @ts-check

import { formila, FormilaData, FormilaOpts } from '@motss/formila';

const testForm: FormilaData = {
  // attr: {}, // Attributes
  title: 'Test title',
  subtitle: 'Test subtitle',

  hiddenList: [
    {
      name: '_csrf',
      value: '8601779472171008',
    },
  ],

  sectionList: [
    {
      // attr: {}, // Attributes
      fieldsetList: [
        {
          // attr: {}, // Attributes
          title: 'Personal Information',
          subtitle: 'Particulars',
          fieldList: [
            {
              // attr: {}, // Attributes
              elementList: [
                {
                  title: 'Email',
                  fieldTag: `<input id="email"
                  type="email"
                  name="email">`,
                  description: 'Enter your email',
                  errorMessage: 'Invalid email',
                },
              ],
              // Non-validatable (input, select) elements
              // nonElementList: [
              //   '<div>Email:</div><div></div>',
              // ],
            },
          ],
        },
      ],
    },
  ],

  errorMessage: 'Form contains invalid field',
  submitTitle: 'Next',
};

async function main() {
  try {
    // const options: FormilaOpts = { minify: true };
    const renderedForm = await formila(testForm/** options */);

    return renderedForm;
  } catch (e) {
    console.error('Error rendering form', e);
  }
}
```

## API Reference

### FormilaData

- `attr` <[Object?][object-mdn-url]> Optional form attributes, e.g. `{ id: 'checkoutForm', class: 'form__checkout' }`.
- `title` <[string?][string-mdn-url]> Optional form title.
- `subtitle` <[string?][string-mdn-url]> Optional form subtitle.
- `hiddenList` <[Array?][array-mdn-url]&lt;[Object][object-mdn-url]&gt;> Optional list of hidden elements in the form.
  - `name` <[string][string-mdn-url]> Name of the hidden form element, e.g. `_csrf`.
  - `value` <[string][string-mdn-url]> Value of the hidden form element, e.g. `5976446363238400`.
- `sectionList` <[Array?][array-mdn-url]&lt;[Object][object-mdn-url]&gt;> Optional list of sections.
  - `attr` <[Object?][object-mdn-url]> Optional section attributes.
  - `fieldsetList` <[Array?][array-mdn-url]&lt;[Object][object-mdn-url]&gt;> Optional list of fieldsets.
    - `attr` <[Object?][object-mdn-url]> Optional fieldset attributes.
    - `title` <[string?][string-mdn-url]> Optional fieldset title.
    - `subtitle` <[string?][string-mdn-url]> Optional fieldset subtitle.
    - `fieldList` <[Array?][array-mdn-url]&lt;[Object][object-mdn-url]&gt;> Optional list of fields.
      - `elementList` <[Array?][array-mdn-url]&lt;[Object][object-mdn-url]&gt;> Optional list of validatable elements such as `<input>` and `<select>` elements.
        - `attr` <[Object?][object-mdn-url]> Optional field attributes.
        - `title` <[string?][string-mdn-url]> Optional field title, e.g. `Email`.
        - `fieldTag` <[string?][string-mdn-url]> HTML `<input>` or `<select>` element. The element must have the attribute `id` set, e.g. `<input id="email" type="email" name="email">`.
        - `description` <[string?][string-mdn-url]> Optional field description, e.g. `Enter your valid email address`.
        - `errorMessage` <[string?][string-mdn-url]> Optional error message when the field is invalid, e.g. `Invalid email`.
      - `nonElementList` <[Array?][array-mdn-url]&lt;[string][string-mdn-url]&gt;> Optional list of non-validatable elements.
- `errorMessage` <[string?][string-mdn-url]> Optional error message of the form, e.g. `Form contains invalid field(s).`
- `submitTitle` <[string?][string-mdn-url]> Optional title of the submit button. Defaults to `Submit`.

### FormilaOpts

- `minify` <[boolean?][boolean-mdn-url]> Optional flag to minify rendered HTML form. Defaults to `true`.

___

### formila(data[, options])

- `data` <[FormilaData][formiladata-url]> Form data.
- `options` <[FormilaOpts?][formilaopts-url]> Optional configuration to render the HTML form.
- returns: <[Promise][promise-mdn-url]&lt;[string][string-mdn-url]&gt;> Promise which resolves with rendered HTML form.

### formilaSync(data[, options])

This methods works the same as `formila(data[, options])` except that this is the synchronous version.

## License

[MIT License](https://motss.mit-license.org/) © Rong Sen Ng

<!-- References -->
[typescript-url]: https://github.com/Microsoft/TypeScript
[nodejs-url]: https://nodejs.org
[npm-url]: https://www.npmjs.com
[node-releases-url]: https://nodejs.org/en/download/releases

[formiladata-url]: #formiladata
[formilaopts-url]: #formilaopts

[array-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
[boolean-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean
[function-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function
[map-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
[number-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number
[object-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
[promise-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[regexp-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
[set-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
[string-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String

<!-- Badges -->
[nodei-badge]: https://nodei.co/npm/@motss/formila.png?downloads=true&downloadRank=true&stars=true

[version-badge]: https://img.shields.io/npm/v/@motss/formila.svg?style=flat-square
[downloads-badge]: https://img.shields.io/npm/dm/@motss/formila.svg?style=flat-square
[mit-license-badge]: https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square

[travis-badge]: https://img.shields.io/travis/motss/formila.svg?style=flat-square
[circleci-badge]: https://circleci.com/gh/motss/formila/tree/master.svg?style=svg
[daviddm-badge]: https://img.shields.io/david/motss/formila.svg?style=flat-square
[nsp-badge]: https://nodesecurity.io/orgs/motss/projects/89c87d68-eed8-4a67-804d-f92aefaf8ec7/badge
[codecov-badge]: https://codecov.io/gh/motss/formila/branch/master/graph/badge.svg
[coveralls-badge]: https://coveralls.io/repos/github/motss/formila/badge.svg?branch=master

[codebeat-badge]: https://codebeat.co/badges/8ecb4520-072a-42ff-a609-6047902a64ef
[codacy-badge]: https://api.codacy.com/project/badge/Grade/f20ac8478b7a4d6783288af9521c8876

<!-- Links -->
[nodei-url]: https://nodei.co/npm/@motss/formila

[version-url]: https://www.npmjs.com/package/@motss/formila
[downloads-url]: http://www.npmtrends.com/@motss/formila
[mit-license-url]: https://github.com/motss/formila/blob/master/LICENSE
[coc-url]: https://github.com/motss/formila/blob/master/CODE_OF_CONDUCT.md

[travis-url]: https://travis-ci.org/motss/formila
[circleci-url]: https://circleci.com/gh/motss/formila/tree/master
[daviddm-url]: https://david-dm.org/motss/formila
[nsp-url]: https://nodesecurity.io/orgs/motss/projects/89c87d68-eed8-4a67-804d-f92aefaf8ec7
[codecov-url]: https://codecov.io/gh/motss/formila
[coveralls-url]: https://coveralls.io/github/motss/formila?branch=master

[codebeat-url]: https://codebeat.co/projects/github-com-motss-formila-master
[codacy-url]: https://www.codacy.com/app/motss/formila?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=motss/formila&amp;utm_campaign=Badge_Grade

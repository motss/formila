// @ts-check

import fs from 'fs';
import { promisify } from 'util';

import { formila, FormilaData } from '..';
import { testFormOpts } from './test-form-opts';

function readFrom(filePath: string) {
  return promisify(fs.readFile)(filePath, 'utf-8');
}

describe('formila', () => {
  describe('ok', () => {
    test('form renders', async () => {
      const rendered = await formila(testFormOpts);

      expect(rendered)
        .toEqual(await readFrom('./src/test/minified-rendered-form.html'));
    });

    test('no form renders', async () => {
      // @ts-ignore
      const rendered = await formila(null);

      expect(rendered).toEqual('');
    });

    test('prettified form renders', async () => {
      const rendered = await formila(testFormOpts, { minify: false });

      expect(rendered).toEqual(
        await readFrom('./src/test/rendered-form.html')
      );
    });

    test('attr == null', async () => {
      const attrNullFormOpts: FormilaData = {
        title: 'Attr is null',
        sectionList: [{
          fieldsetList: [{
            fieldList: [{
              elementList: [{
                title: 'Email',
                fieldTag: `<input id="email" type="email" name="email">`,
                errorMessage: 'Invalid email',
              }],
            }],
          }],
        }],
      };
      const rendered = await formila(attrNullFormOpts);

      // tslint:disable-next-line:max-line-length
      expect(rendered).toEqual(`<form><h1 class=\"form__title\">Attr is null</h1><div class=\"form__body\"><section class=\"form__section\"><fieldset class=\"form_fieldset\"><div class=\"form-fieldset__field\"><div class=\"form__label-container\"><label for=\"email\"><div class=\"input-title\">Email</div><div class=\"input-container\"><input aria-invalid=\"false\" aria-required=\"true\" id=\"email\" name=\"email\" required type=\"email\"></div><div class=\"error-msg\" aria-hidden=\"true\" role=\"alert\">Invalid email</div></label></div></div></fieldset></section></div><div class=\"buttons-container\"><button type=\"submit\">Submit</button></div></form>`);
    });

    test('title == null', async () => {
      const titleNullFormOpts: FormilaData = {
        sectionList: [{
          fieldsetList: [{
            fieldList: [{
              elementList: [{
                title: 'Email',
                fieldTag: `<input id="email" type="email" name="email">`,
                errorMessage: 'Invalid email',
              }],
            }],
          }],
        }],
      };
      const rendered = await formila(titleNullFormOpts);

      // tslint:disable-next-line:max-line-length
      expect(rendered).toEqual(`<form><div class=\"form__body\"><section class=\"form__section\"><fieldset class=\"form_fieldset\"><div class=\"form-fieldset__field\"><div class=\"form__label-container\"><label for=\"email\"><div class=\"input-title\">Email</div><div class=\"input-container\"><input aria-invalid=\"false\" aria-required=\"true\" id=\"email\" name=\"email\" required type=\"email\"></div><div class=\"error-msg\" aria-hidden=\"true\" role=\"alert\">Invalid email</div></label></div></div></fieldset></section></div><div class=\"buttons-container\"><button type=\"submit\">Submit</button></div></form>`);
    });

    test('subtitle == null', async () => {
      const subtitleNullFormOpts: FormilaData = {
        title: 'Subtitle is null',
        sectionList: [{
          fieldsetList: [{
            fieldList: [{
              elementList: [{
                title: 'Email',
                fieldTag: `<input id="email" type="email" name="email">`,
                errorMessage: 'Invalid email',
              }],
            }],
          }],
        }],
      };
      const rendered = await formila(subtitleNullFormOpts);

      // tslint:disable-next-line:max-line-length
      expect(rendered).toEqual(`<form><h1 class=\"form__title\">Subtitle is null</h1><div class=\"form__body\"><section class=\"form__section\"><fieldset class=\"form_fieldset\"><div class=\"form-fieldset__field\"><div class=\"form__label-container\"><label for=\"email\"><div class=\"input-title\">Email</div><div class=\"input-container\"><input aria-invalid=\"false\" aria-required=\"true\" id=\"email\" name=\"email\" required type=\"email\"></div><div class=\"error-msg\" aria-hidden=\"true\" role=\"alert\">Invalid email</div></label></div></div></fieldset></section></div><div class=\"buttons-container\"><button type=\"submit\">Submit</button></div></form>`);
    });

    test('hiddenList == null', async () => {
      const hiddenListNullFormOpts: FormilaData = {
        title: 'hiddenList is null',
        sectionList: [{
          fieldsetList: [{
            fieldList: [{
              elementList: [{
                title: 'Email',
                fieldTag: `<input id="email" type="email" name="email">`,
                errorMessage: 'Invalid email',
              }],
            }],
          }],
        }],
      };
      const rendered = await formila(hiddenListNullFormOpts);

      // tslint:disable-next-line:max-line-length
      expect(rendered).toEqual(`<form><h1 class=\"form__title\">hiddenList is null</h1><div class=\"form__body\"><section class=\"form__section\"><fieldset class=\"form_fieldset\"><div class=\"form-fieldset__field\"><div class=\"form__label-container\"><label for=\"email\"><div class=\"input-title\">Email</div><div class=\"input-container\"><input aria-invalid=\"false\" aria-required=\"true\" id=\"email\" name=\"email\" required type=\"email\"></div><div class=\"error-msg\" aria-hidden=\"true\" role=\"alert\">Invalid email</div></label></div></div></fieldset></section></div><div class=\"buttons-container\"><button type=\"submit\">Submit</button></div></form>`);
    });

    test('sectionList == null', async () => {
      const sectionListNullFormOpts: FormilaData = {
        title: 'sectionList is null',
      };
      const rendered = await formila(sectionListNullFormOpts);

      // tslint:disable-next-line:max-line-length
      expect(rendered).toEqual(`<form><h1 class=\"form__title\">sectionList is null</h1><div class=\"buttons-container\"><button type=\"submit\">Submit</button></div></form>`);
    });

    test('errorMessage == null', async () => {
      const errorMessageNullFormOpts: FormilaData = {
        title: 'errorMessage is null',
      };
      const rendered = await formila(errorMessageNullFormOpts);

      // tslint:disable-next-line:max-line-length
      expect(rendered).toEqual(`<form><h1 class=\"form__title\">errorMessage is null</h1><div class=\"buttons-container\"><button type=\"submit\">Submit</button></div></form>`);
    });

    test('submitTitle == null', async () => {
      const submitTitleNullFormOpts: FormilaData = {
        title: 'submitTitle is null',
      };
      const rendered = await formila(submitTitleNullFormOpts);

      // tslint:disable-next-line:max-line-length
      expect(rendered).toEqual(`<form><h1 class=\"form__title\">submitTitle is null</h1><div class=\"buttons-container\"><button type=\"submit\">Submit</button></div></form>`);
    });

    test('Lists with attr', async () => {
      const listsWithAttrFormOpts: FormilaData = {
        sectionList: [{
          attr: {
            class: 'form__section',
          },
          fieldsetList: [{
            attr: {
              class: 'form-section__fieldset',
            },
            fieldList: [{
              attr: {
                class: 'form-section-fieldset__field',
              },
              elementList: [{
                attr: {
                  class: 'form-section-fieldset-field__element',
                },
                title: 'Email',
                fieldTag: `<input id="email" type="email" name="email">`,
                errorMessage: 'Invalid email',
              }],
            }],
          }],
        }],
      };
      const rendered = await formila(listsWithAttrFormOpts);

      // tslint:disable-next-line:max-line-length
      expect(rendered).toEqual(`<form><div class=\"form__body\"><section class=\"form__section form__section\"><fieldset class=\"form_fieldset form-section__fieldset\"><div class=\"form-fieldset__field\"><div class=\"form__label-container form-section-fieldset-field__element\"><label for=\"email\"><div class=\"input-title\">Email</div><div class=\"input-container\"><input aria-invalid=\"false\" aria-required=\"true\" id=\"email\" name=\"email\" required type=\"email\"></div><div class=\"error-msg\" aria-hidden=\"true\" role=\"alert\">Invalid email</div></label></div></div></fieldset></section></div><div class=\"buttons-container\"><button type=\"submit\">Submit</button></div></form>`);
    });

    test('nonElementList is empty array', async () => {
      const nonElementListNullFormOpts: FormilaData = {
        sectionList: [{
          fieldsetList: [{
            fieldList: [{
              nonElementList: [],
            }],
          }],
        }],
      };
      const rendered = await formila(nonElementListNullFormOpts);

      // tslint:disable-next-line:max-line-length
      expect(rendered).toEqual(`<form><div class=\"form__body\"><section class=\"form__section\"><fieldset class=\"form_fieldset\"><div class=\"form-fieldset__field\"></div></fieldset></section></div><div class=\"buttons-container\"><button type=\"submit\">Submit</button></div></form>`);
    });

    test('fieldList is empty array', async () => {
      const fieldListNullFormOpts: FormilaData = {
        sectionList: [{
          fieldsetList: [{
            fieldList: [],
          }],
        }],
      };
      const rendered = await formila(fieldListNullFormOpts);

      // tslint:disable-next-line:max-line-length
      expect(rendered).toEqual(`<form><div class=\"form__body\"><section class=\"form__section\"><fieldset class=\"form_fieldset\"></fieldset></section></div><div class=\"buttons-container\"><button type=\"submit\">Submit</button></div></form>`);
    });

    test('fieldsetList is empty array', async () => {
      const fieldsetListNullFormOpts: FormilaData = {
        sectionList: [{
          fieldsetList: [],
        }],
      };
      const rendered = await formila(fieldsetListNullFormOpts);

      // tslint:disable-next-line:max-line-length
      expect(rendered).toEqual(`<form><div class=\"form__body\"><section class=\"form__section\"></section></div><div class=\"buttons-container\"><button type=\"submit\">Submit</button></div></form>`);
    });

    test('other possible optional properties', async () => {
      // @ts-ignore
      const otherOptionalFormOpts: FormilaData = {
        attr: {
          class: 'test',
        },
        title: 'test title',
        subtitle: 'test subtitle',
        hiddenList: [
          { name: '_csrf', value: '379379215499264', },
          { name: 'signed_request', value: '5034657135460352', },
        ],
        sectionList: [
          {
            attr: {
              class: 'test-section-list',
            },
            fieldsetList: [
              {
                attr: {
                  class: 'test-fieldset',
                },
                title: 'test-fieldset-title',
                subtitle: 'test-fieldset-subtitle',
                fieldList: [
                  {
                    attr: {
                      class: 'test-field',
                    },
                    elementList: [
                      {
                        attr: {
                          class: 'test-element',
                        },
                        description: 'test-element-description',
                        title: 'Email',
                        fieldTag: null,
                        errorMessage: 'Invalid email',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
        errorMessage: 'Invalid form',
        submitTitle: 'submit',
      };
      const rendered = await formila(otherOptionalFormOpts);

      // tslint:disable-next-line:max-line-length
      expect(rendered).toEqual(`<form class=\"test\"><h1 class=\"form__title\">test title</h1><p class=\"form_subtitle\">test subtitle</p><fieldset class=\"form__fieldset-hidden\"><input name=\"_csrf\" type=\"hidden\" value=\"379379215499264\"><input name=\"signed_request\" type=\"hidden\" value=\"5034657135460352\"></fieldset><div class=\"form__body\"><section class=\"form__section test-section-list\"><fieldset class=\"form_fieldset test-fieldset\"><legend class=\"form-fieldset__title\">test-fieldset-title</legend><p class=\"form-fieldset__subtitle\">test-fieldset-subtitle</p><div class=\"form-fieldset__field\"><div class=\"form__label-container test-element\"><label for=\"\"><div class=\"input-title\">Email</div><div class=\"input-description\">test-element-description</div><div class=\"error-msg\" aria-hidden=\"true\" role=\"alert\">Invalid email</div></label></div></div></fieldset></section></div><div class=\"form__error-msg\" aria-hidden=\"true\" role=\"alert\">Invalid form</div><div class=\"buttons-container\"><button type=\"submit\">submit</button></div></form>`);
    });

  });

  describe('error', () => {
    test('form contains element with no attribute \'id\' specified', async () => {
      const errorFormOpts: FormilaData = {
        title: 'Error form title',
        subtitle: 'Error form subtitle',
        sectionList: [
          {
            fieldsetList: [
              {
                fieldList: [
                  {
                    elementList: [
                      {
                        title: 'Email',
                        fieldTag: `<input type="email" name="email">`,
                        errorMessage: 'Invalid email',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      };

      try {
        await formila(errorFormOpts);
      } catch (e) {
        expect(e).toEqual(
          new Error(
            // tslint:disable-next-line:max-line-length
            'Missing required attribute \'id\' in elementList[0] (<input type="email" name="email">)'
          )
        );
      }
    });
  });

});

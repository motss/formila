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

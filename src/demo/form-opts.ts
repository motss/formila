// @ts-check

import { FormilaData } from '..';

export const formOpts: FormilaData = {
  attr: {
    class: 'quote-form',
    method: 'post',
    action: '/demo',
    enctype: 'multipart/form-data',
  },

  title: 'My quote',

  hiddenList: [
    {
      name: '_csrf',
      value: '5748383218139136',
    },
    {
      name: 'signed_request',
      value: '537295247638528',
    },
  ],

  sectionList: [
    {
      fieldsetList: [
        {
          title: 'Personal information',
          fieldList: [
            {
              elementList: [
                {
                  title: 'Name',
                  fieldTag: `<input id="name"
                  type="text"
                  maxlength="80"
                  pattern="^.{1,}"
                  autofocus>`,
                  errorMessage: 'Invalid name',
                },
              ],
            },

            {
              elementList: [
                {
                  title: 'Date of birth',
                  fieldTag: `<input id="dob"
                  type="date"
                  name="dob"
                  pattern="\\d{2}/\\d{2}/\\d{4}">`,
                  errorMessage: 'Invalid date of birth',
                },
              ],
            },

            {
              elementList: [
                {
                  title: 'NRIC/ FIN No.',
                  fieldTag: `<input id="nric_fin"
                  type="text"
                  name="nric_fin"
                  minlength="9">`,
                  errorMessage: 'Invalid NRIC/ FIN No.',
                },
              ],
            },

            {
              elementList: [
                {
                  title: 'Gender',
                  fieldTag: `<input id="gender_male"
                  type="radio"
                  name="gender"
                  checked><span>Male</span>
                  <input id="gender_female"
                  type="radio"
                  name="gender"><span>Female</span>`,
                },
              ],
            },

            {
              elementList: [
                {
                  title: '',
                  fieldTag: `<input id="isStudent"
                  type="checkbox"
                  name="isStudent"><span>Please check this if you're a student</span>`,
                },
              ],
            },

          ],
        },

        {
          title: 'Contact details',
          fieldList: [
            {
              elementList: [
                {
                  title: 'Email',
                  fieldTag: `<input id="email"
                  type="text"
                  name="email"
                  maxlength="40"
                  pattern="[a-z0-9._%+\\-]+@[a-z0-9.\\-]+\\.[a-z]{2,3}$">`,
                  errorMessage: 'Invalid email',
                },
              ],
            },

            {
              elementList: [
                {
                  title: 'Confirm email',
                  fieldTag: `<input id="confirmEmail"
                  type="text"
                  name="confirmEmail"
                  maxlength="40"
                  pattern="[a-z0-9._%+\\-]+@[a-z0-9.\\-]+\\.[a-z]{2,3}$">`,
                  errorMessage: 'Invalid confirm email',
                },
              ],
            },

            {
              elementList: [
                {
                  title: 'Mobile phone',
                  fieldTag: `<input id="mobile"
                  type="tel"
                  minlength="8"
                  pattern="^[8-9][0-9]{7}">`,
                  errorMessage: 'Invalid mobile number',
                },
              ],
            },

          ],
        },

        {
          title: 'Mailing address',
          fieldList: [
            {
              elementList: [
                {
                  title: 'Postal code',
                  fieldTag: `<input id="postal"
                  type="text"
                  minlength="6"
                  maxlength="6"
                  pattern="^[0-9]{6}">`,
                  errorMessage: 'Invalid postal code',
                },
              ],
            },

            {
              elementList: [
                {
                  title: 'Street name',
                  fieldTag: `<input id="street"
                  type="text"
                  name="street"
                  maxlength="40"
                  pattern="[a-zA-Z0-9 &(),+\\-#\\/!:@'.]*$">`,
                  errorMessage: 'Invalid street name',
                },
              ],
            },
          ],
        },

        {
          title: 'Approval letter',
          fieldList: [
            {
              elementList: [
                {
                  title: 'Approval letter',
                  fieldTag: `<input id="approvalLetter"
                  type="file"
                  name="approvalLetter"><div class="input-file__file-size hidden"></div>`,
                  description: 'Upload approval letter and it shall not exceed 300KB in size',
                  errorMessage: 'Please upload required document',
                },
              ],
            },
          ],
        },

      ],
    },
  ],

  errorMessage: 'Form with invalid field',
  submitTitle: 'next',
};

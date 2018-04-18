// @ts-check

import { FormilaOpts } from '..';

export const formOpts: Partial<FormilaOpts> = {
  title: 'My quote',
  attrTag: `class="quote-form"
  method="POST"
  action="/demo"
  enctype="multipart/form-data"`,
  hidden: [
    {
      name: '_csft',
      value: '5043645235331072',
    },
    {
      name: 'signed_request',
      value: '2153116719906816',
    },
  ],
  fieldset: [
    {
      title: 'Personal information',
      field: [
        {
          title: 'Name',
          fieldTag: `<input id="name"
          type="text"
          maxlength="80"
          required
          pattern="^[a-zA-Z .,+\\-@\\/()'*]*$">`,
          errorMessage: 'Invalid name',
        },
        {
          isPrefixed: true,
          title: 'Date of birth',
          fieldTag: `<input id="dob"
          type="date"
          name="dob"
          required
          pattern="[0-9]{2}/[0-9]{2}/[0-9]{4}">`,
        },
        {
          title: 'NRIC/ FIN No.',
          fieldTag: `<input id="nric_fin"
          type="text"
          name="nric_fin"
          minlength="9"
          required>`,
          errorMessage: 'Invalid NRIC/ FIN no.',
        },
      ],
    },

    {
      subtitle: 'Gender',
      attrTag: `class="gender-container"`,
      field: [
        {
          attrTag: `calss="gender-male"`,
          fieldTag: `<input id="gender_male"
          type="radio"
          name="gender"
          checked><span>Male</span>`,
        },
        {
          attrTag: `class="gender-female"`,
          fieldTag: `<input id="gender_female"
          type="radio"
          name="gender"><span>Female</span>`,
        },
        {
          title: `Please check this if you're a student`,
          attrTag: `class="is-student-container"`,
          fieldTag: `<input id="is_student"
          type="checkbox"
          name="is_student"><span>Student</span>`,
        },
      ],
    },

    {
      title: 'Contact details',
      field: [
        {
          title: 'Email',
          fieldTag: `<input id="email"
          type="text"
          name="email"
          required
          maxlength="40"
          pattern="[a-z0-9._%+\\-]+@[a-z0-9.\\-]+\\.[a-z]{2,3}$">`,
          errorMessage: 'Invalid email',
        },
        {
          title: 'Confirm email',
          fieldTag: `<input id="confirm_email"
          type="text"
          name="confirm_email"
          required
          maxlength="40"
          pattern="[a-z0-9._%+\\-]+@[a-z0-9.\\-]+\\.[a-z]{2,3}$">`,
          errorMessage: 'Invalid confirm email',
        },
        {
          title: 'Mobile phone',
          fieldTag: `<input id="mobile"
          type="text"
          required
          minlength="8"
          pattern="^[8-9][0-9]{7}">`,
          errorMessage: 'Invalid mobile number',
        },
      ],
    },

    {
      title: 'Mailing address',
      field: [
        {
          title: 'Postal code',
          fieldTag: `<input id="postal"
          type="text"
          name="postal"
          required
          minlength="6"
          maxlength="6"
          pattern="^[0-9]{6}">`,
          errorMessage: 'Invalid postal code',
        },
        {
          title: 'Street name',
          fieldTag: `<input id="street"
          type="text"
          name="street"
          required
          maxlength="40"
          pattern="[a-zA-Z0-9 &(),+\\-#\\/!:@'.]*$">`,
          errorMessage: 'Invalid street name',
        },
      ],
    },

    {
      title: 'Approval letter',
      field: [
        {
          isPrefixed: true,
          title: 'Approval letter',
          fieldTag: `<input id="approval_letter"
          class="input__file-uploader"
          type="file"
          name="approval_letter">
          <div class="input-file__file-size hidden"></div>`,
          /** TODO: To validate file */
          // tslint:disable-next-line:max-line-length
          description: 'Upload approval letter and it shall not exceed 300KB in size',
          errorMessage: 'Pleases upload required document',
        },
      ],
    },
  ],
  errorMessage: 'Invalid filed foudn in the form',
  submitTitle: 'Next',
};

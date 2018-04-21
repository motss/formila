// @ts-check

export type Omit<T, U> = Pick<T, Exclude<keyof T, U>>;
export declare interface Attr {
  attr?: {
    [key: string]: string;
  }
}
export declare interface TitleSubTitle {
  title?: string;
  subtitle?: string;
}
export declare interface FormOptsHiddenList {
  name: string;
  value: string;
}
export declare interface FormOptsSectionListFieldListElementListField extends
  Omit<TitleSubTitle, 'subtitle'> {
  fieldTag: string;
  description?: string;
  errorMessage?: string;
}
export declare interface FormOptsSectionListFieldList extends Attr {
  elementList?: FormOptsSectionListFieldListElementListField[];
  nonElementList?: string[];
}
export declare interface FormOptsSectionList extends Attr, TitleSubTitle {
  sectionList?: FormOptsSectionListFieldList[];
}

export declare interface FormOpts extends Attr, TitleSubTitle {
  hiddenList?: FormOptsHiddenList[];
  fieldsetList?: FormOptsSectionList[];

  errorMessage?: string;
  submitTitle?: string;
}

const newFormOpts: FormOpts = {
  attr: {
    id: 'checkoutForm',
    class: 'shop-app__checkout-form',
    method: 'post',
    action: '/test',
    enctype: 'application/x-www-form-urlencoded',
  },
  title: 'Checkout', /** h1 */
  subtitle: 'Shop is a demo app - form data will not be sent', /** p */

  hiddenList: [
    {
      name: '_csrf',
      value: '8000194775875584',
    },
    {
      name: 'signed_request',
      value: '414070270328832',
    },
  ],

  fieldsetList: [
    {
      attr: {
        class: 'shop-app__checkout-form-section',
      },
      title: 'Account information', /** h2 or legend */
      // subtitle: '',
      sectionList: [
        {
          attr: {
            class: 'shop-app__checkout-form-section--row',
          },
          elementList: [
            {
              title: 'Email',
              fieldTag: `<input id="accountEmail"
              type="email"
              name="accountEmail"
              placeholder="Email"
              autofocus>`,
              // description: '', /** isPrefixed=true */
              errorMessage: 'Invalid Email', /** required=true */
            },

          ],
        },

        {
          elementList: [
            {
              title: 'Phone Number',
              fieldTag: `<input id="accountPhone"
              type="tel"
              name="accountPhone"
              pattern="\\d{10,}"
              placeholder="Phone Number">`,
              errorMessage: 'Invalid Phone Number',
            },
          ],
        },
      ],
    },

    {
      attr: {
        class: 'shop-app__checkout-form-section',
      },
      title: ' Shipping address',
      sectionList: [
        {
          attr: {
            class: 'shop-app__checkout-form-section--row',
          },
          elementList: [
            {
              title: 'Address',
              fieldTag: `<input id="shipAddress"
              type="text"
              name="shipAddress"
              pattern=".{5,}"
              placeholder="Address">`,
              errorMessage: 'Invalid Address',
            },

          ],
        },

        {
          attr: {
            class: 'shop-app__checkout-form-section--row',
          },
          elementList: [
            {
              title: 'City',
              fieldTag: `<input id="shipCity"
              type="text"
              name="shipCity"
              pattern=".{2,}"
              placeholder="City">`,
              errorMessage: 'Invalid Address',
            },
          ],
        },

        {
          attr: {
            class: 'shop-app__checkout-form-section--row',
          },
          elementList: [
            {
              title: 'State/ Province',
              fieldTag: `<input id="shipState"
              type="text"
              name="shipState"
              pattern=".{2,}"
              placeholder="State/ Province">`,
              errorMessage: 'Invalid State/ Province',
            },

            {
              title: 'Zip/ Postal code',
              fieldTag: `<input id="shipZip"
              type="text"
              name="shipZip"
              pattern=".{4,}"
              placeholder="Zip/ Postal code">`,
              errorMessage: 'Invalid Zip/ Postal code',
            },
          ],
        },

        {
          attr: {
            class: 'shop-app__checkout-form-section--row',
          },
          elementList: [
            {
              title: 'Country',
              fieldTag: `<select id="shipCountry"
              name="shipCountry">
                <option value="US" selected>United States</option>
                <option value="CA">Canada</option>
              </select>`,
            },
          ],
        },
      ],
    },

    {
      attr: {
        class: 'shop-app__checkout-form-section',
      },
      title: 'Billing Address',
      sectionList: [
        {
          attr: {
            class: 'shop-app__checkout-form-section--row',
          },
          elementList: [
            {
              fieldTag: `<input id="setBilling"
              type="checkbox"
              name="setBilling">
              <span>Use different billing address</span>`,
            },
          ],
        },

        {
          attr: {
            class: 'shop-app__checkout-form-section--row hidden',
          },
          elementList: [
            {
              title: 'Address',
              fieldTag: `<input id="billAddress"
              type="text"
              name="billAddress"
              pattern=".{5,}"
              placeholder="Address"
              autocomplete="billing street-address">`,
              errorMessage: 'Invalid Address',
            },
          ],
        },

        {
          attr: {
            class: 'shop-app__checkout-form-section--row hidden',
          },
          elementList: [
            {
              title: 'City',
              fieldTag: `<input id="billCity"
              type="text"
              name="billCity"
              pattern=".{2,}"
              placeholder="City"
              autocomplete="billing address-level2">`,
              errorMessage: 'Invalid City',
            },
          ],
        },

        {
          attr: {
            class: 'shop-app__checkout-form-section--row hidden',
          },
          elementList: [
            {
              title: 'State/ Province',
              fieldTag: `<input id="billState"
              type="text"
              name="billState"
              placeholder="State/ Province"
              autocomplete="billing address-level1">`,
              errorMessage: 'Invalid State',
            },

            {
              title: 'Zip/ Postal state',
              fieldTag: `<input id="billZip"
              type="text"
              name="billZip"
              pattern=".{4,}"
              placeholder="Zip/ Postal state"
              autocomplete="billing postal-code">`,
              errorMessage: 'Invalid Zip/ Postal code',
            },
          ],
        },

        {
          attr: {
            class: 'shop-app__checkout-form-section--row hidden',
          },
          elementList: [
            {
              title: 'Country',
              fieldTag: `<select id="billCountry"
              name="billCountry"
              autocomplete="billing country">
                <option value="US" selected>United States</option>
                <option value="CA">Canada</option>
              </select>`,
            },
          ],
        },

      ],
    },

    {
      attr: {
        class: 'shop-app__checkout-form-section',
      },
      title: 'Payment method',
      sectionList: [
        {
          attr: {
            class: 'shop-app__checkout-form-section--row',
          },
          elementList: [
            {
              title: 'Cardholder name',
              fieldTag: `<input id="ccName"
              type="text"
              name="ccName"
              pattern=".{3,}"
              placholder="Cardholder Name"
              autocomplete="cc-name">`,
              errorMessage: 'Invalid Cardholder name',
            },
          ],
        },

        {
          attr: {
            class: 'shop-app__checkout-form-section--row',
          },
          elementList: [
            {
              title: 'Card number',
              fieldTag: `<input id="ccNumber"
              type="tel"
              name="ccNumber"
              pattern="[\\d\\s]{15,}"
              placeholder="Card Number"
              autocomplete="cc-number">`,
              errorMessage: 'Invalid Card Number',
            },
          ],
        },

        {
          attr: {
            class: 'shop-app_-checkout-form-section--row',
          },
          elementList: [
            {
              title: 'Expiry',
              fieldTag: `<select id="ccExpMonth"
              name="ccExpMonth"
              autocomplete="cc-exp-month"
              aria-label="Expriy month">
                <option value="01" selected>Jan</option>
                <option value="02">Feb</option>
                <option value="03">Mar</option>
                <option value="04">Apr</option>
                <option value="05">May</option>
                <option value="06">Jun</option>
                <option value="07">Jul</option>
                <option value="08">Aug</option>
                <option value="09">Sep</option>
                <option value="10">Oct</option>
                <option value="11">Nov</option>
                <option value="12">Dec</option>
              </select>
              <select id="ccExpYear"
              name="ccExpYear"
              autocomplete="cc-exp-year"
              aria-label="Expiry year">
                <option value="2016" selected>2016</year>
                <option value="2017">2017</year>
                <option value="2018">2018</year>
                <option value="2019">2019</year>
                <option value="2020">2020</year>
                <option value="2021">2021</year>
                <option value="2022">2022</year>
                <option value="2023">2023</year>
                <option value="2024">2024</year>
                <option value="2025">2025</year>
                <option value="2026">2026</year>
              </select>`,
            },

            {
              title: 'CVV',
              fieldTag: `<input id="ccCVV"
              type="tel"
              name="ccCVV"
              pattern="\\d{3,4}"
              placeholder="CVV"
              autocomplete="cc-csc">`,
              errorMessage: 'Invalid CVV',
            },
          ],
        },

      ],
    },

    {
      attr: {
        class: 'shop-app__checkout-form-container',
      },
      title: 'Order summary',
      sectionList: [
        {
          attr: {
            class: 'shop-app__checkout-form-container--row',
          },
          nonElementList: [
            `<div>Anvil L/S Crew Neck - Grey</div>`,
            `<div>$22.15</div>`,
          ],
        },

        {
          attr: {
            class: 'shop-app__checkout-form-container--row',
          },
          nonElementList: [
            `<div>Total</div>`,
            `<div>$22.15</div>`,
          ],
        },
      ],
    },

  ],

  errorMessage: 'Checkout form contains invalid field',
  submitTitle: 'Place order',
};

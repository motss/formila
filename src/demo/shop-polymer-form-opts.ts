// // @ts-check

// import { FormilaOpts } from '..';

// export const shopPolymerFormOpts: Partial<FormilaOpts> = {
//   title: 'Checkout',
//   subtitle: 'Shop is a demo app - form data will not be sent',
//   attrTag: `id="shop-app__checkout-form"`,

//   hidden: [
//     {
//       name: '_csrf',
//       value: '2824574322343936',
//     },
//     {
//       name: 'signed_request',
//       value: '4653224074149888',
//     },
//   ],

//   fieldset: [
//     {
//       title: 'Account information',
//       attrTag: `class="shop-app-form__account-information-container"`,
//       field: [
//         {
//           title: 'Email',
//           fieldTag: `<input id="accountEmail"
//           type="email"
//           name="accountEmail"
//           placeholder="Email"
//           autofocus
//           required>`,
//           errorMessage: 'Invalid Email',
//         },
//         {
//           title: 'Phone Number',
//           fieldTag: `<input id="accountPhone"
//           type="tel"
//           name="accountPhone"
//           pattern="\\d{10,}"
//           placeholder="Phone Number"
//           required>`,
//           errorMessage: 'Invalid Phone Number',
//         },
//       ],
//     },
//     {
//       title: 'Shipping Address',
//       attrTag: `class="class="shop-app-form__shipping-address-container`,
//       field: [
//         {
//           title: 'Address',
//           fieldTag: `<input id="shipAddress"
//           type="text"
//           name="shipAddress"
//           pattern=".{5,}"
//           placeholder="Address"
//           required>`,
//           errorMessage: 'Invalid Address',
//         },
//         {
//           title: 'City',
//           fieldTag: `<input id="shipCity"
//           type="text"
//           name="shipCity"
//           pattern=".{2,}"
//           placeholder="City"
//           required>`,
//           errorMessage: 'Invalid City',
//         },
//         {
//           title: 'State/ Province',
//           fieldTag: `<input id="shipState"
//           type="text"
//           name="shipState"
//           pattern=".{2,}"
//           placeholder="State/ Province"
//           required>`,
//           errorMessage: 'Invalid State/ Province',
//         },
//         {
//           title: 'Zip/ Postal Code',
//           fieldTag: `<input id="shipZip"
//           type="text"
//           name="shipZip"
//           pattern=".{4,}"
//           placeholder="Zip/ Postal Code"
//           required>`,
//         },
//         {
//           title: 'Country',
//           fieldTag: `<select id="shipCountry"
//           name="shipCountry"
//           required>
//             <option value="US" selected>United States</option>
//             <option value="CA">Canada</option>
//           </select>`,
//         },
//       ],
//     },
//     {
//       title: 'Billing Address',
//       attrTag: `class="shop-app-form__billing-address-container"`,
//       field: [
//         {
//           fieldTag: `<input id="setBilling"
//           type="checkbox"
//           name="setBilling"><span>Use different billing address</span>`,
//         },

//         {
//           title: 'Address',
//           attrTag: `class="hidden-different-ship-address"`,
//           fieldTag: `<input id="shipAddress"
//           type="text"
//           name="shipAddress"
//           pattern=".{5,}"
//           placeholder="Address"
//           required>`,
//           errorMessage: 'Invalid Address',
//         },
//         {
//           title: 'City',
//           attrTag: `class="hidden-different-ship-address"`,
//           fieldTag: `<input id="shipCity"
//           type="text"
//           name="shipCity"
//           pattern=".{2,}"
//           placeholder="City"
//           required>`,
//           errorMessage: 'Invalid City',
//         },
//         {
//           title: 'State/ Province',
//           attrTag: `class="hidden-different-ship-address"`,
//           fieldTag: `<input id="shipState"
//           type="text"
//           name="shipState"
//           pattern=".{2,}"
//           placeholder="State/ Province"
//           required>`,
//           errorMessage: 'Invalid State/ Province',
//         },
//         {
//           title: 'Zip/ Postal Code',
//           attrTag: `class="hidden-different-ship-address"`,
//           fieldTag: `<input id="shipZip"
//           type="text"
//           name="shipZip"
//           pattern=".{4,}"
//           placeholder="Zip/ Postal Code"
//           required>`,
//         },
//         {
//           title: 'Country',
//           attrTag: `class="hidden-different-ship-address"`,
//           fieldTag: `<select id="shipCountry"
//           name="shipCountry"
//           required>
//           <option value="US" selected>United States</option>
//           <option value="CA">Canada</option>
//           </select>`,
//         },
//       ],
//     },

//     {
//       title: 'Payment Method',
//       field: [
//         {
//           title: 'Cardholder Name',
//           fieldTag: `<input id="ccName"
//           type="text"
//           name="ccName"
//           pattern=".{3,}"
//           placeholder="Cardholder Name"
//           required
//           autocomplete="cc-name">`,
//           errorMessage: 'Invalid Cardholder Name',
//         },
//         {
//           title: 'Card Number',
//           fieldTag: `<input id="ccNumber"
//           type="tel"
//           name="ccNumber"
//           pattern="[\\d\\s]{15,}"
//           placeholder="Card Number"
//           required
//           autocomplete="cc-number">`,
//           errorMessage: 'Invalid Card Number',
//         },
//         {
//           title: 'Expiry',
//           fieldTag: `<select id="ccExpMonth"
//           required
//           autocomplete="cc-exp-month">
//             <option value="01" selected>Jan</option>
//             <option value="02" selected>Feb</option>
//             <option value="03" selected>Mar</option>
//             <option value="04" selected>Apr</option>
//             <option value="05" selected>May</option>
//             <option value="06" selected>Jun</option>
//             <option value="07" selected>Jul</option>
//             <option value="08" selected>Aug</option>
//             <option value="09" selected>Sep</option>
//             <option value="10" selected>Oct</option>
//             <option value="11" selected>Nov</option>
//             <option value="12" selected>Dec</option>
//           </select>
//           <select id="ccExpYear"
//           name="ccExpYear"
//           required
//           autocomplete="cc-exp-year">
//             <option value="2016" selected>2016</option>
//             <option value="2017" selected>2017</option>
//             <option value="2018" selected>2018</option>
//             <option value="2019" selected>2019</option>
//             <option value="2020" selected>2020</option>
//             <option value="2021" selected>2021</option>
//             <option value="2022" selected>2022</option>
//             <option value="2023" selected>2023</option>
//             <option value="2024" selected>2024</option>
//             <option value="2025" selected>2025</option>
//             <option value="2026" selected>2026</option>
//           </select>`,
//         },
//         {
//           title: 'CVV',
//           fieldTag: `<input id="ccCVV"
//           type="tel"
//           name="ccCVV"
//           pattern="\\d{3,4}"
//           placeholder="CVV"
//           required
//           autocomplete="cc-csc">`,
//           errorMessage: 'Invalid CVV',
//         },
//       ],
//     },

//     // {
//     //   title: 'Order Summary',
//     //   field: [
//     //     {
//     //       fieldTag: `<table id="tableOrderSummary">
//     //         <tbody>
//     //           <tr>
//     //             <td>Anvil L/S Crew Neck - Grey</td>
//     //             <td>$22.15</td>
//     //           </tr>
//     //           <tr></tr>
//     //           <tr>
//     //             <td>Total</td>
//     //             <td>$22.15</td>
//     //           </tr>
//     //         </tbody>
//     //       </table>`,
//     //     },
//     //   ],
//     // },
//   ],

//   errorMessage: `Checkout form is invalid`,
//   submitTitle: 'Place order',
// };

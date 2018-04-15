// @ts-check

export declare interface FormilaOptsFieldsetField {
  isPrefixed: boolean;
  attrTag: string;
  title: string;
  fieldTag: string;
  description: string;
  errorMessage: string;
}
export declare interface FormilaOptsFieldset {
  title: string;
  field?: Partial<FormilaOptsFieldsetField>[];
}
export declare interface FormilaOpts {
  title: string;
  subtitle: string;
  attrTag: string;
  hidden: {
    name: string;
    value: string;
  }[];
  fieldset: Partial<FormilaOptsFieldset>[];
  submitTitle: string;
}
export type Omit<T, U> = Pick<T, Exclude<keyof T, U>>;

/** Import project dependencies */
import { ntml } from 'lit-ntml';

/** Setting up */
const html = ntml({
  parseHtml: false,
  minify: false,
});
export const ATTR_ID_REGEX = /.+id\=\"(.+?)\".*/i;

function appendLabel(
  isPrefixed: FormilaOptsFieldsetField['isPrefixed']
) {
  return async function appendInput(
    data: Omit<FormilaOptsFieldsetField, 'isPrefixed'>
  ) {
    const {
      attrTag,
      description,
      errorMessage,
      fieldTag,
      title,
    } = data || {} as Omit<FormilaOptsFieldsetField, 'isPrefixed'>;

    if (!/(id\=\")/i.test(fieldTag)) {
      throw new Error('Missing required attribute \'id\' in opts[fieldTag]');
    }

    return html`<div class="label-container">
    <label${
      attrTag == null
        ? ` for="${fieldTag.replace(ATTR_ID_REGEX, '$1')}"`
        : ` ${await html`${attrTag}${
          ATTR_ID_REGEX.test(fieldTag)
            ? ''
            : ` for="${fieldTag.replace(ATTR_ID_REGEX, '$1')}"`
        }`}`
    }><div class="input-title">${
      title
    }</div>${
      typeof isPrefixed !== 'boolean' || !isPrefixed
        ? ''
        : html`<div class="prefixed-input${
          description == null
            ? ''
            : ' has-description'
        }">`
    }${
      fieldTag == null
        ? ''
        : html`${fieldTag.replace(
          /(>.*?<\/(input|select)>.(.*))/gi,
          ` aria-required="${
            !/(required=\"false\")/i.test(fieldTag)
              && /(required\=\"true\"|required\s*)/i.test(fieldTag)
                ? 'true'
                : 'false'
          }" aria-invalid="false"$1`
        )}`
    }
    ${
      description == null
        ? ''
        : html`<div class="input-description">${description}</div>`
    }
    ${
      isPrefixed ? '</div>' : ''
    }${
      errorMessage == null
        ? ''
        : html`<div class="error-msg"
          role="alert">${errorMessage}</div>`
    }</label>
    </div>`;
  };
}

async function appendField(
  field: FormilaOptsFieldset['field']
) {
  try {
    return (
      await Promise.all(field!.map((n) => {
        const {
          isPrefixed,
          ...restN
        } = n || {} as FormilaOptsFieldsetField;

        return appendLabel(n.isPrefixed!)(
          restN as Omit<FormilaOptsFieldsetField, 'isPrefiexed'>
        );
      }))
    )
      .join('\n');
  } catch (e) {
    throw e;
  }
}

async function appendFieldset(
  fieldset: FormilaOpts['fieldset']
) {
  try {
    return Array.isArray(fieldset) && fieldset.length > 0
      ? (
        await Promise.all(fieldset.map(async (n) => {
          return html`<fieldset>
            <!-- <h3>${n.title}</h3> -->
            <legend>${n.title}</legend>

            <div class="fields-container">${
              Array.isArray(n.field) && n.field.length > 0
                ? appendField(n.field)
                : ''
            }</div>
          </fieldset>`;
        }))
      )
        .join('\n')
      : '';
  } catch (e) {
    throw e;
  }
}

async function appendHidden(
  hidden: FormilaOpts['hidden']
) {
  try {
    return Array.isArray(hidden) && hidden.length > 0
      ? (
        await Promise.all(hidden!.map(
          async n => html`<input type="hidden" name="${n.name}" value="${n.value}"></input>`
        ))
      ).join('\n')
      : '';
  } catch (e) {
    throw e;
  }
}

export async function renderStyle() {
  return html`<style>
    /** [START] Reset element style */
    button {
      -webkit-appearance: none;
      box-sizing: border-box;

      position: relative;
      background-color: inherit;
      color: inherit;
      font-size: 14px;
      border: none;
    }
    fieldset {
      margin: 0;
      padding: 0;
      border: none;
    }
    fieldset > legend {
      display: block;
      font-size: 1.17em;
      margin: 1em 0;
      font-weight: 700;
    }
    /** [END] Reset element style */

    .label-container + .label-container {
      margin: 10px 0 0;
    }

    .prefixed-input {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    .prefixed-input.has-description {
      flex-direction: column;
      align-items: inherit;
    }
    label {
      width: 100%;
    }
    label > input:not([type=radio]):not([type=checkbox]) {
      width: 100%;
    }
    label > .prefixed-input > input:not([type=checkbox]) {
      flex: 1 0 auto;

      width: 100%;
      margin: 0 0 3px 0;
    }
    label > .prefixed-input > input[type="checkbox"] {
      margin: 3px 8px 3px 3px;
    }
    label > input[aria-invalid=false],
    label:not(.is-invalid) > .prefixed-input,
    label.is-invalid > .prefixed-input + .error-msg,
    label > input[aria-invalid=true] + .error-msg,
    label > select {
      margin: 0;
    }

    label > .prefixed-input > .input-description {
      font-size: .8em;
      font-style: italic;
      color: rgba(0, 0, 0, .75);
      color: var(--input-description-color, rgba(0, 0, 0, .75));
    }

    .error-msg {
      display: none;
      color: #ff1744;
      color: var(--error-msg-color, #ff1744);
    }

    label > input[aria-invalid=true],
    label > input[aria-invalid=false] + .error-msg,
    label.is-invalid > .prefixed-input,
    label:not(.is-invalid) > .prefixed-input + .error-msg {
      margin: 0;
    }

    label.is-invalid > .input-title {
      color: #ff1744;
      color: var(--error-color, #ff1744);
    }

    input[aria-invalid=true] + .error-msg,
    label.is-invalid > .prefixed-input + .error-msg {
      display: block;
    }
    input[aria-invalid=true] {
      border: 1px solid #ff1744;
      border: 1px solid var(--error-color, #ff1744);
    }

    .btn-container {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      margin: 24px 40px 64px;
    }
    .btn-container > button[type=submit],
    .btn-container > button[type=button] {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      position: relative;
      margin: 0;
      padding: 6px 16px;
      background-color: rgba(0, 0, 0, 0);
      background-color: var(--button-bg-color, rgba(0, 0, 0, 0));
      color: #0070fb;
      color: var(--button-color, #0070fb);
      font-size: 14px;
      border-radius: 2px;
      text-transform: uppercase;
    }
    .btn-container > button[type=submit]:focus,
    .btn-container > button[type=submit]:active,
    .btn-container > button[type=button]:focus,
    .btn-container > button[type=button]:active {
      font-weight: 700;
    }
    .btn-container > button[type=submit]::after,
    .btn-container > button[type=button]::after {
      position: absolute;
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 1);
      background-color: var(--button-pseudoafter-bg-color, rgba(0, 0, 0, 1));
      border-radius: inherit;

      opacity: 0;
      transition: opacity 250ms cubic-bezier(0, 0, .4, 1);
    }
    .btn-container > button[type=submit]:focus::after,
    .btn-container > button[type=submit]:active::after,
    .btn-container > button[type=button]:focus::after,
    .btn-container > button[type=button]:active::after {
      opacity: .1;
    }
  </style>`;
}

export async function renderHtml(data) {
  const {
    title,
    subtitle,
    attrTag,
    hidden = [] as FormilaOpts['hidden'],
    fieldset = [] as FormilaOpts['fieldset'],
    submitTitle,
  } = data;

  return html`<form${
    attrTag == null
      ? ''
      : ` ${await html`${attrTag}`}`
  }>
    ${
      title == null
        ? ''
        : html`<h2 class="form__title">${title}</h2>`
    }
    ${
      subtitle == null
        ? ''
        : html`<p class="form__subtitle">${subtitle}</p>`
    }

    ${
      hidden == null
        ? ''
        : html`<div class="form__hidden-input-container">${appendHidden(hidden)}</div>`
    }

    ${appendFieldset(fieldset)}

    <div class="btn-container">
      <button type="submit">${
        submitTitle == null
          ? 'Submit'
          : submitTitle
      }</button>
    </div>
  </form>`;
}

export async function formila(
  opts: Partial<FormilaOpts> = {} as FormilaOpts
) {
  return {
    html: await renderHtml(opts),
    style: await renderStyle(),
  };
}

export default formila;

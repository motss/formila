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
import parse5 from 'parse5';

/** Setting up */
export const ATTR_ID_REGEX = /.+id\=\"(.+?)\".*/i;

function parseFieldTagFragment(fieldTag: string) {
  const parsedFragment = parseFragment(fieldTag);
  const newParsedFragment = {
    ...parsedFragment,
    childNodes: parsedFragment.childNodes.map((n) => {
      if (!Array.isArray(n.attrs) || !n.attrs.length) {
        return n;
      }

      const attrsMap = new Map([
        ...n.attrs.map(nn => [nn.name, nn.value]),
        ['aria-invalid', 'false'],
        ['aria-required', 'false'],
      ]);

      if (attrsMap.has('required')) {
        attrsMap.set('aria-required', 'true');
      }

      return {
        ...n,
        attrs: [...attrsMap].map((nn) => {
          return { name: nn[0], value: nn[1] };
        }),
      };
    }),
  };

  return parse5.serialize(newParsedFragment);
}

function parseAttrs(attr: string) {
  const { childNodes } = parseFragment(`<div ${attr}></div>`);
  const { attrs } = childNodes.find(n => n.nodeName === 'div');

  return Array.isArray(attrs) && attrs.length > 0
    ? ` ${attrs.map(n => `${n.name}="${n.value}"`).join(' ')}`
    : '';
}

function getIdFromFieldTag(fieldTag: string) {
  const { childNodes } = parseFragment(fieldTag);
  const { attrs } = childNodes.find(n => /(input|select)/i.test(n.nodeName));
  const { value } = attrs.find(n => /id/i.test(n.name));
  const htmlFor = attrs.find(n => /for/i.test(n.name));

  return htmlFor == null
    ? ` for="${value}"`
    : '';
}

function serializeParsedFragment(content: string) {
  return parse5.serialize(parseFragment(content));
}

function parseFragment(content: string) {
  return parse5.parseFragment(content);
}

function appendLabel(
  isPrefixed: FormilaOptsFieldsetField['isPrefixed']
) {
  return function appendInput(
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

    return `<div class="label-container">
    <label${
      parseAttrs(`${getIdFromFieldTag(fieldTag)} ${
        attrTag == null || (typeof attrTag === 'string' && !attrTag.length)
          ? ''
          : attrTag
      }`)
    }><div class="input-title">${
      title
    }</div>${
      typeof isPrefixed !== 'boolean' || !isPrefixed
        ? ''
        : `<div class="prefixed-input${description == null ? '' : ' has-description'}">`
    }${
      fieldTag == null
        ? ''
        : parseFieldTagFragment(fieldTag)
    }
    ${
      description == null
        ? ''
        : `<div class="input-description">${description}</div>`
    }
    ${
      isPrefixed ? '</div>' : ''
    }${
      errorMessage == null
        ? ''
        : `<div class="error-msg" role="alert">${errorMessage}</div>`
    }</label>
    </div>`;
  };
}

function appendField(
  field: FormilaOptsFieldset['field']
) {
  return field!.map((n) => {
    const {
      isPrefixed,
      ...restN
    } = n || {} as FormilaOptsFieldsetField;

    return appendLabel(n.isPrefixed!)(
      restN as Omit<FormilaOptsFieldsetField, 'isPrefiexed'>
    );
  }).join('\n');
}

function appendFieldset(
  fieldset: FormilaOpts['fieldset']
) {
  return Array.isArray(fieldset) && fieldset.length > 0
    ? fieldset.map((n) => {
      return `<fieldset>
        <legend>${n.title}</legend>

        <div class="fields-container">${
          Array.isArray(n.field) && n.field.length > 0
            ? appendField(n.field)
            : ''
        }</div>
      </fieldset>`;
    }).join('\n')
    : '';
}

function appendHidden(
  hidden: FormilaOpts['hidden']
) {
  try {
    return Array.isArray(hidden) && hidden.length > 0
      ? hidden!
          .map(n => `<input type="hidden" name="${n.name}" value="${n.value}"></input>`)
          .join('\n')
      : '';
  } catch (e) {
    throw e;
  }
}

export function renderStyleSync() {
  return serializeParsedFragment(`<style>
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
</style>`);
}

export function renderFormSync(opts) {
  const {
    title,
    subtitle,
    attrTag,
    hidden = [] as FormilaOpts['hidden'],
    fieldset = [] as FormilaOpts['fieldset'],
    submitTitle,
  } = opts;

  return serializeParsedFragment(`<form${
    attrTag == null
      ? ''
      : ` ${attrTag}`
  }>
    ${
      title == null
        ? ''
        : `<h2 class="form__title">${title}</h2>`
    }
    ${
      subtitle == null
        ? ''
        : `<p class="form__subtitle">${subtitle}</p>`
    }

    ${
      hidden == null
        ? ''
        : `<div class="form__hidden-input-container">${appendHidden(hidden)}</div>`
    }

    ${appendFieldset(fieldset)}

    <div class="btn-container">
      <button type="submit">${
        submitTitle == null
          ? 'Submit'
          : submitTitle
      }</button>
    </div>
  </form>`);
}

export async function renderStyle() {
  return renderStyleSync();
}

export async function renderForm(opts) {
  return renderFormSync(opts);
}

export function formilaSync(
  opts: Partial<FormilaOpts> = {} as FormilaOpts
) {
  return {
    html: renderFormSync(opts),
    style: renderStyleSync(),
  };
}

export async function formila(
  opts: Partial<FormilaOpts> = {} as FormilaOpts
) {
  return {
    html: await renderForm(opts),
    style: await renderStyle(),
  };
}

export default formila;

// @ts-check

/** Import project dependencies */
import parse5 from 'parse5';

export type Omit<T, U> = Pick<T, Exclude<keyof T, U>>;
export declare interface Attr {
  attr?: {
    [key: string]: string;
  };
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
  Attr,
  Omit<TitleSubTitle, 'subtitle'> {
  fieldTag: string;
  description?: string;
  errorMessage?: string;
}
export declare interface FormOptsFieldList extends Attr {
  elementList?: FormOptsSectionListFieldListElementListField[];
  nonElementList?: string[];
}
export declare interface FormOptsFieldsetList extends Attr, TitleSubTitle {
  fieldList?: FormOptsFieldList[];
}
export declare interface FormOptsSectionList extends Attr {
  fieldsetList?: FormOptsFieldsetList[];
}

export declare interface FormilaOpts extends Attr, TitleSubTitle {
  hiddenList?: FormOptsHiddenList[];
  sectionList?: FormOptsSectionList[];

  errorMessage?: string;
  submitTitle?: string;
}

export const ELEMENT_ID_REGEXP = /.*<(?:input|select)[\s\S]*\sid\=\"(.+?)\"[\s\S]*\>[\s\S]*/i;

function parseAttr(attr: NonNullable<Attr>, omit?: string|string[]) {
  const parsedOmit = omit == null
    ? []
    : Array.isArray(omit) ? omit : [omit];

  return parse5.serialize(parse5.parseFragment(
    Object.keys(attr)
      .reduce<string[]>((p, n) => {
        if (parsedOmit.length > 0 && parsedOmit.includes(n)) {
          return p;
        }

        return p.concat(`${n}=${attr[n]}`);
      }, [])
      .join(' ')
  ));
}

function parseNonElementList(
  nonElementList: NonNullable<FormOptsSectionListFieldList['nonElementList']>
) {
  return nonElementList.map((n) => {
    return n;
  })
    .join('');
}

function parseFieldTag(fieldTag: string, hasErrorMessage: boolean) {
  const parsedFragment = parse5.parseFragment(fieldTag);
  const newParsedFragment = {
    ...parsedFragment,
    childNodes: parsedFragment.childNodes.map((n) => {
      if (!Array.isArray(n.attrs) || !n.attrs.length) {
        return n;
      }

      const attrsMap = new Map([
        ...n.attrs.map(nn => [nn.name, nn.value]),
        ['aria-invalid', 'false'],
        ['aria-required', hasErrorMessage ? 'true' : 'false'],
      ]);

      if (hasErrorMessage && !attrsMap.has('required')) {
        attrsMap.set('required', '');
      }

      return {
        ...n,
        attrs: [...attrsMap].map(nn => ({ name: nn[0], value: nn[1] })),
      };
    }),
  };

  return parse5.serialize(newParsedFragment);
}

function parseElementList(
  elementList: NonNullable<FormOptsSectionListFieldList['elementList']>
) {
  return elementList.map((n, i) => {
    const parsedFieldTag = n.fieldTag == null
      ? ''
      : parseFieldTag(
        n.fieldTag,
        typeof n.errorMessage === 'string' && n.errorMessage.length > 0
      );
    const hasParsedFieldTag = typeof parsedFieldTag === 'string' && parsedFieldTag.length > 0;

    if (hasParsedFieldTag && !ELEMENT_ID_REGEXP.test(parsedFieldTag)) {
      throw new Error(
        `Missing required attribute 'id' in elementList[${i}] (${n.fieldTag})`
      );
    }

    const elementId = hasParsedFieldTag ? parsedFieldTag.replace(ELEMENT_ID_REGEXP, '$1') : '';

    console.log('# elementId', parsedFieldTag);

    return `<div class="form__label-container ${
      n.attr == null || n.attr.class == null ? '' : n.attr.class
    }" ${n.attr == null ? '' : parseAttr(n.attr, 'class')}>
      <label for="${elementId}">
        ${n.description == null ? '' : `<div class="prefixed-input has-description">`}

        ${n.title == null ? '' : `<div class="input-title">${n.title}</div>`}

        ${parsedFieldTag}

        ${
          n.description == null
            ? ''
            : `<div class="input-description">${n.description}</div>`
        }

        ${n.description == null ? '' : `</div>`}

        ${
          n.errorMessage == null
            ? ''
            : `<div class="error-msg" role="alert" aria-hidden="true">${n.errorMessage}</div>`
        }
      </label>
    </div>`;
  })
    .join('');
}

function parseHiddenList(hiddenList: NonNullable<FormilaOpts['hiddenList']>) {
  return `<fieldset>${
    hiddenList.map(n => `<input type="hidden" name="${n.name}" value="${n.value}">`).join('')
  }</fieldset>`;
}

function parseFieldsetList(fieldsetList: NonNullable<FormilaOpts['fieldsetList']>) {
  return `<div class="form__body">${
    fieldsetList.map((n) => {
      return `<fieldset ${n.attr == null ? '' : parseAttr(n.attr)}>
        ${n.title == null ? '' : `<legend class="fieldset__title">${n.title}</legend>`}
        ${n.subtitle == null ? '' : `<p class="fieldset__subtitle">${n.subtitle}</p>`}

        ${
          Array.isArray(n.sectionList) && n.sectionList.length > 0
            ? n.sectionList.map((ns) => {
              return `<section ${ns.attr == null ? '' : parseAttr(ns.attr)}>${
                Array.isArray(ns.elementList) && ns.elementList.length > 0
                  ? parseElementList(ns.elementList)
                  : Array.isArray(ns.nonElementList) && ns.nonElementList.length > 0
                    ? parseNonElementList(ns.nonElementList)
                    : ''
              }</section>`;
            }).join('')
            : ''
        }
      </fieldset>`;
    }).join('')
  }</div>`;
}

function renderFormStyle() {
  return parse5.serialize(parse5.parseFragment(`<style>
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
  fielset > .fieldset__subtitle {
    margin: 1em 0 0;
  }
  /** [END] Reset element style */

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
  label > input[type="radio"],
  label > .prefixed-input > input[type="radio"],
  label > .prefixed-input > input[type="checkbox"] {
    margin: 3px 8px 3px 3px;
  }
  label > input:not([type="radio"]):not([type="checkbox"])[aria-invalid=false],
  label:not(.is-invalid) > .prefixed-input,
  label.is-invalid > .prefixed-input + .error-msg,
  label > input[aria-invalid=true] + .error-msg,
  label > select {
    margin: 0 0 10px;
  }

  label > .prefixed-input > .input-description {
    font-size: .8em;
    font-style: italic;
    color: rgba(0, 0, 0, .75);
    color: var(--input-description-color, rgba(0, 0, 0, .75));
  }

  form > .form__error-msg,
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

  form.is-invalid > .form__error-msg,
  input[aria-invalid=true] + .error-msg,
  label.is-invalid > .error-msg,
  label.is-invalid > .prefixed-input + .error-msg {
    display: block;
    margin: 0 0 10px;
  }
  input[aria-invalid=true] {
    border: 1px solid #ff1744;
    border: 1px solid var(--error-color, #ff1744);
  }

  form > .form__error-msg {
    margin: 1.5em 0 1em;
  }

  .buttons-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    margin: 24px 40px 64px;
  }
  .buttons-container > button[type=submit],
  .buttons-container > button[type=button] {
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
  .buttons-container > button[type=submit]:focus,
  .buttons-container > button[type=submit]:active,
  .buttons-container > button[type=button]:focus,
  .buttons-container > button[type=button]:active {
    font-weight: 700;
  }
  .buttons-container > button[type=submit]::after,
  .buttons-container > button[type=button]::after {
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
  .buttons-container > button[type=submit]:focus::after,
  .buttons-container > button[type=submit]:active::after,
  .buttons-container > button[type=button]:focus::after,
  .buttons-container > button[type=button]:active::after {
    opacity: .1;
  }
</style>`));
}

export function renderForm(
  data: FormilaOpts
) {
  if (data == null) {
    return '';
  }

  const {
    attr,
    title,
    subtitle,

    hiddenList,

    sectionList,

    errorMessage,
    submitTitle,
  } = data;

  return parse5.serialize(parse5.parseFragment(`<form ${attr == null ? '' : parseAttr(attr)}>
  ${
    title == null
      ? ''
      : `<h1 class="form__title">${title}</h1>`
  }
  ${
    subtitle == null
      ? ''
      : `<p class="form_subtitle">${subtitle}</p>`
  }

  ${
    Array.isArray(hiddenList) && hiddenList.length > 0
      ? parseHiddenList(hiddenList)
      : ''
  }

  ${
    Array.isArray(fieldsetList) && fieldsetList.length > 0
    ? parseFieldsetList(fieldsetList)
    : ''
  }

  ${
    errorMessage == null
      ? ''
      : `<div class="form__error-message">${errorMessage}</div>`
  }

  <div class="buttons-container">
    <button type="submit">${submitTitle == null ? 'Submit' : submitTitle}</button>
  </div>
</form>`));
}

export function formilaSync(opts: FormilaOpts) {
  return {
    html: renderForm(opts),
    style: renderFormStyle(),
  };
}

export async function formila(opts: FormilaOpts) {
  return formilaSync(opts);
}

export default formila;

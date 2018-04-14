// @ts-check

export declare interface FormilaDataFieldsetField {
  // type: string;
  // attrs: {
  //   [key: string]: string | number | boolean;
  // };
  isPrefixed: boolean;
  fieldTag: string;
  description: string;
  errorMessage: string;
  // validateFn: (el: HTMLInputElement) => boolean;
  // eventHandler: (el: HTMLInputElement) => void;
}
export declare interface FormilaDataFieldset {
  title: string;
  field?: Partial<FormilaDataFieldsetField>[];
}
// export declare interface FormAttrs {
//   acceptCharset?: string;
//   action?: string;
//   autocomplete?: string; /** Defaults to 'on' */
//   enctype?: string; /** Defaults to 'url-encoded' */
//   method?: string; /** Defaults to 'GET'. */
//   name?: string;
//   novalidate?: boolean;
//   target?: string; /** Defaults to '_self' */
// }
// export declare interface FormilaDataAttrs extends FormAttrs {
//   [key: string]: any;
// }
export declare interface FormilaData {
  title: string;
  subtitle: string;
  attrTag: string;
  // attrs: {
  //   [key: string]: any;
  // };
  hidden: {
    name: string;
    value: string;
  }[];
  fieldset: Partial<FormilaDataFieldset>[];
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

function appendLabel(
  isPrefixed: FormilaDataFieldsetField['isPrefixed']
) {
  return function appendInput(
    data: Omit<FormilaDataFieldsetField, 'isPrefixed'>
  ) {
    const {
      description,
      errorMessage,
      fieldTag,
    } = data || {} as Omit<FormilaDataFieldsetField, 'isPrefixed'>;

    return html`${
      typeof isPrefixed !== 'boolean' || !isPrefixed
        ? ''
        : '<div class="prefixed-input">'
    }${
      fieldTag == null
        ? ''
        : html`${fieldTag}`
    }
    ${
      description == null
        ? ''
        : html`<span>${description}</span>`
    }
    ${
      isPrefixed ? '</div>' : ''
    }${
      errorMessage == null
        ? ''
        : html`<div class="error-msg">${errorMessage}</div>`
    }`;
  };
}

async function appendField(
  field: FormilaDataFieldset['field']
) {
  try {
    return (
      await Promise.all(field!.map((n) => {
        const {
          isPrefixed,
          ...restN
        } = n || {} as FormilaDataFieldsetField;

        return appendLabel(n.isPrefixed!)(
          restN as Omit<FormilaDataFieldsetField, 'isPrefiexed'>
        );
      }))
    )
      .join('\n');
  } catch (e) {
    throw e;
  }
}

async function appendFieldset(
  fieldset: FormilaData['fieldset']
) {
  try {
    return Array.isArray(fieldset) && fieldset.length > 0
      ? (
        await Promise.all(fieldset.map(async (n) => {
          return html`<fieldset>
            <h3>${n.title}</h3>

            <div>${
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
  hidden: FormilaData['hidden']
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

// async function appendAttrs(
//   attrs: FormilaData['attrs']
// ) {
//   return Object.keys(attrs)
//     .map((n) => {
//       return n === 'acceptCharset'
//         ? `accept-charset="${attrs[n]}"`
//         : `${n}="${attrs[n]}"`;
//     })
//     .join(' ');
// }

export async function formila(
  data: Partial<FormilaData> = {} as FormilaData
) {
  const {
    title,
    subtitle,
    attrTag,
    hidden = [] as FormilaData['hidden'],
    fieldset = [] as FormilaData['fieldset'],
    submitTitle,
  } = data;

  return html`<form${
    attrTag == null
      ? ''
      : html` ${attrTag.trim()}`
  }>
    ${
      title == null
        ? ''
        : html`<h2 class="form__title">title</h2>`
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

export default formila;

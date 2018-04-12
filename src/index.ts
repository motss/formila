// @ts-check

export declare interface FormilaDataFieldsetField {
  isPrefixed: boolean;
  attrs: {
    [key: string]: string | number | boolean;
  };
  description: string;
  errorMessage: string;
  validateFn: (el: HTMLInputElement) => boolean;
  eventHandler: (el: HTMLInputElement) => void;
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
  attrs: {
    [key: string]: any;
  };
  hidden: {
    name: string;
    value: string;
  }[];
  fieldset: Partial<FormilaDataFieldset>[];
}

/** Import project dependencies */
import { ntml } from 'lit-ntml';

/** Setting up */
const html = ntml({
  parseHtml: false,
  minify: false,
});

async function appendInput(
  data: Pick<FormilaDataFieldsetField, Exclude<keyof FormilaDataFieldsetField, 'isPrefixed'>>
) {
  return html``;
}

async function appendLabel(
  isPrefixed: FormilaDataFieldsetField['isPrefixed'],
) {
  return isPrefixed
    ? function appendPrefixedInput(
      data: Pick<FormilaDataFieldsetField, Exclude<keyof FormilaDataFieldsetField, 'isPrefixed'>>
    ) {
      return `<div class="prefixed-input">${data}<div>`;
    }
    : appendInput;
}

async function appendField(
  field: Required<FormilaDataFieldset['field']>
) {
  return field!.map((n) => {
    return appendLabel(n.isPrefixed!);
  }).join('\n');
}

async function appendFieldset(
  fieldset: FormilaData['fieldset']
) {
  return Array.isArray(fieldset) && fieldset.length > 0
    ? fieldset.map((n) => {
      return html`<fieldset>
        <h3>${n.title}</h3>

        <div>${
          Array.isArray(n.field) && n.field.length > 0
            ? appendField(n.field!)
            : ''
        }</div>
      </fieldset>`;
    }).join('\n')
    : '';
}

async function appendHidden(
  hidden: FormilaData['hidden']
) {
  return Array.isArray(hidden) && hidden.length > 0
    ? hidden!.map(
      n => `<input type="hidden" name="${n.name}" value="${n.value}"></input>`
    ).join('\n')
    : '';
}

async function appendAttrs(
  attrs: FormilaData['attrs']
) {
  return Object.keys(attrs)
    .map((n) => {
      return n === 'acceptCharset'
        ? `accept-charset="${attrs[n]}"`
        : `${n}="${attrs[n]}"`;
    })
    .join(' ');
}

export async function formila(
  data: Partial<FormilaData> = {} as FormilaData
) {
  const {
    title,
    subtitle,
    attrs = {},
    hidden = [] as FormilaData['hidden'],
    fieldset = [] as FormilaData['fieldset'],
  } = data;

  return html`<form ${appendAttrs(attrs)}>
    <div>${appendHidden(hidden)}</div>

    ${appendFieldset(fieldset)}
  </form>`;
}

export default formila;

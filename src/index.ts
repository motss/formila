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
export declare interface FormOptsElementList extends
  Attr,
  Omit<TitleSubTitle, 'subtitle'> {
  fieldTag: string;
  description?: string;
  errorMessage?: string;
}
export declare interface FormOptsFieldList extends Attr {
  elementList?: FormOptsElementList[];
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
  elementList: NonNullable<FormOptsElementList[]>
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

    return `<div class="form__label-container ${
      n.attr == null || n.attr.class == null ? '' : n.attr.class
    }" ${n.attr == null ? '' : parseAttr(n.attr, 'class')}>
      <label for="${elementId}">
        ${n.title == null ? '' : `<div class="input-title">${n.title}</div>`}

        ${
          hasParsedFieldTag
            ? `<div class="input-container">${parsedFieldTag}</div>`
            : ''
        }

        ${
          n.description == null
            ? ''
            : `<div class="input-description">${n.description}</div>`
        }

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

function parseHiddenList(hiddenList: NonNullable<FormOptsHiddenList[]>) {
  return `<fieldset class="form__fieldset-hidden">${
    hiddenList.map(n => `<input type="hidden" name="${n.name}" value="${n.value}">`).join('')
  }</fieldset>`;
}

function parseFieldsetList(fieldsetList: NonNullable<FormOptsFieldsetList[]>) {
  return fieldsetList.map((n) => {
    return `<fieldset class="form_fieldset ${
      n.attr == null || n.attr.class == null ? '' : n.attr.class
    }" ${n.attr == null ? '' : parseAttr(n.attr, 'class')}>
      ${n.title == null ? '' : `<legend class="form-fieldset__title">${n.title}</legend>`}
      ${n.subtitle == null ? '' : `<p class="form-fieldset__subtitle">${n.subtitle}</p>`}

      ${
        Array.isArray(n.fieldList) && n.fieldList.length > 0
          ? n.fieldList.map((fn) => {
            return `<div class="form-fieldset__field">${
              Array.isArray(fn.elementList) && fn.elementList.length > 0
                ? parseElementList(fn.elementList)
                : Array.isArray(fn.nonElementList) && fn.nonElementList.length > 0
                  ? `<div class="form-fieldset-field__non-element">${
                    fn.nonElementList.join('')
                  }</div>`
                  : ''
            }</div>`;
          })
            .join('')
          : ''
      }
    </fieldset>`;
  })
    .join('');
}

function parseSectionList(sectionList: NonNullable<FormOptsSectionList[]>) {
  return sectionList.map((n) => {
    return `<section class="form__section ${
      n.attr == null || n.attr.class == null ? '' : n.attr.class
    }" ${n.attr == null ? '' : parseAttr(n.attr, 'class')}>${
      Array.isArray(n.fieldsetList) && n.fieldsetList.length > 0
        ? parseFieldsetList(n.fieldsetList)
        : ''
    }</section>`;
  })
    .join('');
}

function renderFormStyle() {
  return parse5.serialize(parse5.parseFragment(`<style>

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
    Array.isArray(sectionList) && sectionList.length > 0
      ? `<div class="form__body">${parseSectionList(sectionList)}</div>`
      : ''
  }

  ${
    errorMessage == null
      ? ''
      : `<div class="form__error-msg" role="alert" aria-hidden="true">${errorMessage}</div>`
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

// @ts-check

function debouncer(cb, wait = 150, immediate = true) {
  let timeout = null;

  return function debounce(...args) {
    let context = this;

    clearTimeout(timeout);

    timeout = setTimeout(function later() {
      timeout = null;
      if (!immediate) {
        cb.apply(context, args);
      }
    }, wait);

    if (immediate && !(timeout === null)) {
      cb.apply(context, args);
    }
  };
}

function updateLabelValidCls(attrId, isValid) {
  const labelEl = document.querySelector(`label[for="${attrId}"]`);

  if (labelEl == null) return;

  if (isValid) {
    labelEl.classList.remove('is-invalid');
  } else {
    labelEl.classList.add('is-invalid');
  }
}

async function initEventListeners() {
  const allValidatableEl = Array.prototype.concat.apply(
    [],
    [
      'input:not([type="hidden"]):not([disabled]):not([disabled="true"])',
      'select:not([disabled]):not([disabled="true"])',
    ].map(n => Array.from(document.querySelectorAll(n))));

  allValidatableEl.map((n) => {
    n.addEventListener('invalid', (ev) => {
      const targetEl = ev.target;

      targetEl.setAttribute('aria-invalid', 'true');
      updateLabelValidCls(targetEl.getAttribute('id'), false);
    });

    n.addEventListener('change', debouncer((ev) => {
      const targetEl = ev.target;
      const isValid = targetEl.checkValidity();

      if (isValid && targetEl.getAttribute('aria-invalid') === 'true') {
        targetEl.setAttribute('aria-invalid', 'false');
        updateLabelValidCls(targetEl.getAttribute('id'), isValid);
      }

      if (!isValid) {
        targetEl.setAttribute('aria-invalid', 'false');
        updateLabelValidCls(targetEl.getAttribute('id'), isValid);
      }
    }));
  });
}

async function setupForm() {
  const formEl = document.querySelector('form:not([disabled]):not([disabled="true"])');

  if (formEl == null) return;

  formEl.addEventListener('submit', (ev) => {
    ev.preventDefault();
    ev.stopImmediatePropagation();

    const isFormValid = formEl.checkValidity();

    const invalidValidatableEl = Array.prototype.concat.apply(
      [],
      [
        'label.is-invalid > input:not([type="hidden"])[aria-invalid="true"]',
        'label.is-invalid > select:not([disabled]):not([disabled="true"])',
        'input:not([type="hidden"])[aria-invalid="true"]',
        'select:not([disabled]):not([disabled="true"])[aria-invalid="true"]',
      ].map(n => document.querySelector(n))
    )[0];

    if (isFormValid && invalidValidatableEl == null) {
      formEl.submit();
      return;
    }

    formEl.classList.add('is-invalid');

    window.requestAnimationFrame(() => {
      invalidValidatableEl.focus();
    });
  });
}

window.addEventListener('load', async () => {
  try {
    await initEventListeners();
    await setupForm();
  } catch (e) {
    console.error('👎 Error setting up form', e);
  }
});

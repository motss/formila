// @ts-check

function countFileSize(fileSize) {
  switch (true) {
    case fileSize < 1e3: return `${(fileSize / 1e3).toFixed(2)} B`;
    case fileSize / 1e3 < 1e3: return `${(fileSize / 1e3).toFixed(2)} KB`;
    case fileSize / 1e6 < 1e3: return `${(fileSize / 1e6).toFixed(2)} MB`;
    case fileSize / 1e9 < 1e3: return `${(fileSize / 1e9).toFixed(2)} GB`;
    case fileSize / 1e12 < 1e3: return `${(fileSize / 1e12).toFixed(2)} TB`;
    case fileSize / 1e15 < 1e3: return `${(fileSize / 1e15).toFixed(2)} PB`;
    default: return `File (> ${(fileSize / 1e15).toFixed(2)} PB) too big to be analyzed its file size!`;
  }
}

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

  /** NOTE: input[type=file] validator */
  const inputFileEl = document.querySelector('input[type="file"]');

  inputFileEl.addEventListener('change', (ev) => {
    const targetEl = ev.target;
    const uploadFile = Array.from(targetEl.files).find(n => n.name && n.size >= 0);
    const approvalLetterLabelEl = document.querySelector('label[for="approvalLetter"]');

    /** NOTE: handle error when there is file that exceeds 300KB file size limit */
    if (uploadFile == null || uploadFile.size > 300e3) {
      const inputFileErrorMsgEl = approvalLetterLabelEl.querySelector('.error-msg');

      if (inputFileErrorMsgEl) {
        inputFileErrorMsgEl.textContent = `Unable to upload file (${uploadFile.name}) that exceeds 300KB (${countFileSize(uploadFile.size)})!`;
      }

      approvalLetterLabelEl && approvalLetterLabelEl.classList.add('is-invalid');
      inputFileEl.setAttribute('aria-invalid', 'true');

      return;
    }

    const inputFileSizeEl = document.querySelector('.input-file__file-size');

    if (inputFileSizeEl) {
      inputFileEl.setAttribute('aria-invalid', 'false');
      approvalLetterLabelEl && approvalLetterLabelEl.classList.remove('is-invalid');
      inputFileSizeEl.textContent = `File is ready to be uploaded. Total size is ${countFileSize(uploadFile.size)}.`
    }
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

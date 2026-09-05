// ==========================================================================
// Shared vehicle card renderer (used by the inventory grid and the
// homepage's featured-vehicles strip)
// ==========================================================================
const VEHICLE_CARD_ICONS = {
  calendar: '<svg class="icon" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>',
  clock: '<svg class="icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 3"></path></svg>',
};

function vehicleCardHTML(v) {
  const isAr = I18N.getLang() === 'ar';
  const name = isAr && v.ar ? v.ar.name : v.name;
  const category = I18N.translateEnum('category', v.category);
  const badgeText = v.condition === 'Like New' ? I18N.t('inv.likeNew') : I18N.t('inv.certified');
  const price = I18N.formatPrice(v.priceValue);

  return `
    <article class="vehicle-card" data-category="${v.category}">
      <a href="vehicle.html?id=${v.id}" class="vehicle-card__media">
        <span class="vehicle-card__badge">${badgeText}</span>
        <span class="vehicle-card__year">${v.year}</span>
        <img src="${v.image}" alt="${name}" loading="lazy" />
      </a>
      <div class="vehicle-card__body">
        <h3>${name}</h3>
        <div class="vehicle-card__meta">
          <span>${VEHICLE_CARD_ICONS.calendar}${v.year}</span>
          <span>${VEHICLE_CARD_ICONS.clock}${v.mileage}</span>
        </div>
        <div class="vehicle-card__footer">
          <div class="vehicle-card__price">${price}<span>${category}</span></div>
          <a href="vehicle.html?id=${v.id}" class="btn btn-ghost btn-sm">${I18N.t('common.seeDetails')}</a>
        </div>
      </div>
    </article>
  `;
}

// ==========================================================================
// Homepage — featured vehicles strip
// ==========================================================================
(function initFeatured() {
  const grid = document.querySelector('[data-featured-grid]');
  if (!grid || typeof VEHICLES === 'undefined') return;

  const ids = grid.getAttribute('data-featured-grid').split(',').map((s) => s.trim()).filter(Boolean);

  function render() {
    const list = ids.map((id) => findVehicle(id)).filter(Boolean);
    grid.innerHTML = list.map(vehicleCardHTML).join('');
  }

  document.addEventListener('i18n:change', render);
  document.addEventListener('currency:change', render);
  render();
})();

// ==========================================================================
// Inventory grid: search, brand/price filters, category chips, sort
// ==========================================================================
(function initInventory() {
  const grid = document.querySelector('[data-inventory-grid]');
  if (!grid || typeof VEHICLES === 'undefined') return;

  const searchInput = document.querySelector('#inventory-search');
  const brandSelect = document.querySelector('#brand-filter');
  const priceSelect = document.querySelector('#price-filter');
  const sortSelect = document.querySelector('#sort-select');
  const chips = document.querySelectorAll('.filter-chip');
  const emptyState = document.querySelector('.empty-state');
  const resultsCount = document.querySelector('.results-count');

  const state = { search: '', brand: 'all', price: 'all', category: 'all', sort: 'featured' };

  if (brandSelect) {
    const brands = [...new Set(VEHICLES.map((v) => v.make))].sort();
    brands.forEach((brand) => {
      const opt = document.createElement('option');
      opt.value = brand;
      opt.textContent = brand;
      brandSelect.appendChild(opt);
    });
  }

  function render() {
    let list = VEHICLES.filter((v) => {
      if (state.category !== 'all' && v.category !== state.category) return false;
      if (state.brand !== 'all' && v.make !== state.brand) return false;

      if (state.price !== 'all') {
        const [min, max] = state.price.split('-').map(Number);
        if (v.priceValue < min || v.priceValue > max) return false;
      }

      if (state.search) {
        const haystack = `${v.make} ${v.model} ${v.name} ${v.ar ? v.ar.name : ''}`.toLowerCase();
        if (!haystack.includes(state.search)) return false;
      }

      return true;
    });

    switch (state.sort) {
      case 'price-asc':
        list = list.slice().sort((a, b) => a.priceValue - b.priceValue);
        break;
      case 'price-desc':
        list = list.slice().sort((a, b) => b.priceValue - a.priceValue);
        break;
      case 'year-desc':
        list = list.slice().sort((a, b) => Number(b.year) - Number(a.year));
        break;
      case 'year-asc':
        list = list.slice().sort((a, b) => Number(a.year) - Number(b.year));
        break;
      case 'brand-asc':
        list = list.slice().sort((a, b) => a.make.localeCompare(b.make) || a.model.localeCompare(b.model));
        break;
      default:
        break;
    }

    grid.innerHTML = list.map(vehicleCardHTML).join('');

    if (emptyState) emptyState.setAttribute('data-visible', String(list.length === 0));
    if (resultsCount) {
      resultsCount.textContent = `${I18N.t('inv.showing')} ${list.length} ${I18N.t('inv.of')} ${VEHICLES.length} ${I18N.t('inv.vehicles')}`;
    }
  }

  searchInput?.addEventListener('input', () => {
    state.search = searchInput.value.trim().toLowerCase();
    render();
  });

  brandSelect?.addEventListener('change', () => {
    state.brand = brandSelect.value;
    render();
  });

  priceSelect?.addEventListener('change', () => {
    state.price = priceSelect.value;
    render();
  });

  sortSelect?.addEventListener('change', () => {
    state.sort = sortSelect.value;
    render();
  });

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => c.setAttribute('aria-pressed', 'false'));
      chip.setAttribute('aria-pressed', 'true');
      state.category = chip.getAttribute('data-filter');
      render();
    });
  });

  document.addEventListener('i18n:change', render);
  document.addEventListener('currency:change', render);

  render();
})();

// ==========================================================================
// Export inventory card renderer (Germany-sourced export vehicles). Prices
// are always EUR — export pricing isn't run through the site's USD-based
// currency switcher.
// ==========================================================================
const EXPORT_CARD_ICONS = {
  gauge: '<svg class="icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"></circle><path d="M12 12 8.5 8.5"></path></svg>',
  fuel: '<svg class="icon" viewBox="0 0 24 24"><path d="M3 22V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16"></path><path d="M3 10h10"></path><path d="M13 8l3.5 3.5V18a1.5 1.5 0 0 0 3 0v-6.5L16 8"></path></svg>',
  bolt: '<svg class="icon" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>',
};

function formatEUR(value) {
  return '€' + Math.round(Number(value)).toLocaleString('en-DE');
}

function exportCardHTML(v) {
  const fuelLabel = v.fuel === 'Diesel' ? I18N.t('export.fuelDiesel') : I18N.t('export.fuelPetrol');
  const vatBadge = v.vatStatus === 'deductible'
    ? `<span class="pill pill--accent">${I18N.t('export.vatDeductible')}</span>`
    : `<span class="pill">${I18N.t('export.marginTaxed')}</span>`;
  const accidentBadge = v.accidentFree ? `<span class="pill">${I18N.t('export.accidentFree')}</span>` : '';
  const titleWarning = !v.titleAvailable
    ? `<span class="vehicle-card__warning">${I18N.t('export.titleMissing')}</span>`
    : '';

  return `
    <article class="vehicle-card vehicle-card--export">
      <div class="vehicle-card__media vehicle-card__media--placeholder">
        <span class="vehicle-card__badge">🇩🇪 ${I18N.t('export.origin')}</span>
        <span class="vehicle-card__year">${v.year}</span>
        <svg class="vehicle-card__media-icon" viewBox="0 0 24 24"><path d="M3 17h1M20 17h1M5 17a2 2 0 1 0 4 0h6a2 2 0 1 0 4 0M4 17V11l2-5h11l3 5v6"></path></svg>
        ${titleWarning}
      </div>
      <div class="vehicle-card__body">
        <h3>${v.make} ${v.model} <span style="color: var(--color-text-faint); font-weight: 500;">${v.trim}</span></h3>
        <div class="vehicle-card__meta">
          <span>${EXPORT_CARD_ICONS.gauge}${v.mileageKm.toLocaleString('en-DE')} km</span>
          <span>${EXPORT_CARD_ICONS.fuel}${fuelLabel}</span>
          <span>${EXPORT_CARD_ICONS.bolt}${v.powerPS} PS</span>
        </div>
        <div class="vehicle-card__tags">${accidentBadge}${vatBadge}</div>
        <div class="vehicle-card__footer">
          <div class="vehicle-card__price">${formatEUR(v.netPriceEUR)}<span>${I18N.t('export.netPriceNote')}</span></div>
          <a href="contact.html" class="btn btn-ghost btn-sm">${I18N.t('export.enquire')}</a>
        </div>
      </div>
    </article>
  `;
}

// ==========================================================================
// Export inventory grid: search, brand/price/fuel filters, sort
// ==========================================================================
(function initExportInventory() {
  const grid = document.querySelector('[data-export-grid]');
  if (!grid || typeof EXPORT_VEHICLES === 'undefined') return;

  const searchInput = document.querySelector('#export-search');
  const brandSelect = document.querySelector('#export-brand-filter');
  const priceSelect = document.querySelector('#export-price-filter');
  const sortSelect = document.querySelector('#export-sort-select');
  const chips = document.querySelectorAll('.export-filter-chip');
  const emptyState = document.querySelector('.export-empty-state');
  const resultsCount = document.querySelector('.export-results-count');

  const state = { search: '', brand: 'all', price: 'all', fuel: 'all', sort: 'featured' };

  if (brandSelect) {
    const brands = [...new Set(EXPORT_VEHICLES.map((v) => v.make))].sort();
    brands.forEach((brand) => {
      const opt = document.createElement('option');
      opt.value = brand;
      opt.textContent = brand;
      brandSelect.appendChild(opt);
    });
  }

  function render() {
    let list = EXPORT_VEHICLES.filter((v) => {
      if (state.fuel !== 'all' && v.fuel !== state.fuel) return false;
      if (state.brand !== 'all' && v.make !== state.brand) return false;

      if (state.price !== 'all') {
        const [min, max] = state.price.split('-').map(Number);
        if (v.netPriceEUR < min || v.netPriceEUR > max) return false;
      }

      if (state.search) {
        const haystack = `${v.make} ${v.model} ${v.trim}`.toLowerCase();
        if (!haystack.includes(state.search)) return false;
      }

      return true;
    });

    switch (state.sort) {
      case 'price-asc':
        list = list.slice().sort((a, b) => a.netPriceEUR - b.netPriceEUR);
        break;
      case 'price-desc':
        list = list.slice().sort((a, b) => b.netPriceEUR - a.netPriceEUR);
        break;
      case 'mileage-asc':
        list = list.slice().sort((a, b) => a.mileageKm - b.mileageKm);
        break;
      case 'year-desc':
        list = list.slice().sort((a, b) => b.year - a.year);
        break;
      default:
        break;
    }

    grid.innerHTML = list.map(exportCardHTML).join('');

    if (emptyState) emptyState.setAttribute('data-visible', String(list.length === 0));
    if (resultsCount) {
      resultsCount.textContent = `${I18N.t('export.showing')} ${list.length} ${I18N.t('export.of')} ${EXPORT_VEHICLES.length} ${I18N.t('export.vehicles')}`;
    }
  }

  searchInput?.addEventListener('input', () => {
    state.search = searchInput.value.trim().toLowerCase();
    render();
  });

  brandSelect?.addEventListener('change', () => {
    state.brand = brandSelect.value;
    render();
  });

  priceSelect?.addEventListener('change', () => {
    state.price = priceSelect.value;
    render();
  });

  sortSelect?.addEventListener('change', () => {
    state.sort = sortSelect.value;
    render();
  });

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => c.setAttribute('aria-pressed', 'false'));
      chip.setAttribute('aria-pressed', 'true');
      state.fuel = chip.getAttribute('data-filter');
      render();
    });
  });

  document.addEventListener('i18n:change', render);

  render();
})();

// ==========================================================================
// Mobile navigation toggle
// ==========================================================================
(function initNav() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    links.setAttribute('data-open', String(!isOpen));
  });

  links.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      links.setAttribute('data-open', 'false');
    });
  });
})();

// ==========================================================================
// Mobile navigation: relocate language/currency switcher, phone, and the
// "Get In Touch" CTA into the slide-down menu on narrow screens so the top
// bar never overflows. Moves the same nodes back on wider screens.
// ==========================================================================
(function initNavResponsiveActions() {
  const actions = document.querySelector('.navbar__actions');
  const navLinks = document.querySelector('.nav-links');
  const navToggleEl = document.querySelector('.nav-toggle');
  const prefSwitcher = document.querySelector('.navbar__actions .pref-switcher');
  const phone = document.querySelector('.navbar__actions .navbar__phone');
  const ctaBtn = document.querySelector('.navbar__actions > .btn');
  if (!actions || !navLinks || !navToggleEl || !prefSwitcher || !phone) return;

  const mobileExtra = document.createElement('li');
  mobileExtra.className = 'nav-mobile-extra';

  const mq = window.matchMedia('(max-width: 860px)');

  function apply(isMobile) {
    if (isMobile) {
      mobileExtra.appendChild(prefSwitcher);
      mobileExtra.appendChild(phone);
      if (ctaBtn) mobileExtra.appendChild(ctaBtn);
      navLinks.appendChild(mobileExtra);
    } else {
      actions.insertBefore(prefSwitcher, navToggleEl);
      actions.insertBefore(phone, navToggleEl);
      if (ctaBtn) actions.insertBefore(ctaBtn, navToggleEl);
      if (mobileExtra.parentNode) mobileExtra.remove();
    }
  }

  apply(mq.matches);
  mq.addEventListener('change', (event) => apply(event.matches));
})();

// ==========================================================================
// Navbar "More" dropdown
// ==========================================================================
(function initNavDropdown() {
  const dropdown = document.querySelector('.nav-dropdown');
  if (!dropdown) return;

  const toggle = dropdown.querySelector('.nav-dropdown__toggle');

  function close() {
    dropdown.setAttribute('data-open', 'false');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', () => {
    const isOpen = dropdown.getAttribute('data-open') === 'true';
    dropdown.setAttribute('data-open', String(!isOpen));
    toggle.setAttribute('aria-expanded', String(!isOpen));
  });

  document.addEventListener('click', (event) => {
    if (!dropdown.contains(event.target)) close();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') close();
  });
})();

// ==========================================================================
// Vehicle detail page (reads ?id= and populates from VEHICLES data)
// ==========================================================================
(function initVehicleDetail() {
  const root = document.querySelector('[data-detail-root]');
  if (!root || typeof VEHICLES === 'undefined') return;

  const params = new URLSearchParams(window.location.search);
  const vehicle = findVehicle(params.get('id'));

  if (!vehicle) {
    document.querySelector('[data-field="name"]').textContent = I18N.t('veh.notFound');
    root.innerHTML = '<p>We couldn’t find that vehicle — it may have sold. <a href="inventory.html" style="color: var(--color-accent);">Browse the full inventory</a>.</p>';
    return;
  }

  const bookLink = document.querySelector('#book-test-drive-link');
  if (bookLink) bookLink.href = `book-test-drive.html?id=${vehicle.id}`;

  const financeLink = document.querySelector('#financing-link');
  if (financeLink) financeLink.href = `financing.html?id=${vehicle.id}`;

  const featuresEl = document.querySelector('[data-field="features"]');
  const mainEl = document.querySelector('[data-field="gallery-main"]');
  const thumbsEl = document.querySelector('[data-field="gallery-thumbs"]');
  let shotIndex = 0;

  const setText = (field, value) => {
    document.querySelectorAll(`[data-field="${field}"]`).forEach((el) => {
      el.textContent = value;
    });
  };

  function showShot(index) {
    shotIndex = index;
    const shot = vehicle.gallery[index];
    mainEl.innerHTML = `<img src="${shot.src}" alt="${shot.alt}" />`;
    thumbsEl.querySelectorAll('.gallery__thumb').forEach((thumb, i) => {
      thumb.setAttribute('aria-current', String(i === index));
    });
  }

  function render() {
    const isAr = I18N.getLang() === 'ar';
    const name = isAr && vehicle.ar ? vehicle.ar.name : vehicle.name;
    const description = isAr && vehicle.ar ? vehicle.ar.description : vehicle.description;
    const color = isAr && vehicle.ar ? vehicle.ar.color : vehicle.color;
    const features = isAr && vehicle.ar ? vehicle.ar.features : vehicle.features;
    const condition = I18N.translateEnum('condition', vehicle.condition);
    const category = I18N.translateEnum('category', vehicle.category);
    const fuel = I18N.translateEnum('fuel', vehicle.fuel);
    const transmission = I18N.translateEnum('transmission', vehicle.transmission);

    document.title = `${name} — 21 Automotive`;

    setText('category', category);
    setText('name', name);
    setText('name-panel', name);
    setText('condition', condition);
    setText('price', I18N.formatPrice(vehicle.priceValue));
    setText('year', vehicle.year);
    setText('mileage', vehicle.mileage);
    setText('fuel', fuel);
    setText('transmission', transmission);
    setText('color', color);
    setText('category-chip', category);
    setText('description', description);

    featuresEl.innerHTML = '';
    features.forEach((feature) => {
      const li = document.createElement('li');
      li.innerHTML = `<svg class="icon" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg><span>${feature}</span>`;
      featuresEl.appendChild(li);
    });
  }

  thumbsEl.innerHTML = '';
  vehicle.gallery.forEach((shot, index) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'gallery__thumb';
    btn.setAttribute('aria-label', `View photo: ${shot.alt}`);
    btn.innerHTML = `<img src="${shot.src}" alt="" loading="lazy" />`;
    btn.addEventListener('click', () => showShot(index));
    thumbsEl.appendChild(btn);
  });

  document.addEventListener('i18n:change', render);
  document.addEventListener('currency:change', render);

  showShot(0);
  render();
})();

// ==========================================================================
// Contact form (client-side only — no backend wired up)
// ==========================================================================
(function initForms() {
  document.querySelectorAll('form[novalidate]:not(#booking-form):not(#finance-form)').forEach((form) => {
    const success = form.parentElement.querySelector('.form-success');
    const requiredFields = form.querySelectorAll('[required]');

    requiredFields.forEach((field) => {
      field.addEventListener('input', () => {
        if (field.validity.valid) field.classList.remove('is-invalid');
      });
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      if (!form.checkValidity()) {
        requiredFields.forEach((field) => {
          field.classList.toggle('is-invalid', !field.validity.valid);
        });
        form.reportValidity();
        return;
      }

      requiredFields.forEach((field) => field.classList.remove('is-invalid'));

      if (success) {
        success.setAttribute('data-visible', 'true');
        success.focus();
      }
      form.reset();
    });
  });
})();

// ==========================================================================
// Book a Test Drive page — vehicle picker, live summary, API submission
// ==========================================================================
(function initBookingPage() {
  const form = document.querySelector('#booking-form');
  if (!form || typeof VEHICLES === 'undefined') return;

  const vehicleSelect = document.querySelector('#vehicle-select');
  const summaryEl = document.querySelector('[data-field="vehicle-summary"]');
  const dateInput = document.querySelector('#bk-date');
  const success = document.querySelector('.form-success');
  const error = document.querySelector('.form-error');
  const submitBtn = document.querySelector('#booking-submit');

  function renderVehicleOptions() {
    const isAr = I18N.getLang() === 'ar';
    const currentValue = vehicleSelect.value;
    vehicleSelect.querySelectorAll('option[data-vehicle-option]').forEach((opt) => opt.remove());
    VEHICLES.forEach((v) => {
      const opt = document.createElement('option');
      opt.value = v.id;
      opt.setAttribute('data-vehicle-option', '1');
      const name = isAr && v.ar ? v.ar.name : v.name;
      opt.textContent = `${name} — ${I18N.formatPrice(v.priceValue)}`;
      vehicleSelect.appendChild(opt);
    });
    if (currentValue) vehicleSelect.value = currentValue;
  }

  renderVehicleOptions();

  const params = new URLSearchParams(window.location.search);
  const preselectId = params.get('id');
  if (preselectId && findVehicle(preselectId)) {
    vehicleSelect.value = preselectId;
  }

  function renderSummary() {
    const vehicle = findVehicle(vehicleSelect.value);
    const isAr = I18N.getLang() === 'ar';

    if (!vehicle) {
      summaryEl.innerHTML = `
        <div class="vehicle-summary__thumb">
          <svg class="icon" viewBox="0 0 24 24" width="28" height="28"><rect x="1" y="6" width="18" height="10" rx="2"></rect><path d="M19 10h2.5a1 1 0 0 1 .9.55L23.5 13.5V16a1 1 0 0 1-1 1H21"></path><circle cx="6" cy="17" r="2"></circle><circle cx="17" cy="17" r="2"></circle></svg>
        </div>
        <div class="vehicle-summary__body">
          <h3>${I18N.t('btd.generalInquiry')}</h3>
          <p>${I18N.t('btd.noVehicleSelected')}</p>
        </div>
      `;
      return;
    }

    const name = isAr && vehicle.ar ? vehicle.ar.name : vehicle.name;

    summaryEl.innerHTML = `
      <div class="vehicle-summary__thumb">
        <img src="${vehicle.image}" alt="${name}" />
      </div>
      <div class="vehicle-summary__body">
        <h3>${name}</h3>
        <p>${vehicle.year} &middot; ${vehicle.mileage} &middot; <span class="vehicle-summary__price">${I18N.formatPrice(vehicle.priceValue)}</span></p>
      </div>
    `;
  }

  vehicleSelect.addEventListener('change', renderSummary);

  document.addEventListener('i18n:change', () => {
    renderVehicleOptions();
    renderSummary();
  });
  document.addEventListener('currency:change', () => {
    renderVehicleOptions();
    renderSummary();
  });

  renderSummary();

  if (dateInput) {
    dateInput.min = new Date().toISOString().split('T')[0];
  }

  const requiredFields = form.querySelectorAll('[required]');
  requiredFields.forEach((field) => {
    field.addEventListener('input', () => {
      if (field.validity.valid) field.classList.remove('is-invalid');
    });
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    error?.setAttribute('data-visible', 'false');

    if (!form.checkValidity()) {
      requiredFields.forEach((field) => {
        field.classList.toggle('is-invalid', !field.validity.valid);
      });
      form.reportValidity();
      return;
    }
    requiredFields.forEach((field) => field.classList.remove('is-invalid'));

    const vehicle = findVehicle(vehicleSelect.value);
    const payload = {
      vehicleId: vehicleSelect.value || null,
      vehicleName: vehicle ? vehicle.name : null,
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      date: form.date.value,
      time: form.time.value,
      message: form.message.value.trim(),
      depositRequested: form.depositRequested.checked,
    };

    submitBtn.disabled = true;
    submitBtn.textContent = I18N.t('common.submitting');

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.details ? data.details.join(', ') : data.error || 'Request failed');
      }

      if (success) {
        success.querySelector('[data-field="success-message"]').textContent = data.message;
        success.setAttribute('data-visible', 'true');
        success.focus();
      }
      form.reset();
      vehicleSelect.value = preselectId && findVehicle(preselectId) ? preselectId : '';
      renderSummary();
    } catch (err) {
      if (error) {
        error.querySelector('[data-field="error-message"]').textContent =
          'Could not submit your request — the booking service may be offline. Please call us instead, or try again in a moment.';
        error.setAttribute('data-visible', 'true');
        error.focus();
      }
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = I18N.t('btd.submit');
    }
  });
})();

// ==========================================================================
// Financing — loan calculator
// ==========================================================================
(function initLoanCalculator() {
  const priceRange = document.querySelector('#calc-price-range');
  if (!priceRange) return;

  const priceNumber = document.querySelector('#calc-price');
  const downRange = document.querySelector('#calc-down-range');
  const downNumber = document.querySelector('#calc-down');
  const rateRange = document.querySelector('#calc-rate-range');
  const rateNumber = document.querySelector('#calc-rate');
  const termSelect = document.querySelector('#calc-term');

  const fmtUSD = (n) => `$${Math.round(n).toLocaleString('en-US')}`;

  function syncPair(rangeEl, numberEl, onChange) {
    rangeEl.addEventListener('input', () => {
      numberEl.value = rangeEl.value;
      onChange();
    });
    numberEl.addEventListener('input', () => {
      const val = Number(numberEl.value);
      if (!Number.isNaN(val) && val >= Number(rangeEl.min) && val <= Number(rangeEl.max)) {
        rangeEl.value = val;
      }
      onChange();
    });
  }

  function calculate() {
    const price = Math.max(0, Number(priceNumber.value) || 0);

    // Down payment can never exceed the vehicle price.
    downRange.max = String(price);
    if (Number(downNumber.value) > price) {
      downNumber.value = price;
      downRange.value = price;
    }
    const down = Math.max(0, Number(downNumber.value) || 0);

    const rate = Math.max(0, Number(rateNumber.value) || 0);
    const term = Number(termSelect.value);

    const principal = Math.max(0, price - down);
    const monthlyRate = rate / 100 / 12;

    let monthlyPayment;
    if (monthlyRate === 0) {
      monthlyPayment = term > 0 ? principal / term : 0;
    } else {
      const factor = Math.pow(1 + monthlyRate, term);
      monthlyPayment = (principal * monthlyRate * factor) / (factor - 1);
    }
    if (!Number.isFinite(monthlyPayment)) monthlyPayment = 0;

    const totalCost = monthlyPayment * term;
    const totalInterest = Math.max(0, totalCost - principal);

    const moLabel = I18N.t('fin.mo');
    document.querySelector('[data-field="price-display"]').textContent = fmtUSD(price);
    document.querySelector('[data-field="down-display"]').textContent = fmtUSD(down);
    document.querySelector('[data-field="rate-display"]').textContent = `${rate.toFixed(1)}%`;
    document.querySelector('[data-field="monthly-payment"]').textContent = `${fmtUSD(monthlyPayment)}/${moLabel}`;
    document.querySelector('[data-field="loan-amount"]').textContent = fmtUSD(principal);
    document.querySelector('[data-field="loan-term"]').textContent = `${term} ${moLabel}`;
    document.querySelector('[data-field="total-interest"]').textContent = fmtUSD(totalInterest);
    document.querySelector('[data-field="total-cost"]').textContent = fmtUSD(totalCost);

    return { price, down, rate, term, monthlyPayment };
  }

  syncPair(priceRange, priceNumber, calculate);
  syncPair(downRange, downNumber, calculate);
  syncPair(rateRange, rateNumber, calculate);
  termSelect.addEventListener('change', calculate);

  // Arriving from a vehicle's detail page — prefill with that car's price.
  if (typeof VEHICLES !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const vehicle = findVehicle(params.get('id'));
    if (vehicle) {
      const suggestedDown = Math.round((vehicle.priceValue * 0.1) / 500) * 500;
      priceRange.max = String(Math.max(200000, vehicle.priceValue + 10000));
      priceRange.value = vehicle.priceValue;
      priceNumber.value = vehicle.priceValue;
      downRange.value = suggestedDown;
      downNumber.value = suggestedDown;
    }
  }

  document.addEventListener('i18n:change', calculate);

  window.__financeCalc = calculate;
  calculate();
})();

// ==========================================================================
// Financing — pre-qualification form
// ==========================================================================
(function initFinanceForm() {
  const form = document.querySelector('#finance-form');
  if (!form) return;

  const budgetSelect = document.querySelector('#fin-budget');
  const success = document.querySelector('.form-success');
  const error = document.querySelector('.form-error');
  const submitBtn = form.querySelector('button[type="submit"]');

  const params = new URLSearchParams(window.location.search);
  const vehicle = typeof VEHICLES !== 'undefined' ? findVehicle(params.get('id')) : null;

  function bucketFor(price) {
    if (price < 30000) return 'Under $30,000';
    if (price < 50000) return '$30,000 – $50,000';
    if (price < 80000) return '$50,000 – $80,000';
    return '$80,000+';
  }

  if (budgetSelect && window.__financeCalc) {
    const state = window.__financeCalc();
    budgetSelect.value = bucketFor(state.price);
  }

  const requiredFields = form.querySelectorAll('[required]');
  requiredFields.forEach((field) => {
    field.addEventListener('input', () => {
      if (field.validity.valid) field.classList.remove('is-invalid');
    });
    field.addEventListener('change', () => {
      if (field.validity.valid) field.classList.remove('is-invalid');
    });
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    error?.setAttribute('data-visible', 'false');

    if (!form.checkValidity()) {
      requiredFields.forEach((field) => {
        field.classList.toggle('is-invalid', !field.validity.valid);
      });
      form.reportValidity();
      return;
    }
    requiredFields.forEach((field) => field.classList.remove('is-invalid'));

    const calcState = window.__financeCalc ? window.__financeCalc() : null;

    const payload = {
      vehicleId: vehicle ? vehicle.id : null,
      vehicleName: vehicle ? vehicle.name : null,
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      budgetRange: form.budgetRange.value,
      estCarPrice: calcState ? calcState.price : null,
      estDownPayment: calcState ? calcState.down : null,
      estMonthlyPayment: calcState ? Math.round(calcState.monthlyPayment) : null,
    };

    submitBtn.disabled = true;
    submitBtn.textContent = I18N.t('common.submitting');

    try {
      const res = await fetch('/api/finance-applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.details ? data.details.join(', ') : data.error || 'Request failed');
      }

      if (success) {
        success.querySelector('[data-field="success-message"]').textContent = data.message;
        success.setAttribute('data-visible', 'true');
        success.focus();
      }
      form.reset();
    } catch (err) {
      if (error) {
        error.querySelector('[data-field="error-message"]').textContent =
          'Could not submit your application — the service may be offline. Please call us instead, or try again in a moment.';
        error.setAttribute('data-visible', 'true');
        error.focus();
      }
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = I18N.t('fin.submitApp');
    }
  });
})();

// ==========================================================================
// AI chat assistant — floating widget, present on every page. Talks to the
// server's POST /api/chat, which proxies to the Anthropic API (see
// server/index.js) so no API key ever reaches the browser. Built entirely in
// JS (no per-page markup) so it shows up everywhere main.js is loaded.
// ==========================================================================
(function initChatAssistant() {
  const root = document.createElement('div');
  root.className = 'chat-widget';
  root.innerHTML = `
    <button type="button" class="chat-widget__toggle" aria-expanded="false" data-i18n-aria-label="chat.open" aria-label="Open chat assistant">
      <svg class="icon chat-widget__icon-chat" viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z"></path></svg>
      <svg class="icon chat-widget__icon-close" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </button>
    <div class="chat-widget__panel" data-open="false" role="dialog" aria-label="21 Automotive Assistant">
      <div class="chat-widget__header">
        <div>
          <strong data-i18n="chat.title">21 Automotive Assistant</strong>
          <span data-i18n="chat.subtitle">Ask about inventory, financing, export cars, and more</span>
        </div>
        <button type="button" class="chat-widget__close" data-i18n-aria-label="chat.close" aria-label="Close chat">
          <svg class="icon" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
      <div class="chat-widget__messages" role="log" aria-live="polite"></div>
      <form class="chat-widget__input-row">
        <input type="text" class="chat-widget__input" data-i18n-placeholder="chat.placeholder" placeholder="Ask a question…" aria-label="Message" autocomplete="off" />
        <button type="submit" class="chat-widget__send" data-i18n-aria-label="chat.send" aria-label="Send">
          <svg class="icon" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
        </button>
      </form>
    </div>
  `;
  document.body.appendChild(root);

  const toggleBtn = root.querySelector('.chat-widget__toggle');
  const closeBtn = root.querySelector('.chat-widget__close');
  const panel = root.querySelector('.chat-widget__panel');
  const messagesEl = root.querySelector('.chat-widget__messages');
  const form = root.querySelector('.chat-widget__input-row');
  const input = root.querySelector('.chat-widget__input');

  const history = [];
  let sending = false;
  let greeted = false;

  function addMessage(role, text, opts = {}) {
    const div = document.createElement('div');
    div.className = 'chat-msg chat-msg--' + role + (opts.error ? ' chat-msg--error' : '');
    div.textContent = text;
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return div;
  }

  function openPanel() {
    panel.setAttribute('data-open', 'true');
    toggleBtn.setAttribute('aria-expanded', 'true');
    if (!greeted) {
      addMessage('assistant', I18N.t('chat.greeting'));
      greeted = true;
    }
    input.focus();
  }

  function closePanel() {
    panel.setAttribute('data-open', 'false');
    toggleBtn.setAttribute('aria-expanded', 'false');
  }

  toggleBtn.addEventListener('click', () => {
    const isOpen = panel.getAttribute('data-open') === 'true';
    if (isOpen) closePanel(); else openPanel();
  });
  closeBtn.addEventListener('click', closePanel);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && panel.getAttribute('data-open') === 'true') closePanel();
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const text = input.value.trim();
    if (!text || sending) return;

    input.value = '';
    addMessage('user', text);
    history.push({ role: 'user', content: text });
    sending = true;

    const typingEl = addMessage('assistant', '···');
    typingEl.classList.add('chat-msg--typing');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history.slice(-20), lang: I18N.getLang() }),
      });
      const data = await res.json();
      typingEl.remove();

      if (!res.ok) {
        addMessage('assistant', data.error || I18N.t('chat.errorGeneric'), { error: true });
        return;
      }

      addMessage('assistant', data.reply);
      history.push({ role: 'assistant', content: data.reply });
    } catch (err) {
      typingEl.remove();
      addMessage('assistant', I18N.t('chat.errorOffline'), { error: true });
    } finally {
      sending = false;
    }
  });
})();

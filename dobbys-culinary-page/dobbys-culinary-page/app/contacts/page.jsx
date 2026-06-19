'use client';

// Module 5 — Contacts page with fictional, bilingual details.
import { useLanguage } from '@/components/LanguageProvider';
import { localize } from '@/lib/i18n';

const LABELS = {
  address: { bg: 'Адрес', en: 'Address' },
  email: { bg: 'Имейл', en: 'Email' },
  phone: { bg: 'Телефон', en: 'Phone' },
  hours: { bg: 'Работно време', en: 'Opening hours' },
};

const INFO = {
  address: { bg: 'ул. „Магия“ 9¾, София', en: '9¾ Magic Street, Sofia' },
  hours: { bg: 'Понеделник – Събота, 10:00 – 20:00', en: 'Monday – Saturday, 10:00 – 20:00' },
  email: 'dobby@culinary.example',
  phone: '+359 88 123 4567',
};

export default function ContactsPage() {
  const { lang, t } = useLanguage();

  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">{t('navContacts')}</h1>

      <dl className="space-y-4 rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-gray-400">{localize(LABELS.address, lang)}</dt>
          <dd className="text-gray-800">{localize(INFO.address, lang)}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-gray-400">{localize(LABELS.email, lang)}</dt>
          <dd>
            <a href={`mailto:${INFO.email}`} className="text-rose-600 hover:underline">{INFO.email}</a>
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-gray-400">{localize(LABELS.phone, lang)}</dt>
          <dd className="text-gray-800">{INFO.phone}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-gray-400">{localize(LABELS.hours, lang)}</dt>
          <dd className="text-gray-800">{localize(INFO.hours, lang)}</dd>
        </div>
      </dl>

      <p className="mt-4 text-xs text-gray-400">
        {lang === 'bg' ? '* Измислени данни за демонстрация.' : '* Fictional details for demonstration.'}
      </p>
    </div>
  );
}

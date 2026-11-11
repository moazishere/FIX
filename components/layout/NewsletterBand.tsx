'use client';

import { useId, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useToast } from '@/components/ui/Toast';
import { NoteLink } from '@/components/ui/NoteLink';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterBand() {
  const t = useTranslations();
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [invalid, setInvalid] = useState(false);
  const id = useId();

  return (
    <section className="nl-band" aria-labelledby={`${id}-title`}>
      <div className="container nl-band-inner">
        <div>
          <h2 className="h2" id={`${id}-title`}>{t('newsletter.title')}</h2>
          <p className="body">{t('newsletter.body')}</p>
        </div>
        <form
          className="nl-form"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            const ok = EMAIL.test(email.trim());
            setInvalid(!ok);
            if (ok) {
              // Not connected to an email service yet.
              toast(t('newsletter.done'));
              setEmail('');
            } else {
              (e.currentTarget.elements.namedItem('email') as HTMLInputElement | null)?.focus();
            }
          }}
        >
          <div className="nl-row">
            <label className="sr-only" htmlFor={`${id}-email`}>{t('newsletter.email')}</label>
            <input
              id={`${id}-email`}
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('newsletter.email')}
              autoComplete="email"
              aria-invalid={invalid}
              aria-describedby={invalid ? `${id}-error` : undefined}
            />
            <button className="btn btn-primary" type="submit">{t('newsletter.subscribe')}</button>
          </div>
          {invalid ? <p className="nl-error" id={`${id}-error`}>{t('newsletter.error')}</p> : null}
          <p className="caption nl-consent">
            {t.rich('newsletter.consent', {
              link: (chunks) => <NoteLink className="nl-link" note={t('footer.privacyNote')}>{chunks}</NoteLink>,
            })}
          </p>
        </form>
      </div>
    </section>
  );
}

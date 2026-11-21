"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef } from "react";
import { sendContact } from "../app/actions";
import { projectTypes, type ContactState } from "../lib/site";

const initial: ContactState = { status: "idle", message: "" };

function Err({ id, msg }: { id: string; msg?: string }) {
  return msg ? <p id={id} className="mt-1 text-sm text-[#e5484d]">{msg}</p> : null;
}

export default function ContactForm() {
  const [state, action, pending] = useActionState(sendContact, initial);
  const v = state.values ?? {};
  const err = state.errors ?? {};
  const msg = useRef<HTMLTextAreaElement>(null);
  const subj = useRef<HTMLSelectElement>(null);

  // Pré-remplissage depuis l'estimateur
  useEffect(() => {
    const on = (e: Event) => {
      const d = (e as CustomEvent<{ msg: string; subject: string }>).detail;
      if (msg.current) msg.current.value = d.msg + msg.current.value;
      if (subj.current) subj.current.value = d.subject;
    };
    addEventListener("estimate", on);
    return () => removeEventListener("estimate", on);
  }, []);

  if (state.status === "ok")
    return (
      <div role="status" className="border border-brand p-8 text-lg">
        <p className="font-semibold text-accent">Merci !</p>
        <p className="mt-2">{state.message}</p>
      </div>
    );

  return (
    <form action={action} className="grid gap-8">
      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mono block text-mute">Nom complet *</label>
          <input id="name" name="name" required autoComplete="name" defaultValue={v.name} className="field"
            aria-invalid={!!err.name} aria-describedby={err.name ? "e-name" : undefined} />
          <Err id="e-name" msg={err.name} />
        </div>
        <div>
          <label htmlFor="email" className="mono block text-mute">E-mail *</label>
          <input id="email" name="email" type="email" required autoComplete="email" inputMode="email" defaultValue={v.email} className="field"
            aria-invalid={!!err.email} aria-describedby={err.email ? "e-email" : undefined} />
          <Err id="e-email" msg={err.email} />
        </div>
        <div>
          <label htmlFor="phone" className="mono block text-mute">Téléphone</label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" defaultValue={v.phone} className="field" />
        </div>
        <div>
          <label htmlFor="subject" className="mono block text-mute">Type de projet *</label>
          <select ref={subj} id="subject" name="subject" required defaultValue={v.subject ?? ""} className="field"
            aria-invalid={!!err.subject} aria-describedby={err.subject ? "e-subject" : undefined}>
            <option value="" disabled>Sélectionnez…</option>
            {projectTypes.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
          <Err id="e-subject" msg={err.subject} />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="mono block text-mute">Votre projet *</label>
        <textarea ref={msg} id="message" name="message" required rows={5} minLength={10} defaultValue={v.message} className="field"
          placeholder="Lieu de tournage, date souhaitée, rendu attendu…"
          aria-invalid={!!err.message} aria-describedby={err.message ? "e-message" : undefined} />
        <Err id="e-message" msg={err.message} />
      </div>
      {/* Champ piège anti-robots, invisible pour les humains */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Société<input name="company" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <div>
        <label className="flex items-start gap-3 text-sm text-mute">
          <input type="checkbox" name="consent" required className="mt-0.5 size-5 shrink-0 accent-[#5ceb0f]"
            aria-invalid={!!err.consent} aria-describedby={err.consent ? "e-consent" : undefined} />
          <span>
            J&apos;accepte que mes données soient utilisées pour répondre à ma demande.{" "}
            <Link href="/mentions-legales#donnees" className="underline underline-offset-2 hover:text-accent">En savoir plus</Link>
          </span>
        </label>
        <Err id="e-consent" msg={err.consent} />
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={pending} className="btn btn-solid min-w-64 disabled:opacity-60">
          {pending ? "Envoi en cours…" : "Envoyer ma demande"}
          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </button>
        <p role="status" aria-live="polite" className="text-sm text-[#e5484d]">
          {state.status === "error" ? state.message : ""}
        </p>
      </div>
    </form>
  );
}

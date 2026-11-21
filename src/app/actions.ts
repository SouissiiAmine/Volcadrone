"use server";

import { projectTypes, site, type ContactState } from "../lib/site";

const str = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();

export async function sendContact(_prev: ContactState, fd: FormData): Promise<ContactState> {
  const values = {
    name: str(fd, "name").slice(0, 120),
    email: str(fd, "email").slice(0, 200),
    phone: str(fd, "phone").slice(0, 40),
    subject: str(fd, "subject"),
    message: str(fd, "message").slice(0, 5000),
  };

  // Champ piège : rempli uniquement par les robots.
  if (str(fd, "company")) return { status: "ok", message: "Message envoyé." };

  const errors: ContactState["errors"] = {};
  if (values.name.length < 2) errors.name = "Indiquez votre nom.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email)) errors.email = "Adresse e-mail invalide.";
  const type = projectTypes.find(([v]) => v === values.subject);
  if (!type) errors.subject = "Choisissez un type de projet.";
  if (values.message.length < 10) errors.message = "Décrivez votre projet en quelques mots.";
  if (fd.get("consent") !== "on") errors.consent = "Votre accord est nécessaire pour vous recontacter.";
  if (Object.keys(errors).length)
    return { status: "error", message: "Vérifiez les champs signalés.", errors, values };

  const key = process.env.RESEND_API_KEY;
  const fallback = `L'envoi n'a pas abouti. Écrivez-nous directement à ${site.email}.`;
  if (!key) {
    console.error("[contact] RESEND_API_KEY manquant : message non envoyé.");
    return { status: "error", message: fallback, values };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM ?? "Volcadrone <onboarding@resend.dev>",
        to: process.env.CONTACT_TO ?? site.email,
        reply_to: values.email,
        subject: `Demande de devis — ${type![1]} — ${values.name}`,
        text: `Nom : ${values.name}\nE-mail : ${values.email}\nTéléphone : ${values.phone || "—"}\nType : ${type![1]}\n\n${values.message}`,
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`Resend ${res.status}`);
  } catch (e) {
    console.error("[contact]", e);
    return { status: "error", message: fallback, values };
  }

  return { status: "ok", message: "Message envoyé. Nous vous répondons sous 24 h ouvrées." };
}

"use client";

import { useState, useEffect } from "react";

/* Inline SVG icons to avoid extra dependencies */
function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function ArrowUpIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="18 15 12 9 6 15" />
    </svg>
  );
}

function MessageIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

const contactItems = [
  { icon: PhoneIcon, text: "0988.781.879", href: "tel:0988781879" },
  { icon: PhoneIcon, text: "0258.6257.287", href: "tel:02586257287" },
  { icon: MailIcon, text: "ad.nutriphar.pkd@gmail.com", href: "mailto:ad.nutriphar.pkd@gmail.com" },
  { icon: MapPinIcon, text: "Vĩnh Ngọc – Nha Trang – Khánh Hòa", href: null },
];

function ContactItem({ icon: Icon, text, href }: { icon: typeof PhoneIcon; text: string; href: string | null }) {
  const content = (
    <span className="inline-flex items-center gap-2 whitespace-nowrap px-6 text-[14px] md:text-[15px] font-body font-medium tracking-wide">
      <Icon className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
      <span>{text}</span>
    </span>
  );

  if (href) {
    return (
      <a href={href} className="hover:text-[#D4AF37] transition-colors duration-300">
        {content}
      </a>
    );
  }
  return content;
}

function Separator() {
  return (
    <span className="inline-flex items-center px-4" aria-hidden="true">
      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/60" />
    </span>
  );
}

function MarqueeTrack() {
  return (
    <div className="flex items-center">
      {contactItems.map((item, i) => (
        <span key={i} className="inline-flex items-center">
          <ContactItem {...item} />
          <Separator />
        </span>
      ))}
    </div>
  );
}

export function ContactBanner() {
  return (
    <>
      {/* Desktop Banner */}
      <div
        className="hidden md:block w-full bg-primary border-y border-white/10 py-3 md:py-3.5 z-30"
        aria-label="Thông tin liên hệ Nutriphar"
      >
        <div className="flex flex-wrap items-center justify-center text-[#EADCCA]/90">
          {contactItems.map((item, i) => (
            <span key={i} className="inline-flex items-center">
              <ContactItem {...item} />
              {i < contactItems.length - 1 && <Separator />}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

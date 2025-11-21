const sections = [
  {
    title: 'What Are Cookies',
    paragraphs: [
      'Cookies are small text files that websites place on your device to remember your preferences, improve performance, and deliver a more reliable experience. They can be session-based (deleted when you close your browser) or persistent (stored until they expire or you delete them).'
    ]
  },
  {
    title: 'Why Do We Use Cookies',
    paragraphs: [
      'We use cookies to keep our site running smoothly, understand how visitors use our pages, and personalize content where appropriate. Cookies also help us detect errors, secure your account, and remember your choices so you do not have to set them again.'
    ],
    list: [
      'Essential cookies keep core features like navigation, authentication, and accessibility tools working.',
      'Performance cookies help us measure traffic patterns and improve slow or confusing areas of the site.',
      'Functional cookies remember settings such as language, saved preferences, and completed onboarding steps.',
      'Advertising and analytics cookies help us understand interest in our content and provide more relevant recommendations.'
    ]
  },
  {
    title: 'How to Manage Cookies',
    paragraphs: [
      'You can adjust your cookie preferences at any time in your browser settings. Most browsers let you block or delete cookies, limit them to certain sites, or notify you before storing new cookies. Some site features may not work correctly if you disable certain cookies.',
      'If you are in the European Economic Area or similar regions, you may also control optional cookies through the consent banner or the Cookie Settings link in our footer.'
    ]
  },
  {
    title: 'Legal Basis',
    paragraphs: [
      'For visitors in regions that require consent, we rely on your opt-in for non-essential cookies. We process essential cookies based on our legitimate interest in maintaining the security and basic functionality of the site.'
    ]
  },
  {
    title: 'Data Retention',
    paragraphs: [
      'Cookie lifespans vary. Session cookies are removed when you close your browser. Persistent cookies typically last between 30 days and 13 months unless you delete them earlier through your browser controls.'
    ]
  },
  {
    title: 'Third-Party Cookies',
    paragraphs: [
      'Some analytics and advertising partners may set cookies on our site. These cookies help us measure engagement, prevent fraud, and provide relevant content. You can review their policies and opt-out options through the links they provide.'
    ]
  },
  {
    title: 'Updates to This Policy',
    paragraphs: [
      'We may update this Cookie Policy to reflect new features, legal requirements, or operational changes. When we make significant updates, we will post the revised date at the top of this page.'
    ]
  },
  {
    title: 'Contact Us',
    paragraphs: [
      'If you have questions about how we use cookies, please reach out to privacy@knowwell.com. We are happy to clarify how your information is handled and how you can manage your preferences.'
    ]
  }
];

export default function CookiePolicyPage() {
  return (
    <div className="bg-slate-50">
      <div className="container-page items-center">
        <article className="w-full max-w-3xl rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-10">
          <header className="border-b border-slate-100 pb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Policy</p>
            <h1 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">Cookie Policy</h1>
            <p className="mt-2 text-sm text-slate-600">Last updated: October 2024</p>
          </header>

          <div className="mt-8 space-y-8 text-base leading-relaxed text-slate-700">
            {sections.map((section) => (
              <section key={section.title} className="space-y-3">
                <h2 className="text-xl font-semibold text-slate-900">{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.list && (
                  <ul className="list-disc space-y-2 pl-5 text-slate-700">
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}

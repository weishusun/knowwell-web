const sections = [
  {
    number: '1.',
    title: 'Introduction',
    paragraphs: [
      'This Privacy Policy explains how Knowwell collects, uses, and safeguards personal information when you access our website, mobile experiences, and related services. By using our products, you consent to the practices described below and acknowledge that we may update this notice to reflect product enhancements or legal requirements.'
    ]
  },
  {
    number: '2.',
    title: 'Information We Collect',
    paragraphs: [
      'We collect information you provide directly, such as account details, profile information, reviews, and messages submitted through our forms. We also automatically gather technical data including IP addresses, device identifiers, browser type, and usage patterns to maintain reliable performance.',
      'Some data may be collected through cookies, pixels, or similar technologies to remember your preferences, measure engagement, and personalize content. You can learn more about cookies in our Cookie Policy and manage preferences through your browser settings.'
    ]
  },
  {
    number: '3.',
    title: 'How We Use Your Information',
    paragraphs: [
      'We use personal information to deliver core functionality, verify accounts, process requests, and improve site reliability. Insights from aggregated or de-identified data help us enhance features, troubleshoot issues, and protect against fraud or misuse.',
      'With your consent where required, we may also use your information to send updates, conduct surveys, or provide recommendations tailored to your interests.'
    ]
  },
  {
    number: '4.',
    title: 'Sharing and Disclosure',
    paragraphs: [
      'We do not sell your personal information. We may share data with trusted service providers who support hosting, analytics, communications, and security, subject to confidentiality and data protection obligations. When legally required, we may disclose information to comply with applicable laws, regulations, or valid requests from authorities.',
      'If our business undergoes a merger, acquisition, or asset transfer, your information may be transferred as part of that transaction while maintaining protections consistent with this policy.'
    ]
  },
  {
    number: '5.',
    title: 'Data Retention and Security',
    paragraphs: [
      'We retain personal information only as long as necessary to fulfill the purposes outlined here or as required by law. We implement administrative, technical, and physical safeguards designed to protect your data from unauthorized access, alteration, or disclosure.',
      'Despite our efforts, no system is completely secure. Please use strong passwords, keep your credentials confidential, and notify us immediately if you suspect unauthorized activity on your account.'
    ]
  },
  {
    number: '6.',
    title: 'Your Rights and Choices',
    paragraphs: [
      'Depending on your location, you may have rights to access, correct, delete, or restrict processing of your personal information. You can update certain information in your account settings or contact us to exercise additional rights.',
      'You may opt out of non-essential communications at any time. Where consent is required for data processing, you can withdraw it without affecting the lawfulness of processing conducted prior to withdrawal.'
    ]
  },
  {
    number: '7.',
    title: 'International Data Transfers',
    paragraphs: [
      'Your information may be processed in countries outside of your residence. When transferring data internationally, we implement appropriate safeguards, such as standard contractual clauses, to protect your information in accordance with applicable laws.'
    ]
  },
  {
    number: '8.',
    title: 'Children\'s Privacy',
    paragraphs: [
      'Our services are intended for individuals who are at least 16 years old. We do not knowingly collect personal information from children under this age threshold. If you believe a child has provided us with personal data, please contact us so we can take appropriate action.'
    ]
  },
  {
    number: '9.',
    title: 'Updates to This Policy',
    paragraphs: [
      'We may update this Privacy Policy to reflect changes in our practices, products, or legal obligations. When we make significant updates, we will revise the date at the top of this page and, when appropriate, provide additional notice.'
    ]
  },
  {
    number: '10.',
    title: 'Contact Us',
    paragraphs: [
      'If you have questions about this Privacy Policy or how your information is handled, please reach out to privacy@knowwell.com. We will respond to your request and work to resolve any concerns promptly.'
    ]
  }
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f3e8ff] via-[#ede9fe] to-[#e0e7ff]">
      <div className="container-page items-center">
        <article className="w-full max-w-3xl rounded-3xl bg-white p-6 shadow-lg ring-1 ring-purple-100 md:p-12">
          <header className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-500">Knowwell</p>
            <h1 className="mt-3 text-4xl font-bold text-slate-900">Privacy Policy</h1>
            <p className="mt-3 text-sm text-slate-500">Last updated: October 2024</p>
          </header>

          <div className="mt-10 space-y-10 text-sm leading-relaxed text-slate-600">
            {sections.map((section) => (
              <section key={section.title} className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-purple-100 text-xs font-semibold text-purple-700">
                    {section.number}
                  </span>
                  <div className="space-y-2">
                    <h2 className="text-lg font-semibold text-slate-900">{section.title}</h2>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </section>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}

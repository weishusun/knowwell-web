'use client';

export function CookieSettingsLauncher() {
  const openSettings = () => {
    window.dispatchEvent(new Event('kw-open-cookie-settings'));
  };

  return (
    <button
      type="button"
      onClick={openSettings}
      className="inline-flex items-center gap-2 rounded-full border border-purple-100 bg-white px-4 py-2 text-sm font-semibold text-purple-700 shadow-sm transition hover:-translate-y-0.5 hover:border-purple-200 hover:shadow"
    >
      Cookie settings
    </button>
  );
}

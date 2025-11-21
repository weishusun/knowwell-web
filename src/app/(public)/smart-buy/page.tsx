import Image from 'next/image';

const brandFilters = [
  { label: 'Apple', active: true },
  { label: 'Samsung', active: false },
  { label: 'OPPO', active: false },
  { label: 'XIAOMI', active: false },
  { label: 'Redmi', active: false },
  { label: 'Oneplus', active: false },
  { label: 'Meizu', active: false },
  { label: 'ZTE', active: false },
  { label: 'TECNO', active: false }
];

const productSections = [
  {
    title: 'iPhone 17 Pro',
    featured: {
      src: 'https://images.unsplash.com/photo-1611587266805-5cfef8fa3577?auto=format&fit=crop&w=900&q=80',
      alt: 'iPhone 17 Pro display'
    },
    sideImages: [
      {
        src: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=600&q=80',
        alt: 'Side view of iPhone'
      },
      {
        src: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&w=600&q=80',
        alt: 'iPhone accessories'
      }
    ]
  },
  {
    title: 'iPhone Air',
    featured: {
      src: 'https://images.unsplash.com/photo-1509099836639-18ba02e2e428?auto=format&fit=crop&w=900&q=80',
      alt: 'iPhone Air front'
    },
    sideImages: [
      {
        src: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=600&q=80',
        alt: 'iPhone Air camera'
      },
      {
        src: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80',
        alt: 'Flat lay of iPhone Air'
      }
    ]
  },
  {
    title: 'iPhone 16',
    featured: {
      src: 'https://images.unsplash.com/photo-1615800002234-05c99d38a065?auto=format&fit=crop&w=900&q=80',
      alt: 'iPhone 16 color options'
    },
    sideImages: [
      {
        src: 'https://images.unsplash.com/photo-1556472907-431cfd95ab16?auto=format&fit=crop&w=600&q=80',
        alt: 'iPhone 16 angled view'
      },
      {
        src: 'https://images.unsplash.com/photo-1529618160092-2f8ccc8e087b?auto=format&fit=crop&w=600&q=80',
        alt: 'iPhone 16 accessories'
      },
      {
        src: 'https://images.unsplash.com/photo-1512499617640-c2f999098c01?auto=format&fit=crop&w=600&q=80',
        alt: 'Close up of iPhone camera'
      }
    ]
  }
];

export default function SmartBuyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 lg:px-8">
        <div className="overflow-x-auto pb-4">
          <div className="flex min-w-max items-center gap-3">
            {brandFilters.map((filter) => (
              <button
                key={filter.label}
                className={`rounded-full border px-5 py-2 text-sm font-medium transition-colors duration-200 shadow-sm ${
                  filter.active
                    ? 'border-purple-200 bg-purple-100 text-purple-700'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-purple-200 hover:text-purple-700'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-12">
          {productSections.map((section) => (
            <section key={section.title} className="space-y-5">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">{section.title}</h2>
              </div>
              <div className="grid gap-5 lg:grid-cols-[1.6fr,1fr] lg:items-stretch">
                <div className="rounded-3xl border border-gray-100 bg-gradient-to-br from-gray-50 via-white to-purple-50 p-4 shadow-sm">
                  <div className="relative h-72 w-full overflow-hidden rounded-2xl sm:h-80 md:h-96">
                    <Image
                      src={section.featured.src}
                      alt={section.featured.alt}
                      fill
                      priority
                      sizes="(min-width: 1024px) 66vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="grid h-full gap-4 sm:grid-cols-2 lg:grid-cols-1">
                  {section.sideImages.map((image, index) => (
                    <div
                      key={`${section.title}-${index}`}
                      className="rounded-3xl border border-gray-100 bg-white p-3 shadow-sm"
                    >
                      <div className="relative h-40 w-full overflow-hidden rounded-2xl sm:h-36 lg:h-40 xl:h-44">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

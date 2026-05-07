export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'AP cleanco',
  image: 'https://apcleanco.com/logo.png',
  description: 'Professional garage cleaning and organization services in New Jersey',
  url: 'https://apcleanco.com',
  telephone: '+1 (732) 770-3342',
  email: 'info@apcleanco.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'New Jersey, USA',
    addressRegion: 'NJ',
    addressCountry: 'US',
  },
  sameAs: [
    'https://www.youtube.com/@apcleanco',
    'https://www.instagram.com/ap_cleanco',
    'https://www.facebook.com/apcleanco',
    'https://www.linkedin.com/company/apcleanco/',
  ],
  areaServed: {
    '@type': 'State',
    name: 'New Jersey',
  },
  priceRange: '$$',
  serviceArea: {
    '@type': 'State',
    name: 'New Jersey',
  },
};

export const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  name: 'AP cleanco',
  description: 'Professional garage cleaning services',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Cleaning Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Garage Cleaning & Cleanouts',
          description: 'Professional garage cleaning and full cleanout services',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Debris Hauling & Disposal',
          description: 'Eco-friendly debris disposal and hauling',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Deep Cleaning',
          description: 'Complete deep cleaning services',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Home Organization',
          description: 'Professional home organization and decluttering',
        },
      },
    ],
  },
};

export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

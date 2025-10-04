export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  ethPrice: number;
  imageUrl: string;
  fragranceNotes: {
    top: string[];
    middle: string[];
    base: string[];
  };
  stock: number;
  featured: boolean;
}

export interface Testimonial {
  id: string;
  customerName: string;
  customerImage: string;
  quote: string;
  rating: number;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Velvet Rose',
    slug: 'velvet-rose',
    description: 'An enchanting blend of Bulgarian rose and warm vanilla, creating a sophisticated and timeless fragrance that lingers beautifully on the skin.',
    price: 185,
    ethPrice: 0.05,
    imageUrl: 'https://imagedelivery.net/E9zK_TlgoCezACY1oTGYzA/6e40d303-7978-466c-917e-0988b2ab4d00/public',
    fragranceNotes: {
      top: ['Bergamot', 'Pink Pepper'],
      middle: ['Bulgarian Rose', 'Jasmine'],
      base: ['Vanilla', 'Sandalwood']
    },
    stock: 100,
    featured: true
  },
  {
    id: '2',
    name: 'Ocean Mist',
    slug: 'ocean-mist',
    description: 'Fresh aquatic notes combined with citrus and cedarwood. A refreshing scent inspired by the Mediterranean coastline.',
    price: 165,
    ethPrice: 0.045,
    imageUrl: 'https://freyahome.co/cdn/shop/files/OM-1_RM.jpg?v=1686672665',
    fragranceNotes: {
      top: ['Sea Salt', 'Lemon'],
      middle: ['Marine Accord', 'Lavender'],
      base: ['Cedarwood', 'Amber']
    },
    stock: 100,
    featured: true
  },
  {
    id: '3',
    name: 'Midnight Oud',
    slug: 'midnight-oud',
    description: 'Rich and mysterious blend of rare oud wood with spicy saffron and leather notes. Perfect for evening wear.',
    price: 245,
    ethPrice: 0.065,
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD5HbzmYUTjYJSa08fmT6eBFbyAmhf7GKw1A&s',
    fragranceNotes: {
      top: ['Saffron', 'Cardamom'],
      middle: ['Oud Wood', 'Rose'],
      base: ['Leather', 'Patchouli']
    },
    stock: 100,
    featured: true
  },
  {
    id: '4',
    name: 'Citrus Garden',
    slug: 'citrus-garden',
    description: 'A vibrant and energizing fragrance featuring Italian bergamot, mandarin, and neroli with a subtle green tea base.',
    price: 155,
    ethPrice: 0.042,
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9iR1W56QYJJmNyWf6ZZGSVDTPHTC_Dpltgg&s',
    fragranceNotes: {
      top: ['Bergamot', 'Mandarin'],
      middle: ['Neroli', 'Orange Blossom'],
      base: ['Green Tea', 'Musk']
    },
    stock: 100,
    featured: true
  },
  {
    id: '5',
    name: 'Amber Noir',
    slug: 'amber-noir',
    description: 'Seductive and warm with rich amber, tonka bean, and dark chocolate creating an irresistible allure.',
    price: 195,
    ethPrice: 0.052,
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBgzGH-LTnaBiqIvcSUtQH4edos6D9tg6-MQ&s',
    fragranceNotes: {
      top: ['Black Pepper', 'Ginger'],
      middle: ['Amber', 'Orchid'],
      base: ['Tonka Bean', 'Dark Chocolate']
    },
    stock: 100,
    featured: true
  }
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    customerName: 'Sophia Laurent',
    customerImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    quote: 'Velvet Rose has become my signature scent. The quality is exceptional and it lasts all day. Absolutely worth every penny!',
    rating: 5
  },
  {
    id: '2',
    customerName: 'Marcus Chen',
    customerImage: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
    quote: 'Ocean Mist is incredibly refreshing. I appreciate the seamless crypto payment option - made my purchase so easy!',
    rating: 5
  },
  {
    id: '3',
    customerName: 'Isabella Rodriguez',
    customerImage: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400',
    quote: 'The Midnight Oud is pure luxury. Rich, complex, and truly unique. Uamore has mastered the art of perfumery.',
    rating: 5
  }
];

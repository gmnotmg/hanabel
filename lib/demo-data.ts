import type { Category, Product, SiteSettings } from "@/lib/types";

const image = (id: string, alt: string) => {
  void alt;
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=85`;
};

export const demoSettings: SiteSettings = {
  brandName: "Hanabel Picks",
  handle: "@hanabel.picks",
  bio: "Produk terbaik pilihan Hanabel. Klik kategori dan temukan rekomendasinya.",
  avatarUrl: "/hanabel.jpg",
  coverUrl: "/profile-bg.png",
  disclosure:
    "Beberapa tautan di Hanabel adalah tautan affiliate. Harga dan ketersediaan mengikuti halaman Shopee.",
  socialLinks: [
    { label: "Facebook", href: "https://facebook.com/", icon: "facebook" },
    { label: "Instagram", href: "https://instagram.com/", icon: "instagram" },
    { label: "Threads", href: "https://threads.net/", icon: "threads" },
    { label: "TikTok", href: "https://tiktok.com/", icon: "tiktok" },
  ],
};

export const demoCategories: Category[] = [
  {
    "id": "cat-bayi",
    "slug": "perlengkapan-bayi",
    "name": "Kebutuhan Bayi",
    "description": "Peralatan bayi mulai dari baju, alat makan, parfum lotion, hingga dot.",
    "iconKey": "home",
    "accentColor": "#ffe0e9",
    "sortOrder": 1,
    "status": "published",
    "productCount": 4,
    "tags": [
      "Baju Bayi",
      "Alat Makan",
      "Parfum Lotion",
      "Dot & Botol"
    ]
  },
  {
    "id": "cat-wanita",
    "slug": "pakaian-wanita",
    "name": "Pakaian Wanita",
    "description": "Pilihan outfit cantik wanita untuk tampil modis setiap hari.",
    "iconKey": "dress",
    "accentColor": "#f6d7ec",
    "sortOrder": 2,
    "status": "published",
    "productCount": 3,
    "tags": [
      "Dress",
      "Blouse",
      "Hijab"
    ]
  },
  {
    "id": "cat-sepatu-wanita",
    "slug": "sepatu-sandal-wanita",
    "name": "Sepatu & Sandal Wanita",
    "description": "Koleksi alas kaki wanita yang nyaman dan stylish.",
    "iconKey": "activity",
    "accentColor": "#fff1d4",
    "sortOrder": 3,
    "status": "published",
    "productCount": 3,
    "tags": [
      "Heels",
      "Sneakers Wanita",
      "Flat Shoes"
    ]
  },
  {
    "id": "cat-elektronik",
    "slug": "elektronik",
    "name": "Elektronik & Aksesoris",
    "description": "Gadget dan barang elektronik andalan dari headset sampai cukuran bayi.",
    "iconKey": "sparkles",
    "accentColor": "#dfe5ff",
    "sortOrder": 4,
    "status": "published",
    "productCount": 3,
    "tags": [
      "Headset",
      "Cukuran Bayi",
      "Gadget"
    ]
  },
  {
    "id": "cat-dekorasi",
    "slug": "dekorasi-rumah",
    "name": "Dekorasi Rumah",
    "description": "Pernak-pernik rumah estetik dan fungsional.",
    "iconKey": "home",
    "accentColor": "#fff1d4",
    "sortOrder": 5,
    "status": "published",
    "productCount": 3,
    "tags": [
      "Dekorasi",
      "Karpet",
      "Vas Bunga"
    ]
  },
  {
    "id": "cat-olahraga",
    "slug": "olahraga-fitness",
    "name": "Alat Olahraga",
    "description": "Peralatan senam dan olahraga ringan di rumah.",
    "iconKey": "activity",
    "accentColor": "#d9f5e9",
    "sortOrder": 6,
    "status": "published",
    "productCount": 2,
    "tags": [
      "Yoga Mat",
      "Dumbbell",
      "Tumbler"
    ]
  }
];

const product = (
  values: Omit<Product, "images" | "createdAt" | "updatedAt"> & {
    imageId: string;
    imageAlt: string;
  }
): Product => {
  const { imageId, imageAlt, ...rest } = values;
  const now = new Date().toISOString();
  return {
    ...rest,
    images: [{ url: image(imageId, imageAlt), alt: imageAlt }],
    createdAt: now,
    updatedAt: now,
  };
};

export const demoProducts: Product[] = [
  product({
    "id": "prod-001",
    "categoryId": "cat-bayi",
    "categorySlug": "perlengkapan-bayi",
    "categoryName": "Kebutuhan Bayi",
    "name": "Baju Bayi Katun Lembut",
    "slug": "baju-bayi-katun",
    "shortDescription": "Baju bayi super lembut anti iritasi.",
    "description": "Baju bayi lengan pendek bahan katun bambu yang dingin dan menyerap keringat.",
    "highlights": [
        "Bahan Katun Bambu",
        "Anti Iritasi",
        "Warna Pastel"
    ],
    "badge": "Terlaris",
    "isFeatured": true,
    "status": "published",
    "affiliateUrl": "https://shopee.co.id/",
    "imageId": "photo-1519689680058-324335c77eba",
    "imageAlt": "Baju bayi"
}),
  product({
    "id": "prod-002",
    "categoryId": "cat-bayi",
    "categorySlug": "perlengkapan-bayi",
    "categoryName": "Kebutuhan Bayi",
    "name": "Botol Minum Anak Lucu",
    "slug": "botol-minum-anak",
    "shortDescription": "Botol minum anti tumpah BPA-free.",
    "description": "Botol minum dengan sedotan silikon empuk yang aman untuk gusi bayi.",
    "highlights": [
        "BPA-Free",
        "Anti Tumpah",
        "Silikon Lembut"
    ],
    "isFeatured": false,
    "status": "published",
    "affiliateUrl": "https://shopee.co.id/",
    "imageId": "photo-1579065560489-989b0cc82943",
    "imageAlt": "Botol Minum"
}),
  product({
    "id": "prod-003",
    "categoryId": "cat-bayi",
    "categorySlug": "perlengkapan-bayi",
    "categoryName": "Kebutuhan Bayi",
    "name": "Parfum & Lotion Bayi",
    "slug": "parfum-lotion-bayi",
    "shortDescription": "Wangi khas bayi seharian.",
    "description": "Lotion dan parfum bayi dengan wangi bedak yang tahan lama dan aman di kulit sensitif.",
    "highlights": [
        "Wangi Bedak",
        "Kulit Sensitif",
        "Tahan Lama"
    ],
    "badge": "Baru",
    "isFeatured": true,
    "status": "published",
    "affiliateUrl": "https://shopee.co.id/",
    "imageId": "photo-1556228578-8d89f6aca8d5",
    "imageAlt": "Lotion Bayi"
}),
  product({
    "id": "prod-004",
    "categoryId": "cat-wanita",
    "categorySlug": "pakaian-wanita",
    "categoryName": "Pakaian Wanita",
    "name": "Dress Vintage Floral",
    "slug": "dress-vintage-floral",
    "shortDescription": "Dress anggun motif bunga untuk hangout.",
    "description": "Dress cantik dengan bahan ringan dan jatuh, cocok untuk piknik atau nongkrong.",
    "highlights": [
        "Bahan Jatuh",
        "Motif Floral",
        "Korea Style"
    ],
    "isFeatured": true,
    "status": "published",
    "affiliateUrl": "https://shopee.co.id/",
    "imageId": "photo-1595777457583-95e059d581b8",
    "imageAlt": "Dress Wanita"
}),
  product({
    "id": "prod-005",
    "categoryId": "cat-wanita",
    "categorySlug": "pakaian-wanita",
    "categoryName": "Pakaian Wanita",
    "name": "Kemeja Linen Oversize",
    "slug": "kemeja-linen-oversize",
    "shortDescription": "Kemeja basic wajib punya di lemari.",
    "description": "Kemeja bahan linen premium yang adem, cocok untuk mix & match segala outfit.",
    "highlights": [
        "Linen Premium",
        "Oversize",
        "Basic Item"
    ],
    "isFeatured": false,
    "status": "published",
    "affiliateUrl": "https://shopee.co.id/",
    "imageId": "photo-1596755389378-c31d21fd1273",
    "imageAlt": "Kemeja Linen"
}),
  product({
    "id": "prod-006",
    "categoryId": "cat-sepatu-wanita",
    "categorySlug": "sepatu-sandal-wanita",
    "categoryName": "Sepatu & Sandal Wanita",
    "name": "Heels Kaca Elegan",
    "slug": "heels-kaca",
    "shortDescription": "Sepatu heels kaca ala Cinderella.",
    "description": "Sempurna untuk acara kondangan atau pesta dengan hak yang tidak membuat pegal.",
    "highlights": [
        "Elegan",
        "Tidak Pegal",
        "Hak Kaca"
    ],
    "badge": "Viral",
    "isFeatured": true,
    "status": "published",
    "affiliateUrl": "https://shopee.co.id/",
    "imageId": "photo-1543163521-1bf539c55dd2",
    "imageAlt": "Heels Kaca"
}),
  product({
    "id": "prod-007",
    "categoryId": "cat-sepatu-wanita",
    "categorySlug": "sepatu-sandal-wanita",
    "categoryName": "Sepatu & Sandal Wanita",
    "name": "Sandal Slip-on Empuk",
    "slug": "sandal-slip-on",
    "shortDescription": "Sandal harian super nyaman.",
    "description": "Sol tebal dan empuk, nyaman dipakai seharian tanpa bikin lecet.",
    "highlights": [
        "Super Empuk",
        "Daily Wear",
        "Anti Lecet"
    ],
    "isFeatured": false,
    "status": "published",
    "affiliateUrl": "https://shopee.co.id/",
    "imageId": "photo-1595950653106-6c9ebd614d3a",
    "imageAlt": "Sandal Empuk"
}),
  product({
    "id": "prod-008",
    "categoryId": "cat-elektronik",
    "categorySlug": "elektronik",
    "categoryName": "Elektronik & Aksesoris",
    "name": "TWS Headset Bluetooth",
    "slug": "tws-headset",
    "shortDescription": "Suara jernih dengan noise cancelling.",
    "description": "Headset bluetooth compact dengan daya tahan baterai super lama.",
    "highlights": [
        "Noise Cancelling",
        "Baterai Awet",
        "Bass Mantap"
    ],
    "badge": "Hot",
    "isFeatured": true,
    "status": "published",
    "affiliateUrl": "https://shopee.co.id/",
    "imageId": "photo-1590658268037-6bf12165a8df",
    "imageAlt": "Headset Bluetooth"
}),
  product({
    "id": "prod-009",
    "categoryId": "cat-elektronik",
    "categorySlug": "elektronik",
    "categoryName": "Elektronik & Aksesoris",
    "name": "Alat Cukur Rambut Bayi",
    "slug": "cukuran-bayi",
    "shortDescription": "Cukuran mesin halus anti luka.",
    "description": "Alat cukur elektrik super senyap khusus untuk bayi agar tidak rewel saat dipotong rambutnya.",
    "highlights": [
        "Super Senyap",
        "Anti Luka",
        "Wireless"
    ],
    "isFeatured": false,
    "status": "published",
    "affiliateUrl": "https://shopee.co.id/",
    "imageId": "photo-1507473885765-e6ed057f782c",
    "imageAlt": "Cukuran Bayi"
}),
  product({
    "id": "prod-012",
    "categoryId": "cat-dekorasi",
    "categorySlug": "dekorasi-rumah",
    "categoryName": "Dekorasi Rumah",
    "name": "Karpet Bulu Ruang Tamu",
    "slug": "karpet-bulu",
    "shortDescription": "Karpet estetik bikin ruangan hangat.",
    "description": "Karpet lantai bulu korea super lembut, cocok untuk ruang tamu atau kamar tidur.",
    "highlights": [
        "Super Lembut",
        "Estetik",
        "Anti Rontok"
    ],
    "badge": "Rekomendasi",
    "isFeatured": true,
    "status": "published",
    "affiliateUrl": "https://shopee.co.id/",
    "imageId": "photo-1600607686527-6fb886090705",
    "imageAlt": "Karpet Bulu"
}),
  product({
    "id": "prod-013",
    "categoryId": "cat-olahraga",
    "categorySlug": "olahraga-fitness",
    "categoryName": "Alat Olahraga",
    "name": "Yoga Mat Anti Slip",
    "slug": "yoga-mat-premium",
    "shortDescription": "Matras senam ketebalan 8mm.",
    "description": "Matras yoga yang empuk dan anti slip, menunjang olahraga di rumah dengan nyaman.",
    "highlights": [
        "Anti Slip",
        "Tebal 8mm",
        "Bonus Tas"
    ],
    "isFeatured": true,
    "status": "published",
    "affiliateUrl": "https://shopee.co.id/",
    "imageId": "photo-1592432678016-e910b452f9a2",
    "imageAlt": "Yoga Mat"
}),
];

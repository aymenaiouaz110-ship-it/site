const productsList = [
  {
    id       : 'serum-eclat',
    name     : 'Sérum Éclat Intense',
    brand    : 'Lumière · Sérum',
    desc     : 'Vitamine C 20% · Acide hyaluronique · Niacinamide. Illumine et repulpe la peau dès 7 jours.',
    price    : 5900,
    oldPrice : 7500,
    img      : 'images/serum.png',
    tag      : 'Bestseller',
    stars    : 5,
    category : 'soins',
    volume   : '30 ml',
    benefits : [
      "إشراقة طبيعية وفورية وتحسين نضارة البشرة بشكل ملحوظ",
      "تخفيف البقع الداكنة والتصبغات الجلدية وتوحيد لون البشرة",
      "ترطيب عميق طوال اليوم بفضل حمض الهيالورونيك",
      "صيغة نباتية (Vegan) خالية من القسوة ومرخصة طبياً"
    ]
  },
  {
    id       : 'creme-nuit',
    name     : 'Crème Nuit Régénérante',
    brand    : 'Lumière · Crème',
    desc     : 'Rétinol 0,3% · Peptides · Beurre de karité. Régénère en profondeur pendant le sommeil.',
    price    : 8400,
    oldPrice : null,
    img      : 'images/cream.png',
    tag      : 'Nouveau',
    stars    : 4,
    category : 'soins',
    volume   : '50 ml',
    benefits : [
      "تجديد خلايا البشرة بفاعلية أثناء فترة النوم والراحة",
      "تقليل علامات الشيخوخة والتجاعيد والخطوط الدقيقة بشكل ملحوظ",
      "تغذية فائقة للبشرة الجافة بفضل زبدة الشيا الطبيعية",
      "تحفيز إنتاج الكولاجين الطبيعي لاستعادة مرونة البشرة"
    ]
  },
  {
    id       : 'essence-hydra',
    name     : 'Essence Hydra-Boost',
    brand    : 'Lumière · Essence',
    desc     : 'Eau de rose · Aloe vera · Panthénol. Hydratation intense et éclat immédiat à chaque application.',
    price    : 4200,
    oldPrice : 5000,
    img      : 'images/essence.png',
    tag      : 'Édition Limitée',
    stars    : 5,
    category : 'soins',
    volume   : '100 ml',
    benefits : [
      "ترطيب فوري ومكثف يدوم طويلاً للبشرة الحساسة",
      "تهدئة البشرة المتهيجة بفضل مستخلصات الصبار وماء الورد الطبيعي",
      "امتصاص سريع بفضل القوام المائي الخفيف والمنعش",
      "موازنة إفراز الدهون ومناسب تماماً لجميع أنواع البشرة"
    ]
  },
  {
    id       : 'mielle-shampoo',
    name     : 'شامبو Mielle بإكليل الجمر والنعناع',
    brand    : 'Mielle · Cheveux',
    desc     : 'شامبو مقوي ومحفز لنمو الشعر غني بالبيوتين. صيغة طبيعية بزيت إكليل الجبل والنعناع لتغذية الفروة وتعزيز الكثافة.',
    price    : 1500,
    oldPrice : null,
    img      : 'images/images.jpg',
    tag      : 'Croissance',
    stars    : 5,
    category : 'cheveux',
    volume   : '355 ml',
    benefits : [
      "تحفيز نمو الشعر ومنع التساقط بفضل تركيبة إكليل الجبل والنعناع",
      "تغذية البصيلات وتقويتها بالبيوتين الأساسي لكثافة مثالية",
      "رائحة عشبية منعشة تدوم طويلاً وتنشط الفروة",
      "خالٍ تماماً من الكبريتات والبارابين والمواد الكيميائية الضارة"
    ]
  },
  {
    id       : 'armani-code-profumo',
    name     : 'عطر Armani Code Profumo للرجال (120 مل)',
    brand    : 'Giorgio Armani · Parfum',
    desc     : 'عطر رجالي فخم وجذاب، يتميز برائحة دافئة وقوية تدوم طويلاً. الخيار المثالي للمناسبات.',
    price    : 900,
    oldPrice : null,
    img      : 'images/parfum_armani.jpg',
    tag      : 'Exclusif',
    stars    : 5,
    category : 'parfums',
    volume   : '120 ml',
    benefits : [
      "رائحة شرقية فخمة وجذابة تمنحك حضوراً واثقاً ومميزاً",
      "ثبات وتركيز يدوم لأكثر من 24 ساعة بفضل الزيوت النقية",
      "الخيار المثالي والراقي للمناسبات الرسمية والخاصة",
      "تصميم زجاجة فخم وأنيق يليق بهدية فاخرة"
    ]
  }
];

const CATALOGUE = Object.fromEntries(
  productsList.map(p => [p.name, { price: p.price, img: p.img }])
);

// Quantity Bundles dynamic variants
productsList.forEach(p => {
  CATALOGUE[`${p.name} (عرض قطعتين - خصم 20%)`] = { price: Math.round(p.price * 1.8), img: p.img };
  CATALOGUE[`${p.name} (عرض 3 قطع - 2+1 مجاناً)`] = { price: p.price * 2, img: p.img };
});

const DHD = {
  1: { name: "Adrar", home: 1100, office: 600 },
  2: { name: "Chlef", home: 700, office: 400 },
  3: { name: "Laghouat", home: 900, office: 500 },
  4: { name: "Oum El Bouaghi", home: 800, office: 400 },
  5: { name: "Batna", home: 800, office: 400 },
  6: { name: "Béjaïa", home: 700, office: 400 },
  7: { name: "Biskra", home: 900, office: 500 },
  8: { name: "Béchar", home: 1100, office: 600 },
  9: { name: "Blida", home: 500, office: 250 },
  10: { name: "Bouira", home: 650, office: 400 },
  11: { name: "Tamanrasset", home: 1300, office: 800 },
  12: { name: "Tébessa", home: 800, office: 500 },
  13: { name: "Tlemcen", home: 800, office: 400 },
  14: { name: "Tiaret", home: 800, office: 400 },
  15: { name: "Tizi Ouzou", home: 650, office: 400 },
  16: { name: "Alger", home: 400, office: 200 },
  17: { name: "Djelfa", home: 900, office: 500 },
  18: { name: "Jijel", home: 700, office: 400 },
  19: { name: "Sétif", home: 700, office: 400 },
  20: { name: "Saïda", home: 800, office: 400 },
  21: { name: "Skikda", home: 700, office: 400 },
  22: { name: "Sidi Bel Abbès", home: 700, office: 400 },
  23: { name: "Annaba", home: 700, office: 400 },
  24: { name: "Guelma", home: 800, office: 400 },
  25: { name: "Constantine", home: 700, office: 400 },
  26: { name: "Médéa", home: 600, office: 400 },
  27: { name: "Mostaganem", home: 700, office: 400 },
  28: { name: "M'Sila", home: 800, office: 500 },
  29: { name: "Mascara", home: 700, office: 400 },
  30: { name: "Ouargla", home: 1000, office: 500 },
  31: { name: "Oran", home: 700, office: 400 },
  32: { name: "El Bayadh", home: 1000, office: 500 },
  33: { name: "Illizi", home: 1300, office: 600 },
  34: { name: "Bordj Bou Arreridj", home: 700, office: 400 },
  35: { name: "Boumerdès", home: 600, office: 350 },
  36: { name: "El Tarf", home: 800, office: 400 },
  37: { name: "Tindouf", home: 1300, office: 600 },
  38: { name: "Tissemsilt", home: 800, office: 400 },
  39: { name: "El Oued", home: 900, office: 500 },
  40: { name: "Khenchela", home: 800, office: 500 },
  41: { name: "Souk Ahras", home: 800, office: 500 },
  42: { name: "Tipaza", home: 600, office: 350 },
  43: { name: "Mila", home: 700, office: 400 },
  44: { name: "Aïn Defla", home: 600, office: 400 },
  45: { name: "Naâma", home: 1000, office: 500 },
  46: { name: "Aïn Témouchent", home: 700, office: 400 },
  47: { name: "Ghardaïa", home: 1000, office: 500 },
  48: { name: "Relizane", home: 700, office: 400 },
  49: { name: "Timimoun", home: 1300, office: 600 },
  50: { name: "El M'Ghair (جديدة)", home: 900, office: null },
  51: { name: "Ouled Djellal", home: 900, office: 500 },
  52: { name: "Beni Abbes", home: 1300, office: null },
  53: { name: "In Salah", home: 1300, office: 600 },
  54: { name: "In Guezzam", home: 1300, office: 800 },
  55: { name: "Touggourt", home: 900, office: 500 },
  56: { name: "Djanet", home: 1300, office: 600 },
  57: { name: "El M'Ghair", home: 900, office: null },
  58: { name: "El Meniaa", home: 1000, office: 500 }
};

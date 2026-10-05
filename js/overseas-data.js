/**
 * BORA GROUP — Overseas Trade Data Store
 * Accurate specifications for certified export commodities:
 * Vegetables, Grains & Cereals, Indian Spices, and Garments & Textiles.
 */

const OVERSEAS_DATA = {
  // 4 Primary Export Sectors
  categories: [
    {
      id: 'vegetables',
      name: 'Fresh Vegetables & Agro',
      tag: 'APEDA CERTIFIED',
      sub: 'Cold-Chain Export',
      sector: 'SECTOR 01',
      description: 'Nashik red onions, grade-A potatoes, ginger, garlic, and fresh green vegetables packed under controlled temperature protocols.',
      image: 'images/trade/onions.jpg',
      anchor: '#vegetables-sector',
      itemCount: '6 Export Lines'
    },
    {
      id: 'grains',
      name: 'Grains, Cereals & Pulses',
      tag: 'DOUBLE POLISHED',
      sub: 'Bulk Cargo Standard',
      sector: 'SECTOR 02',
      description: 'Aged 1121 Basmati rice, high-gluten Sharbati wheat, commercial yellow maize, and nutritious Indian millets.',
      image: 'images/trade/basmati_rice.jpg',
      anchor: '#grains-sector',
      itemCount: '5 Export Lines'
    },
    {
      id: 'spices',
      name: 'Indian Spices & Condiments',
      tag: 'SPICES BOARD OF INDIA',
      sub: 'Steam Sterilized',
      sector: 'SECTOR 03',
      description: 'Curcumin-rich Salem turmeric, stemless Guntur red chillies, Tellicherry black pepper, and premium whole spice seeds.',
      image: 'images/trade/turmeric.jpg',
      anchor: '#spices-sector',
      itemCount: '5 Export Lines'
    },
    {
      id: 'garments',
      name: 'Garments & Woven Textiles',
      tag: 'OEKO-TEX CERTIFIED',
      sub: 'OEM & Institutional',
      sector: 'SECTOR 04',
      description: '100% combed organic cotton knitwear, heavy-duty industrial workwear, uniform systems, and woven loom textile bolts.',
      image: 'images/trade/cotton_apparel.jpg',
      anchor: '#garments-sector',
      itemCount: '4 Export Lines'
    }
  ],

  // Detailed Products by Sector
  vegetables: [
    {
      id: 'veg-onions',
      name: 'Nashik Red Onions',
      scientific: 'Allium cepa',
      category: 'Vegetables',
      image: 'images/trade/onions.jpg',
      hsCode: '0703.10.19',
      origin: 'Nashik, Maharashtra',
      grade: 'Grade-A Export (45mm - 60mm+)',
      moisture: 'Dry Outer Skin / 82-85% Pulp',
      packaging: '5kg, 10kg, 25kg, 50kg Red Mesh Bags',
      description: 'Hand-sorted Nashik red onions renowned internationally for their pungent pungency, deep ruby hue, and extended sea-transit shelf life.'
    },
    {
      id: 'veg-potatoes',
      name: 'Fresh Table Potatoes',
      scientific: 'Solanum tuberosum',
      category: 'Vegetables',
      image: 'images/trade/potatoes.jpg',
      hsCode: '0701.90.00',
      origin: 'Maharashtra & Gujarat',
      grade: 'Export Table Grade (45mm - 70mm)',
      moisture: 'Max 78% moisture, Nil Greening',
      packaging: '10kg, 25kg, 50kg Jute / Poly-Mesh Bags',
      description: 'Uniformly graded, soil-washed and dried farm fresh potatoes with firm yellow skin, zero sprouting, and low sugar content.'
    },
    {
      id: 'veg-green-chillies',
      name: 'Fresh Green Chillies',
      scientific: 'Capsicum annuum',
      category: 'Vegetables',
      image: 'images/trade/green_chillies.jpg',
      hsCode: '0709.60.10',
      origin: 'Western India',
      grade: 'G4 / Bullet / Jwala Varieties',
      moisture: 'Reefer Container (4°C - 7°C)',
      packaging: '4kg / 5kg Corrugated CFB Boxes with Air Holes',
      description: 'Fresh crisp green chillies with intact green stems, vibrant glossy skin, and sharp Scoville heat units, packed under cold-chain.'
    },
    {
      id: 'veg-garlic-ginger',
      name: 'Fresh Garlic & Ginger',
      scientific: 'Zingiber officinale / Allium sativum',
      category: 'Vegetables',
      image: 'images/trade/garlic_ginger.jpg',
      hsCode: '0703.20.00 / 0910.11.10',
      origin: 'Madhya Pradesh & Maharashtra',
      grade: 'Export Grade (35mm - 50mm+ cloves)',
      moisture: 'Air-dried, Clean Rhizomes',
      packaging: '10kg / 20kg Mesh Bags & Wooden Crates',
      description: 'Mature unwashed or washed ginger roots alongside pure white multi-clove garlic bulbs, free from mould, pests, and moisture.'
    },
    {
      id: 'veg-tomatoes',
      name: 'Vine-Ripened Tomatoes',
      scientific: 'Solanum lycopersicum',
      category: 'Vegetables',
      image: 'images/trade/fresh_tomatoes.jpg',
      hsCode: '0702.00.00',
      origin: 'Maharashtra Greenhouses',
      grade: 'Semi-Ripe Breaker Stage Grade-A',
      moisture: 'Reefer Controlled (8°C - 10°C)',
      packaging: '6kg / 10kg Molded Pulp Trays in CFB Cartons',
      description: 'Firm, uniform red-ripe and breaker tomatoes harvested at optimal transit stage to ensure peak flavor on arrival at destination ports.'
    },
    {
      id: 'veg-seasonal',
      name: 'Seasonal Farm Greens & Okra',
      scientific: 'Abelmoschus esculentus & Cucurbita',
      category: 'Vegetables',
      image: 'images/trade/vegetables_mix.jpg',
      hsCode: '0709.99.90',
      origin: 'Maharashtra Contract Farms',
      grade: 'Tender Export Quality',
      moisture: 'Hydro-Cooled (2°C - 4°C)',
      packaging: '3kg - 5kg Thermocol / Ventilated Cartons',
      description: 'Export-certified tender lady finger (Okra), bottle gourds, drumsticks, and seasonal tropical vegetables handled under strict phytosanitary rules.'
    }
  ],

  grains: [
    {
      id: 'grain-basmati',
      name: '1121 Steam Basmati Rice',
      scientific: 'Oryza sativa',
      category: 'Grains',
      image: 'images/trade/basmati_rice.jpg',
      hsCode: '1006.30.20',
      origin: 'Northern & Central India',
      grade: 'Extra Long Grain (8.35mm+ Average)',
      moisture: 'Max 12.5% | Purity 95%',
      packaging: '1kg, 5kg, 10kg, 20kg, 40kg Non-Woven / BOPP / Jute',
      description: 'Exquisite aromatic steam Basmati rice that elongates to over double its size when cooked, with silky non-sticky texture and distinctive aroma.'
    },
    {
      id: 'grain-wheat',
      name: 'Sharbati / Durum Wheat',
      scientific: 'Triticum aestivum / durum',
      category: 'Grains',
      image: 'images/trade/wheat_grains.jpg',
      hsCode: '1001.99.10',
      origin: 'Madhya Pradesh & Maharashtra',
      grade: 'Milling & Semolina Grade-A',
      moisture: 'Max 11.5% | Protein 12% - 14%',
      packaging: '25kg, 50kg PP Woven Bags / Bulk Liner Container',
      description: 'Heavy golden grains rich in gluten and natural proteins, mechanically cleaned, de-stoned, and fumigated for high-yield flour and pasta milling.'
    },
    {
      id: 'grain-maize',
      name: 'Commercial Yellow Maize',
      scientific: 'Zea mays',
      category: 'Grains',
      image: 'images/trade/yellow_maize.jpg',
      hsCode: '1005.90.00',
      origin: 'Maharashtra & Karnataka',
      grade: 'Animal Feed & Starch Industrial Grade',
      moisture: 'Max 14.0% | Foreign Matter < 1.5%',
      packaging: '50kg PP Bags / 20ft Bulk Container Loads',
      description: 'Machine-cleaned golden yellow corn with high starch content, low aflatoxin levels (below 20 ppb), suited for commercial feed and starch processing.'
    },
    {
      id: 'grain-millets',
      name: 'Sorghum & Pearl Millets (Jowar / Bajra)',
      scientific: 'Sorghum bicolor / Pennisetum glaucum',
      category: 'Grains',
      image: 'images/trade/pulses_millets.jpg',
      hsCode: '1007.90.00 / 1008.29.00',
      origin: 'Maharashtra Drylands',
      grade: 'Export Cleaned Superfood Grade',
      moisture: 'Max 12.0% | Purity 99%',
      packaging: '25kg, 50kg High-Density Polypropylene Bags',
      description: 'Climate-resilient, mineral-dense ancient millets harvested directly from Maharashtra cooperatives, thoroughly sortex-cleaned for retail and bakery exports.'
    },
    {
      id: 'grain-chickpeas',
      name: 'Kabuli Chickpeas & Split Pulses',
      scientific: 'Cicer arietinum',
      category: 'Grains',
      image: 'images/trade/chickpeas.jpg',
      hsCode: '0713.20.00',
      origin: 'Central India',
      grade: '42-44, 44-46, 58-60 Count per Ounce',
      moisture: 'Max 10-12% | Free from weevils',
      packaging: '25kg, 50kg Multiwall Paper & PP Bags',
      description: 'Large calibration, creamy white Kabuli chickpeas with high protein content and uniform size, machine cleaned and laser sorted.'
    }
  ],

  spices: [
    {
      id: 'spice-turmeric',
      name: 'Salem Curcumin Turmeric',
      scientific: 'Curcuma longa',
      category: 'Spices',
      image: 'images/trade/turmeric.jpg',
      hsCode: '0910.30.20 / 0910.30.30',
      origin: 'Salem / Nizamabad / Sangli',
      grade: 'Polished Fingers & 3.0% - 5.0% Curcumin Powder',
      moisture: 'Max 10.0% | Ash Max 7.0%',
      packaging: '25kg, 50kg Jute Bags with Poly Liner / Carton Boxes',
      description: 'Deep golden-yellow polished turmeric fingers and ultra-fine mesh powder possessing certified high natural curcumin levels and zero artificial coloration.'
    },
    {
      id: 'spice-chillies',
      name: 'Guntur Dry Red Chillies',
      scientific: 'Capsicum annuum',
      category: 'Spices',
      image: 'images/trade/red_chillies.jpg',
      hsCode: '0904.21.10',
      origin: 'Guntur, Andhra Pradesh',
      grade: 'Sannam S4 / Teja / Stemless Grade-A',
      moisture: 'Max 11.0% | Heat: 35,000 - 80,000 SHU',
      packaging: '5kg, 10kg, 25kg Jute Bags / Compressed Bales',
      description: 'Sun-dried, stemless or with-stem red chillies celebrated across international spice extraction plants for vivid ASTA color value and fiery pungency.'
    },
    {
      id: 'spice-pepper',
      name: 'Malabar Black Pepper',
      scientific: 'Piper nigrum',
      category: 'Spices',
      image: 'images/trade/black_pepper.jpg',
      hsCode: '0904.11.20',
      origin: 'Western Ghats, Kerala & Karnataka',
      grade: 'Tellicherry Garbled Extra Bold (TGSEB) 550g/l - 580g/l',
      moisture: 'Max 11.5% | Piperine 4.5%+',
      packaging: '25kg, 50kg Multiwall Paper Bags with Inner PE Barrier',
      description: 'The King of Spices: whole bold black peppercorns sun-cured to deep black wrinkly perfection with penetrating camphoraceous aroma and rich piperine.'
    },
    {
      id: 'spice-whole-medley',
      name: 'Green Cardamom & Whole Spices',
      scientific: 'Elettaria cardamomum',
      category: 'Spices',
      image: 'images/trade/cardamom_cloves.jpg',
      hsCode: '0908.31.20',
      origin: 'Cardamom Hills & South India',
      grade: 'Extra Bold 7mm - 8mm Green Pods',
      moisture: 'Max 10.5% | Volatile Oil 6.0%+',
      packaging: '5kg, 10kg Master Vacuum Cartons',
      description: 'Lush green aromatic cardamom pods hand-plucked at prime maturity, steam cleaned and vacuum packed to retain delicate floral terpene oils.'
    },
    {
      id: 'spice-seeds',
      name: 'Cumin & Coriander Seeds',
      scientific: 'Cuminum cyminum / Coriandrum sativum',
      category: 'Spices',
      image: 'images/trade/whole_spices.jpg',
      hsCode: '0909.31.29 / 0909.21.10',
      origin: 'Gujarat & Rajasthan',
      grade: 'Machine Cleaned & Sortex 99.5% Purity',
      moisture: 'Max 9.0% | Total Ash < 8%',
      packaging: '25kg, 50kg Polypropylene Bags',
      description: 'Sun-dried cumin seeds (Jeera) and whole eagle-grade coriander seeds offering intense nutty fragrance, low pesticide residues, and strict micro-testing.'
    }
  ],

  garments: [
    {
      id: 'garment-cotton',
      name: '100% Organic Cotton Apparel',
      scientific: 'Gossypium hirsutum',
      category: 'Garments',
      image: 'images/trade/cotton_apparel.jpg',
      hsCode: '6109.10.00',
      origin: 'Tirupur & Mumbai, India',
      grade: 'Combed Single Jersey 160 - 220 GSM',
      moisture: 'Pre-Shrunk, Compacted Fabric',
      packaging: 'Individual Polybag in Export 7-Ply Master Cartons',
      description: 'High-density organic cotton basic crew t-shirts, polos, and loungewear finished with enzyme wash, twin-needle stitching, and custom brand labeling.'
    },
    {
      id: 'garment-workwear',
      name: 'Industrial Heavy Duty Workwear',
      scientific: 'Poly-Cotton 65/35 & 100% Drill',
      category: 'Garments',
      image: 'images/trade/industrial_workwear.jpg',
      hsCode: '6203.22.00',
      origin: 'Maharashtra Garment Cluster',
      grade: 'EN ISO 20471 High-Visibility / Flame Retardant Options',
      moisture: 'Tear Resistant / Soil Release Finish',
      packaging: '20 Sets per Export Corrugated Carton',
      description: 'Durable industrial boilersuits, safety bibs, cargo trousers, and hi-vis reflective jackets engineered for construction, oil & gas, and manufacturing plants.'
    },
    {
      id: 'garment-shirting',
      name: 'Woven Loom Shirting & Suiting',
      scientific: '100% Giza Cotton & Poly-Viscose Blends',
      category: 'Garments',
      image: 'images/trade/shirting_fabric.jpg',
      hsCode: '5208.52.00',
      origin: 'Ichalkaranji & Bhiwandi Weaving Hubs',
      grade: 'Yarn Dyed / Plain / Oxford Weave (40s - 100s Count)',
      moisture: 'Mercerized, Silk-Touch Finish',
      packaging: '50m - 100m Fabric Rolls wrapped in HDPE / Bubble Protection',
      description: 'Fine count cotton shirting fabrics and heavy suiting textiles woven on high-speed airjet looms with superior colorfastness and luxurious hand-feel.'
    },
    {
      id: 'garment-uniforms',
      name: 'Corporate & Institutional Uniforms',
      scientific: 'Easy-Care Cotton-Blend Textiles',
      category: 'Garments',
      image: 'images/garment_uniforms.jpg',
      hsCode: '6205.20.00',
      origin: 'Bora Collection Garment Unit',
      grade: 'Anti-Bacterial, Stain Resistant Coating',
      moisture: 'Wrinkle-Free Permanent Press',
      packaging: 'Bulk Master Cartons with Custom Barcoding',
      description: 'Tailored executive corporate shirts, hospital scrubs, security tactical gear, and luxury hospitality staff apparel crafted to bespoke client specifications.'
    }
  ],

  // Certifications & Accreditations
  certifications: [
    {
      id: 'apeda',
      name: 'APEDA Registration',
      code: 'APEDA / IND / EXPORT',
      badge: 'GOVERNMENT OF INDIA',
      description: 'Authorized by the Agricultural & Processed Food Products Export Development Authority to export fresh agro-produce, fruits, vegetables, and grains under national quality assurance frameworks.',
      icon: 'fa-wheat-awn'
    },
    {
      id: 'fssai',
      name: 'FSSAI Central Export License',
      code: 'LIC NO: 11522998000451',
      badge: 'FOOD SAFETY AUTHORITY',
      description: 'Licensed under the Food Safety and Standards Authority of India for hygienic processing, packing, and wholesale international shipment of certified food commodities.',
      icon: 'fa-shield-halved'
    },
    {
      id: 'iso',
      name: 'ISO 9001:2015 Certification',
      code: 'QUALITY MANAGEMENT SYSTEM',
      badge: 'INTERNATIONAL STANDARD',
      description: 'Certified Quality Management System guaranteeing traceability, batch inspection, standardized documentation, and continuous process optimization across export desks.',
      icon: 'fa-award'
    },
    {
      id: 'iec',
      name: 'Import Export Code (IEC)',
      code: 'DGFT ISSUED / INDIA',
      badge: 'MINISTRY OF COMMERCE',
      description: 'Official Import Export Code recognized by the Directorate General of Foreign Trade, enabling custom port clearance and container dispatch globally.',
      icon: 'fa-passport'
    },
    {
      id: 'spices-board',
      name: 'Spices Board of India Registration',
      code: 'CRES NO: SB / REG / EXP',
      badge: 'STATUTORY COMMODITY BOARD',
      description: 'Registration-Cum-Membership Certificate issued by the Spices Board of India for the export of pure spices adhering to international ASTA and ESA norms.',
      icon: 'fa-pepper-hot'
    }
  ]
};

// Flatten all products for real-time search & filter
OVERSEAS_DATA.allProducts = [
  ...OVERSEAS_DATA.vegetables,
  ...OVERSEAS_DATA.grains,
  ...OVERSEAS_DATA.spices,
  ...OVERSEAS_DATA.garments
];

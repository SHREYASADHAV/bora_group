/**
 * BORA GROUP — Garments & Textile Catalogue Data Architecture
 * Pure structured data for all garment collections, fabric lines, brands, and discovery indices.
 * Fully enriched with authentic brand logos and curated high-resolution photography.
 */

const GARMENTS_DATA = {
  // Section 01: Shop by Category
  shopCategories: [
    {
      id: "mens-wear",
      title: "Men's Wear",
      description: "Formal, casual and traditional styles for every occasion.",
      anchor: "#ready-made",
      filterTab: "men",
      image: "images/garment_mens_wear.jpg",
      tag: "Ready-to-Wear"
    },
    {
      id: "womens-wear",
      title: "Women's Wear",
      description: "Elegant ethnic, casual and contemporary fashion.",
      anchor: "#ready-made",
      filterTab: "women",
      image: "images/garment_womens_wear.jpg",
      tag: "Couture & Casual"
    },
    {
      id: "kids-wear",
      title: "Kids' Wear",
      description: "Comfortable and stylish clothing for every age.",
      anchor: "#ready-made",
      filterTab: "kids",
      image: "images/garment_kids_wear.jpg",
      tag: "Junior Collection"
    },
    {
      id: "sarees",
      title: "Sarees",
      description: "Traditional craftsmanship with timeless elegance.",
      anchor: "#saree-collection",
      image: "images/garment_sarees.jpg",
      tag: "Heritage Weaves"
    },
    {
      id: "shirting",
      title: "Shirting",
      description: "Premium fabrics for refined everyday and formal shirts.",
      anchor: "#shirting-fabrics",
      image: "images/garment_shirting.jpg",
      tag: "Luxury Weaves"
    },
    {
      id: "suiting",
      title: "Suiting",
      description: "Fine fabrics for sharp, sophisticated tailoring.",
      anchor: "#suiting-fabrics",
      image: "images/garment_suiting.jpg",
      tag: "Master Tailoring"
    },
    {
      id: "uniforms",
      title: "Uniforms",
      description: "Reliable apparel solutions for institutions and organizations.",
      anchor: "#uniform-solutions",
      image: "images/garment_uniforms.jpg",
      tag: "Institutional"
    },
    {
      id: "accessories",
      title: "Accessories",
      description: "Finishing touches for complete personal style.",
      anchor: "#accessories-section",
      image: "images/garment_accessories.jpg",
      tag: "Style Accents"
    }
  ],

  // Section 02: Ready-Made Collection
  readyMade: {
    men: [
      {
        subgroup: "Formal & Casual",
        description: "Sharp cuts and daily refinement tailored for modern gentleman lifestyle",
        image: "images/garment_men_formal.jpg",
        items: [
          { name: "Formal Shirts", note: "Crisp Collars & Refined Drapes" },
          { name: "Casual Shirts", note: "Linen, Oxford & Chambray" },
          { name: "Trousers", note: "Pleated & Flat-Front Tailoring" },
          { name: "Chinos", note: "Breathable Stretch Twill" },
          { name: "Jeans", note: "Classic Indigo & Washed Denims" },
          { name: "T-Shirts", note: "Superfine Combed Cotton" },
          { name: "Polos", note: "Pique Cotton & Contrast Trims" }
        ]
      },
      {
        subgroup: "Indian Wear",
        description: "Timeless traditional cuts celebrating festive heritage and celebratory occasions",
        image: "images/garment_men_ethnic.jpg",
        items: [
          { name: "Kurtas", note: "Intricate Threadwork & Silk Blends" },
          { name: "Kurta-Pyjamas", note: "Complete Festive Ensembles" },
          { name: "Nehru / Modi Jackets", note: "Mandarin Collar Structure & Brass Accents" }
        ]
      },
      {
        subgroup: "Occasion & Outerwear",
        description: "Distinguished outerwear engineered for commanding presence and comfortable active wear",
        image: "images/garment_men_outerwear.jpg",
        items: [
          { name: "Jackets", note: "All-Season Weather & Style Coats" },
          { name: "Blazers", note: "Structured Shoulders & Italian Fall" },
          { name: "Suits", note: "Two-Piece & Three-Piece Tailoring" },
          { name: "Track Pants", note: "Performance Stretch Leisure" },
          { name: "Shorts", note: "Relaxed Weekend Twill & Linens" }
        ]
      },
      {
        subgroup: "Essentials",
        description: "Soft foundational layers crafted for supreme breathable ease",
        image: "images/garment_men_essentials.jpg",
        items: [
          { name: "Nightwear", note: "Pure Cotton Lounge Sets & Pyjamas" },
          { name: "Innerwear", note: "Breathable Combed Cotton Knits" }
        ]
      }
    ],

    women: [
      {
        subgroup: "Everyday & Casual",
        description: "Versatile, breathable daily wear blending comfort and contemporary silhouette",
        image: "images/garment_women_casual.jpg",
        items: [
          { name: "Kurtis", note: "Printed, A-Line & Straight Cuts" },
          { name: "Tops", note: "Fluid Georgettes, Cottons & Crepes" },
          { name: "Shirts", note: "Tailored Linens & Relaxed Silks" },
          { name: "T-Shirts", note: "Bio-Washed Everyday Basics" },
          { name: "Jeans", note: "High-Rise, Flare & Slim Stretch" },
          { name: "Pants", note: "Cigarette & Tapered Formal Trousers" },
          { name: "Leggings", note: "Four-Way Stretch Bio-Polished Cotton" },
          { name: "Palazzo", note: "Wide-Leg Flowing Rayon & Crepe" }
        ]
      },
      {
        subgroup: "Ethnic Wear",
        description: "Regal craftsmanship embodying India's opulent embroidery and hand-woven art",
        image: "images/garment_women_ethnic.jpg",
        items: [
          { name: "Kurta Sets", note: "Coordinated Dupatta & Pant Sets" },
          { name: "Salwar Suits", note: "Chanderi, Chiffon & Silk Silhouettes" },
          { name: "Dresses", note: "Maxi & Midi Fusion silhouettes" },
          { name: "Gowns", note: "Floor-Length Red Carpet Elegance" },
          { name: "Lehengas", note: "Zari, Mirror & Resham Bridal Heritage" }
        ]
      },
      {
        subgroup: "Occasion",
        description: "Statement party attire and coordinated sets designed for memorable evenings",
        image: "images/garment_women_occasion.jpg",
        items: [
          { name: "Party Wear", note: "Contemporary Cocktail Attire" },
          { name: "Co-ord Sets", note: "Tailored Monochromatic Two-Pieces" }
        ]
      },
      {
        subgroup: "Essentials",
        description: "Delicate comfort wear prioritising soft skin feel and all-day flexibility",
        image: "images/garment_women_essentials.jpg",
        items: [
          { name: "Nightwear", note: "Pure Cotton Kaftans & Satin Sleepwear" },
          { name: "Innerwear", note: "Seamless, Wirefree & Cotton Lingerie" }
        ]
      }
    ],

    kids: [
      {
        subgroup: "Junior Ready-Made Collection",
        description: "Playful designs, vibrant shades, and gentle hypoallergenic cottons built for active kids",
        image: "images/garment_kids_collection.jpg",
        items: [
          { name: "T-Shirts", note: "Playful Prints & Breathable Soft Cotton" },
          { name: "Jeans", note: "Durable Flexible Denim for Active Days" },
          { name: "Trousers", note: "Smart Chinos & Elasticated Waist Trousers" },
          { name: "Shorts", note: "Casual Cargo & Breezy Cotton Shorts" },
          { name: "Frocks", note: "Twirly Cotton, Lace & Tiered Frocks" },
          { name: "Dresses", note: "Party Dresses & Floral Day Frocks" },
          { name: "Ethnic Wear", note: "Junior Kurta-Pyjamas, Sherwanis & Lehengas" },
          { name: "Party Wear", note: "Blazer Sets, Gowns & Tuxedo Accents" },
          { name: "Nightwear", note: "Ultra-Soft Organic Cotton Sleep Sets" },
          { name: "Infant Sets", note: "Newborn Rompers, Onesies & Gentle Mitts" }
        ]
      }
    ]
  },

  // Section 03: Shirting Fabrics
  shirting: {
    heading: "Shirting Fabrics",
    subheading: "Premium fabrics crafted for comfort, character and style.",
    fabrics: [
      "Cotton",
      "Giza Cotton",
      "Paper Cotton",
      "Egyptian Cotton",
      "Pure Linen",
      "Poplin",
      "Oxford",
      "Lyocell"
    ],
    designs: [
      "Checks",
      "Stripes",
      "Plain",
      "Prints",
      "Self Design",
      "Solids"
    ],
    catalog: [
      {
        name: "Giza Cotton 100s",
        fabric: "Giza Cotton",
        design: "Solids",
        description: "Silky sheen and extraordinary strength woven from extra-long staple Egyptian Giza seeds.",
        characteristics: "Extra Long Staple • Silky Handfeel • Natural Luster",
        bestFor: "Executive Shirts & Ceremonial Dressing",
        badge: "Signature Grade",
        image: "images/shirting_roll.jpg"
      },
      {
        name: "Egyptian Cotton Royal Plain",
        fabric: "Egyptian Cotton",
        design: "Plain",
        description: "The world benchmark for cotton luxury with unmatched breathability and a cooling touch.",
        characteristics: "120s Two-Ply • Featherlight • Crisp Fall",
        bestFor: "Luxury White Shirts & Black-Tie Formals",
        badge: "World Renowned",
        image: "images/shirting_roll.jpg"
      },
      {
        name: "Pure European Linen",
        fabric: "Pure Linen",
        design: "Checks",
        description: "Naturally thermoregulating pure flax with a relaxed, sophisticated textured drape.",
        characteristics: "60 Lea Pure Flax • Breathable • Earthy Texture",
        bestFor: "Warm Weather & Resort Sophistication",
        badge: "100% Flax",
        image: "images/shirting_roll.jpg"
      },
      {
        name: "Crisp Oxford Button-Down",
        fabric: "Oxford",
        design: "Stripes",
        description: "Classic basket-weave texture that grows softer with every wash while retaining robust body.",
        characteristics: "Pinpoint Basket Weave • Substantial Body • Resilient",
        bestFor: "Classic Office & Smart Casual Shirts",
        badge: "Heritage Weave",
        image: "images/shirting_roll.jpg"
      },
      {
        name: "Silken Poplin Weave",
        fabric: "Poplin",
        design: "Solids",
        description: "Tightly woven fine-rib surface providing exceptional smoothness and crisp collar definition.",
        characteristics: "Fine Plain Weave • Smooth Finish • High Color Fastness",
        bestFor: "Everyday Corporate Wardrobes",
        badge: "Office Essential",
        image: "images/shirting_roll.jpg"
      },
      {
        name: "Sustainable Lyocell Twill",
        fabric: "Lyocell",
        design: "Prints",
        description: "Eco-conscious wood pulp fiber with a fluid silk-like drape and anti-crease nature.",
        characteristics: "Botanical Fiber • Moisture Absorbent • Silky Touch",
        bestFor: "Contemporary Printed & Fluid Shirts",
        badge: "Eco-Luxe",
        image: "images/shirting_roll.jpg"
      },
      {
        name: "Paper Cotton Lightweight",
        fabric: "Paper Cotton",
        design: "Self Design",
        description: "Distinct crisp, parchment-like handfeel with featherweight density ideal for humid climates.",
        characteristics: "Ultra-Lightweight • Micro Self Texture • Dry Feel",
        bestFor: "Summer Kurtas & Relaxed Collars",
        badge: "Featherweight",
        image: "images/shirting_roll.jpg"
      },
      {
        name: "Classic Fine Cotton Checks",
        fabric: "Cotton",
        design: "Checks",
        description: "Yarn-dyed micro checks woven with compact combed cotton for everyday polish.",
        characteristics: "100% Combed Cotton • Yarn-Dyed • Anti-Pilling",
        bestFor: "Business Casual & Weekend Wear",
        badge: "Timeless Classic",
        image: "images/shirting_roll.jpg"
      },
      {
        name: "Micro Stripe Executive Cotton",
        fabric: "Cotton",
        design: "Stripes",
        description: "Precision-engineered pinstripes and banker stripes on smooth cotton ground.",
        characteristics: "Precision Stripe Weave • Clean Contrast • Easy Care",
        bestFor: "Corporate Power Shirts",
        badge: "Executive Standard",
        image: "images/shirting_roll.jpg"
      },
      {
        name: "Floral & Motif Printed Linen",
        fabric: "Pure Linen",
        design: "Prints",
        description: "Hand-screen and digital botanical motifs on pure textured linen slub.",
        characteristics: "Digital Pigment Print • Pure Linen Slub • Artisanal Look",
        bestFor: "Weekend Brunches & Destination Events",
        badge: "Artisanal Print",
        image: "images/shirting_roll.jpg"
      },
      {
        name: "Subtle Self Design Jacquard",
        fabric: "Giza Cotton",
        design: "Self Design",
        description: "Tonal dobby and jacquard textures creating rich light refraction across the shirt surface.",
        characteristics: "Dobby Woven • Tone-on-Tone Depth • Rich Luster",
        bestFor: "Evening Formals & Wedding Guest Shirts",
        badge: "Dobby Texture",
        image: "images/shirting_roll.jpg"
      },
      {
        name: "Crisp Plain White Oxford",
        fabric: "Oxford",
        design: "Plain",
        description: "The timeless American classic woven with contrasting white warp and weft yarns.",
        characteristics: "Two-Fold 80s Yarn • Sturdy Drape • Natural Give",
        bestFor: "Ivy Style & Daily Formals",
        badge: "Wardrobe Foundation",
        image: "images/shirting_roll.jpg"
      }
    ]
  },

  // Section 04: Suiting Fabrics
  suiting: {
    heading: "Suiting Fabrics",
    subheading: "Fine fabrics for tailored elegance.",
    fabrics: [
      {
        name: "Polyester Viscose",
        tagline: "Durable • Smooth • Everyday Formals",
        description: "Engineered for day-long crispness, crease resistance, and effortless drape in busy corporate climates.",
        weight: "260–290 GSM",
        weave: "Fine Serge Twill",
        image: "images/suiting_roll.jpg"
      },
      {
        name: "Wool Blend",
        tagline: "Elegant • Comfortable • Formal",
        description: "The gold standard balance of natural merino wool warmth, breathable comfort, and tailored structure.",
        weight: "280–320 GSM",
        weave: "Worsted Wool",
        image: "images/suiting_roll.jpg"
      },
      {
        name: "Terry Wool",
        tagline: "Rich Fall • Warmth • Classic Tailoring",
        description: "Prestigious blend offering substantial handfeel, natural bounce, and timeless crease retention for winter suits.",
        weight: "310–350 GSM",
        weave: "Structured Twill",
        image: "images/suiting_roll.jpg"
      },
      {
        name: "Linen",
        tagline: "Natural Drape • Breathable • Summer Luxury",
        description: "Pure European flax tailored into unconstructed blazers and trousers with unmatched organic character.",
        weight: "220–260 GSM",
        weave: "Plain Linen Weave",
        image: "images/suiting_roll.jpg"
      },
      {
        name: "Poly Cotton",
        tagline: "Resilient • Crisp Fit • Low Maintenance",
        description: "Tough, shape-retaining blend designed for heavy-duty uniforms, trousers, and daily corporate suiting.",
        weight: "240–280 GSM",
        weave: "Compact Drill",
        image: "images/suiting_roll.jpg"
      },
      {
        name: "Linen Blend",
        tagline: "Lightweight • Breathable • Premium",
        description: "Blends the organic coolness of linen with wrinkle-softening fibers for a refined safari jacket or summer blazer.",
        weight: "240–270 GSM",
        weave: "Slub Weave",
        image: "images/suiting_roll.jpg"
      },
      {
        name: "TR Stretch",
        tagline: "Flexible • Comfortable • Modern",
        description: "Terylene-Rayon infused with elastane for 360-degree mobility in slim-fit modern tailored suits and trousers.",
        weight: "270–300 GSM",
        weave: "Bi-Stretch Twill",
        image: "images/suiting_roll.jpg"
      },
      {
        name: "PV Stretch",
        tagline: "Durable • Smooth • Easy Movement",
        description: "All-day comfort with active rebound, silky face touch, and high abrasion resistance for active professionals.",
        weight: "260–295 GSM",
        weave: "Mechanical Stretch",
        image: "images/suiting_roll.jpg"
      }
    ]
  },

  // Section 05: Trusted Shirting Brands (15 brands)
  shirtingBrands: [
    { name: "Raymond", heritage: "Since 1925", specialty: "The Complete Man — Suiting & Fine Shirting", origin: "Mumbai, India", logo: "images/brands/raymond.svg" },
    { name: "Siyaram's", heritage: "Since 1978", specialty: "Come Home to Siyaram's — Premium Poly-Viscose & Cottons", origin: "Mumbai, India", logo: "images/brands/siyarams.svg" },
    { name: "J. Hampstead", heritage: "Est. Heritage", specialty: "Italian Crafted Wool & Luxury Cottons", origin: "England / India", logo: "images/brands/j_hampstead.svg" },
    { name: "Arvind", heritage: "Since 1931", specialty: "Pioneers in Denims, Cottons & Smart Fabrics", origin: "Ahmedabad, India", logo: "images/brands/arvind.svg" },
    { name: "Digjam", heritage: "Since 1948", specialty: "Fine Woollens & Classic Suiting Traditions", origin: "Jamnagar, India", logo: "images/brands/digjam.svg" },
    { name: "Vimal", heritage: "Since 1966", specialty: "Only Vimal — Iconic Textile Innovation & Drapes", origin: "Gujarat, India", logo: "images/brands/vimal.svg" },
    { name: "Grasim", heritage: "Since 1947", specialty: "Aditya Birla Group — Suiting & Shirting Excellence", origin: "Nagda, India", logo: "images/brands/grasim.svg" },
    { name: "Linen Club", heritage: "Since 1949", specialty: "100% Pure European Flax Certified Linens", origin: "Rishra, India", logo: "images/brands/linen_club.svg" },
    { name: "OCM", heritage: "Since 1924", specialty: "Oriental Carpet Manufacturers — Master Woollens", origin: "Amritsar, India", logo: "images/brands/ocm.svg" },
    { name: "Mafatlal", heritage: "Since 1905", specialty: "Over 100 Years of Cotton Shirting Excellence", origin: "Mumbai, India", logo: "images/brands/mafatlal.svg" },
    { name: "Birla Century", heritage: "Century Mills", specialty: "State-of-the-Art Fine Shirting & Bedding Textiles", origin: "Bharuch, India", logo: "images/brands/birla_century.svg" },
    { name: "Ruby Mills", heritage: "Since 1917", specialty: "Pioneering Technical & Interlining Textiles", origin: "Mumbai, India", logo: "images/brands/ruby_mills.svg" },
    { name: "Reid & Taylor", heritage: "Est. Scotland", specialty: "Luxury Scottish Heritage Worsted Woollens", origin: "Langholm / India", logo: "images/brands/reid_and_taylor.svg" },
    { name: "Bombay Dyeing", heritage: "Since 1879", specialty: "Iconic Heritage Linens, Cottons & Daily Weaves", origin: "Mumbai, India", logo: "images/brands/bombay_dyeing.svg" },
    { name: "Gini & House", heritage: "Modern Mill", specialty: "Contemporary Fashion Shirting & Everyday Prints", origin: "India", logo: "images/brands/gini_and_house.svg" }
  ],

  // Section 06: Saree Brands (7 brands)
  sareeBrands: [
    { name: "Laxmipati Saree", heritage: "Signature Brand", specialty: "Chiffon, Georgette & Designer Festive Sarees", origin: "Surat, Gujarat", logo: "images/brands/laxmipati.svg" },
    { name: "Rajtext", heritage: "Textile Pioneer", specialty: "Traditional Jacquard & Wedding Silks", origin: "Surat, Gujarat", logo: "images/brands/rajtext.svg" },
    { name: "Vipul Fashion", heritage: "Since 1974", specialty: "Everyday Georgettes, Cottons & Printed Drapes", origin: "Surat, Gujarat", logo: "images/brands/vipul_fashion.svg" },
    { name: "Triveni Saree", heritage: "Since 1985", specialty: "Graceful Bridal, Festive & Embroidered Sarees", origin: "Surat, Gujarat", logo: "images/brands/triveni.svg" },
    { name: "Ruchi Saree", heritage: "Trusted Mill", specialty: "Contemporary Digital Prints & Casual Silks", origin: "Surat, Gujarat", logo: "images/brands/ruchi.svg" },
    { name: "Vinay Fashion", heritage: "Designer Couture", specialty: "Boutique Silk Kurtis, Sarees & Party Wear", origin: "Surat, Gujarat", logo: "images/brands/vinay_fashion.svg" },
    { name: "Padmavati Textile", heritage: "Heritage Weaver", specialty: "Fine Silk Embellishments & Handloom Drapes", origin: "Varanasi / Surat", logo: "images/brands/padmavati.svg" }
  ],

  // Section 07: Saree Collection (7 traditional categories)
  sareeCollection: [
    {
      name: "Silk Banarasi",
      origin: "Varanasi, Uttar Pradesh",
      description: "Opulent gold and silver brocade (zari) woven with fine mulberry silk for bridal grandeur.",
      details: "Real Zari Work • Kadiyal Technique • Regal Pallu",
      tag: "Bridal Masterpiece",
      image: "images/saree_banarasi.jpg"
    },
    {
      name: "Kanjivaram",
      origin: "Kanchipuram, Tamil Nadu",
      description: "Heavily woven lustrous silk characterized by contrast temple borders and pure zari threads.",
      details: "Korvai Weaving • Heavy Mulberry Silk • Heritage Borders",
      tag: "Temple Heritage",
      image: "images/saree_kanjivaram.jpg"
    },
    {
      name: "Cotton",
      origin: "Bengal & Chanderi Traditions",
      description: "Airy, breathable hand-spun cotton sarees celebrating everyday grace and understated poise.",
      details: "Hypoallergenic • Soft Combed Yarn • Geometric Borders",
      tag: "All-Day Grace",
      image: "images/saree_cotton.jpg"
    },
    {
      name: "Paithani",
      origin: "Paithan & Yeola, Maharashtra",
      description: "Maharashtra’s crowning jewel featuring kaleidoscopic peacock (mor) motifs and oblique square pallus.",
      details: "Peacock Pallu • Pure Silk & Gold Zari • Maharashtrian Pride",
      tag: "Maharashtra Gem",
      image: "images/saree_paithani.jpg"
    },
    {
      name: "Satin",
      origin: "Contemporary Silk Weaves",
      description: "High-gloss liquid surface with an ethereal drape, tailored for modern cocktail and evening galas.",
      details: "Ultra-Smooth Fall • Fluid Gloss Finish • Modern Glamour",
      tag: "Evening Glamour",
      image: "images/saree_satin.jpg"
    },
    {
      name: "Organza",
      origin: "Delicate Sheer Weaves",
      description: "Translucent, crisp sheer fabric hand-painted or embroidered with pastel floral bouquets.",
      details: "Featherlight Sheer • Crisp Sculpture • Pastel Palettes",
      tag: "Modern Romantic",
      image: "images/saree_organza.jpg"
    },
    {
      name: "Bandhani",
      origin: "Gujarat & Rajasthan",
      description: "Intricate centuries-old tie-dye artistry creating mesmerizing dotted mandalas on soft georgettes and silks.",
      details: "Hand Tie-Dye (Bandhej) • Sacred Colors • Artisanal Dots",
      tag: "Vibrant Heritage",
      image: "images/saree_bandhani.jpg"
    }
  ],

  // Section 08: Uniform Solutions (3 categories)
  uniforms: [
    {
      title: "School Uniforms",
      category: "K-12 Educational Institutions",
      description: "Hard-wearing, colorfast fabrics designed for daily school life. Includes customized shirts, pleated skirts, pinafores, trousers, house t-shirts, and blazers.",
      features: ["Reinforced Double Stitching", "Anti-Pilling Breathable Blends", "Custom Institutional Monograms"],
      image: "images/uniform_school.jpg"
    },
    {
      title: "Corporate Uniforms",
      category: "Offices, Hotels & Executive Teams",
      description: "Sophisticated corporate apparel elevating enterprise identity. Custom tailored formal shirts, blazers, waistcoats, and trousers crafted from crease-free fabrics.",
      features: ["Precision Corporate Tailoring", "Wrinkle-Resistant PV Blends", "Bespoke Brand Color Matching"],
      image: "images/uniform_corporate.jpg"
    },
    {
      title: "Institutional Uniforms",
      category: "Hospitals, Security & Industrial Floors",
      description: "Engineered high-durability apparel for healthcare, technical facilities, and security forces with specialized industrial safety and hygiene standards.",
      features: ["Autoclavable Healthcare Scrubs", "High-Visibility Safety Bands", "Heavy-Duty Twill & Ripstop"],
      image: "images/uniform_institutional.jpg"
    }
  ],

  // Section 09: Accessories
  accessories: {
    heading: "Accessories",
    description: "Complete your look with carefully selected fashion and garment accessories.",
    image: "images/garment_accessory_cufflinks.jpg",
    items: [
      { name: "Silk Pocket Squares", note: "Pure Mulberry Silk Hand-Rolled Edges" },
      { name: "Executive Neckties", note: "Jacquard & Microfiber Silk Formals" },
      { name: "Brass & Onyx Cufflinks", note: "Handcrafted Luxury Metal Fasteners" },
      { name: "Leather Belts", note: "Top-Grain Reversible Italian Leather" },
      { name: "Ethnic Dupattas & Stoles", note: "Chanderi, Pashmina & Zari Accents" },
      { name: "Saree Brooches & Pins", note: "Gold-Toned Traditional Fasteners" }
    ]
  },

  // Section 11: Brand Strip Marquee (All 22 listed brands)
  marqueeBrands: [
    "Raymond",
    "Siyaram's",
    "J. Hampstead",
    "Arvind",
    "Digjam",
    "Vimal",
    "Grasim",
    "Linen Club",
    "OCM",
    "Mafatlal",
    "Birla Century",
    "Ruby Mills",
    "Reid & Taylor",
    "Bombay Dyeing",
    "Gini & House",
    "Laxmipati Saree",
    "Rajtext",
    "Vipul Fashion",
    "Triveni Saree",
    "Ruchi Saree",
    "Vinay Fashion",
    "Padmavati Textile"
  ],

  // Section 10: Smart Filter / Discovery Items Index
  discoveryCatalog: [
    // Men's Ready-Made
    { id: "m1", title: "Executive Formal Shirt", category: "Men", type: "Ready-Made", fabric: "Cotton", design: "Solids", brand: "Raymond", note: "Classic collar formal wear", image: "images/garment_men_formal.jpg" },
    { id: "m2", title: "Pure Linen Casual Shirt", category: "Men", type: "Ready-Made", fabric: "Linen", design: "Plain", brand: "Linen Club", note: "Relaxed breathable fit", image: "images/garment_men_formal.jpg" },
    { id: "m3", title: "Tailored Formal Trousers", category: "Men", type: "Ready-Made", fabric: "Polyester Viscose", design: "Plain", brand: "Siyaram's", note: "Sharp crease retention", image: "images/garment_men_formal.jpg" },
    { id: "m4", title: "Smart Stretch Chinos", category: "Men", type: "Ready-Made", fabric: "Cotton", design: "Solids", brand: "Arvind", note: "Four-season daily stretch", image: "images/garment_men_formal.jpg" },
    { id: "m5", title: "Classic Straight Jeans", category: "Men", type: "Ready-Made", fabric: "Cotton", design: "Plain", brand: "Arvind", note: "Durable ring-spun denim", image: "images/garment_men_formal.jpg" },
    { id: "m6", title: "Combed Cotton Pique Polo", category: "Men", type: "Ready-Made", fabric: "Cotton", design: "Solids", brand: "Gini & House", note: "Sporty weekend essential", image: "images/garment_men_formal.jpg" },
    { id: "m7", title: "Royal Silk Kurta", category: "Men", type: "Ready-Made", fabric: "Cotton", design: "Self Design", brand: "Bora Collection", note: "Festive celebration ensemble", image: "images/garment_men_ethnic.jpg" },
    { id: "m8", title: "Mandarin Nehru Jacket", category: "Men", type: "Ready-Made", fabric: "Wool Blend", design: "Self Design", brand: "Raymond", note: "Structured ceremonial vest", image: "images/garment_men_ethnic.jpg" },
    { id: "m9", title: "Executive Two-Piece Suit", category: "Men", type: "Ready-Made", fabric: "Wool Blend", design: "Solids", brand: "Reid & Taylor", note: "Classic British tailoring", image: "images/garment_men_outerwear.jpg" },
    { id: "m10", title: "Classic Track Pants", category: "Men", type: "Ready-Made", fabric: "Cotton", design: "Plain", brand: "Bora Fashion", note: "Relaxed leisure wear", image: "images/garment_men_essentials.jpg" },

    // Women's Ready-Made
    { id: "w1", title: "Hand-Block Printed Kurti", category: "Women", type: "Ready-Made", fabric: "Cotton", design: "Prints", brand: "Bora Fashion", note: "Daily ethnic flair", image: "images/garment_women_casual.jpg" },
    { id: "w2", title: "Chiffon Embroidered Anarkali", category: "Women", type: "Ready-Made", fabric: "Silk Blend", design: "Prints", brand: "Vinay Fashion", note: "Festive wedding elegance", image: "images/garment_women_ethnic.jpg" },
    { id: "w3", title: "Tailored Linen Shirt", category: "Women", type: "Ready-Made", fabric: "Linen", design: "Stripes", brand: "Linen Club", note: "Workplace sophistication", image: "images/garment_women_casual.jpg" },
    { id: "w4", title: "Flowing Rayon Palazzo", category: "Women", type: "Ready-Made", fabric: "Lyocell", design: "Solids", brand: "Bora Fashion", note: "Comfort-fit wide leg", image: "images/garment_women_casual.jpg" },
    { id: "w5", title: "Bridal Silk Lehenga Set", category: "Women", type: "Ready-Made", fabric: "Silk Blend", design: "Self Design", brand: "Rajtext", note: "Regal zardozi craftsmanship", image: "images/garment_women_ethnic.jpg" },
    { id: "w6", title: "Contemporary Party Co-ord Set", category: "Women", type: "Ready-Made", fabric: "Polyester Viscose", design: "Solids", brand: "Vinay Fashion", note: "Modern cocktail silhouette", image: "images/garment_women_occasion.jpg" },

    // Kids' Ready-Made
    { id: "k1", title: "Junior Graphic Cotton T-Shirt", category: "Kids", type: "Ready-Made", fabric: "Cotton", design: "Prints", brand: "Gini & House", note: "Soft combed playwear", image: "images/garment_kids_collection.jpg" },
    { id: "k2", title: "Kids Flexible Denim Jeans", category: "Kids", type: "Ready-Made", fabric: "Cotton", design: "Plain", brand: "Arvind", note: "Elasticated comfortable waist", image: "images/garment_kids_collection.jpg" },
    { id: "k3", title: "Junior Festive Kurta Set", category: "Kids", type: "Ready-Made", fabric: "Cotton", design: "Self Design", brand: "Bora Fashion", note: "Traditional festive wear", image: "images/garment_kids_collection.jpg" },
    { id: "k4", title: "Girls Floral Party Frock", category: "Kids", type: "Ready-Made", fabric: "Cotton", design: "Prints", brand: "Bora Fashion", note: "Tiered twirl dress", image: "images/garment_kids_collection.jpg" },

    // Fabrics — Shirting
    { id: "f1", title: "Giza Cotton 100s Fabric", category: "Shirting", type: "Fabric", fabric: "Giza Cotton", design: "Plain", brand: "Arvind", note: "Luxury shirting yardage", image: "images/shirting_roll.jpg" },
    { id: "f2", title: "Fine Checks Italian Shirting", category: "Shirting", type: "Fabric", fabric: "Cotton", design: "Checks", brand: "J. Hampstead", note: "Yarn-dyed micro check", image: "images/shirting_roll.jpg" },
    { id: "f3", title: "Pure European Linen Yardage", category: "Shirting", type: "Fabric", fabric: "Linen", design: "Solids", brand: "Linen Club", note: "60 Lea authenticated flax", image: "images/shirting_roll.jpg" },
    { id: "f4", title: "Banker Stripe Poplin Fabric", category: "Shirting", type: "Fabric", fabric: "Poplin", design: "Stripes", brand: "Raymond", note: "Classic office stripe weave", image: "images/shirting_roll.jpg" },
    { id: "f5", title: "Paper Cotton Summer Yardage", category: "Shirting", type: "Fabric", fabric: "Paper Cotton", design: "Plain", brand: "Mafatlal", note: "Lightweight parchment finish", image: "images/shirting_roll.jpg" },
    { id: "f6", title: "Egyptian Cotton Dobby Fabric", category: "Shirting", type: "Fabric", fabric: "Egyptian Cotton", design: "Self Design", brand: "Birla Century", note: "Subtle lustrous dobby", image: "images/shirting_roll.jpg" },
    { id: "f7", title: "Oxford Pinpoint Cotton", category: "Shirting", type: "Fabric", fabric: "Oxford", design: "Checks", brand: "Ruby Mills", note: "Robust two-fold weave", image: "images/shirting_roll.jpg" },
    { id: "f8", title: "Sustainable Lyocell Fluid Fabric", category: "Shirting", type: "Fabric", fabric: "Lyocell", design: "Prints", brand: "Arvind", note: "Botanical silky twill", image: "images/shirting_roll.jpg" },

    // Fabrics — Suiting
    { id: "s1", title: "Superfine Merino Wool Suiting", category: "Suiting", type: "Fabric", fabric: "Wool Blend", design: "Solids", brand: "Raymond", note: "Super 120s luxury suiting", image: "images/suiting_roll.jpg" },
    { id: "s2", title: "Royal Terry Wool Suiting", category: "Suiting", type: "Fabric", fabric: "Terry Wool", design: "Plain", brand: "OCM", note: "Warm fall for classic coats", image: "images/suiting_roll.jpg" },
    { id: "s3", title: "TR 4-Way Stretch Suiting", category: "Suiting", type: "Fabric", fabric: "TR Stretch", design: "Solids", brand: "Siyaram's", note: "Modern executive flexibility", image: "images/suiting_roll.jpg" },
    { id: "s4", title: "Heavy Weight PV Suiting", category: "Suiting", type: "Fabric", fabric: "Polyester Viscose", design: "Plain", brand: "Grasim", note: "Durable corporate uniforming", image: "images/suiting_roll.jpg" },
    { id: "s5", title: "Worsted Wool Pinstripe Suiting", category: "Suiting", type: "Fabric", fabric: "Wool Blend", design: "Stripes", brand: "Reid & Taylor", note: "Authentic pinstripe suit", image: "images/suiting_roll.jpg" },
    { id: "s6", title: "Luxury Safari Linen Suiting", category: "Suiting", type: "Fabric", fabric: "Linen", design: "Plain", brand: "Digjam", note: "Structured summer blazer", image: "images/suiting_roll.jpg" },

    // Sarees
    { id: "sr1", title: "Royal Banarasi Silk Saree", category: "Sarees", type: "Saree", fabric: "Silk Banarasi", design: "Self Design", brand: "Padmavati Textile", note: "Traditional Kadiyal gold zari", image: "images/saree_banarasi.jpg" },
    { id: "sr2", title: "Classic Kanjivaram Temple Saree", category: "Sarees", type: "Saree", fabric: "Kanjivaram", design: "Solids", brand: "Rajtext", note: "Heavy zari pallu & korvai border", image: "images/saree_kanjivaram.jpg" },
    { id: "sr3", title: "Designer Georgette Party Saree", category: "Sarees", type: "Saree", fabric: "Satin", design: "Prints", brand: "Laxmipati Saree", note: "Lightweight graceful drape", image: "images/saree_satin.jpg" },
    { id: "sr4", title: "Traditional Yeola Paithani Saree", category: "Sarees", type: "Saree", fabric: "Paithani", design: "Self Design", brand: "Triveni Saree", note: "Rich peacock (mor) pallu", image: "images/saree_paithani.jpg" },
    { id: "sr5", title: "Authentic Gujarati Bandhani Saree", category: "Sarees", type: "Saree", fabric: "Bandhani", design: "Prints", brand: "Ruchi Saree", note: "Intricate tie-dye patterns", image: "images/saree_bandhani.jpg" },
    { id: "sr6", title: "Embroidered Organza Silk Saree", category: "Sarees", type: "Saree", fabric: "Organza", design: "Prints", brand: "Vipul Fashion", note: "Translucent floral delicacy", image: "images/saree_organza.jpg" },
    { id: "sr7", title: "Handloom Pure Cotton Saree", category: "Sarees", type: "Saree", fabric: "Cotton", design: "Checks", brand: "Mafatlal", note: "Breezy comfort day saree", image: "images/saree_cotton.jpg" },

    // Uniforms
    { id: "u1", title: "School Uniform Suiting & Shirting", category: "Uniforms", type: "Uniform", fabric: "Poly Cotton", design: "Checks", brand: "Mafatlal", note: "Tough anti-fade institutional fabric", image: "images/uniform_school.jpg" },
    { id: "u2", title: "Corporate Executive Blazer Suiting", category: "Uniforms", type: "Uniform", fabric: "Polyester Viscose", design: "Solids", brand: "Grasim", note: "Professional unified corporate style", image: "images/uniform_corporate.jpg" },
    { id: "u3", title: "Healthcare Scrub & Coat Material", category: "Uniforms", type: "Uniform", fabric: "Poly Cotton", design: "Plain", brand: "Bombay Dyeing", note: "Hygiene autoclavable finish", image: "images/uniform_institutional.jpg" },

    // Accessories
    { id: "a1", title: "Mulberry Silk Pocket Square", category: "Accessories", type: "Ready-Made", fabric: "Silk Blend", design: "Prints", brand: "Raymond", note: "Hand-rolled hem", image: "images/garment_accessory_cufflinks.jpg" },
    { id: "a2", title: "Executive Jacquard Necktie", category: "Accessories", type: "Ready-Made", fabric: "Silk Blend", design: "Checks", brand: "J. Hampstead", note: "Formal boardroom knot", image: "images/garment_accessory_cufflinks.jpg" }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = GARMENTS_DATA;
}

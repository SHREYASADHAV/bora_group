/**
 * BORA GROUP — Garments & Textile Catalogue Data Architecture
 * Pure structured data for all garment collections, fabric lines, brands, and discovery indices.
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
      icon: "fa-solid fa-person",
      tag: "Ready-to-Wear",
      bgGradient: "from-amber-950/40 via-stone-900/60 to-black/90",
      accent: "text-amber-300"
    },
    {
      id: "womens-wear",
      title: "Women's Wear",
      description: "Elegant ethnic, casual and contemporary fashion.",
      anchor: "#ready-made",
      filterTab: "women",
      icon: "fa-solid fa-person-dress",
      tag: "Couture & Casual",
      bgGradient: "from-rose-950/40 via-stone-900/60 to-black/90",
      accent: "text-rose-300"
    },
    {
      id: "kids-wear",
      title: "Kids' Wear",
      description: "Comfortable and stylish clothing for every age.",
      anchor: "#ready-made",
      filterTab: "kids",
      icon: "fa-solid fa-child",
      tag: "Junior Collection",
      bgGradient: "from-blue-950/40 via-stone-900/60 to-black/90",
      accent: "text-sky-300"
    },
    {
      id: "sarees",
      title: "Sarees",
      description: "Traditional craftsmanship with timeless elegance.",
      anchor: "#saree-collection",
      icon: "fa-solid fa-gem",
      tag: "Heritage Weaves",
      bgGradient: "from-red-950/40 via-stone-900/60 to-black/90",
      accent: "text-amber-400"
    },
    {
      id: "shirting",
      title: "Shirting",
      description: "Premium fabrics for refined everyday and formal shirts.",
      anchor: "#shirting-fabrics",
      icon: "fa-solid fa-shirt",
      tag: "Luxury Weaves",
      bgGradient: "from-cyan-950/40 via-stone-900/60 to-black/90",
      accent: "text-cyan-300"
    },
    {
      id: "suiting",
      title: "Suiting",
      description: "Fine fabrics for sharp, sophisticated tailoring.",
      anchor: "#suiting-fabrics",
      icon: "fa-solid fa-vest",
      tag: "Master Tailoring",
      bgGradient: "from-indigo-950/40 via-stone-900/60 to-black/90",
      accent: "text-indigo-300"
    },
    {
      id: "uniforms",
      title: "Uniforms",
      description: "Reliable apparel solutions for institutions and organizations.",
      anchor: "#uniform-solutions",
      icon: "fa-solid fa-graduation-cap",
      tag: "Institutional",
      bgGradient: "from-emerald-950/40 via-stone-900/60 to-black/90",
      accent: "text-emerald-300"
    },
    {
      id: "accessories",
      title: "Accessories",
      description: "Finishing touches for complete personal style.",
      anchor: "#accessories-section",
      icon: "fa-solid fa-crown",
      tag: "Style Accents",
      bgGradient: "from-yellow-950/40 via-stone-900/60 to-black/90",
      accent: "text-yellow-400"
    }
  ],

  // Section 02: Ready-Made Collection
  readyMade: {
    men: [
      {
        subgroup: "Formal & Casual",
        description: "Sharp cuts and daily refinement tailored for modern gentleman lifestyle",
        items: [
          { name: "Formal Shirts", icon: "fa-solid fa-shirt", note: "Crisp Collars & Refined Drapes" },
          { name: "Casual Shirts", icon: "fa-solid fa-vest-patches", note: "Linen, Oxford & Chambray" },
          { name: "Trousers", icon: "fa-solid fa-socks", note: "Pleated & Flat-Front Tailoring" },
          { name: "Chinos", icon: "fa-regular fa-bookmark", note: "Breathable Stretch Twill" },
          { name: "Jeans", icon: "fa-solid fa-layer-group", note: "Classic Indigo & Washed Denims" },
          { name: "T-Shirts", icon: "fa-regular fa-sun", note: "Superfine Combed Cotton" },
          { name: "Polos", icon: "fa-solid fa-ribbon", note: "Pique Cotton & Contrast Trims" }
        ]
      },
      {
        subgroup: "Indian Wear",
        description: "Timeless traditional cuts celebrating festive heritage and celebratory occasions",
        items: [
          { name: "Kurtas", icon: "fa-solid fa-person-walking", note: "Intricate Threadwork & Silk Blends" },
          { name: "Kurta-Pyjamas", icon: "fa-solid fa-user-tie", note: "Complete Festive Ensembles" },
          { name: "Nehru / Modi Jackets", icon: "fa-solid fa-vest", note: "Mandarin Collar Structure & Brass Accents" }
        ]
      },
      {
        subgroup: "Occasion & Outerwear",
        description: "Distinguished outerwear engineered for commanding presence and comfortable active wear",
        items: [
          { name: "Jackets", icon: "fa-solid fa-shield-halved", note: "All-Season Weather & Style Coats" },
          { name: "Blazers", icon: "fa-solid fa-id-badge", note: "Structured Shoulders & Italian Fall" },
          { name: "Suits", icon: "fa-solid fa-briefcase", note: "Two-Piece & Three-Piece Tailoring" },
          { name: "Track Pants", icon: "fa-solid fa-bolt", note: "Performance Stretch Leisure" },
          { name: "Shorts", icon: "fa-solid fa-compass", note: "Relaxed Weekend Twill & Linens" }
        ]
      },
      {
        subgroup: "Essentials",
        description: "Soft foundational layers crafted for supreme breathable ease",
        items: [
          { name: "Nightwear", icon: "fa-solid fa-moon", note: "Pure Cotton Lounge Sets & Pyjamas" },
          { name: "Innerwear", icon: "fa-solid fa-heart", note: "Breathable Combed Combed Knits" }
        ]
      }
    ],

    women: [
      {
        subgroup: "Everyday & Casual",
        description: "Versatile, breathable daily wear blending comfort and contemporary silhouette",
        items: [
          { name: "Kurtis", icon: "fa-solid fa-person-dress", note: "Printed, A-Line & Straight Cuts" },
          { name: "Tops", icon: "fa-solid fa-wand-magic-sparkles", note: "Fluid Georgettes, Cottons & Crepes" },
          { name: "Shirts", icon: "fa-solid fa-shirt", note: "Tailored Linens & Relaxed Silks" },
          { name: "T-Shirts", icon: "fa-regular fa-sun", note: "Bio-Washed Everyday Basics" },
          { name: "Jeans", icon: "fa-solid fa-layer-group", note: "High-Rise, Flare & Slim Stretch" },
          { name: "Pants", icon: "fa-solid fa-lines-leaning", note: "Cigarette & Tapered Formal Trousers" },
          { name: "Leggings", icon: "fa-solid fa-arrows-up-down", note: "Four-Way Stretch Bio-Polished Cotton" },
          { name: "Palazzo", icon: "fa-solid fa-wind", note: "Wide-Leg Flowing Rayon & Crepe" }
        ]
      },
      {
        subgroup: "Ethnic Wear",
        description: "Regal craftsmanship embodying India's opulent embroidery and hand-woven art",
        items: [
          { name: "Kurta Sets", icon: "fa-solid fa-award", note: "Coordinated Dupatta & Pant Sets" },
          { name: "Salwar Suits", icon: "fa-solid fa-feather", note: "Chanderi, Chiffon & Silk Silhouettes" },
          { name: "Dresses", icon: "fa-solid fa-heart", note: "Maxi & Midi Fusion silhouettes" },
          { name: "Gowns", icon: "fa-solid fa-star", note: "Floor-Length Red Carpet Elegance" },
          { name: "Lehengas", icon: "fa-solid fa-crown", note: "Zari, Mirror & Resham Bridal Heritage" }
        ]
      },
      {
        subgroup: "Occasion",
        description: "Statement party attire and coordinated sets designed for memorable evenings",
        items: [
          { name: "Party Wear", icon: "fa-solid fa-champagne-glasses", note: "Contemporary Cocktail Attire" },
          { name: "Co-ord Sets", icon: "fa-solid fa-clone", note: "Tailored Monochromatic Two-Pieces" }
        ]
      },
      {
        subgroup: "Essentials",
        description: "Delicate comfort wear prioritising soft skin feel and all-day flexibility",
        items: [
          { name: "Nightwear", icon: "fa-solid fa-moon", note: "Pure Cotton Kaftans & Satin Sleepwear" },
          { name: "Innerwear", icon: "fa-solid fa-shield", note: "Seamless, Wirefree & Cotton Lingerie" }
        ]
      }
    ],

    kids: [
      {
        subgroup: "Junior Ready-Made Collection",
        description: "Playful designs, vibrant shades, and gentle hypoallergenic cottons built for active kids",
        items: [
          { name: "T-Shirts", icon: "fa-solid fa-child", note: "Playful Prints & Breathable Soft Cotton" },
          { name: "Jeans", icon: "fa-solid fa-layer-group", note: "Durable Flexible Denim for Active Days" },
          { name: "Trousers", icon: "fa-solid fa-socks", note: "Smart Chinos & Elasticated Waist Trousers" },
          { name: "Shorts", icon: "fa-solid fa-compass", note: "Casual Cargo & Breezy Cotton Shorts" },
          { name: "Frocks", icon: "fa-solid fa-wand-magic-sparkles", note: "Twirly Cotton, Lace & Tiered Frocks" },
          { name: "Dresses", icon: "fa-solid fa-person-dress", note: "Party Dresses & Floral Day Frocks" },
          { name: "Ethnic Wear", icon: "fa-solid fa-crown", note: "Junior Kurta-Pyjamas, Sherwanis & Lehengas" },
          { name: "Party Wear", icon: "fa-solid fa-star", note: "Blazer Sets, Gowns & Tuxedo Accents" },
          { name: "Nightwear", icon: "fa-solid fa-moon", note: "Ultra-Soft Organic Cotton Sleep Sets" },
          { name: "Infant Sets", icon: "fa-solid fa-baby", note: "Newborn Rompers, Onesies & Gentle Mitts" }
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
        badge: "Signature Grade"
      },
      {
        name: "Egyptian Cotton Royal Plain",
        fabric: "Egyptian Cotton",
        design: "Plain",
        description: "The world benchmark for cotton luxury with unmatched breathability and a cooling touch.",
        characteristics: "120s Two-Ply • Featherlight • Crisp Fall",
        bestFor: "Luxury White Shirts & Black-Tie Formals",
        badge: "World Renowned"
      },
      {
        name: "Pure European Linen",
        fabric: "Pure Linen",
        design: "Checks",
        description: "Naturally thermoregulating pure flax with a relaxed, sophisticated textured drape.",
        characteristics: "60 Lea Pure Flax • Breathable • Earthy Texture",
        bestFor: "Warm Weather & Resort Sophistication",
        badge: "100% Flax"
      },
      {
        name: "Crisp Oxford Button-Down",
        fabric: "Oxford",
        design: "Stripes",
        description: "Classic basket-weave texture that grows softer with every wash while retaining robust body.",
        characteristics: "Pinpoint Basket Weave • Substantial Body • Resilient",
        bestFor: "Classic Office & Smart Casual Shirts",
        badge: "Heritage Weave"
      },
      {
        name: "Silken Poplin Weave",
        fabric: "Poplin",
        design: "Solids",
        description: "Tightly woven fine-rib surface providing exceptional smoothness and crisp collar definition.",
        characteristics: "Fine Plain Weave • Smooth Finish • High Color Fastness",
        bestFor: "Everyday Corporate Wardrobes",
        badge: "Office Essential"
      },
      {
        name: "Sustainable Lyocell Twill",
        fabric: "Lyocell",
        design: "Prints",
        description: "Eco-conscious wood pulp fiber with a fluid silk-like drape and anti-crease nature.",
        characteristics: "Botanical Fiber • Moisture Absorbent • Silky Touch",
        bestFor: "Contemporary Printed & Fluid Shirts",
        badge: "Eco-Luxe"
      },
      {
        name: "Paper Cotton Lightweight",
        fabric: "Paper Cotton",
        design: "Self Design",
        description: "Distinct crisp, parchment-like handfeel with featherweight density ideal for humid climates.",
        characteristics: "Ultra-Lightweight • Micro Self Texture • Dry Feel",
        bestFor: "Summer Kurtas & Relaxed Collars",
        badge: "Featherweight"
      },
      {
        name: "Classic Fine Cotton Checks",
        fabric: "Cotton",
        design: "Checks",
        description: "Yarn-dyed micro checks woven with compact combed cotton for everyday polish.",
        characteristics: "100% Combed Cotton • Yarn-Dyed • Anti-Pilling",
        bestFor: "Business Casual & Weekend Wear",
        badge: "Timeless Classic"
      },
      {
        name: "Micro Stripe Executive Cotton",
        fabric: "Cotton",
        design: "Stripes",
        description: "Precision-engineered pinstripes and banker stripes on smooth cotton ground.",
        characteristics: "Precision Stripe Weave • Clean Contrast • Easy Care",
        bestFor: "Corporate Power Shirts",
        badge: "Executive Standard"
      },
      {
        name: "Floral & Motif Printed Linen",
        fabric: "Pure Linen",
        design: "Prints",
        description: "Hand-screen and digital botanical motifs on pure textured linen slub.",
        characteristics: "Digital Pigment Print • Pure Linen Slub • Artisanal Look",
        bestFor: "Weekend Brunches & Destination Events",
        badge: "Artisanal Print"
      },
      {
        name: "Subtle Self Design Jacquard",
        fabric: "Giza Cotton",
        design: "Self Design",
        description: "Tonal dobby and jacquard textures creating rich light refraction across the shirt surface.",
        characteristics: "Dobby Woven • Tone-on-Tone Depth • Rich Luster",
        bestFor: "Evening Formals & Wedding Guest Shirts",
        badge: "Dobby Texture"
      },
      {
        name: "Crisp Plain White Oxford",
        fabric: "Oxford",
        design: "Plain",
        description: "The timeless American classic woven with contrasting white warp and weft yarns.",
        characteristics: "Two-Fold 80s Yarn • Sturdy Drape • Natural Give",
        bestFor: "Ivy Style & Daily Formals",
        badge: "Wardrobe Foundation"
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
        weave: "Fine Serge Twill"
      },
      {
        name: "Wool Blend",
        tagline: "Elegant • Comfortable • Formal",
        description: "The gold standard balance of natural merino wool warmth, breathable comfort, and tailored structure.",
        weight: "280–320 GSM",
        weave: "Worsted Wool"
      },
      {
        name: "Terry Wool",
        tagline: "Rich Fall • Warmth • Classic Tailoring",
        description: "Prestigious blend offering substantial handfeel, natural bounce, and timeless crease retention for winter suits.",
        weight: "310–350 GSM",
        weave: "Structured Twill"
      },
      {
        name: "Linen",
        tagline: "Natural Drape • Breathable • Summer Luxury",
        description: "Pure European flax tailored into unconstructed blazers and trousers with unmatched organic character.",
        weight: "220–260 GSM",
        weave: "Plain Linen Weave"
      },
      {
        name: "Poly Cotton",
        tagline: "Resilient • Crisp Fit • Low Maintenance",
        description: "Tough, shape-retaining blend designed for heavy-duty uniforms, trousers, and daily corporate suiting.",
        weight: "240–280 GSM",
        weave: "Compact Drill"
      },
      {
        name: "Linen Blend",
        tagline: "Lightweight • Breathable • Premium",
        description: "Blends the organic coolness of linen with wrinkle-softening fibers for a refined safari jacket or summer blazer.",
        weight: "240–270 GSM",
        weave: "Slub Weave"
      },
      {
        name: "TR Stretch",
        tagline: "Flexible • Comfortable • Modern",
        description: "Terylene-Rayon infused with elastane for 360-degree mobility in slim-fit modern tailored suits and trousers.",
        weight: "270–300 GSM",
        weave: "Bi-Stretch Twill"
      },
      {
        name: "PV Stretch",
        tagline: "Durable • Smooth • Easy Movement",
        description: "All-day comfort with active rebound, silky face touch, and high abrasion resistance for active professionals.",
        weight: "260–295 GSM",
        weave: "Mechanical Stretch"
      }
    ]
  },

  // Section 05: Trusted Shirting Brands (15 brands)
  shirtingBrands: [
    { name: "Raymond", heritage: "Since 1925", specialty: "The Complete Man — Suiting & Fine Shirting", origin: "Mumbai, India" },
    { name: "Siyaram's", heritage: "Since 1978", specialty: "Come Home to Siyaram's — Premium Poly-Viscose & Cottons", origin: "Mumbai, India" },
    { name: "J. Hampstead", heritage: "Est. Heritage", specialty: "Italian Crafted Wool & Luxury Cottons", origin: "England / India" },
    { name: "Arvind", heritage: "Since 1931", specialty: "Pioneers in Denims, Cottons & Smart Fabrics", origin: "Ahmedabad, India" },
    { name: "Digjam", heritage: "Since 1948", specialty: "Fine Woollens & Classic Suiting Traditions", origin: "Jamnagar, India" },
    { name: "Vimal", heritage: "Since 1966", specialty: "Only Vimal — Iconic Textile Innovation & Drapes", origin: "Gujarat, India" },
    { name: "Grasim", heritage: "Since 1947", specialty: "Aditya Birla Group — Suiting & Shirting Excellence", origin: "Nagda, India" },
    { name: "Linen Club", heritage: "Since 1949", specialty: "100% Pure European Flax Certified Linens", origin: "Rishra, India" },
    { name: "OCM", heritage: "Since 1924", specialty: "Oriental Carpet Manufacturers — Master Woollens", origin: "Amritsar, India" },
    { name: "Mafatlal", heritage: "Since 1905", specialty: "Over 100 Years of Cotton Shirting Excellence", origin: "Mumbai, India" },
    { name: "Birla Century", heritage: "Century Mills", specialty: "State-of-the-Art Fine Shirting & Bedding Textiles", origin: "Bharuch, India" },
    { name: "Ruby Mills", heritage: "Since 1917", specialty: "Pioneering Technical & Interlining Textiles", origin: "Mumbai, India" },
    { name: "Reid & Taylor", heritage: "Est. Scotland", specialty: "Luxury Scottish Heritage Worsted Woollens", origin: "Langholm / India" },
    { name: "Bombay Dyeing", heritage: "Since 1879", specialty: "Iconic Heritage Linens, Cottons & Daily Weaves", origin: "Mumbai, India" },
    { name: "Gini & House", heritage: "Modern Mill", specialty: "Contemporary Fashion Shirting & Everyday Prints", origin: "India" }
  ],

  // Section 06: Saree Brands (7 brands)
  sareeBrands: [
    { name: "Laxmipati Saree", heritage: "Signature Brand", specialty: "Chiffon, Georgette & Designer Festive Sarees", origin: "Surat, Gujarat" },
    { name: "Rajtext", heritage: "Textile Pioneer", specialty: "Traditional Jacquard & Wedding Silks", origin: "Surat, Gujarat" },
    { name: "Vipul Fashion", heritage: "Since 1974", specialty: "Everyday Georgettes, Cottons & Printed Drapes", origin: "Surat, Gujarat" },
    { name: "Triveni Saree", heritage: "Since 1985", specialty: "Graceful Bridal, Festive & Embroidered Sarees", origin: "Surat, Gujarat" },
    { name: "Ruchi Saree", heritage: "Trusted Mill", specialty: "Contemporary Digital Prints & Casual Silks", origin: "Surat, Gujarat" },
    { name: "Vinay Fashion", heritage: "Designer Couture", specialty: "Boutique Silk Kurtis, Sarees & Party Wear", origin: "Surat, Gujarat" },
    { name: "Padmavati Textile", heritage: "Heritage Weaver", specialty: "Fine Silk Embellishments & Handloom Drapes", origin: "Varanasi / Surat" }
  ],

  // Section 07: Saree Collection (7 traditional categories)
  sareeCollection: [
    {
      name: "Silk Banarasi",
      origin: "Varanasi, Uttar Pradesh",
      description: "Opulent gold and silver brocade (zari) woven with fine mulberry silk for bridal grandeur.",
      details: "Real Zari Work • Kadiyal Technique • Regal Pallu",
      tag: "Bridal Masterpiece",
      patternType: "zari-brocade"
    },
    {
      name: "Kanjivaram",
      origin: "Kanchipuram, Tamil Nadu",
      description: "Heavily woven lustrous silk characterized by contrast temple borders and pure zari threads.",
      details: "Korvai Weaving • Heavy Mulberry Silk • Heritage Borders",
      tag: "Temple Heritage",
      patternType: "korvai-border"
    },
    {
      name: "Cotton",
      origin: "Bengal & Chanderi Traditions",
      description: "Airy, breathable hand-spun cotton sarees celebrating everyday grace and understated poise.",
      details: "Hypoallergenic • Soft Combed Yarn • Geometric Borders",
      tag: "All-Day Grace",
      patternType: "cotton-texture"
    },
    {
      name: "Paithani",
      origin: "Paithan & Yeola, Maharashtra",
      description: "Maharashtra’s crowning jewel featuring kaleidoscopic peacock (mor) motifs and oblique square pallus.",
      details: "Peacock Pallu • Pure Silk & Gold Zari • Maharashtrian Pride",
      tag: "Maharashtra Gem",
      patternType: "paithani-motif"
    },
    {
      name: "Satin",
      origin: "Contemporary Silk Weaves",
      description: "High-gloss liquid surface with an ethereal drape, tailored for modern cocktail and evening galas.",
      details: "Ultra-Smooth Fall • Fluid Gloss Finish • Modern Glamour",
      tag: "Evening Glamour",
      patternType: "satin-sheen"
    },
    {
      name: "Organza",
      origin: "Delicate Sheer Weaves",
      description: "Translucent, crisp sheer fabric hand-painted or embroidered with pastel floral bouquets.",
      details: "Featherlight Sheer • Crisp Sculpture • Pastel Palettes",
      tag: "Modern Romantic",
      patternType: "organza-sheer"
    },
    {
      name: "Bandhani",
      origin: "Gujarat & Rajasthan",
      description: "Intricate centuries-old tie-dye artistry creating mesmerizing dotted mandalas on soft georgettes and silks.",
      details: "Hand Tie-Dye (Bandhej) • Sacred Colors • Artisanal Dots",
      tag: "Vibrant Heritage",
      patternType: "bandhani-dots"
    }
  ],

  // Section 08: Uniform Solutions (3 categories)
  uniforms: [
    {
      title: "School Uniforms",
      category: "K-12 Educational Institutions",
      description: "Hard-wearing, colorfast fabrics designed for daily school life. Includes customized shirts, pleated skirts, pinafores, trousers, house t-shirts, and blazers.",
      features: ["Reinforced Double Stitching", "Anti-Pilling Breathable Blends", "Custom Institutional Monograms"],
      icon: "fa-solid fa-graduation-cap"
    },
    {
      title: "Corporate Uniforms",
      category: "Offices, Hotels & Executive Teams",
      description: "Sophisticated corporate apparel elevating enterprise identity. Custom tailored formal shirts, blazers, waistcoats, and trousers crafted from crease-free fabrics.",
      features: ["Precision Corporate Tailoring", "Wrinkle-Resistant PV Blends", "Bespoke Brand Color Matching"],
      icon: "fa-solid fa-briefcase"
    },
    {
      title: "Institutional Uniforms",
      category: "Hospitals, Security & Industrial Floors",
      description: "Engineered high-durability apparel for healthcare, technical facilities, and security forces with specialized industrial safety and hygiene standards.",
      features: ["Autoclavable Healthcare Scrubs", "High-Visibility Safety Bands", "Heavy-Duty Twill & Ripstop"],
      icon: "fa-solid fa-building-shield"
    }
  ],

  // Section 09: Accessories
  accessories: {
    heading: "Accessories",
    description: "Complete your look with carefully selected fashion and garment accessories.",
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
    { id: "m1", title: "Executive Formal Shirt", category: "Men", type: "Ready-Made", fabric: "Cotton", design: "Solids", brand: "Raymond", note: "Classic collar formal wear" },
    { id: "m2", title: "Pure Linen Casual Shirt", category: "Men", type: "Ready-Made", fabric: "Linen", design: "Plain", brand: "Linen Club", note: "Relaxed breathable fit" },
    { id: "m3", title: "Tailored Formal Trousers", category: "Men", type: "Ready-Made", fabric: "Polyester Viscose", design: "Plain", brand: "Siyaram's", note: "Sharp crease retention" },
    { id: "m4", title: "Smart Stretch Chinos", category: "Men", type: "Ready-Made", fabric: "Cotton", design: "Solids", brand: "Arvind", note: "Four-season daily stretch" },
    { id: "m5", title: "Classic Straight Jeans", category: "Men", type: "Ready-Made", fabric: "Cotton", design: "Plain", brand: "Arvind", note: "Durable ring-spun denim" },
    { id: "m6", title: "Combed Cotton Pique Polo", category: "Men", type: "Ready-Made", fabric: "Cotton", design: "Solids", brand: "Gini & House", note: "Sporty weekend essential" },
    { id: "m7", title: "Royal Silk Kurta", category: "Men", type: "Ready-Made", fabric: "Cotton", design: "Self Design", brand: "Bora Collection", note: "Festive celebration ensemble" },
    { id: "m8", title: "Mandarin Nehru Jacket", category: "Men", type: "Ready-Made", fabric: "Wool Blend", design: "Self Design", brand: "Raymond", note: "Structured ceremonial vest" },
    { id: "m9", title: "Executive Two-Piece Suit", category: "Men", type: "Ready-Made", fabric: "Wool Blend", design: "Solids", brand: "Reid & Taylor", note: "Classic British tailoring" },
    { id: "m10", title: "Classic Track Pants", category: "Men", type: "Ready-Made", fabric: "Cotton", design: "Plain", brand: "Bora Fashion", note: "Relaxed leisure wear" },

    // Women's Ready-Made
    { id: "w1", title: "Hand-Block Printed Kurti", category: "Women", type: "Ready-Made", fabric: "Cotton", design: "Prints", brand: "Bora Fashion", note: "Daily ethnic flair" },
    { id: "w2", title: "Chiffon Embroidered Anarkali", category: "Women", type: "Ready-Made", fabric: "Silk Blend", design: "Prints", brand: "Vinay Fashion", note: "Festive wedding elegance" },
    { id: "w3", title: "Tailored Linen Shirt", category: "Women", type: "Ready-Made", fabric: "Linen", design: "Stripes", brand: "Linen Club", note: "Workplace sophistication" },
    { id: "w4", title: "Flowing Rayon Palazzo", category: "Women", type: "Ready-Made", fabric: "Lyocell", design: "Solids", brand: "Bora Fashion", note: "Comfort-fit wide leg" },
    { id: "w5", title: "Bridal Silk Lehenga Set", category: "Women", type: "Ready-Made", fabric: "Silk Blend", design: "Self Design", brand: "Rajtext", note: "Regal zardozi craftsmanship" },
    { id: "w6", title: "Contemporary Party Co-ord Set", category: "Women", type: "Ready-Made", fabric: "Polyester Viscose", design: "Solids", brand: "Vinay Fashion", note: "Modern cocktail silhouette" },

    // Kids' Ready-Made
    { id: "k1", title: "Junior Graphic Cotton T-Shirt", category: "Kids", type: "Ready-Made", fabric: "Cotton", design: "Prints", brand: "Gini & House", note: "Soft combed playwear" },
    { id: "k2", title: "Kids Flexible Denim Jeans", category: "Kids", type: "Ready-Made", fabric: "Cotton", design: "Plain", brand: "Arvind", note: "Elasticated comfortable waist" },
    { id: "k3", title: "Junior Festive Kurta Set", category: "Kids", type: "Ready-Made", fabric: "Cotton", design: "Self Design", brand: "Bora Fashion", note: "Traditional festive wear" },
    { id: "k4", title: "Girls Floral Party Frock", category: "Kids", type: "Ready-Made", fabric: "Cotton", design: "Prints", brand: "Bora Fashion", note: "Tiered twirl dress" },

    // Fabrics — Shirting
    { id: "f1", title: "Giza Cotton 100s Fabric", category: "Shirting", type: "Fabric", fabric: "Giza Cotton", design: "Plain", brand: "Arvind", note: "Luxury shirting yardage" },
    { id: "f2", title: "Fine Checks Italian Shirting", category: "Shirting", type: "Fabric", fabric: "Cotton", design: "Checks", brand: "J. Hampstead", note: "Yarn-dyed micro check" },
    { id: "f3", title: "Pure European Linen Yardage", category: "Shirting", type: "Fabric", fabric: "Linen", design: "Solids", brand: "Linen Club", note: "60 Lea authenticated flax" },
    { id: "f4", title: "Banker Stripe Poplin Fabric", category: "Shirting", type: "Fabric", fabric: "Poplin", design: "Stripes", brand: "Raymond", note: "Classic office stripe weave" },
    { id: "f5", title: "Paper Cotton Summer Yardage", category: "Shirting", type: "Fabric", fabric: "Paper Cotton", design: "Plain", brand: "Mafatlal", note: "Lightweight parchment finish" },
    { id: "f6", title: "Egyptian Cotton Dobby Fabric", category: "Shirting", type: "Fabric", fabric: "Egyptian Cotton", design: "Self Design", brand: "Birla Century", note: "Subtle lustrous dobby" },
    { id: "f7", title: "Oxford Pinpoint Cotton", category: "Shirting", type: "Fabric", fabric: "Oxford", design: "Checks", brand: "Ruby Mills", note: "Robust two-fold weave" },
    { id: "f8", title: "Sustainable Lyocell Fluid Fabric", category: "Shirting", type: "Fabric", fabric: "Lyocell", design: "Prints", brand: "Arvind", note: "Botanical silky twill" },

    // Fabrics — Suiting
    { id: "s1", title: "Superfine Merino Wool Suiting", category: "Suiting", type: "Fabric", fabric: "Wool Blend", design: "Solids", brand: "Raymond", note: "Super 120s luxury suiting" },
    { id: "s2", title: "Royal Terry Wool Suiting", category: "Suiting", type: "Fabric", fabric: "Terry Wool", design: "Plain", brand: "OCM", note: "Warm fall for classic coats" },
    { id: "s3", title: "TR 4-Way Stretch Suiting", category: "Suiting", type: "Fabric", fabric: "TR Stretch", design: "Solids", brand: "Siyaram's", note: "Modern executive flexibility" },
    { id: "s4", title: "Heavy Weight PV Suiting", category: "Suiting", type: "Fabric", fabric: "Polyester Viscose", design: "Plain", brand: "Grasim", note: "Durable corporate uniforming" },
    { id: "s5", title: "Worsted Wool Pinstripe Suiting", category: "Suiting", type: "Fabric", fabric: "Wool Blend", design: "Stripes", brand: "Reid & Taylor", note: "Authentic pinstripe suit" },
    { id: "s6", title: "Luxury Safari Linen Suiting", category: "Suiting", type: "Fabric", fabric: "Linen", design: "Plain", brand: "Digjam", note: "Structured summer blazer" },

    // Sarees
    { id: "sr1", title: "Royal Banarasi Silk Saree", category: "Sarees", type: "Saree", fabric: "Silk Banarasi", design: "Self Design", brand: "Padmavati Textile", note: "Traditional Kadiyal gold zari" },
    { id: "sr2", title: "Classic Kanjivaram Temple Saree", category: "Sarees", type: "Saree", fabric: "Kanjivaram", design: "Solids", brand: "Rajtext", note: "Heavy zari pallu & korvai border" },
    { id: "sr3", title: "Designer Georgette Party Saree", category: "Sarees", type: "Saree", fabric: "Satin", design: "Prints", brand: "Laxmipati Saree", note: "Lightweight graceful drape" },
    { id: "sr4", title: "Traditional Yeola Paithani Saree", category: "Sarees", type: "Saree", fabric: "Paithani", design: "Self Design", brand: "Triveni Saree", note: "Rich peacock (mor) pallu" },
    { id: "sr5", title: "Authentic Gujarati Bandhani Saree", category: "Sarees", type: "Saree", fabric: "Bandhani", design: "Prints", brand: "Ruchi Saree", note: "Intricate tie-dye patterns" },
    { id: "sr6", title: "Embroidered Organza Silk Saree", category: "Sarees", type: "Saree", fabric: "Organza", design: "Prints", brand: "Vipul Fashion", note: "Translucent floral delicacy" },
    { id: "sr7", title: "Handloom Pure Cotton Saree", category: "Sarees", type: "Saree", fabric: "Cotton", design: "Checks", brand: "Mafatlal", note: "Breezy comfort day saree" },

    // Uniforms
    { id: "u1", title: "School Uniform Suiting & Shirting", category: "Uniforms", type: "Uniform", fabric: "Poly Cotton", design: "Checks", brand: "Mafatlal", note: "Tough anti-fade institutional fabric" },
    { id: "u2", title: "Corporate Executive Blazer Suiting", category: "Uniforms", type: "Uniform", fabric: "Polyester Viscose", design: "Solids", brand: "Grasim", note: "Professional unified corporate style" },
    { id: "u3", title: "Healthcare Scrub & Coat Material", category: "Uniforms", type: "Uniform", fabric: "Poly Cotton", design: "Plain", brand: "Bombay Dyeing", note: "Hygiene autoclavable finish" },

    // Accessories
    { id: "a1", title: "Mulberry Silk Pocket Square", category: "Accessories", type: "Ready-Made", fabric: "Silk Blend", design: "Prints", brand: "Raymond", note: "Hand-rolled hem" },
    { id: "a2", title: "Executive Jacquard Necktie", category: "Accessories", type: "Ready-Made", fabric: "Silk Blend", design: "Checks", brand: "J. Hampstead", note: "Formal boardroom knot" }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = GARMENTS_DATA;
}

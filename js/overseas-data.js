/**
 * BORA GROUP — Overseas Trade Data Store
 * Minimal, concise product specifications for export commodities:
 * Vegetables, Grains, Spices, and Clothes.
 */

const OVERSEAS_DATA = {
  sectors: [
    { id: 'all', name: 'All Sectors' },
    { id: 'vegetables', name: 'Vegetables' },
    { id: 'grains', name: 'Grains' },
    { id: 'spices', name: 'Spices' },
    { id: 'clothes', name: 'Clothes' }
  ],

  products: [
    // Vegetables
    {
      id: 'veg-onions',
      name: 'Nashik Red Onions',
      category: 'vegetables',
      categoryLabel: 'Vegetables',
      image: 'images/trade/onions.jpg',
      spec: 'Grade A • 45mm–60mm+ • Nashik',
      desc: 'Export-grade red onions with crisp outer skin and long sea-transit shelf life.'
    },
    {
      id: 'veg-potatoes',
      name: 'Table Potatoes',
      category: 'vegetables',
      categoryLabel: 'Vegetables',
      image: 'images/trade/potatoes.jpg',
      spec: 'Grade A • Soil-Washed • Maharashtra',
      desc: 'Uniformly calibrated table potatoes with firm skin and low sugar content.'
    },
    {
      id: 'veg-green-chillies',
      name: 'Fresh Green Chillies',
      category: 'vegetables',
      categoryLabel: 'Vegetables',
      image: 'images/trade/green_chillies.jpg',
      spec: 'G4 & Bullet Varieties • Cold-Chain',
      desc: 'Crisp green chillies with intact stems, transported under temperature control.'
    },
    {
      id: 'veg-garlic-ginger',
      name: 'Fresh Garlic & Ginger',
      category: 'vegetables',
      categoryLabel: 'Vegetables',
      image: 'images/trade/garlic_ginger.jpg',
      spec: 'Clean Rhizomes • Mature Cloves',
      desc: 'Air-dried ginger roots and white multi-clove garlic bulbs, sorted for export.'
    },
    {
      id: 'veg-tomatoes',
      name: 'Vine-Ripened Tomatoes',
      category: 'vegetables',
      categoryLabel: 'Vegetables',
      image: 'images/trade/fresh_tomatoes.jpg',
      spec: 'Breaker Stage • Reefer Transit',
      desc: 'Firm, uniform tomatoes harvested at breaker stage for optimal port arrival.'
    },
    {
      id: 'veg-seasonal',
      name: 'Seasonal Farm Greens',
      category: 'vegetables',
      categoryLabel: 'Vegetables',
      image: 'images/trade/vegetables_mix.jpg',
      spec: 'Tender Okra & Gourds • Hydro-Cooled',
      desc: 'Fresh seasonal farm harvest handled under strict phytosanitary guidelines.'
    },

    // Grains
    {
      id: 'grain-basmati',
      name: '1121 Steam Basmati Rice',
      category: 'grains',
      categoryLabel: 'Grains',
      image: 'images/trade/basmati_rice.jpg',
      spec: 'Extra Long Grain • Aged Steam Rice',
      desc: 'Aromatic basmati rice with slender grains and non-sticky cooking texture.'
    },
    {
      id: 'grain-wheat',
      name: 'Sharbati & Durum Wheat',
      category: 'grains',
      categoryLabel: 'Grains',
      image: 'images/trade/wheat_grains.jpg',
      spec: 'High Protein • Machine Cleaned',
      desc: 'Heavy golden milling wheat grains sorted for commercial flour and semolina production.'
    },
    {
      id: 'grain-maize',
      name: 'Yellow Commercial Maize',
      category: 'grains',
      categoryLabel: 'Grains',
      image: 'images/trade/yellow_maize.jpg',
      spec: 'High Starch • Low Moisture',
      desc: 'Evenly graded yellow corn kernels suited for commercial feed and starch processing.'
    },
    {
      id: 'grain-millets',
      name: 'Sorghum & Millets',
      category: 'grains',
      categoryLabel: 'Grains',
      image: 'images/trade/pulses_millets.jpg',
      spec: 'Jowar & Bajra • Sortex Cleaned',
      desc: 'Nutrient-rich ancient grains directly sourced from local agricultural cooperatives.'
    },
    {
      id: 'grain-chickpeas',
      name: 'Kabuli Chickpeas',
      category: 'grains',
      categoryLabel: 'Grains',
      image: 'images/trade/chickpeas.jpg',
      spec: 'Large Calibration • Laser Sorted',
      desc: 'Creamy white chickpeas with uniform caliber and high natural protein content.'
    },

    // Spices
    {
      id: 'spice-turmeric',
      name: 'Salem Turmeric',
      category: 'spices',
      categoryLabel: 'Spices',
      image: 'images/trade/turmeric.jpg',
      spec: 'High Curcumin • Polished Fingers & Powder',
      desc: 'Vibrant golden turmeric fingers and finely ground powder with certified natural curcumin.'
    },
    {
      id: 'spice-chillies',
      name: 'Guntur Dry Red Chillies',
      category: 'spices',
      categoryLabel: 'Spices',
      image: 'images/trade/red_chillies.jpg',
      spec: 'Sun-Dried • Stemless Grade A',
      desc: 'Deep red dry chillies known for distinctive heat indexes and rich natural color.'
    },
    {
      id: 'spice-pepper',
      name: 'Malabar Black Pepper',
      category: 'spices',
      categoryLabel: 'Spices',
      image: 'images/trade/black_pepper.jpg',
      spec: 'Tellicherry Bold • High Piperine',
      desc: 'Whole black peppercorns naturally sun-cured with bold puncture and sharp aroma.'
    },
    {
      id: 'spice-cardamom',
      name: 'Green Cardamom & Cloves',
      category: 'spices',
      categoryLabel: 'Spices',
      image: 'images/trade/cardamom_cloves.jpg',
      spec: 'Extra Bold 7–8mm • Vacuum Sealed',
      desc: 'Selected whole green pods and cloves preserving essential volatile aromatic oils.'
    },
    {
      id: 'spice-seeds',
      name: 'Cumin & Coriander Seeds',
      category: 'spices',
      categoryLabel: 'Spices',
      image: 'images/trade/whole_spices.jpg',
      spec: '99.5% Purity • Machine Cleaned',
      desc: 'Aromatic whole seeds sun-dried and sortex-cleaned for retail and seasoning exports.'
    },

    // Clothes
    {
      id: 'cloth-cotton',
      name: 'Organic Cotton Apparel',
      category: 'clothes',
      categoryLabel: 'Clothes',
      image: 'images/trade/cotton_apparel.jpg',
      spec: '100% Combed Cotton • Custom OEM',
      desc: 'Single jersey t-shirts, polos, and casualwear crafted to client specifications.'
    },
    {
      id: 'cloth-workwear',
      name: 'Industrial Workwear',
      category: 'clothes',
      categoryLabel: 'Clothes',
      image: 'images/trade/industrial_workwear.jpg',
      spec: 'Heavy Duty • High-Visibility Options',
      desc: 'Durable boilersuits, safety jackets, and protective cargo trousers for industry.'
    },
    {
      id: 'cloth-shirting',
      name: 'Woven Shirting & Suiting',
      category: 'clothes',
      categoryLabel: 'Clothes',
      image: 'images/trade/shirting_fabric.jpg',
      spec: 'Yarn-Dyed Loom Rolls • Fine Count',
      desc: 'High-density cotton and poly-viscose fabrics woven on airjet looms.'
    },
    {
      id: 'cloth-uniforms',
      name: 'Corporate & Institutional Uniforms',
      category: 'clothes',
      categoryLabel: 'Clothes',
      image: 'images/garment_uniforms.jpg',
      spec: 'Easy-Care Fabric • Custom Embroidery',
      desc: 'Tailored executive, hospital, and hospitality staff uniforms with durable stitching.'
    }
  ]
};

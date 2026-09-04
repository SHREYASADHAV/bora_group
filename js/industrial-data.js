/**
 * BORA GROUP — Industrial Supply Catalogue Data Architecture
 * 100% Accurate Photographic Assets corresponding directly to each specific category & product.
 */

const INDUSTRIAL_DATA = {
  // 01 — Shop by Category
  categories: [
    {
      id: "chemicals",
      name: "Chemicals",
      description: "Industrial and commercial chemical supplies.",
      anchor: "#chemicals",
      image: "images/ind_chemicals.jpg",
      tag: "Raw Materials",
      material: "Chemicals"
    },
    {
      id: "glass-containers",
      name: "Glass Containers",
      description: "Glass containers for packaging and industrial applications.",
      anchor: "#glass-containers",
      image: "images/ind_glass_containers.jpg",
      tag: "Packaging",
      material: "Glass"
    },
    {
      id: "pet-products",
      name: "PET Products",
      description: "Reliable PET packaging solutions.",
      anchor: "#pet-products",
      image: "images/ind_pet_bottles.jpg",
      tag: "Containers",
      material: "PET"
    },
    {
      id: "packaging-materials",
      name: "Packaging Materials",
      description: "Essential materials for secure and efficient packaging.",
      anchor: "#packaging",
      image: "images/ind_packaging_materials.jpg",
      tag: "Logistics",
      material: "Packaging"
    },
    {
      id: "tapes",
      name: "Tapes",
      description: "Industrial and packaging tapes for everyday applications.",
      anchor: "#packaging",
      image: "images/ind_packaging_tapes.jpg",
      tag: "Fastening",
      material: "PP"
    },
    {
      id: "boxes",
      name: "Boxes",
      description: "Practical packaging and storage solutions.",
      anchor: "#packaging",
      image: "images/ind_boxes.jpg",
      tag: "Corrugated",
      material: "Packaging"
    },
    {
      id: "printing",
      name: "Printing",
      description: "Printing solutions for packaging and business requirements.",
      anchor: "#packaging",
      image: "images/ind_printing.jpg",
      tag: "Customization",
      material: "Printing"
    },
    {
      id: "caps-closures",
      name: "Caps & Closures",
      description: "Reliable closures for bottles and containers.",
      anchor: "#caps-closures",
      image: "images/ind_aluminium_caps.jpg",
      tag: "Closures",
      material: "Aluminium / PP"
    },
    {
      id: "preforms",
      name: "Preforms",
      description: "PET preforms for bottle manufacturing and packaging.",
      anchor: "#preforms",
      image: "images/ind_pet_preforms.jpg",
      tag: "Manufacturing",
      material: "PET"
    }
  ],

  // 02 — PET Products
  petProducts: [
    {
      id: "pet-jars",
      name: "PET Jars",
      description: "Durable, transparent jars designed for storage, dry goods, cosmetic, and food packaging applications.",
      image: "images/ind_pet_jars.jpg",
      material: "PET",
      category: "PET Products"
    },
    {
      id: "pet-bottles",
      name: "PET Bottles",
      description: "Lightweight, shatter-resistant bottles engineered for beverages, liquids, oils, and chemical packaging lines.",
      image: "images/ind_pet_bottles.jpg",
      material: "PET",
      category: "PET Products"
    }
  ],

  // 03 — Caps & Closures
  capsAndClosures: [
    {
      id: "aluminium-caps",
      name: "Aluminium Caps",
      description: "Precision-formed aluminium closures offering secure sealing, tamper resistance, and corrosion-resistant performance.",
      image: "images/ind_aluminium_caps.jpg",
      material: "Aluminium",
      category: "Caps & Closures"
    },
    {
      id: "pp-caps",
      name: "PP Caps",
      description: "High-grade polypropylene caps designed with dependable threading, tight closures, and versatile chemical compatibility.",
      image: "images/ind_pp_caps.jpg",
      material: "PP",
      category: "Caps & Closures"
    }
  ],

  // 04 — Packaging Solutions
  packagingSolutions: [
    {
      id: "sol-packaging-materials",
      name: "Packaging Materials",
      description: "Protective wrapping, liners, bubble films, and foundational materials engineered for safe product transit.",
      image: "images/ind_packaging_materials.jpg",
      material: "Packaging",
      category: "Packaging Materials"
    },
    {
      id: "sol-tapes",
      name: "Tapes",
      description: "Heavy-duty adhesive, masking, BOPP, and reinforced industrial tapes for carton sealing and pallet bundling.",
      image: "images/ind_packaging_tapes.jpg",
      material: "PP",
      category: "Tapes"
    },
    {
      id: "sol-boxes",
      name: "Boxes",
      description: "Corrugated shipping cartons, rigid storage boxes, and die-cut product boxes tailored for warehousing efficiency.",
      image: "images/ind_boxes.jpg",
      material: "Packaging",
      category: "Boxes"
    },
    {
      id: "sol-printing",
      name: "Printing",
      description: "Industrial label printing, outer carton branding, and commercial print solutions for packaging presentation.",
      image: "images/ind_printing.jpg",
      material: "Printing",
      category: "Printing"
    }
  ],

  // Filter Material Types
  materials: ["Glass", "PET", "Aluminium", "PP"],

  // 08 — Industrial Discovery / Filter Index
  discoveryItems: [
    {
      id: "d1",
      name: "Industrial & Commercial Chemicals",
      category: "Chemicals",
      material: "Other",
      description: "Supply solutions for processing, industrial hygiene, and commercial applications.",
      image: "images/ind_chemicals.jpg",
      anchor: "#chemicals"
    },
    {
      id: "d2",
      name: "Standard Glass Bottles & Jars",
      category: "Glass Containers",
      material: "Glass",
      description: "High-clarity glass containers for food, beverage, and industrial product bottling.",
      image: "images/ind_glass_containers.jpg",
      anchor: "#glass-containers"
    },
    {
      id: "d3",
      name: "PET Jars for Packaging",
      category: "PET Products",
      material: "PET",
      description: "Clear and durable PET jars for consumer goods, pantry items, and dry formulations.",
      image: "images/ind_pet_jars.jpg",
      anchor: "#pet-products"
    },
    {
      id: "d4",
      name: "PET Liquid Bottles",
      category: "PET Products",
      material: "PET",
      description: "Lightweight PET bottles designed for automated filling and high-speed bottling lines.",
      image: "images/ind_pet_bottles.jpg",
      anchor: "#pet-products"
    },
    {
      id: "d5",
      name: "Protective Packaging Materials",
      category: "Packaging Materials",
      material: "Packaging",
      description: "Essential protective packing layers, stretch wraps, and transit cushioning solutions.",
      image: "images/ind_packaging_materials.jpg",
      anchor: "#packaging"
    },
    {
      id: "d6",
      name: "Industrial Packaging Tapes",
      category: "Tapes",
      material: "PP",
      description: "Reliable pressure-sensitive and reinforced tapes for strong carton sealing.",
      image: "images/ind_packaging_tapes.jpg",
      anchor: "#packaging"
    },
    {
      id: "d7",
      name: "Corrugated Storage & Shipping Boxes",
      category: "Boxes",
      material: "Packaging",
      description: "Multi-ply corrugated boxes engineered for stacking strength and supply chain durability.",
      image: "images/ind_boxes.jpg",
      anchor: "#packaging"
    },
    {
      id: "d8",
      name: "Packaging & Label Printing",
      category: "Printing",
      material: "Printing",
      description: "Professional printing services for packaging boxes, labels, and commercial applications.",
      image: "images/ind_printing.jpg",
      anchor: "#packaging"
    },
    {
      id: "d9",
      name: "Aluminium Caps & Closures",
      category: "Caps & Closures",
      material: "Aluminium",
      description: "Precision-engineered aluminium caps designed for airtight sealing on bottles and jars.",
      image: "images/ind_aluminium_caps.jpg",
      anchor: "#caps-closures"
    },
    {
      id: "d10",
      name: "Polypropylene (PP) Caps",
      category: "Caps & Closures",
      material: "PP",
      description: "Durable PP closures designed for bottles, containers, and chemical packaging lines.",
      image: "images/ind_pp_caps.jpg",
      anchor: "#caps-closures"
    },
    {
      id: "d11",
      name: "PET Preforms for Bottling",
      category: "Preforms",
      material: "PET",
      description: "High-grade transparent PET preforms engineered for stretch blow molding into bottles.",
      image: "images/ind_pet_preforms.jpg",
      anchor: "#preforms"
    }
  ],

  // 09 — Why Choose Bora Group
  whyChooseUs: [
    {
      title: "Wide Product Range",
      description: "Multiple industrial and packaging categories under one roof.",
      stat: "01"
    },
    {
      title: "Business-Focused Supply",
      description: "Solutions organized around practical business requirements.",
      stat: "02"
    },
    {
      title: "Trusted Product Categories",
      description: "Explore established product categories across packaging and industrial supply.",
      stat: "03"
    },
    {
      title: "Easy Enquiry",
      description: "Quickly find a category and connect with the Bora Group team.",
      stat: "04"
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = INDUSTRIAL_DATA;
}

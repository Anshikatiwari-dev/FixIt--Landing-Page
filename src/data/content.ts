export interface NavLink {
  label: string;
  href: string;
}

export interface StatItem {
  value: string;
  numericValue?: number;
  suffix?: string;
  label: string;
}

export interface SignalStep {
  title: string;
  description: string;
  icon: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  icon: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  tag: string;
  icon: string;
}

export interface WhyFixItItem {
  title: string;
  description: string;
  icon: string;
}

export interface CircularStage {
  title: string;
  description: string;
}

export interface RotatingHeroChipSet {
  category: string;
  problem: string;
  cost: string;
  technicianRole: string;
  recommendation: string;
  confidence: string;
}

export const siteContent = {
  brand: {
    name: "FixIt",
    tagline: "Problem Dikhao, Solution Pao.",
    badge: "AI 2.0",
    copyright: "© 2026 FixIt. Built for products worth saving.",
  },
  navigation: {
    links: [
      { label: "Home", href: "/#home" },
      { label: "Categories", href: "/#categories" },
      { label: "How It Works", href: "/#how-it-works" },
      { label: "Services", href: "/#services" },
      { label: "My Bookings", href: "/bookings" },
    ] as NavLink[],
    loginText: "Login",
    ctaText: "Show Problem",
  },
  hero: {
    eyebrow: "AI-POWERED REPAIR & HOME SERVICES",
    h1Line1: "Got a Problem?",
    h1Line2: "Show It. Fix It.",
    paragraph:
      "AI-powered repair guidance that helps you diagnose, fix, and maintain all household products, appliances, and home services — saving you money, time, and waste.",
    stats: [
      {
        value: "12,000+",
        numericValue: 12000,
        suffix: "+",
        label: "Repairs Guided",
      },
      {
        value: "4.8/5",
        numericValue: 4.8,
        suffix: "/5",
        label: "Trusted Guidance",
      },
      {
        value: "Verified",
        label: "Technicians",
      },
    ] as StatItem[],
    rotatingExamples: [
      {
        category: "Mobiles & Tech",
        problem: "Display impact damage",
        cost: "₹1,200",
        technicianRole: "Verified Electronics Specialist",
        recommendation: "Screen Assembly Replacement",
        confidence: "94%",
      },
      {
        category: "Refrigerator",
        problem: "Freezer cooling, bottom warm",
        cost: "₹850",
        technicianRole: "Certified Appliance Technician",
        recommendation: "Defrost Sensor & Relay Tune",
        confidence: "96%",
      },
      {
        category: "Furniture",
        problem: "Table joint wobble & tilt",
        cost: "₹450",
        technicianRole: "Skilled Carpenter & Restorer",
        recommendation: "Dowel Pin Joint Reinforcement",
        confidence: "93%",
      },
      {
        category: "Small Appliances",
        problem: "Steam iron not heating up",
        cost: "₹350",
        technicianRole: "Certified Appliance Technician",
        recommendation: "Thermal Safety Fuse Replacement",
        confidence: "95%",
      },
      {
        category: "Plumbing",
        problem: "Mixer tap continuous drip",
        cost: "₹299",
        technicianRole: "Verified Master Plumber",
        recommendation: "35mm Ceramic Cartridge Swap",
        confidence: "97%",
      },
    ] as RotatingHeroChipSet[],
  },
  categoriesSection: {
    eyebrow: "WHAT CAN FIXIT FIX?",
    heading: "From phones to fridges. If it's broken, show it.",
    subheading:
      "Snap a photo or video of any faulty gadget, appliance, fixture, or furniture in your home. Our neural diagnostic engine identifies the root cause in seconds.",
    searchPlaceholder: "Search your product (e.g. fridge, tap, iron, AC, laptop)...",
  },
  signal: {
    eyebrow: "THE FIXIT SIGNAL",
    heading: "Don't Replace It. Fix It.",
    subheading:
      "Thousands of appliances, furniture, and home fixtures are dumped simply because people don't know what is wrong. FixIt detects the root cause before you spend thousands on replacements.",
    steps: [
      {
        title: "BROKEN PRODUCT",
        description: "Capture the issue with camera, video, or upload.",
        icon: "SmartphoneCharging",
      },
      {
        title: "AI SCAN",
        description: "A technical visual pass maps likely damage and faults.",
        icon: "Scan",
      },
      {
        title: "PROBLEM IDENTIFIED",
        description: "Understand root cause, parts needed, and repairability.",
        icon: "SearchCheck",
      },
      {
        title: "REPAIR SOLUTION",
        description: "Fix it yourself with guides or book a verified expert.",
        icon: "Wrench",
      },
    ] as SignalStep[],
  },
  howItWorks: {
    eyebrow: "HOW FIXIT WORKS",
    heading: "A smarter route from broken to working.",
    steps: [
      {
        step: "01",
        title: "SHOW YOUR PROBLEM",
        description:
          "Capture a live photo, video, voice memo, or upload describing the fault.",
        icon: "Camera",
      },
      {
        step: "02",
        title: "AI ANALYZES IT",
        description:
          "FixIt identifies probable defects, repairability score, and required parts.",
        icon: "Cpu",
      },
      {
        step: "03",
        title: "GET THE RIGHT SOLUTION",
        description:
          "Receive step-by-step DIY repair guides, upfront estimates, and spare part costs.",
        icon: "FileCheck",
      },
      {
        step: "04",
        title: "FIX OR BOOK",
        description:
          "Repair it yourself with confidence or book a verified doorstep specialist.",
        icon: "CheckCircle",
      },
    ] as ProcessStep[],
  },
  features: {
    eyebrow: "FULL REPAIR INTELLIGENCE",
    heading: "Everything you need to make the right repair call.",
    items: [
      {
        title: "AI Problem Diagnosis",
        description:
          "Understand likely faults in household products before spending on a replacement.",
        tag: "AI Diagnostic",
        icon: "BrainCircuit",
      },
      {
        title: "DIY Repair Guidance",
        description:
          "Step-by-step visual guides with required tools and safety precautions for household devices and appliances.",
        tag: "Self-Repair",
        icon: "Hammer",
      },
      {
        title: "Repairability Score",
        description:
          "An objective rating to know if your product, appliance, or furniture is worth fixing.",
        tag: "Index & Rating",
        icon: "Gauge",
      },
      {
        title: "Estimated Repair Cost",
        description:
          "Transparent pricing breakdown for parts and labor before you commit to anything.",
        tag: "Cost Analysis",
        icon: "IndianRupee",
      },
      {
        title: "Spare Part Discovery",
        description:
          "Find authentic, compatible components and hardware at verified fair market prices.",
        tag: "OEM Parts",
        icon: "Layers",
      },
      {
        title: "Verified Technicians",
        description:
          "Connect with vetted local plumbers, electricians, appliance techs, and carpenters when DIY isn't for you.",
        tag: "Pro Network",
        icon: "ShieldCheck",
      },
      {
        title: "Repair vs Replace Recommendation",
        description:
          "Data-driven financial comparison to help you choose between repairing or buying brand new.",
        tag: "Smart Decision",
        icon: "Scale",
      },
      {
        title: "Reuse & Second-Life Solutions",
        description:
          "Responsible refurbishing and recycling options for end-of-life household gear and appliances.",
        tag: "Circular Loop",
        icon: "Recycle",
      },
    ] as FeatureItem[],
  },
  repairVsReplace: {
    eyebrow: "REPAIR VS REPLACE",
    heading: "See the cost before you replace.",
    paragraph:
      "FixIt shows the true cost breakdown so your decision is informed, cost-effective, and sustainable — not impulsive.",
    replaceCard: {
      label: "REPLACE",
      text: "New Product: ₹9,000",
      amount: "₹9,000",
    },
    repairCard: {
      label: "REPAIR",
      text: "Estimated Repair: ₹1,800",
      amount: "₹1,800",
    },
    savingsText: "Repair could save ₹7,200",
    savingsPercentage: 80,
    buttonText: "Check My Product",
  },
  whyFixIt: {
    eyebrow: "WHY FIXIT",
    heading: "Fix better. Spend smarter. Waste less.",
    items: [
      {
        title: "SAVE MONEY",
        description: "Avoid unnecessary new product replacements",
        icon: "PiggyBank",
      },
      {
        title: "SAVE TIME",
        description: "Understand the issue and required tools quickly",
        icon: "Clock",
      },
      {
        title: "TRUSTED HELP",
        description: "Connect with verified, background-checked specialists",
        icon: "Shield",
      },
      {
        title: "REDUCE WASTE",
        description: "Repair, reuse, and divert electronics and appliances from landfills",
        icon: "Leaf",
      },
    ] as WhyFixItItem[],
  },
  circularEconomy: {
    eyebrow: "CIRCULAR BY DESIGN",
    heading: "Give Your Product a Second Life.",
    subheading:
      "FixIt helps you repair, reuse, and refurbish products instead of throwing them away.",
    stages: [
      { title: "Repair", description: "Restore functionality with guided fixes" },
      { title: "Reuse", description: "Extend lifecycle for everyday use" },
      { title: "Refurbish", description: "Upgrade components to peak performance" },
      { title: "Second Life", description: "Pass forward or recycle safely" },
    ] as CircularStage[],
  },
  finalCta: {
    eyebrow: "FIXIT IS READY",
    heading: "Something Broken? Show Us. We'll Help You Fix It.",
    subheading: "Don't replace it before you know what's wrong.",
    buttonText: "Show Your Problem",
  },
  footer: {
    quickLinks: [
      { label: "Home", href: "/#home" },
      { label: "Categories", href: "/#categories" },
      { label: "How It Works", href: "/#how-it-works" },
      { label: "Services", href: "/#services" },
      { label: "My Bookings", href: "/bookings" },
    ],
    supportLinks: [
      { label: "Help Center", href: "#" },
      { label: "Live Diagnostic", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  },
};

import { Category, getCategoryById } from "@/data/categories";

export interface AIAnalysisResult {
  likelyProblem: string;
  problemDetails: string;
  repairabilityScore: number; // e.g. 8.8
  scoreRating: "Easy DIY" | "Moderate Fix" | "Requires Technician";
  estimatedCostMin: number;
  estimatedCostMax: number;
  estimatedTime: string;
  confidence: number;
  recommendedTechnicianRole: string;
  diyGuide: {
    difficulty: "Beginner" | "Intermediate" | "Advanced";
    toolsNeeded: string[];
    safetyPrecautions: string[];
    steps: { stepNumber: number; title: string; instruction: string }[];
  };
  repairVsReplace: {
    newProductCost: number;
    estimatedRepairCost: number;
    savingsAmount: number;
    savingsPercent: number;
    verdict: string;
  };
}

/**
 * Service function to diagnose a problem using AI Computer Vision & Audio Analysis.
 * 
 * TODO: Plug in real Multimodal Gemini Vision / FixIt Diagnostic API endpoint here.
 * Currently uses simulated contextual diagnostics based on category, description, and images.
 */
export async function analyzeProblem(
  categoryId: string,
  userDescription: string,
  mediaCount: number = 1
): Promise<AIAnalysisResult> {
  // Simulate AI server latency (3 seconds)
  await new Promise((resolve) => setTimeout(resolve, 2800));

  const category = getCategoryById(categoryId);
  const textLower = (userDescription || "").toLowerCase();

  // Tailored diagnostics based on category
  switch (category.id) {
    case "refrigerator":
      return {
        likelyProblem: "Defrost Thermostat Sensor & Relay Degradation",
        problemDetails:
          "The compressor start capacitor or defrost sensor is failing, preventing consistent cold air circulation between compartments.",
        repairabilityScore: 8.6,
        scoreRating: "Moderate Fix",
        estimatedCostMin: 650,
        estimatedCostMax: 1100,
        estimatedTime: "40 - 60 mins",
        confidence: 94,
        recommendedTechnicianRole: "Certified Appliance Technician",
        diyGuide: {
          difficulty: "Intermediate",
          toolsNeeded: ["Multimeter", "Phillips Screwdriver #2", "Replacement 10k Thermistor"],
          safetyPrecautions: [
            "Always unplug refrigerator from mains 220V power before opening back panel.",
            "Keep towels handy to catch any melting condensate water.",
          ],
          steps: [
            {
              stepNumber: 1,
              title: "Power Down & Access Evaporator Panel",
              instruction: "Unplug the appliance. Remove rear freezer shelf and unscrew the inner plastic cover.",
            },
            {
              stepNumber: 2,
              title: "Test Thermostat Continuity",
              instruction: "Set multimeter to ohms (Ω). Touch probes to defrost sensor terminals. Resistance should be near zero when cold.",
            },
            {
              stepNumber: 3,
              title: "Clip-on Replacement Sensor",
              instruction: "Disconnect wire harness, snap on new certified thermal fuse/sensor, and seal with silicone grommet.",
            },
          ],
        },
        repairVsReplace: {
          newProductCost: 28000,
          estimatedRepairCost: 850,
          savingsAmount: 27150,
          savingsPercent: 97,
          verdict: "High-value repair: saves 97% over new refrigerator purchase.",
        },
      };

    case "plumbing":
      return {
        likelyProblem: "Ceramic Disc Cartridge Wear & O-Ring Degradation",
        problemDetails:
          "High water hardness has caused mineral friction wear along the brass spindle seal, leading to persistent dripping.",
        repairabilityScore: 9.4,
        scoreRating: "Easy DIY",
        estimatedCostMin: 249,
        estimatedCostMax: 450,
        estimatedTime: "25 mins",
        confidence: 97,
        recommendedTechnicianRole: "Verified Master Plumber",
        diyGuide: {
          difficulty: "Beginner",
          toolsNeeded: ["Adjustable Spanner", "Hex Allen Key (2.5mm)", "Teflon Tape", "New 35mm Ceramic Cartridge"],
          safetyPrecautions: [
            "Shut off main water inlet angle cock under the basin before loosening tap nut.",
          ],
          steps: [
            {
              stepNumber: 1,
              title: "Isolate Water Supply",
              instruction: "Turn the inlet valve 90° clockwise until water flow ceases completely.",
            },
            {
              stepNumber: 2,
              title: "Remove Handle & Retaining Nut",
              instruction: "Pop off indicator cap, loosen grub screw with Allen key, and unscrew chrome brass collar.",
            },
            {
              stepNumber: 3,
              title: "Seat New Ceramic Cartridge",
              instruction: "Align guide pins of the new cartridge into the base slots, wrap 3 rounds of teflon on threads, and tighten.",
            },
          ],
        },
        repairVsReplace: {
          newProductCost: 3500,
          estimatedRepairCost: 299,
          savingsAmount: 3201,
          savingsPercent: 91,
          verdict: "Instant fix: standard cartridge replacement restores like-new operation.",
        },
      };

    case "small-appliances":
      return {
        likelyProblem: "Thermal Fuse Open Circuit & Cal-rod Scale",
        problemDetails:
          "The internal 240°C thermal safety fuse has blown due to excessive calcification or voltage surge, interrupting power to the heating element.",
        repairabilityScore: 9.1,
        scoreRating: "Easy DIY",
        estimatedCostMin: 199,
        estimatedCostMax: 380,
        estimatedTime: "30 mins",
        confidence: 95,
        recommendedTechnicianRole: "Certified Appliance Technician",
        diyGuide: {
          difficulty: "Beginner",
          toolsNeeded: ["Precision Screwdriver Set", "Wire Stripper", "Replacement 240°C 10A Thermal Fuse"],
          safetyPrecautions: [
            "Ensure the iron is completely cold and disconnected from electrical outlet.",
          ],
          steps: [
            {
              stepNumber: 1,
              title: "Disassemble Rear Handle Cover",
              instruction: "Remove screws under the water tank and rear heel plate to expose wire terminations.",
            },
            {
              stepNumber: 2,
              title: "Locate Insulated Sleeve Fuse",
              instruction: "Slide back fiberglass sleeve along live line to inspect the cylindrical thermal fuse.",
            },
            {
              stepNumber: 3,
              title: "Crimp New Thermal Cutoff",
              instruction: "Crimp new replacement fuse into place (do not solder, as iron heat will melt solder). Reassemble housing.",
            },
          ],
        },
        repairVsReplace: {
          newProductCost: 2200,
          estimatedRepairCost: 299,
          savingsAmount: 1901,
          savingsPercent: 86,
          verdict: "Economic fix: replacement fuse costs a fraction of buying a new iron.",
        },
      };

    case "furniture":
      return {
        likelyProblem: "Mortise & Tenon Joint Looseness / Dowel Shear",
        problemDetails:
          "Cyclic load fatigue has dried out the polyvinyl adhesive and loosened dowel alignment, causing structural sway and creaking.",
        repairabilityScore: 8.9,
        scoreRating: "Moderate Fix",
        estimatedCostMin: 350,
        estimatedCostMax: 650,
        estimatedTime: "45 mins",
        confidence: 93,
        recommendedTechnicianRole: "Skilled Carpenter & Restorer",
        diyGuide: {
          difficulty: "Intermediate",
          toolsNeeded: ["Rubber Mallet", "Woodworking PVA Glue", "Corner Clamp / Ratchet Strap", "Hardwood Dowel Pins (8mm)"],
          safetyPrecautions: [
            "Wear eye protection when scraping away brittle old adhesive.",
            "Work on a drop cloth to prevent glue drips on flooring.",
          ],
          steps: [
            {
              stepNumber: 1,
              title: "Disassemble Loose Joint",
              instruction: "Gently tap joint apart with rubber mallet. Scrape away crystallized old glue with chisel.",
            },
            {
              stepNumber: 2,
              title: "Re-dowel & Apply Wood Glue",
              instruction: "Insert fresh ribbed dowels. Generously apply cross-linking PVA wood glue into holes and tenon faces.",
            },
            {
              stepNumber: 3,
              title: "Clamp & Square Under Pressure",
              instruction: "Clamp firmly using corner clamps or ratchet strap for 3 hours until bond reaches maximum tensile strength.",
            },
          ],
        },
        repairVsReplace: {
          newProductCost: 14000,
          estimatedRepairCost: 450,
          savingsAmount: 13550,
          savingsPercent: 96,
          verdict: "Restorative fix: solid wood reinforcement provides years of additional life.",
        },
      };

    case "washing-machine":
      return {
        likelyProblem: "Drain Pump Impeller Obstruction & Belt Tension Loss",
        problemDetails:
          "Foreign debris (coin/lint) is jamming the centrifugal pump rotor, triggering drainage timeout error codes.",
        repairabilityScore: 8.7,
        scoreRating: "Moderate Fix",
        estimatedCostMin: 450,
        estimatedCostMax: 950,
        estimatedTime: "35 mins",
        confidence: 96,
        recommendedTechnicianRole: "Certified Appliance Technician",
        diyGuide: {
          difficulty: "Beginner",
          toolsNeeded: ["Pliers", "Shallow Drain Pan", "Towels", "Flashlight"],
          safetyPrecautions: [
            "Unplug machine and ensure drum water is drained via emergency hose before opening pump filter.",
          ],
          steps: [
            {
              stepNumber: 1,
              title: "Open Lower Access Hatch",
              instruction: "Locate front bottom flap, position drain pan, and empty emergency pull-tab hose.",
            },
            {
              stepNumber: 2,
              title: "Unscrew Coin Trap Filter",
              instruction: "Turn pump filter counter-clockwise and extract accumulated debris and hair pins.",
            },
            {
              stepNumber: 3,
              title: "Verify Free Rotation",
              instruction: "Spin pump impeller blade with finger to ensure 360° click-turn freedom. Seal tight.",
            },
          ],
        },
        repairVsReplace: {
          newProductCost: 32000,
          estimatedRepairCost: 550,
          savingsAmount: 31450,
          savingsPercent: 98,
          verdict: "Instant maintenance: 98% savings compared to unit replacement.",
        },
      };

    case "air-conditioner":
      return {
        likelyProblem: "Condensate Drain Trap Blockage & Coil Biofilm",
        problemDetails:
          "Algae and dust sediment have clogged the internal evaporator drain tray, resulting in water overflow along the casing.",
        repairabilityScore: 8.5,
        scoreRating: "Moderate Fix",
        estimatedCostMin: 550,
        estimatedCostMax: 1200,
        estimatedTime: "45 mins",
        confidence: 95,
        recommendedTechnicianRole: "HVAC & AC Systems Specialist",
        diyGuide: {
          difficulty: "Intermediate",
          toolsNeeded: ["AC Service Wash Bag", "Coil Cleaner Spray", "Flexible Drain Snake / Blower"],
          safetyPrecautions: [
            "Turn off dedicated AC MCB on distribution board before touching indoor casing.",
          ],
          steps: [
            {
              stepNumber: 1,
              title: "Remove Front Louver & Filters",
              instruction: "Lift top cover, slide out dust mesh filters and rinse thoroughly under warm tap water.",
            },
            {
              stepNumber: 2,
              title: "Flush Condensate Drain Pipe",
              instruction: "Inject warm water with mild detergent into the right drain trough; flush blockage through external pipe.",
            },
            {
              stepNumber: 3,
              title: "Antimicrobial Fin Treatment",
              instruction: "Spray evaporator cooling fins with no-rinse coil cleaner to prevent future microbial blockage.",
            },
          ],
        },
        repairVsReplace: {
          newProductCost: 38000,
          estimatedRepairCost: 699,
          savingsAmount: 37301,
          savingsPercent: 98,
          verdict: "Essential service: unclogging prevents costly ceiling dampness and PCB damage.",
        },
      };

    case "electrical":
      return {
        likelyProblem: "Loose Neutral Termination & Carbonized Switch Mechanism",
        problemDetails:
          "Internal contact sparking has carbonized the switch leaf, causing intermittent load conduction and thermal heating.",
        repairabilityScore: 8.9,
        scoreRating: "Moderate Fix",
        estimatedCostMin: 250,
        estimatedCostMax: 480,
        estimatedTime: "25 mins",
        confidence: 96,
        recommendedTechnicianRole: "Licensed Master Electrician",
        diyGuide: {
          difficulty: "Intermediate",
          toolsNeeded: ["Neon Voltage Tester", "Insulated Wire Strippers", "New 16A Modular Switch"],
          safetyPrecautions: [
            "CRITICAL: Turn off main supply MCB before opening electrical gang box.",
            "Verify absence of voltage with neon tester probe on both terminals.",
          ],
          steps: [
            {
              stepNumber: 1,
              title: "De-energize Circuit",
              instruction: "Switch off main breaker. Test with tester to ensure zero current.",
            },
            {
              stepNumber: 2,
              title: "Detach Switch Plate",
              instruction: "Pry off decorative modular bezel and unscrew wall fixing screws.",
            },
            {
              stepNumber: 3,
              title: "Replace Modular Rocker",
              instruction: "Transfer Phase and Load wires into corresponding terminal clamps of new switch, tighten brass screws firmly.",
            },
          ],
        },
        repairVsReplace: {
          newProductCost: 2500,
          estimatedRepairCost: 299,
          savingsAmount: 2201,
          savingsPercent: 88,
          verdict: "High safety priority: simple switch swap eliminates fire hazard.",
        },
      };

    case "mobiles-tablets":
    default:
      return {
        likelyProblem: "Display Impact Damage & Digitizer Fractures",
        problemDetails:
          "Outer tempered glass impact has fractured the front polarizer layer. Sub-pixel OLED matrix requires precision assembly replacement.",
        repairabilityScore: 8.8,
        scoreRating: "Requires Technician",
        estimatedCostMin: 1100,
        estimatedCostMax: 1450,
        estimatedTime: "45 mins",
        confidence: 94,
        recommendedTechnicianRole: "Certified Electronics Specialist",
        diyGuide: {
          difficulty: "Advanced",
          toolsNeeded: ["Heat Gun / Hot Plate", "Suction Cup Tool", "Pentalobe & Tri-wing Screwdrivers", "Tesa Screen Adhesive"],
          safetyPrecautions: [
            "Wear eye protection when handling shattered glass splinters.",
            "Disconnect lithium battery flex cable first before unseating display ribbon.",
          ],
          steps: [
            {
              stepNumber: 1,
              title: "Warm Adhesive Perimeter",
              instruction: "Apply 80°C uniform heat around display bezel for 2 minutes to soften waterproof adhesive.",
            },
            {
              stepNumber: 2,
              title: "Release Screen Ribbon",
              instruction: "Pry gently with guitar pick, lift display like a book, unscrew EMI shield and disconnect battery.",
            },
            {
              stepNumber: 3,
              title: "Seat OEM Display Panel",
              instruction: "Connect replacement panel, test touch matrix response before applying perimeter adhesive press.",
            },
          ],
        },
        repairVsReplace: {
          newProductCost: 9000,
          estimatedRepairCost: 1200,
          savingsAmount: 7800,
          savingsPercent: 86,
          verdict: "Smart economy: screen replacement preserves all existing phone data and hardware.",
        },
      };
  }
}

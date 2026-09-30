export type CategoryType = "electronics" | "appliance" | "furniture" | "home-service";

export interface Category {
  id: string;
  name: string;
  iconName: string;
  type: CategoryType;
  technicianRole: string;
  subItems: string[];
  description: string;
  exampleProblem: string;
}

export const CATEGORIES: Category[] = [
  {
    id: "mobiles-tablets",
    name: "Mobiles & Tablets",
    iconName: "Smartphone",
    type: "electronics",
    technicianRole: "Certified Electronics Specialist",
    subItems: ["Screen", "Battery", "Charging Port", "Speaker", "Camera"],
    description: "Display glass replacement, battery drain, mic & audio issues",
    exampleProblem: "Cracked AMOLED screen after drop",
  },
  {
    id: "laptops-computers",
    name: "Laptops & Computers",
    iconName: "Laptop",
    type: "electronics",
    technicianRole: "Hardware & Chipset Engineer",
    subItems: ["Screen", "Keyboard", "Battery", "Overheating", "Slow"],
    description: "Thermal paste renewal, broken keys, OS boot errors",
    exampleProblem: "Laptop fan making loud rattling noise",
  },
  {
    id: "tv-displays",
    name: "TV & Displays",
    iconName: "Tv",
    type: "electronics",
    technicianRole: "Display & Audio Technician",
    subItems: ["No Display", "Lines on Screen", "No Sound", "Remote"],
    description: "Backlight failure, HDMI socket repairs, sound board fixes",
    exampleProblem: "Horizontal green lines on 55-inch LED TV",
  },
  {
    id: "refrigerator",
    name: "Refrigerator",
    iconName: "Refrigerator",
    type: "appliance",
    technicianRole: "Certified Appliance Technician",
    subItems: ["Not Cooling", "Water Leakage", "Noise", "Door Seal"],
    description: "Compressor checks, defrost timer, refrigerant top-up",
    exampleProblem: "Fridge freezer works but bottom section not cooling",
  },
  {
    id: "washing-machine",
    name: "Washing Machine",
    iconName: "Waves",
    type: "appliance",
    technicianRole: "Certified Appliance Technician",
    subItems: ["Not Spinning", "Drain Issue", "Noise", "Leakage"],
    description: "Drum bearing replacement, drain pump unclogging, motor belt",
    exampleProblem: "Drum vibrates violently during spin cycle",
  },
  {
    id: "air-conditioner",
    name: "Air Conditioner",
    iconName: "Wind",
    type: "appliance",
    technicianRole: "HVAC & AC Systems Specialist",
    subItems: ["Not Cooling", "Gas Refill", "Water Leakage", "Noise"],
    description: "Filter deep clean, condenser coil service, gas pressure",
    exampleProblem: "Indoor split unit dripping water from right side",
  },
  {
    id: "kitchen-appliances",
    name: "Kitchen Appliances",
    iconName: "Utensils",
    type: "appliance",
    technicianRole: "Small Appliance Technician",
    subItems: ["Mixer Grinder", "Microwave", "Induction", "Chimney", "Gas Stove"],
    description: "Coupler replacement, magnetron repair, PCB touch panel",
    exampleProblem: "Mixer grinder sparking with burnt smell",
  },
  {
    id: "small-appliances",
    name: "Small Appliances",
    iconName: "Zap",
    type: "appliance",
    technicianRole: "Certified Appliance Technician",
    subItems: ["Iron", "Kettle", "Toaster", "Geyser", "Water Purifier"],
    description: "Heating element restoration, thermostat calibration, RO membrane",
    exampleProblem: "Steam iron indicator turns on but plate does not heat",
  },
  {
    id: "fans-coolers-heaters",
    name: "Fans, Coolers & Heaters",
    iconName: "Fan",
    type: "appliance",
    technicianRole: "Electric Appliance Technician",
    subItems: ["Not Running", "Noise", "Speed Issue"],
    description: "Capacitor replacement, motor rewinding, pump repair",
    exampleProblem: "Ceiling fan running very slowly on maximum speed",
  },
  {
    id: "furniture",
    name: "Furniture",
    iconName: "Armchair",
    type: "furniture",
    technicianRole: "Skilled Carpenter & Restorer",
    subItems: ["Table", "Chair", "Bed", "Sofa", "Wardrobe", "Hinges", "Polish"],
    description: "Loose joints, hydraulic bed lifts, drawer channels, refinishing",
    exampleProblem: "Study table leg wobbles and wardrobe door doesn't align",
  },
  {
    id: "plumbing",
    name: "Plumbing",
    iconName: "Droplets",
    type: "home-service",
    technicianRole: "Verified Master Plumber",
    subItems: ["Tap", "Shower Leakage", "Flush Tank", "Pipe", "Drainage"],
    description: "Spindle replacement, concealed leak sealing, diverter fixing",
    exampleProblem: "Quarter-turn mixer tap dripping continuously",
  },
  {
    id: "electrical",
    name: "Electrical",
    iconName: "Plug",
    type: "home-service",
    technicianRole: "Licensed Master Electrician",
    subItems: ["Switch", "Wiring", "MCB", "Inverter", "Lights"],
    description: "Short circuit detection, MCB tripping resolution, inverter wiring",
    exampleProblem: "Kitchen MCB trips every time high-power appliance runs",
  },
  {
    id: "other",
    name: "Other Household Products",
    iconName: "HelpCircle",
    type: "home-service",
    technicianRole: "Verified Multi-Discipline Specialist",
    subItems: ["Door Locks", "Curtain Rods", "Bicycle", "Fitness Gear", "Not listed"],
    description: "General home repairs, hardware alignment and custom fixes",
    exampleProblem: "Tell or show us what needs repair",
  },
];

export function getCategoryById(id: string): Category {
  return CATEGORIES.find((cat) => cat.id === id) || CATEGORIES[CATEGORIES.length - 1];
}

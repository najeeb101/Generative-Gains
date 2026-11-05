// All site copy and links live here so they can be edited without touching layout code.

export const links = {
  // Product landing pages. Swap these if the URLs change.
  thermalTrace: "https://thermal-trace-gilt.vercel.app",
  freshDriv: "https://freshdriv.qa/",
  // Placeholder: set to a mailto: or form URL when contact details are ready.
  contact: "",
};

export const nav = [
  { label: "What we do", href: "#what-we-do" },
  { label: "GenOps", href: "#genops" },
  { label: "Products", href: "#products" },
  { label: "Industries", href: "#industries" },
];

export const hero = {
  title: "AI that works inside your operations.",
  body: "Generative Gains designs, deploys and runs enterprise AI for organisations in Qatar and the GCC. Models, agents and integrations that plug into the systems you already have, hosted where your data has to stay.",
  inputs: ["ERP", "CRM", "HR system", "Ticketing", "Documents", "Point of sale"],
  outcomes: [
    "Invoice matched",
    "Ticket resolved",
    "Shift scheduled",
    "Contract reviewed",
    "Stock reordered",
    "Report filed",
  ],
};

export const services = {
  title: "We build the layer around the model.",
  intro:
    "Generic AI tools stop at the chat window. We build the architecture that lets AI do real work in a business: connected to your data, permissioned, auditable and measured.",
  items: [
    {
      name: "Enterprise models",
      icon: "models" as const,
      body: "We select, adapt and combine language, vision, reasoning, time-series and domain models for the job in front of them.",
    },
    {
      name: "Agentic automation",
      icon: "agents" as const,
      body: "Agents that carry out departmental work: retrieving information, coordinating steps and taking authorised actions.",
    },
    {
      name: "Knowledge architecture",
      icon: "knowledge" as const,
      body: "Documents, records, policies and procedures turned into organisational memory your teams and agents can search.",
    },
    {
      name: "Systems integration",
      icon: "integration" as const,
      body: "Connections to ERP, CRM, HR, accounting, procurement, ticketing and logistics systems, without replacing them.",
    },
    {
      name: "Governance",
      icon: "governance" as const,
      body: "Identity, access control, audit trails and human oversight built in from the first deployment.",
    },
    {
      name: "Private and sovereign hosting",
      icon: "hosting" as const,
      body: "Deployments on your premises, in a private cloud or in fully air-gapped environments.",
    },
    {
      name: "Managed AI infrastructure",
      icon: "managed" as const,
      body: "We host, monitor, secure and keep improving the models and pipelines after go-live.",
    },
  ],
};

export const genops = {
  title: "GenOps, our operating architecture",
  intro:
    "Windows gave personal computing one standard way for people, applications and hardware to work together. GenOps aims to do the same for enterprise intelligence: one backbone that coordinates models, knowledge, workflows and actions across the whole organisation.",
  hint: "Select a layer to see what it does.",
  // Listed top to bottom, the way the stack is drawn.
  layers: [
    {
      name: "Integration and execution",
      short: "Where work gets done",
      body: "APIs, ERP and CRM connectivity, workflow engines and event processing. This is where agents take authorised actions in the systems you already run.",
    },
    {
      name: "Agent orchestration",
      short: "Specialised agents",
      body: "Agents that coordinate tasks across departments and applications, hand work to each other and ask a person for approval only when it is needed.",
    },
    {
      name: "Model architecture",
      short: "LongTail",
      body: "LongTail is the library of reusable model components, prompts, workflows and specialised models. Each deployment adds to it, so the next one starts further ahead.",
    },
    {
      name: "Enterprise memory",
      short: "QuidNet",
      body: "QuidNet is the field-based knowledge store that keeps relationships, past decisions, business records and context, so answers are grounded in how your organisation actually works.",
    },
    {
      name: "Enterprise foundation",
      short: "Identity and policy",
      body: "Your organisation's structure, business vocabulary, policies, objectives and permissions. It tells every other layer what the business is and what it is allowed to do.",
    },
    {
      name: "Security and infrastructure",
      short: "The base",
      body: "Identity management, cryptographic audit trails, observability, inference hosting and deployment monitoring, on private or air-gapped infrastructure.",
    },
  ],
};

export const products = {
  title: "Our products",
  intro: "Two products already running on what we build.",
  items: [
    {
      key: "thermal" as const,
      name: "Thermal Trace",
      category: "Cold-chain intelligence",
      badge: "Winner, UN Reboot the Earth 2026",
      body: "Thermal Trace follows the temperature history of perishable cargo and calculates how much safe life it has left, so food is sold, moved or rerouted before it spoils.",
      cta: "Visit Thermal Trace",
      href: links.thermalTrace,
      image: "/products/thermal-trace.webp",
      imageAlt: "Thermal Trace landing page showing a live temperature trace for a refrigerated truck",
    },
    {
      key: "freshdriv" as const,
      name: "FreshDriv",
      category: "On-demand car care in Doha",
      badge: "On iOS and Android",
      body: "Book a wash in the FreshDriv app, share where you are parked and a crew comes to you with everything they need. Track the job live and get notified when it is done.",
      cta: "Visit FreshDriv",
      href: links.freshDriv,
      image: "/products/freshdriv.webp",
      imageAlt: "FreshDriv landing page: your car, washed where it is parked",
    },
  ],
};

export const industries = {
  title: "One core, fifteen industries",
  intro:
    "Every sector has its own workflows, data and rules. GenOps is packaged per industry: the same core, with the models, integrations and agents each sector needs.",
  items: [
    { name: "HotelOps", sector: "Hospitality", body: "Reservations, revenue, guest relations, housekeeping and staffing." },
    { name: "RetailOps", sector: "Retail and commerce", body: "Inventory, pricing, merchandising and sales forecasting." },
    { name: "LogisticsOps", sector: "Logistics", body: "Dispatch, fleets, routes, warehouses and proof of delivery." },
    { name: "TelecomOps", sector: "Telecommunications", body: "Network monitoring, incidents, capacity and service assurance." },
    { name: "HealthcareOps", sector: "Healthcare", body: "Appointments, documentation, billing and claims, with clinicians in charge." },
    { name: "ConstructionOps", sector: "Construction", body: "Schedules, BIM documents, procurement, site reports and safety." },
    { name: "RealEstateOps", sector: "Real estate", body: "Listings, leads, leasing, tenant services and portfolios." },
    { name: "LegalOps", sector: "Legal services", body: "Research, discovery, contract review and deadlines, with lawyers deciding." },
    { name: "FinanceOps", sector: "Finance and accounting", body: "Reconciliations, payables, receivables, forecasting and audit prep." },
    { name: "ManufacturingOps", sector: "Manufacturing", body: "Production planning, quality, predictive maintenance and supply." },
    { name: "EducationOps", sector: "Education", body: "Admissions, enrolment, scheduling and institutional reporting." },
    { name: "GovernmentOps", sector: "Public administration", body: "Citizen services, permits and case management under sovereign control." },
    { name: "InsuranceOps", sector: "Insurance", body: "Claims intake, policy admin, underwriting support and renewals." },
    { name: "RestaurantOps", sector: "Food and beverage", body: "POS, kitchen, reservations, procurement and food waste." },
    { name: "ServicesOps", sector: "Professional services", body: "Proposals, projects, resourcing, invoicing and profitability." },
  ],
};

export const adoption = {
  title: "How adoption works",
  intro: "Nobody switches overnight. We start where the value is clearest and build from there.",
  phases: [
    {
      name: "Augment",
      body: "Copilots, search and decision support around each department. Clean data, permissions and a governed knowledge base come first.",
    },
    {
      name: "Orchestrate",
      body: "Agents move work across systems, hand off tasks and ask for approval only when needed. Departments start working as one network of workflows.",
    },
    {
      name: "Operate",
      body: "Your people set direction, handle exceptions and approve decisions, while the system runs routine analysis, coordination and execution.",
    },
  ],
};

export const region = {
  title: "Built for the Gulf",
  intro:
    "Many organisations here cannot send sensitive workloads to a public cloud. We deploy where you need us to and stay close after launch.",
  points: [
    "On-premises, private cloud or fully air-gapped",
    "Arabic and multilingual model architectures",
    "Works with your existing ERP, CRM and ICT stack",
    "Implemented, governed and managed from Qatar",
  ],
};

export const contact = {
  title: "Tell us where your teams lose time.",
  body: "We will show you what an AI operating layer could change, starting with the workflows that cost you the most.",
  pending: "Contact details are coming soon.",
  cta: "Get in touch",
};

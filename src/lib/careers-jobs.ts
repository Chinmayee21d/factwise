export const APPLY_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSen6KrjrpUHMUQESU57XC4nhlWUEu6QKl1PxTb9sHVxv-JgLA/viewform';

export const COMPANY_DESC = `FactWise is a fully funded, early-stage B2B SaaS startup building solutions for a global client base. The flagship product is an end-to-end S2P solution designed to transform procurement for product manufacturing companies across industries. Our singular focus is to create a truly distinctive procurement platform that delights users and provides sustainable positive impact to the organizations we serve. We achieve this by providing transparency and insights to leaders, streamlining and automating processes to improve efficiency, and driving bottom-line impact by unlocking savings potential.

FactWise received funding from a US-based VC, and we are currently deploying our MVP. With exciting sales conversations in advanced stages across Europe, US, and India markets, we have strong relations with leading VC firms and an exciting journey ahead!

We are hoping to be joined by self-starting, hardworking, passionate individuals who are committed to delivering their best and aligning their growth journey with ours.`;

export const RECRUITMENT_STEPS = [
  'Fill application form',
  'Submit assignment within deadline',
  'Skill-based and fit rounds',
  'Final round with Founder & CEO',
];

export const COMPENSATION =
  "We offer competitive packages designed basis a candidate's performance through the recruitment process. Our salary structure includes fixed and variable components, along with an exciting ESOP package.";

export const CATEGORIES = [
  { id: 'all', label: 'All', count: 6 },
  { id: 'engineering', label: 'Engineering', count: 1 },
  { id: 'design', label: 'Design', count: 1 },
  { id: 'product', label: 'Product', count: 2 },
  { id: 'business', label: 'Business', count: 1 },
  { id: 'people', label: 'People', count: 1 },
];

export type Job = {
  id: number;
  slug: string;
  title: string;
  team: string;
  category: string;
  employmentType: string;
  location: string;
  desc: string;
  applyUrl: string;
  about: string;
  responsibilities: string[];
  mustHaves: string[];
  niceToHaves: string[];
  recruitmentSteps?: string[];
};

export const JOBS: Job[] = [
  {
    id: 1,
    slug: 'ui-ux-designer',
    title: 'UI / UX Designer',
    team: 'Design',
    category: 'design',
    employmentType: 'Internship convertible to Full time',
    location: 'Remote / Mumbai',
    desc: "We are driven by a passion to create a product that simplifies our customers' lives and makes it a great experience while doing so.",
    applyUrl: APPLY_URL,
    about:
      'Gather and evaluate user requirements in collaboration with product managers and engineers, create mockups and prototypes, and define the visual language of FactWise.',
    responsibilities: [
      'Gather and evaluate user requirements in collaboration with product managers and engineers',
      'Illustrate design ideas using storyboards, process flows and sitemaps',
      'Develop UI mockups and prototypes that clearly illustrate site functionality using Figma',
      'Create original graphic designs including images, animations and videos for the website',
      'Prepare and present drafts to internal teams and key stakeholders',
      'Identify and troubleshoot UX problems (e.g. responsiveness)',
      'Conduct layout adjustments based on user feedback',
      'Adhere to style standards on fonts, colors and images',
      'Export Figma templates into code for frontend',
    ],
    mustHaves: [
      "Bachelor's degree in Design, Computer Science or a related field",
      '1–3 years experience in a design role',
      'Proficiency in Figma, Adobe Illustrator, Adobe After Effects, Video editing, Graphic Design, Animation',
      'Passion to create design with impressive aesthetics and usability',
    ],
    niceToHaves: [
      'Knowledge about developmental tools like HTML, CSS',
      'Ability to render hi-fidelity images',
      'Desire to progress with a fast-growing organization',
      'Motivation to work in a start-up environment',
      'Ability to collaborate and work as part of a team',
    ],
  },
  {
    id: 2,
    slug: 'people-and-culture-manager',
    title: 'People & Culture Manager',
    team: 'People',
    category: 'people',
    employmentType: 'Internship / Advisory convertible to Full time',
    location: 'Mumbai',
    desc: 'We work towards building a great team and enabling each person to impact culture. We focus on facilitating individual and collective growth, recruiting talent, and creating policies that translate ethos into practice.',
    applyUrl: APPLY_URL,
    about:
      'Shape how FactWise attracts, grows, and retains world-class talent. Design and implement People & Culture strategies that align with our business strategy and foster a high-performance culture.',
    responsibilities: [
      "Designing and implementing People & Culture strategies and initiatives that align with FactWise's business strategy",
      'Developing, maintaining and role modelling a culture that is open to change and innovation, and fosters collaboration, respect, accountability and striving for excellence',
      'Maintaining knowledge of industry trends and employment legislation to ensure regulatory compliances',
      'Assisting the senior leadership team to build an empowering workplace through effective performance management and feedback, coaching and support',
      'Managing employee performance and salary review processes',
      'Assisting with full-cycle recruiting as required',
      'Creating, updating, maintaining and improving on all HR related policies',
      'Acting as the main contact for People & HR matters',
      'Partnering with senior leadership team to implement strategies for employee engagement and retention',
      'Managing the onboarding and exiting process for employees',
    ],
    mustHaves: [
      "Bachelor's degree in Management, Business or a related field",
      '1–3 years of previous experience within HR capacity',
      'Proficiency with productivity tools: MS Word, MS PowerPoint, MS Excel',
      'Thorough understanding of HR policies and procedures',
      'Excellent verbal and written communication skills',
    ],
    niceToHaves: [
      'Translating organisational ethos into culture by defining systems and processes',
      'Making teams successful using a strengths-based, people-first approach',
      'Ability to prioritize tasks and to delegate them when appropriate',
      'Experience in fast-paced startup environments with a joint ownership model',
    ],
  },
  {
    id: 3,
    slug: 'software-development-engineer',
    title: 'Software Development Engineer',
    team: 'Engineering',
    category: 'engineering',
    employmentType: 'Full time',
    location: 'Remote / Mumbai',
    desc: 'We are problem solvers, thinkers, creators. We convert concept to reality, with a passion for software and technology. Our tech stack is Python/Django and React with TypeScript.',
    applyUrl: APPLY_URL,
    about:
      'As a member of the development group, you will be primarily responsible for the design, development, and maintenance of the FactWise product — building full-stack architecture with React, Django, and AWS in an agile environment.',
    responsibilities: [
      'Help define and create full stack architecture and deployment using React-Django-AWS in an agile environment with lots of ownership and active mentoring',
      'Work with the Product and Design teams to build new features to solve business problems and fill business needs',
      'Participate in code reviews to create robust and maintainable code',
      'Work in an agile environment where quick iterations and good feedback are a way of life',
      'Interact with other stakeholders for requirement, design discussions and for adoption of new features',
      'Communicate and coordinate with our support and professional services teams to solve customer issues',
      'Help scale our platform as we expand our product across various markets and verticals globally',
    ],
    mustHaves: [
      "Bachelor's degree in Computer Science, IT or a related field",
      '1–3 years of experience within SDE capacity',
      'Demonstrated experience using React with TypeScript and/or Python/Django',
    ],
    niceToHaves: [
      'Previous software and/or SaaS experience',
      'Desire to progress with a fast-growing organization',
      'Motivation to work in a start-up environment',
      'Ability to collaborate and work as part of a team',
    ],
    recruitmentSteps: [
      'Fill application form',
      'Submit assignment within deadline',
      'Technical and fit rounds',
      'Final round with Founder & CEO',
    ],
  },
  {
    id: 4,
    slug: 'business-analyst',
    title: 'Business Analyst',
    team: 'Business',
    category: 'business',
    employmentType: 'Internship convertible to Full time',
    location: 'Mumbai',
    desc: 'We power all teams to ensure seamless day-to-day routines at FactWise, and use our love for data for problem-solving and strategizing across various critical areas.',
    applyUrl: APPLY_URL,
    about:
      "You'll be the connective tissue between data and decisions — translating complex business problems into clear insights and working across product, sales, and operations to move the company forward.",
    responsibilities: [
      'Perform quality assurance',
      'Own and develop relationship with partners, working with them to optimize and enhance our integration',
      'Report on common sources of technical issues or questions and make recommendations to product team',
      'Determine and document user requirements for business processes and abide by those requirements for future projects',
      'Identify and communicate with key stakeholders',
      'Gather, review and analyze business and industry data, including KPIs, financial reports and other key metrics using data analytics tools',
      'Assess options for process improvement, including business process modelling',
      'Maintain documentation regarding various projects, processes and operations',
      'Collaborate with project managers and cross-functional teams',
      'Constantly be on the lookout for ways to improve monitoring, discover issues and deliver better value to the customer',
    ],
    mustHaves: [
      "Bachelor's in Business Administration, IT, Computer Science or related fields",
      'Practical application ability with Microsoft Office',
      'Detailed analytical abilities',
      'Basic knowledge in generating process documentation',
      'Strong written and verbal communication skills including technical writing skills',
      'Resourcefulness and ability to devise creative solutions to problems',
      'Familiarity with industry technology systems to gather data and problem solve',
    ],
    niceToHaves: [
      'Experience in analysing data to draw business-relevant conclusions and in data visualization techniques and tools',
      'Solid experience in writing SQL queries',
      'Experience testing and mapping various business processes and protocols',
      'Excellent communication and leadership skills',
    ],
  },
  {
    id: 5,
    slug: 'technical-product-manager',
    title: 'Technical Product Manager',
    team: 'Product',
    category: 'product',
    employmentType: 'Internship / Advisory convertible to Full time',
    location: 'Remote / Mumbai',
    desc: 'We rhythmically interface between developers, designers, and data scientists. We adapt and iterate to enable teams to translate client objectives into a powerful product.',
    applyUrl: APPLY_URL,
    about:
      'As Product Manager you will help define and create end-to-end product which starts from ideation all the way to product deployment based on customer needs. You will own the product end to end and will be liaising with UI/UX teams, developers, data scientists, QA team members to ensure product feasibility and readiness.',
    responsibilities: [
      'Interview customers to understand new/existing product need and fit',
      'Work with strategy team to decide pricing and GTM approach',
      'Define requirements for product features and work with UI/UX team to create mock-ups',
      'Work with front-end and back-end teams to oversee feature implementation',
      'Work with QA team to ensure testing excellence and product readiness',
      'Forming and testing hypotheses using data from various sources',
      'Owning a product roadmap, prioritizing a sequence of feature builds, and objectively measuring outcomes from product decisions',
    ],
    mustHaves: [
      "Bachelor's degree in Computer Science, IT or a related field",
      '2–4 years experience in a Product or Software Development Engineering role',
      'Solid analytical and data skills with an ability to define and evaluate metrics',
      'Strong logical thinking skills and ability to learn quickly',
      'Basic understanding of databases',
    ],
    niceToHaves: [
      'Knowledge about UI/UX designs and tools',
      "Basic understanding of API's",
      'Desire to progress with a fast-growing organization',
      'Motivation to work in a start-up environment',
      'Ability to collaborate and work as part of a team',
    ],
  },
  {
    id: 6,
    slug: 'product-marketing',
    title: 'Product Marketing',
    team: 'Product',
    category: 'product',
    employmentType: 'Internship convertible to Full time',
    location: 'Remote',
    desc: 'We want to bring the FactWise platform to all B2B businesses. We build product awareness, analyse market trends and creatively strategize on expanding the user base.',
    applyUrl: APPLY_URL,
    about:
      "You'll be the voice of FactWise to the world — building the brand, generating demand, and helping manufacturers discover how FactWise can transform their procurement operations.",
    responsibilities: [
      'Own and create content (e.g. write press releases, brochures, data sheets and image assets) for use across marketing channels to articulate the benefits of the product',
      'Plan and execute all web, SEO/SEM, database marketing, email, social media, and display advertising campaigns',
      'Work closely with senior leaders for the launch of the product and manage the cross-functional coordination within the team for executing the plan',
      'Follow and analyse market trends to create value propositions and generate ideas for marketing communications',
    ],
    mustHaves: [
      "Bachelor's degree in Marketing or a related field",
      '1–3 years experience in a Marketing or Business Development role',
      'Exceptional writing and editing skills with strong creative abilities',
      'Proficiency with productivity tools like Microsoft Office',
      'Knowledge and experience of HubSpot or other CRM software',
    ],
    niceToHaves: [
      'Strong communication, adaptability and interpersonal skills',
      'Solid analytical and data management skills with an ability to define and evaluate metrics',
      'Experience in fast-paced startup environments with a joint ownership model',
    ],
  },
];

export function getJobBySlug(slug: string): Job | undefined {
  return JOBS.find((job) => job.slug === slug);
}

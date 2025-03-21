import IdBadge from '@/components/IdBadge';
import Link from 'next/link';
import { HomeIcon } from 'lucide-react';
// import ThreeBackground from '@/components/ThreeBackground';

export default function WorkExperience() {
  const badges = [
    {
      id: "201908-001",
      company: "Number 8",
      description: "Software development staffing firm providing full-time IT and development talent for customers",
      role: "Full Stack Engineer",
      position: "Team Lead",
      type: "Consultant (Outsourcing)",
      img: "./logos/number_8_logo.png",
      department: "Engineering",
      achievements: [
        'Hired as a Front-End Engineer to design and implement reusable components with integration capabilities for the Sitecore CMS.',
        'Promoted to Tech Lead, overseeing the migration of 5 applications to a headless architecture, ensuring seamless integration with third-party dependencies.',
        'Served as a Full Stack Engineer, transforming business requirements into technical designs, optimizing performance, and ensuring best practices and team capacity for deliverables.',
        'Contributed to a specialized team, collaborating with reliability and optimization engineers to implement rapaid delivery solutions across frontend, backend, and DevOps.'
      ],
      startDate: "08/2019",
      endDate: "N/A",
      duration: "6 YEARS (... and counting)",
      isActive: true
    },
    {
      id: "201708-001",
      company: "Partner Hero",
      description: "Outsourcing company providing support, quality assurance, helpdesk, and content services for customers.",
      role: "Full Stack Engineer",
      position: "Team Lead",
      type: "Consultant (Outsourcing)",
      img: "./logos/partner_hero_logo.png",
      department: "Engineering",
      achievements: [
        'Initially hired as a Front End Engineer to accelerate the development of a mobile application using React Native and Expo, while also managing the overall documentation and changelog of the application.',
        'Transitioned to a Full Stack Engineer role in a different team, focused on delivering a Chrome extension integrated with Zendesk and Intercom support ticket systems.',
      ],
      startDate: "11/2017",
      endDate: "08/2019",
      duration: "2 YEARS",
      isActive: false
    },
    {
      id: "201610-001",
      company: "EMCO Corporation",
      description: "An enterprise offering services in construction, manufacturing, hardware retail, and investment products.",
      role: "Technology Implementation",
      position: "Software Engineer",
      type: "Full Time Employee",
      img: "./logos/emco_logo.png",
      department: "IT",
      achievements: [
        'Hired as a Software Engineer responsible for the inventory and sales modules of a legacy system built on .NET and maintaining SQL DB instances.',
        'Promoted to SAP Consultant Specialist for the MM (Material Management) and SD (Sales & Distribution) modules, leading the migration of systems across different corporate businesses, facilitating mass rollout, and accelerating the adoption of the new system.',
      ],
      startDate: "10/2016",
      endDate: "11/2017",
      duration: "1 YEARS",
      isActive: false
    },
    {
      id: "201310-001",
      company: "Molino Harinero Sula",
      description: "A manufacturing company specializing in wheat-related products, sales and distribution, and investments such as transportation, real estate, and baking machinery",
      role: "IT Support Specialist",
      position: "Software Engineer",
      type: "Full Time Employee",
      img: "./logos/mhs_logo.png",
      department: "IT",
      achievements: [
        'Hired as a Software Engineer to provide tier 2 support for the in-house ERP system, with a focus on raw material, manufacturing, inventory management, and distribution areas.',
        'Promoted to Software Reliability Engineer, responsible for supporting all business areas related to IT deliverables and business continuity, including software, database maintenance, backup, and process documentation. Implemented IT compliance standards for certification programs.',
      ],
      startDate: "10/2016",
      endDate: "10/2013",
      duration: "3 YEARS",
      fill: true,
      isActive: false
    },
  ];
  
  return (
    <div>
      <Link href="/?from=internal">
        <button className="mb-6 px-4 py-2 bg-[#0c6bb8] hover:bg-blue-700 text-white rounded-lg flex items-center cursor-pointer">
          <HomeIcon size={24} className="text-white mr-4" />
          Back to Home
        </button>
      </Link>
      <div className="mb-16 text-center work-copy txt-backdrop-work">
        <h1 className="text-6xl font-bold mb-4">👨‍💻 Experience</h1>
        <p className="text-xl text-gray-600">Below are the badges I've earned throughout my personal journey called life. I'm eternally grateful for each new skill I've gained at every company, as well as the opportunities and trust I've been given to contribute not only to technical implementations but also to impactful solutions.</p>
      </div>
      <div className="wrapper-container">
        {badges.map((badge, index) => (
          <div key={index} className="badge-wrapper">
            {/* <ThreeBackground /> */}
            <IdBadge 
              index={index} 
              {...badge}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
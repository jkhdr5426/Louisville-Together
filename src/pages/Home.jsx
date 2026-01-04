import Hero from "../components/Hero"
import Categories from "../components/Categories";

import FeaturedResources from "../components/FeaturedResources";
import { HeartIcon, CakeIcon, BriefcaseIcon, UserGroupIcon} from "@heroicons/react/24/solid";
import HowItWorks from "../components/HowItWorks";


const featuredResources = [
  {
    name: "Norton Healthcare",
    description: "Community clinics and medical services in Louisville.",
    icon: HeartIcon,
    link: "#",
  },
  {
    name: "Dare to Care Food Bank",
    description: "Providing food assistance for families in need.",
    icon: CakeIcon,
    link: "#",
  },
  {
    name: "Louisville Urban League",
    description: "Job training and career development services.",
    icon: BriefcaseIcon,
    link: "#",
  },
  {
    name: "Family and Children's Place",
    description: "Supporting families with childcare, counseling, and family services.",
    icon: UserGroupIcon,
    link: "#",
  },
  // Add more as needed
];

function Home() {
  return (
    <div>
      <Hero />
      <Categories />
      <FeaturedResources resources={featuredResources}/>
      <HowItWorks />
    </div>
  );
}

export default Home;
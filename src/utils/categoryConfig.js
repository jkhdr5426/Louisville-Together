import {
  HeartIcon,
  CakeIcon,
  BriefcaseIcon,
  BookOpenIcon,
  UserGroupIcon,
  HomeIcon,
  BoltIcon,
  ScaleIcon,
  ExclamationTriangleIcon,
  CurrencyDollarIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  PaintBrushIcon,
  SparklesIcon
} from "@heroicons/react/24/solid";



export const CATEGORY_CONFIG = {
  healthcare: {
    label: "Healthcare",
    color: "bg-blue-600",
    icon: HeartIcon,
  },
  food: {
    label: "Food Assistance",
    color: "bg-green-600",
    icon: CakeIcon,
  },
  employment: {
    label: "Employment",
    color: "bg-orange-500",
    icon: BriefcaseIcon,
  },
  education: {
    label: "Education",
    color: "bg-purple-600",
    icon: BookOpenIcon,
  },
  family_services: {
    label: "Family Services",
    color: "bg-pink-500",
    icon: UserGroupIcon,
  },
  housing: {
    label: "Housing",
    color: "bg-indigo-600",
    icon: HomeIcon,
  },
  utilities: {
    label: "Utilities",
    color: "bg-cyan-500",
    icon: BoltIcon,
  },
  legal_aid: {
    label: "Legal Aid",
    color: "bg-red-600",
    icon: ScaleIcon,
  },
  crisis_support: {
    label: "Crisis Support",
    color: "bg-orange-700",
    icon: ExclamationTriangleIcon,
  },
  financial_help: {
    label: "Financial Help",
    color: "bg-green-700",
    icon: CurrencyDollarIcon,
  },
  park: {
    label: "Parks",
    color: "bg-teal-700",
    icon: MapPinIcon,
  },
  artsculture: {
    label: "Arts and Culture",
    color: "bg-purple-700",
    icon: PaintBrushIcon,
  },
  entertainment: {
    label: "Entertainment",
    color: "bg-yellow-700",
    icon: SparklesIcon,
  }

};

export const ALL_CATEGORY = {
  key: "all",
  label: "All Resources",
  icon: BuildingOfficeIcon,
};

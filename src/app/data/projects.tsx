export type Project = {
  title: string;
  description: string;
  technologies: string[];
  href: string;
  image: string;
};

export const projects: Project[] = [
  {
    title: "Real Estate Data Analytics Pipeline",
    description:
      "Built an end-to-end analytics pipeline for MLS housing data, including data cleaning, feature engineering, geospatial enrichment, outlier detection, and interactive Tableau dashboards.",
    technologies: [
      "Python",
      "Pandas",
      "GeoPandas",
      "Tableau",
      "Data Cleaning",
      "Feature Engineering",
      "Data Visualization",
    ],
    href: "/projects/idx-analytics",
    image: "/images/idx-project.png",
  },
  {
    title: "Machine Learning Neural Network Exploration",
    description:
      "Developed Hopfield Networks and Restricted Boltzmann Machines from scratch without machine learning libraries.",
    technologies: [
      "Python",
      "NumPy",
      "Machine Learning",
      "Hopfield Networks",
      "Restricted Boltzmann Machines",
      "Energy-Based Models",
    ],
    href: "/projects/machine-learning",
    image: "/images/ml-corrupt.png",
  },
  {
    title: "Galaxy Classification",
    description:
      "Deep learning for galaxy morphology classification using astronomical images.",
    technologies: [
      "Python",
      "PyTorch",
      "Computer Vision",
      "Deep Learning",
      "CNN",
    ],
    href: "/projects/galaxy-zoo",
    image: "/images/galaxy-project.png",
  },
];
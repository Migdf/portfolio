/* eslint-disable @next/next/no-img-element */

type TechnologyBadgeProps = {
  technology: string;
};

const badgeUrls: Record<string, string> = {
  Python:
    "https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=fff",

  NumPy:
    "https://img.shields.io/badge/NumPy-4DABCF?logo=numpy&logoColor=fff",

  Pandas:
    "https://img.shields.io/badge/Pandas-150458?logo=pandas&logoColor=fff",

  PyTorch:
    "https://img.shields.io/badge/PyTorch-ee4c2c?logo=pytorch&logoColor=white",

  "scikit-learn":
    "https://img.shields.io/badge/-scikit--learn-%23F7931E?logo=scikit-learn&logoColor=white",

  OpenCV:
    "https://img.shields.io/badge/OpenCV-5C3EE8?logo=opencv&logoColor=fff",

  Tableau:
    "https://custom-icon-badges.demolab.com/badge/Tableau-0176D3?logo=tableau&logoColor=fff",

  Matplotlib:
    "https://custom-icon-badges.demolab.com/badge/Matplotlib-71D291?logo=matplotlib&logoColor=fff",

  Plotly:
    "https://img.shields.io/badge/Plotly-3F4F75?logo=plotly&logoColor=fff",

  TensorFlow:
    "https://img.shields.io/badge/TensorFlow-FF6F00?logo=tensorflow&logoColor=white",

  Keras:
    "https://img.shields.io/badge/Keras-D00000?logo=keras&logoColor=white",

  TypeScript:
    "https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff",

  React:
    "https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB",

  "Next.js":
    "https://img.shields.io/badge/Next.js-000?logo=next.js&logoColor=white",

  GitHub:
    "https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white",

  Git:
    "https://img.shields.io/badge/Git-F05032?logo=git&logoColor=white",

  Jupyter:
    "https://img.shields.io/badge/Jupyter-F37626?logo=jupyter&logoColor=white",

  PostgreSQL:
    "https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white",

  MySQL:
    "https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white",

  Docker:
    "https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white",
  GeoPandas:
    "https://img.shields.io/badge/GeoPandas-139C5A.svg?style=for-the-badge&logo=GeoPandas&logoColor=white",
};


function createGenericBadge(
  technology: string
): string {
  const escapedTechnology =
    technology.replace(/-/g, "--");

  const label =
    encodeURIComponent(
      escapedTechnology
    );

  return (
    "https://img.shields.io/badge/" +
    `${label}-374151?logoColor=white`
  );
}


export default function TechnologyBadge({
  technology,
}: TechnologyBadgeProps) {
  const badgeUrl =
    badgeUrls[technology] ??
    createGenericBadge(technology);

  return (
    <img
      src={badgeUrl}
      alt={technology}
      title={technology}
      loading="lazy"
      className="h-6"
    />
  );
}
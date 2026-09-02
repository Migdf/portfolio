import ExperienceItem from "../components/ExperienceItem";
import CertificateItem from "../components/CertificateItem";

export default function ExperiencePage() {
  return (
    <main className="mx-auto max-w-5xl px-6 pt-5 pb-16 text-gray-100">

      <h1 className="text-4xl font-bold text-white">
        Experience
      </h1>

      <div className="mt-10 space-y-12">

        <ExperienceItem
          title="Data Analyst Intern"
          company="IDX Exchange"
          date="June 2026 – September 2026"
          description={
            "Built an end-to-end real estate analytics pipeline using Python " +
            "and large-scale MLS datasets, transforming raw monthly data into " +
            "analysis-ready datasets through data cleaning, validation, feature " +
            "engineering, outlier detection, mortgage-rate integration, and geospatial " +
            "enrichment. Developed interactive Tableau dashboards to surface housing " +
            "market trends, pricing insights, geographic patterns, and competitive " +
            "performance across agents and offices."
}
          projectHref="/projects/idx-analytics"
        />

      </div>


      {/* Certifications */}
      <section className="mt-16 border-t border-gray-800 pt-10">

        <h1 className="text-4xl font-bold text-white">
          Certifications
        </h1>

        <div className="mt-10 space-y-10">

          <CertificateItem
            title="Intermediate Machine Learning"
            issuer="Kaggle"
            date="Issued August 2026"
            credentialUrl="https://www.kaggle.com/learn/certification/migdfme/intermediate-machine-learning"
          />

          <CertificateItem
            title="Intro to Machine Learning"
            issuer="Kaggle"
            date="Issued August 2026"
            credentialUrl="https://www.kaggle.com/learn/certification/migdfme/intro-to-machine-learning"
          />

        </div>


      </section>

    </main>
  );
}
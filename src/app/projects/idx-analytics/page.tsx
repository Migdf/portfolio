import ProjectPage from "../../components/ProjectPage";

export default function DataAnalyticsPage() {
  return (
    <ProjectPage
      title="Real Estate Data Analytics Pipeline"
      subtitle="Building an end-to-end analytics workflow for MLS housing data during my Data Analyst internship at IDX Exchange, from raw data cleaning and feature engineering to geospatial enrichment and interactive Tableau dashboards."
      image="/images/idx-project.png"

      technologies={[
        "Python",
        "Pandas",
        "GeoPandas",
        "Tableau",
        "Data Cleaning",
        "Feature Engineering",
        "Data Visualization",
      ]}

      links={[
        {
          label: "View Source Code",
          href: "https://github.com/Migdf/IDX-Exchange-Internship",
        },
        {
          label: "View Dashboard",
          href: "https://public.tableau.com/app/profile/michael.chen7022/viz/MarketAnalysisFull/MarketAnalysis",
        },
      ]}

      sections={[
        {
          title: "Project Overview",
          blocks: [
            {
              type: "text",
              content:
                "IDX Exchange works with large MLS datasets containing property listings and completed sales across many markets and time periods. Before that data could support meaningful analysis, it required substantial preprocessing.\n\nThe raw monthly files contained inconsistent formats, duplicate file versions, missing values, invalid numeric records, incorrect geographic coordinates, inconsistent transaction dates, and extreme values that could distort aggregate market statistics.\n\nThe goal of the project was to turn these separate raw files into a consistent and reusable analytics dataset that could support both housing market analysis and competitive analysis.",
            },

            {
              type: "text",
              content:
                "The project was structured as a multi-stage Python pipeline rather than a collection of separate monthly analyses. The workflow combined source files, validated records, cleaned invalid values, enriched the data with external information, engineered new market metrics, detected statistical outliers, and prepared the final datasets for Tableau.\n\nThis structure made the process repeatable as new MLS files became available and reduced the need to manually repeat the same transformations every month.",
            },
          ],
        },

        {
          title: "Data Cleaning & Validation",
          blocks: [
            {
              type: "text",
              content:
                "One of the main challenges was distinguishing unusual but legitimate real-estate transactions from actual data-quality problems. Simply removing every extreme-looking record could incorrectly discard expensive homes or uncommon properties that were still valid.",
            },

            {
              type: "text",
              content:
                "To handle this, rule-based validation was kept separate from statistical outlier detection. The rule-based checks focused on records that were logically impossible or inconsistent, including close prices less than or equal to zero, living areas less than or equal to zero, negative days on market, negative bedroom or bathroom counts, transaction dates in the wrong chronological order, missing coordinates, zero-valued coordinates, and positive longitudes for California properties.",
            },

            {
              type: "text",
              content:
                "Missing data also required more care than simply removing every sparse column. Core housing variables such as price, living area, bedrooms, bathrooms, days on market, and year built were preserved even when they contained substantial missingness because they were still important for later analysis.",
            },

            {
              type: "text",
              content:
                "After the logical validation step, the Interquartile Range, or IQR, method was used to identify statistical outliers in fields such as close price, price per square foot, days on market, and close-to-list-price ratios.",
            },

            {
              type: "equation",
              equation: String.raw`
                \mathrm{IQR} = Q_3 - Q_1
              `,
              caption:
                "The IQR measures the spread of the middle 50% of observations.",
            },

            {
              type: "text",
              content:
                "Here, Q₁ is the first quartile, meaning 25% of observations fall below it, while Q₃ is the third quartile, meaning 75% fall below it. Their difference captures the spread of the middle half of the dataset.",
            },

            {
              type: "equation",
              equation: String.raw`
                \mathrm{Lower}
                =
                Q_1 - 1.5\,\mathrm{IQR}
                \qquad
                \mathrm{Upper}
                =
                Q_3 + 1.5\,\mathrm{IQR}
              `,
              caption:
                "Values outside these bounds were flagged as statistical outliers.",
            },

            {
              type: "text",
              content:
                "This method adapts to the actual distribution of the housing data instead of relying on an arbitrary fixed threshold. A flagged version of the dataset was also preserved separately from the filtered version so unusual records could still be inspected rather than disappearing without traceability.",
            },
          ],
        },

        {
          title: "Feature Engineering & Enrichment",
          blocks: [
            {
              type: "text",
              content:
                "Once the base data was clean, the next step was to derive variables that were more useful for market analysis than the raw MLS fields alone.",
            },

            {
              type: "text",
              content:
                "Price per square foot was calculated as Close Price ÷ Living Area, which normalizes a home's price by its size and makes differently sized properties easier to compare.\n\nThe close-to-original-list-price ratio was calculated as Close Price ÷ Original List Price. A value above 1.00 means the home sold above its original asking price, while a value below 1.00 means it sold below the original asking price.",
            },

            {
              type: "text",
              content:
                "Two timeline features were also created to separate different parts of the transaction process. Listing-to-contract time measures Purchase Contract Date − Listing Contract Date, showing how long it took a property to secure a buyer. Contract-to-close time measures Close Date − Purchase Contract Date, showing how long the transaction took to finish after going under contract.\n\nYear, month, and year-month fields were added as well so records could be grouped consistently into monthly trends.",
            },

            {
              type: "text",
              content:
                "The MLS data was then enriched with national 30-year fixed mortgage rates from the Federal Reserve Economic Data system. Since the mortgage series was reported weekly while the housing dashboards were organized monthly, the weekly observations were converted into monthly averages and joined to each property using a year-month key.\n\nThis added an external economic variable that could be analyzed alongside home prices, sales activity, and market timing.",
            },

            {
              type: "text",
              content:
                "Geographic enrichment added another layer of context. A property's latitude and longitude alone do not directly reveal its school district, so valid coordinates were converted into geographic points and compared against California school district boundary polygons using GeoPandas.",
            },

            {
              type: "text",
              content:
                "The spatial join effectively asks which district polygon contains each property coordinate. After filtering the boundary data to unified school districts, the matching district name was assigned back to each property record.\n\nThis transformed raw latitude and longitude values into a more meaningful geographic feature for later analysis.",
            },
          ],
        },

        {
          title: "Challenges & Decisions",
          blocks: [
            {
              type: "text",
              content:
                "The most difficult part of the project was not any single transformation, but making the entire pipeline reliable despite inconsistencies in the underlying MLS data.",
            },

            {
              type: "text",
              content:
                "Duplicate monthly files were one example. Both an original file and a corrected '_filled' version could exist for the same month, so the file-selection logic automatically preferred the corrected version and prevented the same month from being included twice.",
            },

            {
              type: "text",
              content:
                "Another important decision was how aggressively to clean the data. Logical validation and statistical filtering were intentionally kept separate so clearly incorrect records could be removed without treating every expensive or unusual property as invalid.",
            },

            {
              type: "text",
              content:
                "Geographic enrichment also depended on validating coordinates before the spatial join. Missing coordinates, zero-valued coordinates, or incorrect longitudes could otherwise cause properties to fail district matching or be assigned incorrectly.",
            },

            {
              type: "text",
              content:
                "Together, these decisions made the pipeline more robust and the preprocessing easier to explain. Each transformation had a specific purpose rather than treating data cleaning as a black box.",
            },
          ],
        },

        {
          title: "Results & Impact",
          blocks: [
            {
              type: "text",
              content:
                "The final result was a repeatable pipeline that transformed raw monthly MLS files into analysis-ready residential listing and sales datasets. Instead of performing the same preparation separately for every analysis, the workflow standardized concatenation, validation, cleaning, enrichment, feature engineering, and outlier handling before the data reached Tableau.",
            },

            {
              type: "text",
              content:
                "Those datasets became the foundation for two groups of interactive dashboards. The market-analysis dashboards tracked metrics such as monthly median close price, average days on market, close-to-original-list-price ratio, new listings, and closed sales.",
            },

            {
              type: "text",
              content:
                "The competitive-analysis dashboards ranked listing agents and offices by sales volume and units and mapped geographic differences in prices and transaction activity.\n\nThe practical impact of the project was therefore more than producing cleaned CSV files. The pipeline created a reusable data layer that made it possible to compare housing-market performance across city, county, ZIP code, property subtype, month, agents, and offices.",
            },

            {
              type: "image",
              image: {
                src: "/images/idx-market_analysis1.png",
                alt: "IDX Exchange real estate market analysis Tableau dashboard 1",
              },
            },

            {
              type: "image",
              image: {
                src: "/images/idx-market_analysis2.png",
                alt: "IDX Exchange real estate market analysis Tableau dashboard 2",
              },
            },

            {
              type: "image",
              image: {
                src: "/images/idx-competitive_analysis1.png",
                alt: "IDX Exchange competitive analysis Tableau dashboard 1",
              },
            },

            {
              type: "image",
              image: {
                src: "/images/idx-competitive_analysis2.png",
                alt: "IDX Exchange competitive analysis Tableau dashboard 2",
              },
            },

            {
              type: "image",
              image: {
                src: "/images/idx-competitive_analysis3.png",
                alt: "IDX Exchange competitive analysis Tableau dashboard 3",
              },
            },
          ],
        },

        {
          title: "What I Learned",
          blocks: [
            {
              type: "text",
              content:
                "This project changed how I think about data analysis. The dashboard is only the final layer; much of the reliability of an analysis comes from the decisions made before visualization begins.",
            },

            {
              type: "text",
              content:
                "A major takeaway was the importance of designing a workflow where every transformation has a clear purpose, assumptions are validated before relying on the data, and enough traceability is preserved to understand why records were removed or changed.",
            },

            {
              type: "text",
              content:
                "The project also shifted my thinking from individual scripts toward reusable systems. Building the preprocessing as a pipeline made it easier to incorporate new months of MLS data and ensured that future analyses could begin from the same consistent foundation.",
            },
          ],
        },
      ]}
    />
  );
}
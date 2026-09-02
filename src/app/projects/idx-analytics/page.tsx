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
          label: "View GitHub",
          href: "https://github.com/Migdf/IDX-Exchange-Internship",
        },
        {
          label: "Market Dashboard",
          href: "https://public.tableau.com/app/profile/michael.chen7022/viz/MarketAnalysisFull/MarketAnalysis",
        },
      ]}

      sections={[
        {
          title: "The Problem",
          blocks: [
            {
              type: "text",
              content:
                "Raw MLS real estate data contained inconsistent formats, missing values, invalid records, duplicate files, geographic inconsistencies, and extreme outliers. The goal of the project was to transform this raw data into reliable datasets that could support meaningful housing market and competitive analysis.",
            },
          ],
        },

        {
          title: "Approach",
          blocks: [
            {
              type: "text",
              content:
                "I developed a multi-stage Python data pipeline that combined monthly MLS files, filtered residential properties, validated numeric and date fields, handled missing data, enriched records with mortgage rates and school district information, engineered new housing market metrics, and removed statistical outliers before preparing the data for visualization.",
            },
          ],
        },

        {
          title: "Data Cleaning & Validation",
          blocks: [
            {
              type: "text",
              content:
                "I created validation rules to identify invalid prices, living areas, negative days on market, inconsistent transaction dates, and incorrect geographic coordinates. I also analyzed missing values and preserved important housing fields while removing columns that contained little usable information.",
            },

            {
              type: "code",
              code: `# Example validation rules
sold["invalid_close_price"] = sold["ClosePrice"] <= 0
sold["invalid_living_area"] = sold["LivingArea"] <= 0
sold["invalid_dom"] = sold["DaysOnMarket"] < 0

sold["listing_after_close_flag"] = (
    sold["ListingContractDate"] > sold["CloseDate"]
)

sold["purchase_after_close_flag"] = (
    sold["PurchaseContractDate"] > sold["CloseDate"]
)`,
            },
          ],
        },

        {
          title: "Feature Engineering",
          blocks: [
            {
              type: "text",
              content:
                "I created additional features to make the dataset more useful for market analysis, including price per square foot, close-to-original-list-price ratio, listing-to-contract time, contract-to-close time, and monthly transaction identifiers.",
            },

            {
              type: "code",
              code: `sold["price_per_sqft"] = (
    sold["ClosePrice"] / sold["LivingArea"]
)

sold["close_to_original_list_ratio"] = (
    sold["ClosePrice"] / sold["OriginalListPrice"]
)

sold["listing_to_contract_days"] = (
    sold["PurchaseContractDate"]
    - sold["ListingContractDate"]
).dt.days

sold["contract_to_close_days"] = (
    sold["CloseDate"]
    - sold["PurchaseContractDate"]
).dt.days`,
            },
          ],
        },

        {
          title: "Geospatial Enrichment",
          blocks: [
            {
              type: "text",
              content:
                "Using GeoPandas, I converted property latitude and longitude coordinates into geographic points and spatially joined them with California school district boundary data. This allowed each listing to be enriched with its corresponding unified school district.",
            },

            {
              type: "code",
              code: `properties = gpd.GeoDataFrame(
    sold,
    geometry=gpd.points_from_xy(
        sold["Longitude"],
        sold["Latitude"]
    ),
    crs="EPSG:4326"
)

sold_with_districts = gpd.sjoin(
    properties,
    school_districts,
    how="left",
    predicate="within"
)`,
            },
          ],
        },

        {
          title: "Outlier Detection",
          blocks: [
            {
              type: "text",
              content:
                "To prevent extreme property values from distorting market trends, I used the Interquartile Range method to identify and remove statistical outliers in fields such as close price, price per square foot, days on market, and close-to-list-price ratios.",
            },

            {
              type: "code",
              code: `Q1 = sold["ClosePrice"].quantile(0.25)
Q3 = sold["ClosePrice"].quantile(0.75)

IQR = Q3 - Q1

lower_bound = Q1 - 1.5 * IQR
upper_bound = Q3 + 1.5 * IQR

sold_filtered = sold[
    sold["ClosePrice"].between(
        lower_bound,
        upper_bound
    )
]`,
            },
          ],
        },

        {
          title: "Results",
          blocks: [
            {
              type: "text",
              content:
                "The final cleaned datasets were used to build interactive Tableau dashboards for both housing market analysis and competitive analysis. These dashboards allowed users to explore pricing trends, sales activity, listing performance, geographic differences, and agent and office performance across different locations and property types.",
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
              content: `This internship gave me experience working with a large real-world dataset across the full analytics workflow rather than only performing isolated analysis tasks. I learned how important data validation, consistent preprocessing, and thoughtful feature engineering are before creating visualizations or drawing conclusions from the data.

I also gained experience turning technical data-processing work into interactive dashboards that make complex information easier for users to explore and understand.`,
            },
          ],
        },
      ]}
    />
  );
}
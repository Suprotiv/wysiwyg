import portfolioData from "../../constants/portfolio.json";
import Portfolio from "../../components/Portfolio";
import TextComponent from "../../components/TextComponent";
import React from "react";

const { categories } = portfolioData;

// Generate static paths for each category
export async function generateStaticParams() {
  return categories.map((category) => ({
    category: category.slug,
  }));
}

// Format slug into human-readable category title
const formatCategoryName = (slug) => {
  return slug;
};

const Page = async ({ params }) => {
  console.log(params.category);
  const category = categories.find(
    (category) => category.slug === params.category
  );

  console.log(category);

  return (
    <div className="mt-25 overflow-hidden">
      <div className="gap-10 flex flex-col items-center justify-center">
        <TextComponent project={category?.name} />
        <Portfolio category={params.category} />
      </div>
    </div>
  );
};

export default Page;

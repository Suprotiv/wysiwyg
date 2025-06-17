const fs = require("fs");
const path = require("path");

const imageFolderPath = path.join(__dirname, "public/images/projects");
const portfolioPath = path.join(__dirname, "app/constants/portfolio.json");

// Read existing portfolio
const portfolio = JSON.parse(fs.readFileSync(portfolioPath, "utf-8"));
const existingProjectIds = new Set(portfolio.projects.map(p => p.project_id));

// Get all subfolders in image directory
const folders = fs
  .readdirSync(imageFolderPath, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

const folderSet = new Set(folders);

// Remove orphaned projects (those that exist in JSON but not in the image folder)
portfolio.projects = portfolio.projects.filter(project => {
  const exists = folderSet.has(project.project_id);
  if (!exists) {
    console.log(`🗑️ Removed orphaned project: ${project.project_id}`);
  }
  return exists;
});

let newProjects = [];

function formatTitle(str) {
  return str
    .replace(/[-_]/g, " ")
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

folders.forEach(folderName => {
  if (!existingProjectIds.has(folderName)) {
    const folderPath = path.join(imageFolderPath, folderName);
    const files = fs.readdirSync(folderPath);
    const imageFiles = files.filter(file =>
      /\.(jpg|jpeg|png|webp)$/i.test(file)
    );

    const images = imageFiles.map(
      file => `/images/projects/${folderName}/${file}`
    );

    const newEntry = {
      project_id: folderName,
      title: formatTitle(folderName),
      summaryTitle: formatTitle(folderName),
      projectDescription: "",
      question: "",
      answer: "",
      summary: "",
      meta: {
        services: "",
        client: "",
        sector: ""
      },
      category: [],
      tags: [],
      images
    };

    newProjects.push(newEntry);
    console.log(`✅ Added entry for ${folderName}`);
  } else {
    console.log(`⚠️ Skipping existing project: ${folderName}`);
  }
});

// Update and save
if (newProjects.length > 0 || portfolio.projects.length !== existingProjectIds.size) {
  portfolio.projects.push(...newProjects);
  fs.writeFileSync(
    portfolioPath,
    JSON.stringify(portfolio, null, 2),
    "utf-8"
  );
  console.log(`📝 Updated portfolio.json with ${newProjects.length} new projects.`);
} else {
  console.log("✨ No new projects to add or remove.");
}

const fs = require("fs");
const path = require("path");
const readline = require("readline");

// Paths
const imageFolderPath = path.join(__dirname, "public/images/projects");
const portfolioPath = path.join(__dirname, "app/constants/portfolio.json");

// Setup readline
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Helpers for asking user input
function ask(question) {
  return new Promise(resolve => {
    rl.question(`${question}: `, answer => resolve(answer.trim()));
  });
}

function askMultiline(prompt) {
  return new Promise(resolve => {
    console.log(`${prompt} (Enter '.' on a new line to finish):`);
    const lines = [];
    const onLine = line => {
      if (line.trim() === ".") {
        rl.removeListener("line", onLine);
        resolve(lines.join("\n").trim());
      } else {
        lines.push(line);
      }
    };
    rl.on("line", onLine);
  });
}

function formatTitle(str) {
  return str
    .replace(/[-_]/g, " ")
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Load existing portfolio data
let portfolio = { projects: [] };
if (fs.existsSync(portfolioPath)) {
  portfolio = JSON.parse(fs.readFileSync(portfolioPath, "utf-8"));
}

// Read folder names from image directory
const folders = fs
  .readdirSync(imageFolderPath, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

const folderSet = new Set(folders);

// Remove orphaned projects
portfolio.projects = portfolio.projects.filter(project => {
  const exists = folderSet.has(project.project_id);
  if (!exists) {
    console.log(`🗑️ Removed orphaned project: ${project.project_id}`);
  }
  return exists;
});

const existingProjectsMap = new Map(
  portfolio.projects.map(p => [p.project_id, p])
);


let newOrUpdatedProjects = [];

async function handleNewOrUpdatedProject(folderName) {
  const folderPath = path.join(imageFolderPath, folderName);
  const files = fs.readdirSync(folderPath);
  const imageFiles = files.filter(file =>
    /\.(jpg|jpeg|png|webp)$/i.test(file)
  );
  const images = imageFiles.map(
    file => `/images/projects/${folderName}/${file}`
  );

  const existing = existingProjectsMap.get(folderName);

  if (existing) {
    // Existing project, update only images if changed
    const currentImageSet = new Set(existing.images);
    const newImageSet = new Set(images);
    const imagesChanged =
      images.length !== existing.images.length ||
      images.some(img => !currentImageSet.has(img));

    if (imagesChanged) {
      console.log(`🔄 Updating images for project: ${folderName}`);
      existing.images = images;
      newOrUpdatedProjects.push(existing);
    } else {
      console.log(`✅ No changes in project: ${folderName}`);
    }
    return;
  }

  // New project, ask for metadata
  console.log(`🆕 Creating new entry for: ${folderName}`);
  const title = formatTitle(folderName);
  const summaryTitle = await ask("📌 Summary Title");
  const projectDescription = await askMultiline("📝 Project Description");
  const question = await ask("❓ Question");
  const answer = await askMultiline("💬 Answer");
  const summary = await askMultiline("📄 Summary");
  const services = await ask("🛠️ Services");
  const client = await ask("👤 Client");
  const sector = await ask("🏢 Sector");
  const category = await ask("🏷️ Categories (comma separated)");
  const tags = await ask("🔖 Tags (comma separated)");

  const newEntry = {
    project_id: folderName,
    title,
    summaryTitle,
    projectDescription,
    question,
    answer,
    summary,
    meta: {
      services,
      client,
      sector,
    },
    category: category
      .split(",")
      .map(tag => tag.trim())
      .filter(Boolean),
    tags: tags
      .split(",")
      .map(tag => tag.trim())
      .filter(Boolean),
    images,
  };

  newOrUpdatedProjects.push(newEntry);
}

(async () => {
  for (const folderName of folders) {
    await handleNewOrUpdatedProject(folderName);
  }

  // Merge updated/new projects into portfolio
  const projectMap = new Map(
    portfolio.projects.map(p => [p.project_id, p])
  );
  newOrUpdatedProjects.forEach(project => {
    projectMap.set(project.project_id, project);
  });

  portfolio.projects = Array.from(projectMap.values());

  fs.writeFileSync(
    portfolioPath,
    JSON.stringify(portfolio, null, 2),
    "utf-8"
  );

  console.log(`✅ portfolio.json updated with ${newOrUpdatedProjects.length} modified or new projects.`);

  rl.close();
})();

const axios = require("axios");
const cheerio = require("cheerio");
const notifier = require("node-notifier");

const monitoredUrls = [
  "https://www.guru.com/d/jobs/c/programming-development/", // Guru
];

const alreadySeenProjects = new Set();

async function checkForNewProjects(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    // Extract relevant project info
    $(".record__header__identity").each((_, element) => {
      const jobTitle = $(element).find(".jobRecord__title a").text().trim();
      const price = $(element)
        .find(".jobRecord__budget strong")
        .last()
        .text()
        .trim();

      if (!alreadySeenProjects.has(jobTitle)) {
        alreadySeenProjects.add(jobTitle);

        const message = `From Guru, ${jobTitle} - Price:  ${price}`;
        notifier.notify({
          title: "New Project",
          message: message,
          sound: true, // Only Notification Center or Windows Toasters
          wait: true, // Wait with callback until user action is taken on notification
        });
      }
    });
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
  }
}

setInterval(async () => {
  await checkForNewProjects(monitoredUrls[0]);
}, 20000);

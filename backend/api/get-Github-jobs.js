const baseURL = 'https://jobs.github.com/positions.json'
var fetch = require('node-fetch');

const max_age = (1000 * 60 * 60) * 3; // 3 hours

let jobCache = {
    age: 0,
    jobs: []
};

async function getJobs() {
    if ((Date.now() - jobCache.age) > max_age) {
        console.log("Cache miss")
        const jobs = await fetchGithub();
        jobCache.age = Date.now();
        jobCache.jobs = jobs;
        return jobs;
    }else{
        console.log("Cache hit")
        return jobCache.jobs;
    }
}

async function fetchGithub() {

    console.log('fetching github...');

    let resultCount = 1, onPage = 0;
    const allJobs = [];

    // Fetch all the pages
    // TODO SEND MORE THAN ONE AT A TIME TO MAKE THIS MUCH FASTER
    while (resultCount > 0) {
        const result = await fetch(`${baseURL}?page=${onPage}`);
        const jobs = await result.json();
        allJobs.push(...jobs);
        resultCount = jobs.length;
        console.log('Got', resultCount, 'jobs');
        onPage++;
    }

    console.log('Got a total of', allJobs.length, 'jobs');

    // Filtering Algorithm

    const jrJobs = allJobs.filter(job => {
        const jobTitle = job.title.toLowerCase();
        // The Logic
        if (
            jobTitle.includes('senior') || 
            jobTitle.includes('manager') ||
            jobTitle.includes('sr.') ||
            jobTitle.includes('architect')
        ) {
            return false;
        } 
        return true;
    })

    console.log('filtered down to', jrJobs.length, 'jobs total!')

    // Set in Redis
    // const success = await setAsync('github', JSON.stringify(jrJobs));
    return jrJobs;

}

module.exports = getJobs;
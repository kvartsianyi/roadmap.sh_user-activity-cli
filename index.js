#!/usr/bin/env node

// === Github API Version: 2022-11-28 ===
// -- All events from docs https://docs.github.com/en/rest/using-the-rest-api/github-event-types?apiVersion=2022-11-28
// - PushEvent
// - CreateEvent
// - IssueCommentEvent
// - DeleteEvent
// - IssuesEvent
// - PullRequestEvent
// - PullRequestReviewEvent
// - WatchEvent
// - ForkEvent
// - PullRequestReviewCommentEvent
// - ReleaseEvent
// - CommitCommentEvent
// - PublicEvent
// - MemberEvent
// - GollumEvent
// - PullRequestReviewThreadEvent

const args = process.argv.slice(2);
const [username] = args;

await main();

async function main() {
	try {
		if(!username) {
			throw new Error('Please provide username.');
		}
		
		const activities = await getUserEvents(username);
		return displayUserActivity(activities);
	} catch (e) {
			console.log(e.message);
	}
}
async function getUserEvents(username) {
	const MAX_PER_PAGE = 100;
	const response = await fetch(`https://api.github.com/users/${username}/events?per_page=${MAX_PER_PAGE}`);
	
	if (!response.ok) {
		if (response.status === 404) {
			throw new Error('User not found. Please check if they exist on GitHub.');
		}
		
		throw new Error(`Github Api Error: ${res.message}`);
	}

	return response.json();
}

function generateActivityDescription({ type, repo, payload }) {
	if (type === 'CreateEvent') {
		return `Created ${payload?.ref_type === 'repository' ? `repository` : `new branch ${payload?.ref} in`} ${repo?.name}`;
	}
	if (type === 'PushEvent') {
		return `Pushed ${payload?.commits?.length} commit(s) to ${repo?.name}`;
	}
	if (type === 'WatchEvent') {
		return `Watched ${repo?.name}`;
	}
	if (type === 'DeleteEvent') {
		return `Deleted repository ${repo?.name}`;
	}
	if (type === 'PullRequestEvent') {
		return `Pull request ${payload?.action} in ${repo?.name}`;
	}
	if (type === 'IssueCommentEvent') {
		return `Issue comment ${payload?.action} in ${repo?.name}`;
	}
	if (type === 'PullRequestReviewEvent') {
		return `Pull request review ${payload?.action} in ${repo?.name}`;
	}
	if (type === 'PullRequestReviewCommentEvent') {
		return `Pull request review comment ${payload?.action} in ${repo?.name}`;
	}
	if (type === 'IssuesEvent') {
		return `Issue ${payload?.action} in ${repo?.name} `;
	}
	if (type === 'ReleaseEvent') {
		return `Released ${payload?.release?.name} of ${repo?.name}`;
	}
	if (type === 'ForkEvent') {
		return `Forked ${repo?.name}`;
	}
	if (type === 'CommitCommentEvent') {
		return `Commit commented in ${repo?.name}`;
	}
	if (type === 'PublicEvent') {
		return `Made the repository ${repo?.name} public`;
	}
	if (type === 'PublicEvent') {
		return `Joined the repository ${repo?.name}`;
	}
	if (type === 'GollumEvent') {
		return `Updated the wiki in ${repo?.name}`;
	}
	if (type === 'PullRequestReviewThreadEvent') {
		return `Commented on a review thread in ${repo?.name}`;
	}

	return 'Unknown activity event';
}

function displayUserActivity(activities) {
	if(!activities.length) {
		return console.log(`No recent activity were found.`)
	}

	const displayUsername = username.charAt(0).toUpperCase() + username.slice(1);
	console.log(`*** ${displayUsername} recent activity: ***`);
	activities.forEach(activity => {
		console.log(`- ${generateActivityDescription(activity)}`)
	});
}

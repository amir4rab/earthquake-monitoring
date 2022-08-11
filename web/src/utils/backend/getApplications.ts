import { Octokit } from 'octokit';

export type GhReleaseAsset = {
  "url": string,
  "id": number,
  "node_id": string,
  "name": string,
  "label": string,
  "uploader": {
    "login": string,
    "id": number,
    "node_id": string,
    "avatar_url":string,
    "gravatar_id": string,
    "url": string,
    "html_url": string,
    "followers_url": string,
    "following_url": string,
    "gists_url": string,
    "starred_url": string,
    "subscriptions_url": string,
    "organizations_url": string,
    "repos_url": string,
    "events_url": string,
    "received_events_url": string,
    "type": string,
    "site_admin": boolean
  },
  "content_type": string,
  "state": string,
  "size": number,
  "download_count": number,
  "created_at": string,
  "updated_at": string,
  "browser_download_url": string,
}

export interface GhRelease {
  "url": string,
  "assets_url": string,
  "upload_url": string,
  "html_url": string,
  "id": number,
  "author": {
    "login": string,
    "id": number,
    "node_id": string,
    "avatar_url":string,
    "gravatar_id": string,
    "url": string,
    "html_url": string,
    "followers_url": string,
    "following_url":string,
    "gists_url": string,
    "starred_url": string,
    "subscriptions_url": string,
    "organizations_url": string,
    "repos_url": string,
    "events_url": string,
    "received_events_url": string,
    "type": string,
    "site_admin": boolean
  },
  "node_id": string,
  "tag_name": string,
  "target_commitish": string,
  "name": string,
  "draft": boolean,
  "prerelease": boolean,
  "created_at": string,
  "published_at": string,
  "assets": GhReleaseAsset[],
  "tarball_url": string,
  "zipball_url": string,
  "body": string
  "mentions_count": number
}

type GhReleases = GhRelease[]

const getApplications = async () => {
  try {
    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN
    });
  
    try {
      const latestRelease = await octokit.request(`GET /repos/amir4rab/earthquake-monitoring/releases/latest`);
      return latestRelease.data as GhRelease; // returns the latest release for projects with at least of non-prerelease release
    } catch {}

    try {
      const releases = await octokit.request(`GET /repos/amir4rab/earthquake-monitoring/releases`);
      const data = releases.data as GhReleases; // returns the latest release for projects with no normal release
      return data[0];
    } catch {}
    
    return null; // returns null in-case that project doesn't exists

  } catch (err) {
    console.error(err);
    return null;
  }
};

export default getApplications
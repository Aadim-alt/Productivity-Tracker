const axios = require('axios');

class GitHubService {
  constructor(accessToken) {
    this.accessToken = accessToken;
    this.baseURL = 'https://api.github.com';
    this.headers = {
      'Authorization': `token ${accessToken}`,
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'GitHub-Productivity-Tracker'
    };
  }

  async getUserData() {
    try {
      const response = await axios.get(`${this.baseURL}/user`, {
        headers: this.headers
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error.message);
      throw error;
    }
  }

  async getUserEvents(username, page = 1, perPage = 100) {
    try {
      const response = await axios.get(
        `${this.baseURL}/users/${username}/events?page=${page}&per_page=${perPage}`,
        { headers: this.headers }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching user events:', error.message);
      throw error;
    }
  }

  async getCommitActivity(username) {
    try {
      // Get user repositories
      const reposResponse = await axios.get(
        `${this.baseURL}/users/${username}/repos?sort=updated&per_page=100`,
        { headers: this.headers }
      );
      
      const repos = reposResponse.data;
      let totalCommits = 0;
      const commitActivity = [];

      // Get commit activity for each repository
      for (const repo of repos) {
        try {
          const commitsResponse = await axios.get(
            `${this.baseURL}/repos/${repo.owner.login}/${repo.name}/stats/commit_activity`,
            { headers: this.headers }
          );
          
          if (commitsResponse.data) {
            commitsResponse.data.forEach(week => {
              totalCommits += week.total;
              commitActivity.push({
                week: week.week,
                total: week.total,
                days: week.days
              });
            });
          }
        } catch (error) {
          console.warn(`Could not fetch commit activity for ${repo.name}:`, error.message);
        }
      }

      return { total: totalCommits, weekly: commitActivity };
    } catch (error) {
      console.error('Error fetching commit activity:', error.message);
      throw error;
    }
  }

  async getPullRequestStats(username) {
    try {
      // Search for PRs created by user
      const createdPRsResponse = await axios.get(
        `${this.baseURL}/search/issues?q=author:${username}+type:pr+is:merged`,
        { headers: this.headers }
      );

      // Search for PRs reviewed by user
      const reviewedPRsResponse = await axios.get(
        `${this.baseURL}/search/issues?q=reviewed-by:${username}+type:pr`,
        { headers: this.headers }
      );

      return {
        created: createdPRsResponse.data.total_count || 0,
        reviewed: reviewedPRsResponse.data.total_count || 0,
        merged: createdPRsResponse.data.total_count || 0 // Assuming created PRs are merged
      };
    } catch (error) {
      console.error('Error fetching PR stats:', error.message);
      throw error;
    }
  }

  async getIssueStats(username) {
    try {
      // Search for issues created by user
      const createdIssuesResponse = await axios.get(
        `${this.baseURL}/search/issues?q=author:${username}+type:issue`,
        { headers: this.headers }
      );

      // Search for issues assigned to user
      const assignedIssuesResponse = await axios.get(
        `${this.baseURL}/search/issues?q=assignee:${username}+type:issue`,
        { headers: this.headers }
      );

      // Search for closed issues by user
      const closedIssuesResponse = await axios.get(
        `${this.baseURL}/search/issues?q=author:${username}+type:issue+is:closed`,
        { headers: this.headers }
      );

      return {
        created: createdIssuesResponse.data.total_count || 0,
        assigned: assignedIssuesResponse.data.total_count || 0,
        closed: closedIssuesResponse.data.total_count || 0
      };
    } catch (error) {
      console.error('Error fetching issue stats:', error.message);
      throw error;
    }
  }

  async getCodeReviewStats(username) {
    try {
      // Get user events and filter for review related events
      const events = await this.getUserEvents(username);
      
      const reviewEvents = events.filter(event => 
        event.type === 'PullRequestReviewEvent' || 
        event.type === 'PullRequestReviewCommentEvent'
      );

      const reviewsGiven = reviewEvents.filter(event => 
        event.payload.action === 'created' || 
        event.payload.action === 'submitted'
      ).length;

      return {
        given: reviewsGiven,
        received: 0 // This would require more complex analysis
      };
    } catch (error) {
      console.error('Error fetching code review stats:', error.message);
      throw error;
    }
  }

  async getUserStats() {
    try {
      const userData = await this.getUserData();
      const username = userData.login;

      const [commitActivity, prStats, issueStats, reviewStats] = await Promise.all([
        this.getCommitActivity(username),
        this.getPullRequestStats(username),
        this.getIssueStats(username),
        this.getCodeReviewStats(username)
      ]);

      return {
        user: {
          username: userData.login,
          name: userData.name,
          avatarUrl: userData.avatar_url,
          publicRepos: userData.public_repos,
          followers: userData.followers,
          following: userData.following
        },
        commits: commitActivity,
        pullRequests: prStats,
        issues: issueStats,
        codeReviews: reviewStats,
        lastUpdated: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error fetching user stats:', error.message);
      throw error;
    }
  }
}

module.exports = GitHubService;

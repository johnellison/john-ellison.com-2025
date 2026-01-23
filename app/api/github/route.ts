import { NextResponse } from 'next/server';

export interface GitHubEvent {
  id: string;
  type: string;
  repo: {
    name: string;
    url: string;
  };
  payload: {
    commits?: Array<{
      sha: string;
      message: string;
    }>;
    action?: string;
    ref?: string;
    ref_type?: string;
  };
  created_at: string;
}

export interface ProcessedActivity {
  id: string;
  type: string;
  repo: string;
  repoUrl: string;
  message: string;
  timestamp: string;
  relativeTime: string;
}

// Cache duration: 1 hour
const CACHE_DURATION = 60 * 60;

export async function GET() {
  try {
    const username = 'johnellison';
    const apiUrl = `https://api.github.com/users/${username}/events/public`;

    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    };

    // Use GitHub token if available
    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const response = await fetch(apiUrl, {
      headers,
      next: { revalidate: CACHE_DURATION },
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const events: GitHubEvent[] = await response.json();

    // Process and filter events
    const activities = processEvents(events).slice(0, 5);

    return NextResponse.json({
      activities,
      lastFetched: new Date().toISOString(),
    }, {
      headers: {
        'Cache-Control': `public, s-maxage=${CACHE_DURATION}, stale-while-revalidate`,
      },
    });
  } catch (error) {
    console.error('GitHub API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub activity', activities: [] },
      { status: 500 }
    );
  }
}

function processEvents(events: GitHubEvent[]): ProcessedActivity[] {
  const processed: ProcessedActivity[] = [];

  for (const event of events) {
    const activity = processEvent(event);
    if (activity) {
      processed.push(activity);
    }
  }

  return processed;
}

function processEvent(event: GitHubEvent): ProcessedActivity | null {
  const baseActivity = {
    id: event.id,
    repo: event.repo.name.split('/')[1] || event.repo.name,
    repoUrl: `https://github.com/${event.repo.name}`,
    timestamp: event.created_at,
    relativeTime: getRelativeTime(new Date(event.created_at)),
  };

  switch (event.type) {
    case 'PushEvent':
      const commits = event.payload.commits || [];
      const commitCount = commits.length;
      const latestMessage = commits[commitCount - 1]?.message?.split('\n')[0] || 'Pushed changes';
      return {
        ...baseActivity,
        type: 'push',
        message: commitCount > 1
          ? `${commitCount} commits: ${latestMessage}`
          : latestMessage,
      };

    case 'CreateEvent':
      const refType = event.payload.ref_type;
      const ref = event.payload.ref;
      return {
        ...baseActivity,
        type: 'create',
        message: refType === 'repository'
          ? 'Created repository'
          : `Created ${refType} ${ref}`,
      };

    case 'WatchEvent':
      return {
        ...baseActivity,
        type: 'star',
        message: 'Starred repository',
      };

    case 'ForkEvent':
      return {
        ...baseActivity,
        type: 'fork',
        message: 'Forked repository',
      };

    case 'IssuesEvent':
      return {
        ...baseActivity,
        type: 'issue',
        message: `${capitalize(event.payload.action || '')} issue`,
      };

    case 'PullRequestEvent':
      return {
        ...baseActivity,
        type: 'pr',
        message: `${capitalize(event.payload.action || '')} pull request`,
      };

    case 'IssueCommentEvent':
      return {
        ...baseActivity,
        type: 'comment',
        message: 'Commented on issue',
      };

    default:
      return null;
  }
}

function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'just now';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays}d ago`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks}w ago`;
  }

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

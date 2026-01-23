'use client';

import { useEffect, useState } from 'react';

interface ProcessedActivity {
  id: string;
  type: string;
  repo: string;
  repoUrl: string;
  message: string;
  timestamp: string;
  relativeTime: string;
}

const activityIcons: Record<string, React.ReactNode> = {
  push: (
    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8.75.75V2h.985c.304 0 .603.08.867.231l1.29.736c.038.022.08.033.124.033h2.234a.75.75 0 0 1 0 1.5h-.427l2.111 4.692a.75.75 0 0 1-.154.838l-.53-.53.529.531-.001.002-.002.002-.006.006-.016.015-.056.05a7.07 7.07 0 0 1-.811.624l-.08.053a8.13 8.13 0 0 1-.91.496A4.57 4.57 0 0 1 11.55 11H9.5v1.5a2 2 0 0 1-1.999 2H2.75a.75.75 0 0 1 0-1.5h4.75a.5.5 0 0 0 .5-.5V11H5.5a4.57 4.57 0 0 1-2.404-.724 8.13 8.13 0 0 1-.91-.496l-.08-.053a7.07 7.07 0 0 1-.867-.674l-.056-.05-.016-.015-.006-.006-.002-.002h-.001l.529-.531-.53.53a.75.75 0 0 1-.154-.838L3.258 4.5H2.75a.75.75 0 0 1 0-1.5h2.255c.045 0 .086-.01.124-.033l1.29-.736c.264-.15.563-.231.867-.231h.985V.75a.75.75 0 0 1 1.5 0Zm-1.5 4.5V3.5h-.985a.25.25 0 0 0-.144.039l-1.29.736a.75.75 0 0 1-.384.125H2.46l-1.5 3.337a5.72 5.72 0 0 0 .505.352c.364.229.76.439 1.186.618.413.174.88.296 1.349.364V11h5a3.08 3.08 0 0 0 1.349-.364 6.63 6.63 0 0 0 1.186-.618l.504-.352-1.5-3.337H9.629a.75.75 0 0 1-.384-.125l-1.29-.736a.25.25 0 0 0-.144-.039H6.25V5.25a.75.75 0 0 1 .75-.75h.5a.25.25 0 0 0 .25-.25Z" />
    </svg>
  ),
  create: (
    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
      <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z" />
    </svg>
  ),
  star: (
    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
    </svg>
  ),
  fork: (
    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
      <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z" />
    </svg>
  ),
  issue: (
    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
      <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z" />
    </svg>
  ),
  pr: (
    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
      <path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z" />
    </svg>
  ),
  comment: (
    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
      <path d="M1 2.75C1 1.784 1.784 1 2.75 1h10.5c.966 0 1.75.784 1.75 1.75v7.5A1.75 1.75 0 0 1 13.25 12H9.06l-2.573 2.573A1.458 1.458 0 0 1 4 13.543V12H2.75A1.75 1.75 0 0 1 1 10.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h4.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z" />
    </svg>
  ),
};

export default function GitHubFeed() {
  const [activities, setActivities] = useState<ProcessedActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchActivities() {
      try {
        const response = await fetch('/api/github');
        const data = await response.json();

        if (data.error) {
          setError(data.error);
        } else {
          setActivities(data.activities || []);
        }
      } catch (err) {
        setError('Failed to load');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchActivities();
  }, []);

  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-4 bg-white/10 rounded w-3/4 mb-1" />
            <div className="h-3 bg-white/5 rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (error || activities.length === 0) {
    return (
      <div className="space-y-2">
        <a
          href="https://github.com/johnellison"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
          View on GitHub
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {activities.map((activity) => (
        <a
          key={activity.id}
          href={activity.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block group"
        >
          <div className="flex items-start gap-2">
            <span className="text-white/40 mt-0.5 group-hover:text-purple-400 transition-colors">
              {activityIcons[activity.type] || activityIcons.push}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white/60 group-hover:text-white/80 transition-colors truncate">
                {activity.message}
              </p>
              <p className="text-xs text-white/30">
                {activity.repo} · {activity.relativeTime}
              </p>
            </div>
          </div>
        </a>
      ))}
      <a
        href="https://github.com/johnellison"
        target="_blank"
        rel="noopener noreferrer"
        className="block text-xs text-white/40 hover:text-white/60 transition-colors mt-2"
      >
        View all on GitHub →
      </a>
    </div>
  );
}

import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import prisma from "@/lib/prisma";
import { getAuthSession } from "@/lib/auth-utils";
import { WhoToFollowClient, TrendingTopicsClient } from "./TrendsSidebarClient";

export default async function TrendsSidebar() {
  return (
    <div className="sticky top-[5.25rem] hidden h-fit w-72 flex-none space-y-5 md:block lg:w-80">
      <Suspense fallback={<Loader2 className="mx-auto animate-spin" />}>
        <WhoToFollow />
        <TrendingTopics />
      </Suspense>
    </div>
  );
}

async function WhoToFollow() {
  const { user } = await getAuthSession();

  if (!user) return null;

  const usersToFollow = await prisma.user.findMany({
    where: {
      NOT: {
        id: user.id,
      },
      followers: {
        none: {
          followerId: user.id,
        },
      },
    },
    select: {
      id: true,
      username: true,
      displayName: true,
      avatarUrl: true,
      _count: {
        select: {
          followers: true,
        },
      },
      followers: {
        where: {
          followerId: user.id,
        },
        select: {
          followerId: true,
        },
      },
    },
    take: 5,
  });

  return <WhoToFollowClient usersToFollow={usersToFollow} />;
}

async function TrendingTopics() {
  const trendingTopics = await prisma.$queryRaw<{ hashtag: string; count: bigint }[]>`
    SELECT LOWER(unnest(regexp_matches(content, '#[[:alnum:]_]+', 'g'))) AS hashtag, COUNT(*) AS count
    FROM posts
    GROUP BY (hashtag)
    ORDER BY count DESC, hashtag ASC
    LIMIT 5
  `;

  const formattedTopics = trendingTopics.map((row) => ({
    hashtag: row.hashtag,
    count: Number(row.count),
  }));

  return <TrendingTopicsClient trendingTopics={formattedTopics} />;
}
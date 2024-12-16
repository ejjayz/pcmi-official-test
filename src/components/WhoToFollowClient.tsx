"use client";

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import UserAvatar from "./UserAvatar";
import UserTooltip from "./UserTooltip";
import FollowButton from "./FollowButton";

export default function WhoToFollowClient({ usersToFollow }: { usersToFollow: any[] }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <Loader2 className="mx-auto animate-spin" />;
  }

  if (!user) return null;

  return (
    <div className="space-y-5 rounded-2xl bg-card p-5 shadow-sm">
      <div className="text-xl font-bold">Who to follow</div>
      {usersToFollow.map((user) => (
        <div key={user.id} className="flex items-center justify-between gap-3">
          <UserTooltip user={user}>
            <Link
              href={`/users/${user.username}`}
              className="flex items-center gap-3"
            >
              <UserAvatar avatarUrl={user.avatarUrl} className="flex-none" />
              <div>
                <p className="line-clamp-1 break-all font-semibold hover:underline">
                  {user.displayName}
                </p>
                <p className="line-clamp-1 break-all text-muted-foreground">
                  @{user.username}
                </p>
              </div>
            </Link>
          </UserTooltip>
          <FollowButton
            userId={user.id}
            initialState={{
              followers: user._count.followers,
              isFollowedByUser: user.followers.some(
                ({ followerId }) => followerId === user.id,
              ),
            }}
          />
        </div>
      ))}
    </div>
  );
}
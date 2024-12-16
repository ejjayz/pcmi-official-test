"use client";

import PostEditor from "@/components/posts/editor/PostEditor";
import TrendsSidebar from "@/components/TrendsSidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FollowingFeed from "./FollowingFeed";
import ForYouFeed from "./ForYouFeed";
import "@/styles/native-feel.css";

export default function Home() {
  const preventDefaultTouch = (e: React.TouchEvent) => {
    e.preventDefault();
  };

  return (
    <main 
      className="flex w-full min-w-0 gap-5"
      onTouchStart={preventDefaultTouch}
      onTouchMove={preventDefaultTouch}
    >
      <div className="w-full min-w-0 space-y-5">
        <PostEditor />
        <Tabs defaultValue="for-you" className="no-tap-highlight">
          <TabsList>
            <TabsTrigger 
              value="for-you"
              className="no-tap-highlight"
            >
              For you
            </TabsTrigger>
            <TabsTrigger 
              value="following"
              className="no-tap-highlight"
            >
              Following
            </TabsTrigger>
          </TabsList>
          <TabsContent value="for-you">
            <ForYouFeed />
          </TabsContent>
          <TabsContent value="following">
            <FollowingFeed />
          </TabsContent>
        </Tabs>
      </div>
      <TrendsSidebar />
    </main>
  );
}
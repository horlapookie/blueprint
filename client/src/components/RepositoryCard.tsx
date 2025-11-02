import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, GitFork, ExternalLink } from "lucide-react";

interface RepositoryCardProps {
  name: string;
  description: string;
  stars: number;
  forks: number;
  repoUrl: string;
  onFork: () => void;
  isForking?: boolean;
  isForked?: boolean;
  forkedRepoUrl?: string;
}

export default function RepositoryCard({
  name,
  description,
  stars,
  forks,
  repoUrl,
  onFork,
  isForking = false,
  isForked = false,
  forkedRepoUrl,
}: RepositoryCardProps) {
  return (
    <Card className="w-full">
      <CardHeader className="gap-2">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1 flex-1">
            <CardTitle className="text-xl">{name}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover-elevate active-elevate-2 rounded-md p-2"
            data-testid="link-repo"
          >
            <ExternalLink className="w-4 h-4 text-muted-foreground" />
          </a>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Star className="w-4 h-4" />
            {stars}
          </span>
          <span className="flex items-center gap-1">
            <GitFork className="w-4 h-4" />
            {forks}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium mb-2">Key Features:</h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">WhatsApp Bot</Badge>
              <Badge variant="secondary">Docker Ready</Badge>
              <Badge variant="secondary">Free Hosting</Badge>
              <Badge variant="secondary">AI Integration</Badge>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-3">
        {!isForked ? (
          <Button
            onClick={onFork}
            disabled={isForking}
            className="w-full"
            data-testid="button-fork"
          >
            <GitFork className="w-4 h-4" />
            {isForking ? "Forking Repository..." : "Fork Repository"}
          </Button>
        ) : (
          <div className="w-full space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              Repository forked successfully
            </div>
            {forkedRepoUrl && (
              <Button
                variant="outline"
                className="w-full"
                asChild
                data-testid="link-forked-repo"
              >
                <a href={forkedRepoUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                  View Your Fork
                </a>
              </Button>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}

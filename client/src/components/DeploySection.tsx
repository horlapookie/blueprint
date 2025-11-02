import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Rocket } from "lucide-react";
import DeploymentCarousel from "./DeploymentCarousel";

interface DeploySectionProps {
  forkedRepoUrl: string;
  username: string;
  onDeploy: () => void;
}

export default function DeploySection({ forkedRepoUrl, username, onDeploy }: DeploySectionProps) {
  const renderDeployUrl = `https://render.com/deploy?repo=${encodeURIComponent(forkedRepoUrl)}`;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Rocket className="w-5 h-5" />
          Ready to Deploy
        </CardTitle>
        <CardDescription>
          Deploy your forked repository to Render with one click
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <DeploymentCarousel />

        <div className="bg-muted p-4 rounded-lg space-y-2">
          <p className="text-sm font-medium">What happens next:</p>
          <ul className="text-sm text-muted-foreground space-y-1 ml-4">
            <li className="list-disc">You'll be redirected to Render's deployment page</li>
            <li className="list-disc">Configure your environment variables</li>
            <li className="list-disc">Your bot will be deployed automatically</li>
          </ul>
        </div>

        <div className="space-y-2">
          <Button
            onClick={onDeploy}
            className="w-full"
            size="lg"
            data-testid="button-deploy-render"
            asChild
          >
            <a href={renderDeployUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4" />
              Deploy to Render
            </a>
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            Deploying from {username}/Horlapookie-bot
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

interface HeroSectionProps {
  onConnectGitHub: () => void;
  isLoading?: boolean;
}

export default function HeroSection({ onConnectGitHub, isLoading }: HeroSectionProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10 px-6">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold tracking-tight text-foreground">
            Deploy Eclipse MD Bot
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Launch your own WhatsApp bot instance in minutes. Fork the repository and deploy to Render with one click.
          </p>
        </div>

        <div className="space-y-4">
          <ul className="text-sm text-muted-foreground space-y-2 max-w-md mx-auto">
            <li className="flex items-center gap-2 justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Automatic GitHub fork
            </li>
            <li className="flex items-center gap-2 justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Free Render hosting
            </li>
            <li className="flex items-center gap-2 justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Deploy in 2 clicks
            </li>
          </ul>
        </div>

        <div className="pt-4">
          <Button
            size="lg"
            onClick={onConnectGitHub}
            disabled={isLoading}
            className="min-h-14 px-8 text-base font-semibold"
            data-testid="button-connect-github"
          >
            <Github className="w-5 h-5" />
            {isLoading ? "Connecting..." : "Continue with GitHub"}
          </Button>
        </div>

        <div className="pt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Secure OAuth • No credentials stored
        </div>
      </div>
    </div>
  );
}

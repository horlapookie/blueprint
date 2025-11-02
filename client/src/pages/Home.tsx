import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import StepIndicator from "@/components/StepIndicator";
import UserProfile from "@/components/UserProfile";
import RepositoryCard from "@/components/RepositoryCard";
import DeploySection from "@/components/DeploySection";
import StatusMessage from "@/components/StatusMessage";

type Step = "connect" | "fork" | "deploy" | "done";

interface GitHubUser {
  username: string;
  avatarUrl: string;
}

export default function Home() {
  const [currentStep, setCurrentStep] = useState<Step>("connect");
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [isForking, setIsForking] = useState(false);
  const [isForked, setIsForked] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // TODO: Remove mock functionality - Replace with actual GitHub OAuth
  const handleConnectGitHub = () => {
    console.log("Connect with GitHub");
    // Mock login
    setTimeout(() => {
      setUser({
        username: "horlapookie",
        avatarUrl: "https://github.com/horlapookie.png",
      });
      setCurrentStep("fork");
    }, 1000);
  };

  // TODO: Remove mock functionality - Replace with actual GitHub API fork
  const handleForkRepository = () => {
    console.log("Fork repository");
    setIsForking(true);
    setError(null);
    
    // Mock forking
    setTimeout(() => {
      setIsForking(false);
      setIsForked(true);
      setCurrentStep("deploy");
    }, 2000);
  };

  const handleLogout = () => {
    console.log("Logout");
    setUser(null);
    setIsForked(false);
    setCurrentStep("connect");
    setError(null);
  };

  const handleDeploy = () => {
    console.log("Deploy to Render");
    setCurrentStep("done");
  };

  if (currentStep === "connect") {
    return <HeroSection onConnectGitHub={handleConnectGitHub} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        {user && (
          <div className="max-w-md mx-auto">
            <UserProfile
              username={user.username}
              avatarUrl={user.avatarUrl}
              onLogout={handleLogout}
            />
          </div>
        )}

        <StepIndicator currentStep={currentStep} />

        {error && (
          <StatusMessage
            type="error"
            message={error}
            onDismiss={() => setError(null)}
          />
        )}

        {currentStep === "fork" && (
          <div className="max-w-2xl mx-auto">
            <RepositoryCard
              name="Horlapookie-bot"
              description="A powerful WhatsApp bot with AI integration, games, and automation features. Deploy your own instance with custom commands and settings."
              stars={22}
              forks={29}
              repoUrl="https://github.com/horlapookie/Horlapookie-bot"
              onFork={handleForkRepository}
              isForking={isForking}
              isForked={isForked}
              forkedRepoUrl={user ? `https://github.com/${user.username}/Horlapookie-bot` : undefined}
            />
          </div>
        )}

        {(currentStep === "deploy" || currentStep === "done") && user && (
          <div className="max-w-2xl mx-auto space-y-6">
            <DeploySection
              forkedRepoUrl={`https://github.com/${user.username}/Horlapookie-bot`}
              username={user.username}
              onDeploy={handleDeploy}
            />

            {currentStep === "done" && (
              <StatusMessage
                type="success"
                message="Deployment initiated! Follow the instructions on Render to complete your bot setup."
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

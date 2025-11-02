import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import StepIndicator from "@/components/StepIndicator";
import UserProfile from "@/components/UserProfile";
import DeploySection from "@/components/DeploySection";
import StatusMessage from "@/components/StatusMessage";

type Step = "connect" | "deploy" | "done";

interface GitHubUser {
  username: string;
  avatarUrl: string;
}

export default function Home() {
  const [currentStep, setCurrentStep] = useState<Step>("connect");
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // TODO: Remove mock functionality - Replace with actual GitHub OAuth + auto fork
  const handleConnectGitHub = () => {
    console.log("Connect with GitHub and auto-fork");
    setIsConnecting(true);
    setError(null);
    
    // Mock: GitHub OAuth + automatic fork
    setTimeout(() => {
      setUser({
        username: "horlapookie",
        avatarUrl: "https://github.com/horlapookie.png",
      });
      setIsConnecting(false);
      setCurrentStep("deploy");
    }, 2000);
  };

  const handleLogout = () => {
    console.log("Logout");
    setUser(null);
    setCurrentStep("connect");
    setError(null);
  };

  const handleDeploy = () => {
    console.log("Deploy to Render");
    setCurrentStep("done");
  };

  if (currentStep === "connect") {
    return <HeroSection onConnectGitHub={handleConnectGitHub} isLoading={isConnecting} />;
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

        {(currentStep === "deploy" || currentStep === "done") && user && (
          <div className="max-w-2xl mx-auto space-y-6">
            <StatusMessage
              type="success"
              message={`Repository forked successfully to ${user.username}/Horlapookie-bot! You're ready to deploy.`}
            />
            
            <DeploySection
              forkedRepoUrl={`https://github.com/${user.username}/Horlapookie-bot`}
              username={user.username}
              onDeploy={handleDeploy}
            />

            {currentStep === "done" && (
              <StatusMessage
                type="info"
                message="Deployment initiated! Follow the steps in the carousel above and configure your environment variables on Render."
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

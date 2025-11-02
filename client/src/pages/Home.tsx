import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import HeroSection from "@/components/HeroSection";
import StepIndicator from "@/components/StepIndicator";
import UserProfile from "@/components/UserProfile";
import DeploySection from "@/components/DeploySection";
import StatusMessage from "@/components/StatusMessage";

type Step = "connect" | "deploy" | "done";

interface GitHubUser {
  username: string;
  avatarUrl: string;
  forkedRepoUrl: string;
}

interface SessionResponse {
  user: GitHubUser | null;
}

export default function Home() {
  const [currentStep, setCurrentStep] = useState<Step>("connect");
  const [error, setError] = useState<string | null>(null);

  // Check for error in URL params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const errorParam = params.get('error');
    if (errorParam) {
      setError(`Authentication failed: ${errorParam.replace(/_/g, ' ')}`);
      window.history.replaceState({}, '', '/');
    }
  }, []);

  // Fetch current session
  const { data: session, isLoading } = useQuery<SessionResponse>({
    queryKey: ['/api/auth/session'],
  });

  const user = session?.user;

  // Update step based on user state
  useEffect(() => {
    if (user) {
      setCurrentStep("deploy");
    } else {
      setCurrentStep("connect");
    }
  }, [user]);

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: () => apiRequest('/api/auth/logout', 'POST'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/auth/session'] });
      setCurrentStep("connect");
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const handleDeploy = () => {
    setCurrentStep("done");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (currentStep === "connect") {
    return <HeroSection />;
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
              forkedRepoUrl={user.forkedRepoUrl}
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

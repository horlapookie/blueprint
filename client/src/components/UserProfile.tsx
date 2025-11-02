import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface UserProfileProps {
  username: string;
  avatarUrl?: string;
  onLogout: () => void;
}

export default function UserProfile({ username, avatarUrl, onLogout }: UserProfileProps) {
  const initials = username
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="flex items-center gap-4 p-4 bg-card border border-card-border rounded-lg">
      <Avatar className="w-10 h-10">
        <AvatarImage src={avatarUrl} alt={username} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate" data-testid="text-username">
          {username}
        </p>
        <p className="text-xs text-muted-foreground">Connected to GitHub</p>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={onLogout}
        data-testid="button-logout"
      >
        <LogOut className="w-4 h-4" />
        Logout
      </Button>
    </div>
  );
}

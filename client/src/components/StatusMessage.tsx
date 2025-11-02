import { AlertCircle, CheckCircle, Info, XCircle } from "lucide-react";

type MessageType = "success" | "error" | "info" | "warning";

interface StatusMessageProps {
  type: MessageType;
  message: string;
  onDismiss?: () => void;
}

export default function StatusMessage({ type, message, onDismiss }: StatusMessageProps) {
  const config = {
    success: {
      icon: CheckCircle,
      className: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
    },
    error: {
      icon: XCircle,
      className: "bg-destructive/10 text-destructive border-destructive/20",
    },
    info: {
      icon: Info,
      className: "bg-primary/10 text-primary border-primary/20",
    },
    warning: {
      icon: AlertCircle,
      className: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20",
    },
  };

  const { icon: Icon, className } = config[type];

  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-lg border ${className}`}
      data-testid={`status-${type}`}
    >
      <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
      <p className="text-sm flex-1">{message}</p>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="hover-elevate active-elevate-2 rounded p-1 -m-1"
          data-testid="button-dismiss"
        >
          <XCircle className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

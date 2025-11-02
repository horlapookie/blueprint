import StatusMessage from '../StatusMessage';

export default function StatusMessageExample() {
  return (
    <div className="max-w-2xl p-8 space-y-4">
      <StatusMessage
        type="success"
        message="Repository forked successfully! You can now deploy it to Render."
      />
      <StatusMessage
        type="error"
        message="Failed to fork repository. Please check your GitHub permissions and try again."
      />
      <StatusMessage
        type="info"
        message="This deployment tool will fork the repository to your GitHub account."
      />
      <StatusMessage
        type="warning"
        message="Make sure you have the required environment variables before deploying."
        onDismiss={() => console.log('Dismissed')}
      />
    </div>
  );
}

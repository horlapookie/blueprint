import DeploySection from '../DeploySection';

export default function DeploySectionExample() {
  return (
    <div className="max-w-2xl p-8">
      <DeploySection
        forkedRepoUrl="https://github.com/username/Horlapookie-bot"
        username="username"
        onDeploy={() => console.log('Deploy clicked')}
      />
    </div>
  );
}

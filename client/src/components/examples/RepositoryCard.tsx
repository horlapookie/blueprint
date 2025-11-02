import RepositoryCard from '../RepositoryCard';
import { useState } from 'react';

export default function RepositoryCardExample() {
  const [isForked, setIsForked] = useState(false);
  const [isForking, setIsForking] = useState(false);

  const handleFork = () => {
    setIsForking(true);
    setTimeout(() => {
      setIsForking(false);
      setIsForked(true);
    }, 2000);
  };

  return (
    <div className="max-w-2xl p-8 space-y-8">
      <div>
        <p className="text-sm text-muted-foreground mb-4">Not Forked State</p>
        <RepositoryCard
          name="Horlapookie-bot"
          description="A powerful WhatsApp bot with AI integration, games, and automation features"
          stars={22}
          forks={29}
          repoUrl="https://github.com/horlapookie/Horlapookie-bot"
          onFork={() => console.log('Fork clicked')}
        />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-4">Interactive Example</p>
        <RepositoryCard
          name="Horlapookie-bot"
          description="A powerful WhatsApp bot with AI integration, games, and automation features"
          stars={22}
          forks={29}
          repoUrl="https://github.com/horlapookie/Horlapookie-bot"
          onFork={handleFork}
          isForking={isForking}
          isForked={isForked}
          forkedRepoUrl="https://github.com/username/Horlapookie-bot"
        />
      </div>
    </div>
  );
}

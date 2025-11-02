import UserProfile from '../UserProfile';

export default function UserProfileExample() {
  return (
    <div className="max-w-md p-8">
      <UserProfile 
        username="horlapookie"
        avatarUrl="https://github.com/horlapookie.png"
        onLogout={() => console.log('Logout clicked')}
      />
    </div>
  );
}

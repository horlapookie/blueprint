import HeroSection from '../HeroSection';

export default function HeroSectionExample() {
  return (
    <HeroSection 
      onConnectGitHub={() => console.log('Connect with GitHub clicked')}
    />
  );
}

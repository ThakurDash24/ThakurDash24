import { BackgroundPaths } from "./ui/background-paths";

interface LoadingScreenProps {
  onComplete: () => void;
  onFadeOutStart?: () => void;
  allComponentsLoaded: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete, onFadeOutStart }) => {
    return (
        <BackgroundPaths 
            onEnterStart={onFadeOutStart}
            onComplete={onComplete} 
        />
    );
};

export default LoadingScreen;

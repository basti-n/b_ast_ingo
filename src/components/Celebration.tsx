import { FunctionComponent } from 'react';
import Confetti from 'confetti-react';

export interface CelebrationProps {
  onConfettiComplete?: () => void;
}

export const Celebration: FunctionComponent<CelebrationProps> = ({
  onConfettiComplete,
}) => {
  return (
    <Confetti
      onConfettiComplete={onConfettiComplete}
      recycle={false}
    ></Confetti>
  );
};

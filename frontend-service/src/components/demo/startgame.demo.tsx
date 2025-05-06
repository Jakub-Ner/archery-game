import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

export default function StartGame() {
  const navigate = useNavigate();

  const handleStartGame = () => {
    // Później tutaj możesz np. wywołać API do rozpoczęcia gry
    navigate('/gameplay');
  };

  return (
    <Button size="lg" className="h-12 px-20 text-xl" onClick={handleStartGame}>
      Start a new game.
    </Button>
  );
}
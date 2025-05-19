import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { ChampionComponent } from '../ui/champion';
import { Champion, HP} from '@/logic/champion';

export default function ChampionDemo() {
  const navigate = useNavigate();

  const showChampion = () => {
    navigate('/champion');
  };

  // Tworzenie przykładowych postaci do prezentacji
  const champion1 = new Champion(
    "player1",
    "Warrior",
    "../../../public/assets/skins/mwladcablyskawic.png", 
    new HP(100),
    { x: 50, y: 150 }, 
    { x: 0, y: 0 } 
  );
  champion1.hp.current = 23;
  champion1.experience = 1;


  const champion2 = new Champion(
    "player2",
    "Mage",
    "../../../public/assets/skins/mwladcablyskawic.png",
    new HP(80),
    { x: 200, y: 150 },
    { x: 1, y: 0 }
  );
  champion2.experience = 3;
  champion2.hp.current = 50;

  const champion3 = new Champion(
    "player3",
    "Rogue",
    "../../../public/assets/skins/mwladcablyskawic.png",
    new HP(50),
    { x: 350, y: 150 },
    { x: 2, y: 0 }
  );
  champion3.hp.current = 50;
  champion3.experience = 2;
  
  const champion4 = new Champion(
    "player4",
    "Healer",
    "../../../public/assets/skins/mwladcablyskawic.png",
    new HP(100),
    { x: 500, y: 150 },
    { x: 3, y: 0 }
  );
  champion4.experience = 5;


  return (
    <div className="p-6 space-y-8 bg-gray-100 rounded-lg max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Champion Component Demo</h1>

      <div className="space-y-12">
        <div>
          <div className="relative h-48 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <ChampionComponent champion={champion1} />
          </div>
        </div>
        
        <div>
          <div className="relative h-48 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <ChampionComponent champion={champion2} />
          </div>
        </div>
        
        <div>
          <div className="relative h-48 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <ChampionComponent champion={champion3} />
          </div>
        </div>
        
        <div>
          <div className="relative h-48 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <ChampionComponent champion={champion4} />
          </div>
        </div>
        

      </div>

      <div className="mt-8">
        <Button size="lg" className="h-12 px-20 text-xl w-full" onClick={showChampion}>
          Show Champion
        </Button>
      </div>
    </div>
  );
}
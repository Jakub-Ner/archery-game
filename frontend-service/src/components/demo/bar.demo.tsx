import Bar from '../ui/bar'; 
import { Button } from '../ui/button'; 
import { useNavigate } from 'react-router-dom';

export default function BarDemo() {
  const navigate = useNavigate();

  const showBar = () => {
    navigate('/bar');
  };

  return (
    <div className="p-6 space-y-8 bg-gray-100 rounded-lg max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">UI Component Demo</h1>

      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-2">Health Bar</h2>
          <Bar 
            currentValue={75} 
            maxValue={100}
            label='XP'
          />
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-2">Experience Bar</h2>
          <Bar 
            currentValue={30}
            maxValue={100}
          />
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-2">Custom Colored Bar</h2>
          <Bar 
            currentValue={45}
            maxValue={100}
            computeBarColor={(percentage) => {
              if (percentage < 30) return 'bg-purple-300';
              if (percentage < 70) return 'bg-purple-500';
              return 'bg-purple-700';
            }}
          />
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-2">Low Health</h2>
          <Bar 
            currentValue={10}
            maxValue={100}
          />
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-2">Full Bar</h2>
          <Bar 
            currentValue={100}
            maxValue={100}
          />
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-2">Empty Bar (K.O.)</h2>
          <Bar 
            currentValue={0}
            maxValue={100}
          />
        </div>
      </div>
{
      <Button size="lg" className="h-12 px-20 text-xl w-full" onClick={showBar}>
        Show Bar Page
      </Button>}
    </div>
  );
}
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { WSClient } from "@/utils/WSClient";

const ExitButton = () => {
  const navigate = useNavigate();

  const handleExit = () => {
    WSClient.get().stop();
    navigate("/menu");
  };

  return (
    <div className="absolute top-4 right-4 z-50">
      <Button
        variant="destructive"
        onClick={handleExit}
        title="Exit to menu"
      >
        Exit
      </Button>
    </div>
  );
};

export default ExitButton;

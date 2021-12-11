import { useGameStore } from '../stores/GameStore';
import Computer from './Computer';
import Gamer from './Gamer';
import Timer from './Timer';
import Avatar from './Avatar';
import speech from '../services/Speech';

const Start: React.FC = () => {
  const {
    state: { turn, micMode, gamerSkor, computerSkor },
    actions: { changeGameStatus },
  } = useGameStore();

  return (
    <>
      <div className="game-container">
        <div className="skor-board">
          <Avatar name="Sen" turn={turn === 'gamer'} micMode={micMode} />
          <div className="skors">
            {gamerSkor} - {computerSkor}
          </div>
          <Avatar name="Bilgisayar" turn={turn === 'computer'} isCom />
        </div>
        <div className="game-area">{turn === 'computer' ? <Computer /> : <Gamer />}</div>
        <div className="timer">
          {turn === 'gamer' && (
            <Timer
              start={8}
              onFinish={() => {
                speech.stop();
                changeGameStatus('timeover');
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Start;

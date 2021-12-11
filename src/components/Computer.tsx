import { useEffect } from 'react';
import game from '../services/Game';
import speech from '../services/Speech';
import { useGameStore } from '../stores/GameStore';

const Computer: React.FC = () => {
  const {
    state: { spokenWords, lastWord, thinking },
    actions: { changeLastWord, changeGameStatus, changeWonMessage },
  } = useGameStore();

  useEffect(() => {
    game
      .computerTurn(lastWord, spokenWords)
      .then((result) => {
        speech.speak(result).finally(() => {
          changeLastWord(result);
        });
      })
      .catch((error) => {
        console.log(error);
        if (error === 'notFound') {
          changeWonMessage('Bilgisayar yeni bir kelime bulamadı.');
          changeGameStatus('gamerWon');
        }
      });
  }, []);

  return (
    <>
      {thinking && (
        <>
          <p>Düşünüyorum...</p>
          {lastWord && <h2>{lastWord}</h2>}
        </>
      )}
    </>
  );
};

export default Computer;

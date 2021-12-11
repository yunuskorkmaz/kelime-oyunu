import { useEffect } from 'react';
import game from '../services/Game';
import speech from '../services/Speech';
import { useGameStore } from '../stores/GameStore';

const Gamer: React.FC = () => {
  const {
    state: { lastWord, spokenWords },
    actions: { changeMicMode, changeLastWord, changeGameStatus },
  } = useGameStore();

  useEffect(() => {
    speech.on('onsoundstart', () => {
      changeMicMode('listening');
    });

    speech.on('onspeechend', () => {
      changeMicMode('off');
    });

    speech.on('onnomatch', () => {
      changeMicMode('off');
      changeGameStatus('nomatch');
    });

    speech.on('onresult', (result) => {
      changeMicMode('processing');
      const word: string = result.results[0][0].transcript;
      game
        .gamerTurn(word, lastWord, spokenWords)
        .then((name: string) => {
          changeLastWord(name);
          changeMicMode('off');
        })
        .catch((error) => {
          changeGameStatus(error);
        });
    });
    speech.start();
  }, []);

  return (
    <>
      <p>Son harfinden yenisini üretmen gereken kelime</p>
      <h2>{lastWord}</h2>
    </>
  );
};

export default Gamer;

import { useEffect } from 'react';
import GameMessage from '../components/GameMessage';
import Init from '../components/Init';
import Start from '../components/Start';
import speech from '../services/Speech';
import { useGameStore } from '../stores/GameStore';

const AppContainer: React.FC = () => {
  const {
    state: { wonMessage, status, gamerSkor },
    actions: { changeGameStatus },
  } = useGameStore();

  useEffect(() => {
    if (!speech.isSupported()) {
      changeGameStatus('unsupport');
    } else {
      changeGameStatus('init');
    }
  }, []);

  const handleClickStart = () => {
    speech
      .getPermission()
      .then(() => changeGameStatus('started'))
      .catch(() => changeGameStatus('micAccessDenied'));
  };

  const handleRestart = () => {
    changeGameStatus('init');
  };

  const renderMain = () => {
    switch (status) {
      case 'init':
        return <Init onClick={handleClickStart} />;
      case 'started':
        return <Start />;
      case 'nomatch':
        return (
          <GameMessage
            title="Kaybettiniz!"
            desc={'Söylenilen kelime anlaşılamadı.'}
            skor={gamerSkor}
            onRestart={handleRestart}
          />
        );
      case 'error':
        return (
          <GameMessage
            title="Kaybettiniz"
            desc={'Sistem hatası oluştu'}
            skor={gamerSkor}
            onRestart={handleRestart}
          />
        );
      case 'timeover':
        return (
          <GameMessage
            title="Kaybettiniz"
            desc={'Verilen süre içinde yanıt verilmedi.'}
            skor={gamerSkor}
            onRestart={handleRestart}
          />
        );
      case 'firstCharError':
        return (
          <GameMessage
            title="Kaybettiniz"
            desc={'Söylenen ismin ilk harfi hatalı.'}
            skor={gamerSkor}
            onRestart={handleRestart}
          />
        );
      case 'repeatWord':
        return (
          <GameMessage
            title="Kaybettiniz"
            desc={'Söylenen kelime daha önce kullanıldı'}
            skor={gamerSkor}
            onRestart={handleRestart}
          />
        );
      case 'micAccessDenied':
        return (
          <GameMessage
            title="Microfona Erişemiyoruz"
            desc={'Microfona erişim izni verilmedi.'}
            onRestart={handleRestart}
          />
        );
      case 'unsupport':
        return (
          <GameMessage
            title={'Desteklenmeyen Tarayıcı'}
            desc={'Kullandığınız tarayıcı ses algılamayı desteklenmiyor'}
            onRestart={handleRestart}
          />
        );
      case 'gameover':
        return (
          <GameMessage
            title={'Kaybettin'}
            desc={'Kaybettin'}
            skor={gamerSkor}
            onRestart={handleRestart}
          />
        );
      case 'gamerWon':
        return (
          <GameMessage
            title={'Kazandın 🎉'}
            desc={'Tebrikler bilgisayarı yenmeyi başardın.'}
            skor={gamerSkor}
            extraMessage={wonMessage}
            onRestart={handleRestart}
          />
        );
      default:
        break;
    }
  };

  return <>{renderMain()}</>;
};

export default AppContainer;

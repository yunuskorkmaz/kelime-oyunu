const GameMessage: React.FC<{
  title: string;
  desc: string;
  skor?: number;
  extraMessage?: string;
  onRestart: () => void;
}> = ({ title, desc, skor, extraMessage, onRestart }) => {
  return (
    <>
      <h2>{title}</h2>
      <p>{desc}</p>
      {extraMessage !== '' && <p>{extraMessage}</p>}
      <p>Bilinen kelime {skor}</p>
      <button className="btn" onClick={onRestart}>
        Yeniden Oyna
      </button>
    </>
  );
};

export default GameMessage;

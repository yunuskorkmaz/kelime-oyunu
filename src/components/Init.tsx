const Init: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <>
      <h2>Merhaba</h2>
      <p>Yapay zekaya karşı kelimenin son harfi ile sıra tabanlı kelime türetme oyunu.</p>
      <button className="btn" onClick={onClick}>
        Başla
      </button>
    </>
  );
};

export default Init;

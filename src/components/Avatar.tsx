import { FC } from 'react';
import { MicMode } from '../types';
import { Dots, Mic, Robot } from './icons';

const Avatar: FC<{
  name: string;
  turn: boolean;
  isCom?: boolean;
  micMode?: MicMode;
}> = ({ name, turn, isCom, micMode }) => {
  return (
    <div className={`avatar-wrapper`}>
      <div
        style={{
          borderColor: turn ? 'var(--turn-color)' : 'currentcolor',
        }}
        className={`avatar ${turn ? 'listening' : ''}`}
      >
        {isCom ? (
          <Robot style={{ fontSize: '2rem' }} fill="var(--border-color)" />
        ) : micMode === 'processing' ? (
          <Dots style={{ fontSize: '2rem' }} />
        ) : (
          <Mic
            style={{ fontSize: '2rem' }}
            fill={micMode === 'listening' ? 'var(--turn-color)' : 'var(--border-color)'}
          />
        )}
      </div>
      <div className="avatar-name">{name}</div>
    </div>
  );
};

export default Avatar;

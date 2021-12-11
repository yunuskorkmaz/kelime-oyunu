import game from './Game';

describe('gamer run', () => {
  it('first letter error', () => {
    return expect(() => game.gamerTurn('yunus', 'ali', ['feriha'])).rejects.toEqual(
      'firstCharError',
    );
  });

  it('repeat word', () => {
    return expect(() => game.gamerTurn('yunus', 'yay', ['yunus'])).rejects.toEqual('repeatWord');
  });

  it('gamer find new word', async () => {
    const result = await game.gamerTurn('nazlı', 'irfan', ['yunus', 'irfan']);
    expect(result).toEqual('nazlı');
  });
});

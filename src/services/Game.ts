import names from '../db/names.json';

class Game {
  datas = names;
  dataLength = names.length;
  thinking = 2000;

  getRandomWord() {
    return this.datas[Math.floor(Math.random() * this.dataLength)];
  }

  computerTurn(lastWord: string, spokenWords: Array<string>): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const randomThinkingTime = Math.floor(Math.random() * 4000) + 300;
      const notFoundChance = Math.floor(Math.random() * 100);
      if (notFoundChance <= 30 && spokenWords.length > 4) {
        setTimeout(() => {
          reject('notFound');
        }, 8000);
      } else {
        setTimeout(() => {
          if (lastWord === '') {
            resolve(this.getRandomWord());
          } else {
            const lastChar = lastWord[lastWord.length - 1];
            const findedNames = this.datas.filter(
              (name) => name[0] === lastChar && !spokenWords.includes(name),
            );
            const result = findedNames[Math.floor(Math.random() * findedNames.length)];
            resolve(result);
          }
        }, randomThinkingTime);
      }
    });
  }

  gamerTurn(currentWord: string, lastWord: string, spokenWords: Array<string>): Promise<string> {
    return new Promise((resolve, reject) => {
      if (typeof currentWord !== 'string') reject('nomatch');
      const lastChar = lastWord[lastWord.length - 1];
      let _currentWord = currentWord.replace(/[^a-zA-ZığüşöçİĞÜŞÖÇ ]+/, '');
      _currentWord = _currentWord.toLowerCase();
      if (!_currentWord.startsWith(lastChar, 0)) {
        reject('firstCharError');
      } else {
        const checkSpokenWords = spokenWords.includes(_currentWord);
        if (checkSpokenWords) {
          reject('repeatWord');
        } else {
          resolve(_currentWord);
        }
      }
    });
  }
}

const game = new Game();
export default game;

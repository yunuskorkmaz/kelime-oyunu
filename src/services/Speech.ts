interface IWindow extends Window {
  webkitSpeechRecognition: any;
}
const { webkitSpeechRecognition }: IWindow = window as unknown as IWindow;

class Speech {
  recognition;
  synth;
  constructor() {
    if (this.isSupported()) {
      this.recognition = new webkitSpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.lang = 'tr-TR';
      this.synth = window.speechSynthesis;
    }
  }

  isSupported() {
    if ('webkitSpeechRecognition' in window && 'speechSynthesis' in window) {
      return true;
    }
    return false;
  }

  getPermission() {
    if (window.location.protocol !== 'https:') {
      return Promise.reject();
    }
    return window.navigator.mediaDevices.getUserMedia({ audio: true });
  }

  start() {
    this.recognition.start();
  }

  stop() {
    this.recognition.stop();
  }

  on(event: string, callback: (data: any) => void) {
    this.recognition[event] = (result: any) => callback(result);
  }

  speak(word: string) {
    return new Promise((resolve) => {
      const utterThis = new SpeechSynthesisUtterance(word);
      utterThis.addEventListener('end', () => {
        resolve(word);
      });
      this.synth?.speak(utterThis);
    });
  }
}

const speech = new Speech();
export default speech;

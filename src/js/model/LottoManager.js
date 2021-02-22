import Lotto from './Lotto.js';
import { LOTTO } from '../utils/constants.js';
import {
  generateRandomNumber,
  sortNumbers,
  isEmptyValue,
  isInRange,
} from '../utils/common.js';

export default class LottoManager {
  constructor(lottos = []) {
    this.lottos = lottos;
    this.listeners = [];
    this.winningCount = null;
    // this.message = '';
    this.rewards = Object.freeze({
      '1등': 2000000000,
      '2등': 300000000,
      '3등': 1500000,
      '4등': 50000,
      '5등': 5000,
    });
  }

  createLottos(lottoCount) {
    const lottos = Array.from(
      { length: lottoCount },
      () => new Lotto(this.generateLottoNumbers()),
    );

    this.setState({ lottos });
  }

  decideWinners(winningNumbers, bonusNumber) {
    const winningNumbersTemp = {
      '1등': 0,
      '2등': 0,
      '3등': 0,
      '4등': 0,
      '5등': 0,
    };

    this.lottos.forEach(lotto => {
      const numbers = lotto.numbers;
      let count = 0;
      numbers.forEach(number => {
        if (winningNumbers.includes(number)) count++;
      });
      if (count === 6) {
        winningNumbersTemp[`1등`]++;
      } else if (count === 5 && numbers.includes(bonusNumber)) {
        winningNumbersTemp[`2등`]++;
      } else if (count === 5) {
        winningNumbersTemp[`3등`]++;
      } else if (count === 4) {
        winningNumbersTemp[`4등`]++;
      } else if (count === 3) {
        winningNumbersTemp[`5등`]++;
      }
    });
    this.setState({
      winningCount: winningNumbersTemp,
    });
  }

  generateLottoNumbers() {
    const lottoNumbers = new Set();
    while (lottoNumbers.size < LOTTO.LENGTH) {
      lottoNumbers.add(generateRandomNumber(LOTTO.MIN_NUM, LOTTO.MAX_NUM));
    }

    return sortNumbers([...lottoNumbers]);
  }

  static isValidLottoNumbers(numbers) {
    return (
      numbers.length === LOTTO.LENGTH &&
      new Set(numbers).size === numbers.length
    );
  }

  static validateWinningNumbersInputValue(winningNumbers, bonusNumber) {
    const numbers = [...winningNumbers, bonusNumber].map(Number);

    if (winningNumbers.some(isEmptyValue) || isEmptyValue(bonusNumber)) {
      return '빈 입력값이 존재 합니다. 7개의 숫자를 모두 입력해주세요.';
    }

    if (!numbers.every(number => isInRange(number))) {
      return '1~45 사이의 숫자만 가능합니다. 당첨 번호를 다시 입력해주세요.';
    }

    if (new Set(numbers).size !== numbers.length) {
      return '중복된 숫자가 존재합니다. 당첨 번호를 다시 입력해주세요.';
    }

    return '';
  }

  setState({ lottos, winningCount }) {
    this.lottos = lottos ?? this.lottos;
    this.winningCount = winningCount ?? this.winningCount;

    this.notify();
  }

  subscribe(listener) {
    this.listeners.push(listener);
  }

  notify() {
    this.listeners.forEach(listener => listener());
  }
}

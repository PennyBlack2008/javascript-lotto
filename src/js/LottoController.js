import Lotto from './Lotto.js';

import { LOTTO_NUMBERS, ALERT_MESSAGES } from './utils/constants.js';
import {
  isCorrectPurchaseUnit,
  isUniqueManualNumber,
  isUniqueWinningNumber,
} from './utils/lottoValidation.js';
<<<<<<< HEAD
import { $ } from './utils/dom.js';
import LottoProcessor from './utils/lottoProcessor.js';
=======
import { $ } from './utils/selector.js';
import {
  compareNumbers,
  calculateEarningRate,
  countByRank,
} from './utils/utils.js';
>>>>>>> 739d581... feat: show manual input form when choose manual purchase

import PurchaseTypeSelectView from './views/PurchaseTypeSelectView.js';
import InputPriceView from './views/InputPriceView.js';
import ManualInputView from './views/ManualInputView.js';
import PurchasedLottosView from './views/PurchasedLottosView.js';
import WinningResultView from './views/WinningResultView.js';

export default class LottoController {
  constructor() {
    this.purchaseTypeSelectView = new PurchaseTypeSelectView(
      $('#purchase-type')
    );
    this.inputPriceView = new InputPriceView($('#input-price-form'));
    this.purchasedLottosView = new PurchasedLottosView($('#purchased-lottos'));
<<<<<<< HEAD
    this.winningResultView = new WinningResultView($('#winning-numbers-form'));
=======
    this.winningResultView = new WinningResultView($('#input-winning-nums'));
>>>>>>> 56b3a9e... refactor: rename lotto-input-nums to lotto-winning-nums
  }

  init() {
    this.reset();
    this.bindEvents();
  }

  reset() {
    this.isAutoPurchase = true;
    this.lottos = [];
    this.purchasedPrice = 0;

    this.inputPriceView.resetInputPrice();
    this.purchasedLottosView.hide().resetToggleSwitch();
    this.winningResultView.hide().resetWinningNumbers();
  }

  bindEvents() {
    this.purchaseTypeSelectView.on('selectType', e => {
      this.isAutoPurchase = e.detail;
    });
    this.inputPriceView.on('submitPrice', e =>
      this.inputPriceHandler(e.detail)
    );
    this.winningResultView
      .on('submitNumbers', e => this.inputWinningNumbersHandler(e.detail))
      .on('clickResetBtn', () => this.reset());
  }

  createAutoLottos(lottoCount) {
    this.lottos = Array.from({ length: lottoCount }, () => {
      const lotto = new Lotto();
      return lotto;
    });
  }

  createManualLottos(manualNumbers, ticketNumber) {
    const lotto = new Lotto();
    lotto.inputManualNumbers(manualNumbers);
    this.lottos.push(lotto);
    this.manualInputView.confirmManualLottos(lotto, ticketNumber);
  }

  inputPriceHandler(inputPrice) {
    this.purchasedPrice = inputPrice;
    if (!isCorrectPurchaseUnit(this.purchasedPrice)) {
      this.inputPriceView.resetInputPrice();
      alert(ALERT_MESSAGES.INCORRECT_UNIT);
      return;
    }

    if (this.isAutoPurchase) {
      this.purchaseAutomatically();
    } else {
      this.purchaseManually();
    }
  }

  purchaseAutomatically() {
    this.createAutoLottos(this.purchasedPrice / LOTTO_NUMBERS.LOTTO_UNIT);
    this.purchasedLottosView.show();
    this.purchasedLottosView.renderLottos(this.lottos);
    this.winningResultView.show();
  }

  purchaseManually() {
    this.manualInputView = new ManualInputView(
      'manual-input-wrapper',
      this.purchasedPrice / LOTTO_NUMBERS.LOTTO_UNIT
    );
    this.manualInputView.on('submitNumbers', e =>
      this.inputManualNumbersHandler(e.detail)
    );
    this.manualInputView.on('confirm', e =>
      this.confirmManualPurchaseHandler(e.detail)
    );
  }

  inputManualNumbersHandler(eventDetail) {
    const ticketNumbers = eventDetail.numbers.map(manualNumber =>
      Number(manualNumber.value)
    );
    if (!isUniqueManualNumber(ticketNumbers)) {
      alert(ALERT_MESSAGES.DUPLICATE_NUMS);
      return;
    }
    this.createManualLottos(ticketNumbers, eventDetail.ticketNumber);
  }

  confirmManualPurchaseHandler(manualCount) {
    if (manualCount < this.purchasedPrice / LOTTO_NUMBERS.LOTTO_UNIT) {
      const agreeAutoPurchase = confirm(ALERT_MESSAGES.TURN_TO_AUTO_PURCHASE);
      if (agreeAutoPurchase) {
        console.log('자동 구매로 전환');
      }
    }
  }

  inputWinningNumbersHandler(winningNumbers) {
    if (!isUniqueWinningNumber(winningNumbers)) {
      alert(ALERT_MESSAGES.DUPLICATE_NUMS);
      return;
    }

    const lottoProcessor = new LottoProcessor(this.lottos, winningNumbers);
    lottoProcessor.checkMatchingNums();
    lottoProcessor.calculateEarningRate(this.purchasedPrice);

    this.winningResultView.showModal(
      lottoProcessor.rankCounts,
      lottoProcessor.earningRate
    );
  }
}

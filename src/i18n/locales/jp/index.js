const FAQs_CONTENT = require('raw-loader!./faq.html');
const PRIVACY_CONTENT = require('raw-loader!./privacy.html');
const TERMS_CONTENT = require('raw-loader!./terms.html');

module.exports = {
  CryptoHero: 'ホーム',
  'My Cards': 'コレクション',
  'Sign In': 'サインイン',
  Home: 'ホーム',
  FAQs: 'よくある質問',
  Owner: '所有者',
  'Current Price': '価格',
  Buy: '購入',
  'Terms of Service': '利用規約',
  'Privacy Policy': 'プライバシー',
  'Contact Us': 'お問い合わせ',
  Slogan: 'スローガン',
  UPDATE_SLOGAN_PROMPT: 'Please enter your slogan (Up to 100 characters):',
  UPDATE_SLOGAN_FAIL_TOO_LOOG_MSG: 'The slogan can only be 100 characters long.',
  EDIT_SLOGAN_TIP: 'After purchasing this card, you can edit the slogan.',
  BUY_SUCCESS_MSG: 'The payment is successful, please wait for the miner to confirm, refresh again later.',
  BUY_FAIL_MSG: 'Failed, refresh the page and try again.',
  'Edit Slogan': 'Edit Slogan',
  User: 'User',
  'His Cards': 'His/Her Cards',
  BUY_BTN: 'Buy',
  PREMIUM_BUY_BTN: '{rate} Premium to buy',
  BUY_PRICE_TIP: 'The higher the bid, the greater the chance of getting it. Use 100+gas to make the transaction proved fast!',
  FAQs_CONTENT,
  PRIVACY_CONTENT,
  TERMS_CONTENT,
};

const FAQs_CONTENT = require('raw-loader!./faq.html');
const PRIVACY_CONTENT = require('raw-loader!./privacy.html');
const TERMS_CONTENT = require('raw-loader!./terms.html');

module.exports = {
  CryptoMoe: 'CryptoMoe',
  'My Cards': 'コレクションカード',
  'Sign In': 'サインイン',
  Home: 'ホーム',
  FAQs: 'よくある質問',
  Owner: '所有者',
  'Current Price': '今の価格',
  Buy: '購入',
  'Terms of Service': '利用規約',
  'Privacy Policy': 'プライバシーポリシー',
  'Contact Us': 'お問い合わせ',
  Slogan: '広告ポジション',
  UPDATE_SLOGAN_PROMPT: 'スローガンを入力してください（100文字以内）:',
  UPDATE_SLOGAN_FAIL_TOO_LOOG_MSG: 'スローガンの制限は100文字以下。',
  EDIT_SLOGAN_TIP: 'このカードを購入したあと、スローガン編集が可能になる。',
  BUY_SUCCESS_MSG: '購入成功、鉱工の確認を待つ間、後ほどリフレッシュしてください。',
  BUY_FAIL_MSG: '失敗しました、リフレッシュしてもう一度試しましょう。',

  UPDATE_PRICE_PROMPT: '请输入您希望的卡的价格(单位为ETH)：',
  UPDATE_PRICE_CONFRIM: '请确认是否要修改卡的价格为：{priceInEth} ETH ？',
  UPDATE_PRICE_ERROR_MSG: '输入有误(价格必须大于0)',
  UPDATE_PRICE_SUCCESS_MSG: '提交成功，请等待矿工确认，稍后再来刷新看看吧。',
  UPDATE_PRICE_FAIL_MSG: '失败了，刷新网页再试试.',

  'Edit Slogan': 'スローガン編集',
  User: 'ユーザー',
  'His Cards': '彼・彼女のカード',
  BUY_BTN: '購入',
  PREMIUM_BUY_BTN: '{rate}プレミアム購入',
  BUY_PRICE_TIP: '課金の総額が高くなると、カードの獲得率が一方になる。 トランザクション毎に100以上のガスを投入してこれ以上のスピードで確認される！',
  FAQs_CONTENT,
  PRIVACY_CONTENT,
  TERMS_CONTENT,
  BuyNow: 'Buy Now',
  CHANGE_PRICE_BTN: '修改价格',
  INPUT_PRICE_BTN: '手动输入价格',
  BUT_AT_INPUT_PRICE_BTN: '按输入价格购买',
};

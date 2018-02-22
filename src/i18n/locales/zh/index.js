const FAQs_CONTENT = require('raw-loader!./faq.html');
const PRIVACY_CONTENT = require('raw-loader!./privacy.html');
const TERMS_CONTENT = require('raw-loader!./terms.html');

module.exports = {
  CryptoMoe: '以太萌王',
  'My Cards': '我的卡牌',
  'Sign In': '登录游戏',
  Home: '首页',
  FAQs: '常见问题',
  Owner: '拥有者',
  'Current Price': '当前价格',
  Buy: '购买',
  BirthdayGift: '智取生辰纲(HOT)',
  'Terms of Service': '使用条款',
  'Privacy Policy': '隐私政策',
  'Contact Us': '联系我们',
  Slogan: '标语',
  EDIT_SLOGAN_TIP: '购买此卡后，您可以编辑标语。也可修改此卡的价格。',
  'Edit Slogan': '编辑标语',
  BUY_SUCCESS_MSG: '支付成功，请等待矿工确认，稍后再来刷新看看吧。',
  BUY_FAIL_MSG: '失败了，刷新网页再试试.',
  UPDATE_SLOGAN_PROMPT: '请输入您的标语内容(最长100个字符)：',
  UPDATE_SLOGAN_FAIL_TOO_LOOG_MSG: '标语最长只能100个字符',
  UPDATE_SLOGAN_FAIL_MSG: '失败了，刷新网页再试试.',

  UPDATE_PRICE_PROMPT: '请输入您希望的卡的价格(单位为ETH)：',
  UPDATE_PRICE_CONFRIM: '请确认是否要修改卡的价格为：{priceInEth} ETH ？',
  UPDATE_PRICE_ERROR_MSG: '输入有误(价格必须大于0)',
  UPDATE_PRICE_SUCCESS_MSG: '提交成功，请等待矿工确认，稍后再来刷新看看吧。',
  UPDATE_PRICE_FAIL_MSG: '失败了，刷新网页再试试.',

  CHANGE_PRICE_COUNTDOWN_TIP: '{time}（{days} 天 {hours} 小时 {minutes} 分钟 {seconds}秒）后，卡的拥有者可以修改此卡价格。',

  User: '用户',
  'His Cards': 'TA的卡牌',
  BUY_BTN: '正价买入',
  PREMIUM_BUY_BTN: '溢价{rate}买入',
  BUY_PRICE_TIP: '出价越高，抢到的几率越大! 推荐使用100+gas，提高交易确认速度！',
  FAQs_CONTENT,
  PRIVACY_CONTENT,
  TERMS_CONTENT,
  BuyNow: '现在购买',
  CHANGE_PRICE_BTN: '修改价格',
  INPUT_PRICE_BTN: '手动输入价格',
  BUT_AT_INPUT_PRICE_BTN: '按输入价格购买',
};

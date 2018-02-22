const FAQs_CONTENT = require('raw-loader!./faq.html');
const PRIVACY_CONTENT = require('raw-loader!./privacy.html');
const TERMS_CONTENT = require('raw-loader!./terms.html');

module.exports = {
  CryptoMoe: 'CryptoMoe',
  'My Cards': 'My Cards',
  'Sign In': 'Sign In',
  Home: 'Home',
  FAQs: 'FAQs',
  Owner: 'Owner',
  'Current Price': 'Current Price',
  Buy: 'Buy',
  BirthdayGift: 'Birthday Tribute(HOT)',
  'Terms of Service': 'Terms',
  'Privacy Policy': 'Privacy',
  'Contact Us': 'Contact',
  Slogan: 'Slogan',
  UPDATE_SLOGAN_PROMPT: 'Please enter your slogan (Up to 100 characters):',
  UPDATE_SLOGAN_FAIL_TOO_LOOG_MSG: 'The slogan can only be 100 characters long.',
  EDIT_SLOGAN_TIP: 'After purchasing this card, you can edit the slogan.',
  BUY_SUCCESS_MSG: 'The payment is successful, please wait for the miner to confirm, refresh again later.',
  BUY_FAIL_MSG: 'Failed, refresh the page and try again.',

  UPDATE_PRICE_PROMPT: 'Please enter the price (the unit is ETH):',
  UPDATE_PRICE_CONFRIM: 'Please confirm whether to change the price to {priceInEth} ETH ?',
  UPDATE_PRICE_ERROR_MSG: 'Price must be greater than zero.',
  UPDATE_PRICE_SUCCESS_MSG: 'The submit is successful, please wait for the miner to confirm, refresh again later.',
  UPDATE_PRICE_FAIL_MSG: 'Failed, refresh the page and try again.',

  CHANGE_PRICE_COUNTDOWN_TIP: 'After {time}（{days} days {hours} hours {minutes} minutes {seconds} seconds）the owner can change price.',


  'Edit Slogan': 'Edit Slogan',
  User: 'User',
  'His Cards': 'His/Her Cards',
  BUY_BTN: 'Buy',
  PREMIUM_BUY_BTN: '{rate} Premium to buy',
  BUY_PRICE_TIP: 'The higher the bid, the greater the chance of getting it. Use 100+gas to make the transaction proved fast!',
  FAQs_CONTENT,
  PRIVACY_CONTENT,
  TERMS_CONTENT,
  BuyNow: 'Buy Now',
  CHANGE_PRICE_BTN: 'Change Price',
  INPUT_PRICE_BTN: 'Manual Input Price',
  BUT_AT_INPUT_PRICE_BTN: 'Buy at the input price',
};

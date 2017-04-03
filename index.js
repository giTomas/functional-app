import R from 'ramda';
import 'typeface-istok-web/index.css';
import './src/assets/css/reset.css';

const root = document.getElementById('root');

const trace = R.curry((tag, x) => {
  console.log(tag, x);
  return x;
});

const Impure = {

  getJson: R.curry((fn, url) => {
    fetch(url)
      .then(response => response.json())
      .then(fn)
      .catch(error => console.log(`There has been a problem with your fetch operation: ${error.message}`));
  }),

  setHtml: R.curry((sel, html) => { sel.innerHTML = html; }),

};

// const url = term => (
//   "https://api.flickr.com/services/feeds/photos_public.gne?tags=cats&format=json&nojsoncallback=?"
// );

const url = term => (
  `data/${term}.json`
);

const img = url => (
  `<img src=${url}>`
);

const mediaUrl = R.compose(R.prop('m'), R.prop('media'));

// const srcs = R.compose(R.map(mediaUrl), R.prop('items'));

const mediaToImg = R.compose(img, mediaUrl);

const images = R.compose(R.map(mediaToImg), R.prop('items'));

const renderImages = R.compose(Impure.setHtml(root), images);

const app = R.compose(Impure.getJson(renderImages), url);

app('trees');

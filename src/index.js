import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import { createMurkupList, createMurkup } from './js/templates';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  const value = e.target.value.trim();
  if (value.length < 1) reset();
  if (!value) return;
  hendlerFetchCountries(value);
}

function reset() {
  refs.list.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}

function hendlerFetchCountries(value) {
  fetchCountries(value).then(response).catch(error);
}

function response(params) {
  if (params.length > 10) overTenCountry(params);
  if (params.length <= 10 && params.length > 1) lessTenCountries(params);
  if (params.length === 1) oneCountry(params);
}

function overTenCountry(params) {
  Notify.info('Too many matches found. Please enter a more specific name.');
  reset();
}

function lessTenCountries(params) {
  refs.list.innerHTML = createMurkupList(params);
  refs.list.addEventListener('click', onItemClick);
}

function oneCountry(params) {
  refs.list.innerHTML = createMurkup(params);
}

function error() {
  Notify.failure('Oops, there is no country with that name');
  reset();
}

function onItemClick(e) {
  const listItemRefs = e.target.closes('button');
  const isIncludes = listItemRefs.tagName === 'BUTTON';

  if (!isIncludes) return;

  refs.input.value = listItemRefs.lastChild.textContent;
  hendlerFetchCountries(refs.input.value);
  refs.list.removeEventListener('click', onItemClick);
}

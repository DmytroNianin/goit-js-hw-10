function createMurkupList(params) {
  return params
    .map(({ flags: { svg }, name: { official } }) => {
      return `<li class="country-item"><button><img width="40" src="${svg}" /><p class="country-name">${official}</p></button></li> `;
    })
    .join();
}

function createMurkup(params) {
  const [
    {
      flags: { svg },
      name: { official },
      capital,
      population,
      languages,
    },
  ] = params;

  const lang = Object.values(languages).join(', ');

  return `<div class="wraper">
  <img height='24' src="${svg}" />
  <h2 class="country-name">${official}</h2>
  </div>
  <p class="desrc"><span>Capital</span>: ${capital}</p>
  <p class="desrc"><span>Population</span>: ${population}</p>
  <p class="desrc"><span>Languages</span>: ${lang}</p>`;
}

export { createMurkupList, createMurkup };

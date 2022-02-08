// Find the country with the highest population, programmatically, using the data below,
// and log the country name with the highest population

const countries = [
  { id: 1, name: 'USA' },
  { id: 2, name: 'England' },
  { id: 3, name: 'Russia' },
  { id: 4, name: 'New Zealand' },
];

const cities = [
  { id: 1, country_id: 1, name: 'New York' },
  { id: 2, country_id: 1, name: 'San Diego' },
  { id: 3, country_id: 1, name: 'Houston' },
  { id: 4, country_id: 4, name: 'Auckland' },
  { id: 5, country_id: 2, name: 'London' },
  { id: 6, country_id: 2, name: 'Manchester' },
  { id: 7, country_id: 1, name: 'Seattle' },
  { id: 8, country_id: 1, name: 'Los Angeles' },
  { id: 9, country_id: 3, name: 'Moscow' },
  { id: 10, country_id: 3, name: 'Novosibirsk' },
  { id: 11, country_id: 4, name: 'Wellington' },
];

const populations = [
  { id: 1, city_id: 1, amount: 8419000 },
  { id: 2, city_id: 9, amount: 11920000 },
  { id: 3, city_id: 10, amount: 1511000 },
  { id: 4, city_id: 7, amount: 1410000 },
  { id: 5, city_id: 5, amount: 8982000 },
  { id: 6, city_id: 2, amount: 724305 },
  { id: 7, city_id: 8, amount: 3967000 },
  { id: 8, city_id: 3, amount: 2310000 },
  { id: 9, city_id: 4, amount: 1657000 },
  { id: 10, city_id: 6, amount: 553230 },
  { id: 11, city_id: 11, amount: 212700 },
];

// naive solution
const naiveSolution = (countries, cities, populations) => {
  let maxPopulation = 0;
  let mostPopulatedCountry = '';

  for (const country of countries) {
    let currentPopulation = 0;

    for (const city of cities) {
      for (const population of populations) {
        if (population.city_id === city.id && city.country_id === country.id) {
          currentPopulation += population.amount;
        }
      }
    }
    if (currentPopulation > maxPopulation) {
      maxPopulation = currentPopulation;
      mostPopulatedCountry = country.name;
    }
  }
  return mostPopulatedCountry;
};

// console.log(solution(countries, cities, populations));

const optimizedSolution = (countries, cities, populations) => {
  // iterate through cities to directly connect country and population
  let cityCountryMapper = {};
  let mostPopulatedCountry = '';
  let maxPopulation = 0;

  for (const city of cities) {
    cityCountryMapper[city.id] = city.country_id;
  }

  for (const country of countries) {
    let currentPopulation = 0;

    for (const population of populations) {
      let currentCity = cityCountryMapper[population.city_id];
      if (currentCity === country.id) {
        currentPopulation += population.amount;
      }
    }
    if (currentPopulation > maxPopulation) {
      maxPopulation = currentPopulation;
      mostPopulatedCountry = country.name;
    }
  }
  console.log(maxPopulation);
  return mostPopulatedCountry;
};

console.log(optimizedSolution(countries, cities, populations));

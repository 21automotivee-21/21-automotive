// 21 Automotive — export inventory (Germany).
// Reference vehicles sourced for export. Prices are EUR, based on current
// German market listings. netPriceEUR is the actual export cost: for
// VAT-deductible ("Regelbesteuert") cars that's grossPriceEUR / 1.19 since
// German VAT is zero-rated on documented export; for margin-taxed
// ("Differenzbesteuert" / §25a) cars there's no VAT to strip out, so
// netPriceEUR equals grossPriceEUR.
const EXPORT_VEHICLES = [
  {
    id: 'vw-tiguan-allspace-highline',
    make: 'Volkswagen', model: 'Tiguan Allspace', trim: 'Highline 4Motion',
    year: 2018, mileageKm: 116500, powerPS: 179, fuel: 'Petrol',
    accidentFree: true, titleAvailable: true, vatStatus: 'margin',
    grossPriceEUR: 19990, netPriceEUR: 19990,
  },
  {
    id: 'mb-c250d-t-amg-line',
    make: 'Mercedes-Benz', model: 'C 250d T', trim: 'AMG Line',
    year: 2015, mileageKm: 102500, powerPS: 204, fuel: 'Diesel',
    accidentFree: false, titleAvailable: true, vatStatus: 'margin',
    grossPriceEUR: 18990, netPriceEUR: 18990,
  },
  {
    id: 'vw-golf-vii-r-line',
    make: 'Volkswagen', model: 'Golf VII', trim: 'R Line',
    year: 2013, mileageKm: 136000, powerPS: 122, fuel: 'Petrol',
    accidentFree: true, titleAvailable: true, vatStatus: 'margin',
    grossPriceEUR: 10990, netPriceEUR: 10990,
  },
  {
    id: 'bmw-118i-f20-m-sport',
    make: 'BMW', model: '118i F20', trim: 'M Sport',
    year: 2013, mileageKm: 81300, powerPS: 170, fuel: 'Petrol',
    accidentFree: true, titleAvailable: true, vatStatus: 'margin',
    grossPriceEUR: 12490, netPriceEUR: 12490,
  },
  {
    id: 'audi-q3-1-4-tfsi',
    make: 'Audi', model: 'Q3', trim: '1.4 TFSI Automatic',
    year: 2017, mileageKm: 110000, powerPS: 150, fuel: 'Petrol',
    accidentFree: true, titleAvailable: true, vatStatus: 'margin',
    grossPriceEUR: 15790, netPriceEUR: 15790,
  },
  {
    id: 'bmw-220d-m-sport-cabrio',
    make: 'BMW', model: '220d Cabrio', trim: 'M Sport',
    year: 2019, mileageKm: 112000, powerPS: 190, fuel: 'Diesel',
    accidentFree: false, titleAvailable: true, vatStatus: 'margin',
    grossPriceEUR: 20990, netPriceEUR: 20990,
  },
  {
    id: 'bmw-x1-sdrive-18d',
    make: 'BMW', model: 'X1', trim: 'sDrive 1.8d Automatic',
    year: 2016, mileageKm: 122500, powerPS: 150, fuel: 'Diesel',
    accidentFree: false, titleAvailable: true, vatStatus: 'margin',
    grossPriceEUR: 14990, netPriceEUR: 14990,
  },
  {
    id: 'smart-fortwo-brabus',
    make: 'Smart', model: 'ForTwo Coupe', trim: 'Brabus',
    year: 2017, mileageKm: 62000, powerPS: 109, fuel: 'Petrol',
    accidentFree: true, titleAvailable: true, vatStatus: 'margin',
    grossPriceEUR: 19990, netPriceEUR: 19990,
  },
  {
    id: 'seat-leon-st-fr',
    make: 'Seat', model: 'Leon ST', trim: 'FR',
    year: 2017, mileageKm: 118000, powerPS: 179, fuel: 'Petrol',
    accidentFree: false, titleAvailable: true, vatStatus: 'margin',
    grossPriceEUR: 13990, netPriceEUR: 13990,
  },
  {
    id: 'nissan-qashqai-acenta',
    make: 'Nissan', model: 'Qashqai', trim: 'Acenta',
    year: 2016, mileageKm: 104000, powerPS: 116, fuel: 'Petrol',
    accidentFree: false, titleAvailable: true, vatStatus: 'margin',
    grossPriceEUR: 8490, netPriceEUR: 8490,
  },
  {
    id: 'vw-golf-viii-variant-life',
    make: 'Volkswagen', model: 'Golf VIII Variant', trim: 'Life',
    year: 2023, mileageKm: 126800, powerPS: 116, fuel: 'Diesel',
    accidentFree: true, titleAvailable: true, vatStatus: 'deductible',
    grossPriceEUR: 14290, netPriceEUR: 12008,
  },
  {
    id: 'seat-alhambra-tsi-1-4',
    make: 'Seat', model: 'Alhambra', trim: 'TSI 1.4',
    year: 2013, mileageKm: 129500, powerPS: 150, fuel: 'Petrol',
    accidentFree: false, titleAvailable: true, vatStatus: 'margin',
    grossPriceEUR: 9990, netPriceEUR: 9990,
  },
  {
    id: 'renault-scenic-iv-bose',
    make: 'Renault', model: 'Scenic IV', trim: 'BOSE Edition',
    year: 2019, mileageKm: 79000, powerPS: 140, fuel: 'Petrol',
    accidentFree: false, titleAvailable: true, vatStatus: 'margin',
    grossPriceEUR: 12990, netPriceEUR: 12990,
  },
  {
    id: 'nissan-pulsar-tekna',
    make: 'Nissan', model: 'Pulsar', trim: 'Tekna',
    year: 2015, mileageKm: 90000, powerPS: 116, fuel: 'Petrol',
    accidentFree: false, titleAvailable: true, vatStatus: 'margin',
    grossPriceEUR: 6990, netPriceEUR: 6990,
  },
  {
    id: 'fiat-ducato-maxi-35-130',
    make: 'Fiat', model: 'Ducato Maxi', trim: '35 130 L5H2',
    year: 2018, mileageKm: 106000, powerPS: 131, fuel: 'Diesel',
    accidentFree: false, titleAvailable: true, vatStatus: 'deductible',
    grossPriceEUR: 14990, netPriceEUR: 12597,
  },
  {
    id: 'renault-megane-iv-bose',
    make: 'Renault', model: 'Megane IV', trim: 'BOSE Edition',
    year: 2016, mileageKm: 102500, powerPS: 132, fuel: 'Petrol',
    accidentFree: false, titleAvailable: true, vatStatus: 'margin',
    grossPriceEUR: 6990, netPriceEUR: 6990,
  },
  {
    id: 'bmw-118i-edition-shadowline',
    make: 'BMW', model: '118i', trim: 'Edition Shadowline',
    year: 2018, mileageKm: 161000, powerPS: 136, fuel: 'Petrol',
    accidentFree: true, titleAvailable: true, vatStatus: 'margin',
    grossPriceEUR: 10490, netPriceEUR: 10490,
  },
  {
    id: 'vw-t-roc-goal',
    make: 'Volkswagen', model: 'T-Roc', trim: 'Goal',
    year: 2025, mileageKm: 65000, powerPS: 116, fuel: 'Petrol',
    accidentFree: true, titleAvailable: true, vatStatus: 'deductible',
    grossPriceEUR: 17490, netPriceEUR: 14697,
  },
  {
    id: 'seat-alhambra-20th-anniversary',
    make: 'Seat', model: 'Alhambra', trim: '20th Anniversary',
    year: 2017, mileageKm: 147000, powerPS: 184, fuel: 'Diesel',
    accidentFree: false, titleAvailable: true, vatStatus: 'margin',
    grossPriceEUR: 17990, netPriceEUR: 17990,
  },
  {
    id: 'mazda-5-center-line',
    make: 'Mazda', model: '5', trim: 'Center-Line',
    year: 2011, mileageKm: 114900, powerPS: 144, fuel: 'Petrol',
    accidentFree: false, titleAvailable: false, vatStatus: 'margin',
    grossPriceEUR: 4990, netPriceEUR: 4990,
  },
];

function findExportVehicle(id) {
  return EXPORT_VEHICLES.find((v) => v.id === id);
}

// Also usable from Node (the chat assistant's server-side context builder).
// Harmless in the browser — module is undefined there, so this never runs.
if (typeof module !== "undefined" && module.exports) {
  module.exports = { EXPORT_VEHICLES, findExportVehicle };
}

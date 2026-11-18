import type { BodyType, Image, Inventory, LocalizedString, Vehicle } from '../schema';
import { PHOTOS } from './photos.generated';

// SAMPLE DATA for the demo. Every vehicle, price, VIN and description below is an example.
// Photos are Unsplash images of the same model, not the exact vehicle (credits in each image and on the Terms page).

const en = (s: string): LocalizedString => ({ en: s });

// Alt text names only make and model: the photos show the model, not this exact trim, colour or year.
function photos(key: string, makeModel: string): Image[] {
  const list = PHOTOS[key] ?? [];
  if (!list.length) throw new Error(`No photos for "${key}" in photos.generated.ts`);
  return list.map((p, i) => ({ ...p, alt: en(list.length > 1 ? `${makeModel}, exterior view, photo ${i + 1} of ${list.length}` : `${makeModel}, exterior view`) }));
}

type Spec = Omit<Vehicle, 'id' | 'slug' | 'photos' | 'transmission' | 'engine' | 'fuel' | 'exteriorColour' | 'interiorColour' | 'description' | 'features'> & {
  photoKey: string;
  transmission: string;
  engine: string;
  fuel: string;
  exteriorColour: string;
  interiorColour: string;
  description: string;
  features: string[];
};

const kebab = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

function vehicle(s: Spec): Vehicle {
  const { photoKey, ...rest } = s;
  return {
    ...rest,
    id: s.stockNumber.toLowerCase(),
    slug: kebab(`${s.year} ${s.make} ${s.model} ${s.trim} ${s.stockNumber}`),
    transmission: en(s.transmission),
    engine: en(s.engine),
    fuel: en(s.fuel),
    exteriorColour: en(s.exteriorColour),
    interiorColour: en(s.interiorColour),
    description: en(s.description),
    features: s.features.map(en),
    photos: photos(photoKey, `${s.make} ${s.model}`),
  };
}

const body = (b: BodyType) => b;

export const inventory = {
  meta: { id: 'inventory', updatedAt: '2026-11-17T00:00:00Z', updatedBy: 'copywriter', state: 'published', version: 1 },
  vehicles: [
    vehicle({
      photoKey: 'ford-f150', stockNumber: 'MB1001', status: 'available', featured: true,
      year: 2020, make: 'Ford', model: 'F-150', trim: 'XLT SuperCrew 4x4', body: body('truck'),
      km: 68450, price: 42995, drivetrain: '4x4', transmission: '10-speed automatic', engine: '2.7 L EcoBoost V6', fuel: 'Gasoline',
      fuelEconomy: { city: 12.8, highway: 9.8 }, exteriorColour: 'Agate Black', interiorColour: 'Black cloth', seats: 6, doors: 4,
      vin: 'SAMPLE00000001001',
      description: 'A one-owner Saskatchewan truck with the 5.5 ft box and a trailer tow package. It passed our pre-sale safety inspection, and the CARFAX Canada report is ready to read before you drive it.',
      features: ['Trailer tow package with brake controller', 'Rear-view camera', 'Apple CarPlay and Android Auto', 'Heated front seats', 'Remote start', 'Spray-in bedliner', 'Power-sliding rear window', 'Block heater'],
    }),
    vehicle({
      photoKey: 'toyota-rav4', stockNumber: 'MB1002', status: 'available', featured: true,
      year: 2019, make: 'Toyota', model: 'RAV4', trim: 'Trail AWD', body: body('suv'),
      km: 54210, price: 31995, drivetrain: 'AWD', transmission: '8-speed automatic', engine: '2.5 L 4-cylinder', fuel: 'Gasoline',
      fuelEconomy: { city: 8.4, highway: 6.5 }, exteriorColour: 'Blue Flame', interiorColour: 'Black SofTex and fabric', seats: 5, doors: 4,
      vin: 'SAMPLE00000001002',
      description: 'A practical all-wheel-drive SUV with Toyota Safety Sense and a full service record. It passed our pre-sale safety inspection and comes with its CARFAX Canada report.',
      features: ['Toyota Safety Sense (adaptive cruise, lane keeping)', 'Rear-view camera', 'Apple CarPlay', 'Heated front seats', 'Bluetooth', 'Roof rails', 'Winter tires on separate rims'],
    }),
    vehicle({
      photoKey: 'honda-civic', stockNumber: 'MB1003', status: 'available', featured: true,
      year: 2018, make: 'Honda', model: 'Civic', trim: 'LX Sedan', body: body('sedan'),
      km: 78900, price: 19995, drivetrain: 'FWD', transmission: 'CVT automatic', engine: '2.0 L 4-cylinder', fuel: 'Gasoline',
      fuelEconomy: { city: 7.7, highway: 5.9 }, exteriorColour: 'Rallye Red', interiorColour: 'Black cloth', seats: 5, doors: 4,
      vin: 'SAMPLE00000001003',
      description: 'An easy first car or commuter with low running costs. It passed our pre-sale safety inspection, and its CARFAX Canada report is available on request.',
      features: ['Heated front seats', 'Rear-view camera', 'Apple CarPlay and Android Auto', 'Bluetooth', 'Cruise control', 'Keyless entry'],
    }),
    vehicle({
      photoKey: 'hyundai-santa-fe', stockNumber: 'MB1004', status: 'available', featured: true,
      year: 2019, make: 'Hyundai', model: 'Santa Fe', trim: 'Preferred AWD', body: body('suv'),
      km: 61300, price: 26495, drivetrain: 'AWD', transmission: '8-speed automatic', engine: '2.4 L 4-cylinder', fuel: 'Gasoline',
      fuelEconomy: { city: 10.7, highway: 8.4 }, exteriorColour: 'Twilight Black', interiorColour: 'Black cloth', seats: 5, doors: 4,
      vin: 'SAMPLE00000001004',
      description: 'A comfortable compact SUV with all-wheel drive for prairie winters. It passed our pre-sale safety inspection, and the CARFAX Canada report shows no reported accidents.',
      features: ['Heated front seats', 'Heated steering wheel', 'Blind spot collision warning', 'Rear-view camera', 'Apple CarPlay and Android Auto', '7-inch touchscreen', 'Block heater'],
    }),
    vehicle({
      photoKey: 'chrysler-pacifica', stockNumber: 'MB1005', status: 'available', featured: true,
      year: 2018, make: 'Chrysler', model: 'Pacifica', trim: 'Touring-L', body: body('van'),
      km: 98700, price: 22995, drivetrain: 'FWD', transmission: '9-speed automatic', engine: '3.6 L Pentastar V6', fuel: 'Gasoline',
      fuelEconomy: { city: 12.4, highway: 8.1 }, exteriorColour: 'Billet Silver', interiorColour: 'Black leather', seats: 7, doors: 4,
      vin: 'SAMPLE00000001005',
      description: 'Seven seats with Stow ’n Go, ready for school runs and road trips. It passed our pre-sale safety inspection, and the CARFAX Canada report is ready to view.',
      features: ['Stow ’n Go seating', 'Power sliding doors and liftgate', 'Heated front seats and steering wheel', 'Rear-view camera', 'Tri-zone climate control', 'Blind spot monitoring'],
    }),
    vehicle({
      photoKey: 'kia-sportage', stockNumber: 'MB1006', status: 'available', featured: true,
      year: 2023, make: 'Kia', model: 'Sportage', trim: 'LX AWD', body: body('suv'),
      km: 38600, price: 31495, drivetrain: 'AWD', transmission: '8-speed automatic', engine: '2.5 L 4-cylinder', fuel: 'Gasoline',
      fuelEconomy: { city: 9.4, highway: 7.8 }, exteriorColour: 'Gravity Grey', interiorColour: 'Black cloth', seats: 5, doors: 4,
      vin: 'SAMPLE00000001006',
      description: 'A low-kilometre SUV with the balance of the factory warranty. It passed our pre-sale safety inspection and comes with its CARFAX Canada report.',
      features: ['Balance of factory warranty', 'Heated front seats', 'Heated steering wheel', 'Apple CarPlay and Android Auto', 'Rear-view camera', 'Forward collision avoidance'],
    }),
    vehicle({
      photoKey: 'ram-1500', stockNumber: 'MB1007', status: 'available', featured: false,
      year: 2016, make: 'Ram', model: '1500', trim: 'SLT Crew Cab 4x4', body: body('truck'),
      km: 142300, price: 24995, drivetrain: '4x4', transmission: '8-speed automatic', engine: '5.7 L HEMI V8', fuel: 'Gasoline',
      fuelEconomy: { city: 15.7, highway: 10.7 }, exteriorColour: 'Diamond Black', interiorColour: 'Black cloth', seats: 6, doors: 4,
      vin: 'SAMPLE00000001007',
      description: 'A work-ready crew cab with the HEMI V8 and a tow hitch. It passed our pre-sale safety inspection, and the CARFAX Canada report lists its service history.',
      features: ['Tow hitch and 7-pin connector', 'Remote start', 'Rear-view camera', 'Uconnect touchscreen', 'Bedliner', 'Block heater', 'Running boards'],
    }),
    vehicle({
      photoKey: 'nissan-rogue', stockNumber: 'MB1008', status: 'salePending', featured: false,
      year: 2020, make: 'Nissan', model: 'Rogue', trim: 'SV AWD', body: body('suv'),
      km: 49850, price: 25995, drivetrain: 'AWD', transmission: 'CVT automatic', engine: '2.5 L 4-cylinder', fuel: 'Gasoline',
      fuelEconomy: { city: 8.9, highway: 7.1 }, exteriorColour: 'Scarlet Ember', interiorColour: 'Charcoal cloth', seats: 5, doors: 4,
      vin: 'SAMPLE00000001008',
      description: 'A well-equipped SUV with ProPILOT Assist. It passed our pre-sale safety inspection, and its CARFAX Canada report is available on request.',
      features: ['ProPILOT Assist', 'Heated front seats', 'Remote start', 'Blind spot warning', 'Apple CarPlay and Android Auto', 'Power driver seat', 'Roof rails'],
    }),
    vehicle({
      photoKey: 'mazda-cx5', stockNumber: 'MB1009', status: 'available', featured: false,
      year: 2018, make: 'Mazda', model: 'CX-5', trim: 'GS AWD', body: body('suv'),
      km: 72400, price: 23995, drivetrain: 'AWD', transmission: '6-speed automatic', engine: '2.5 L 4-cylinder', fuel: 'Gasoline',
      fuelEconomy: { city: 9.0, highway: 7.2 }, exteriorColour: 'Soul Red Crystal', interiorColour: 'Black leatherette and cloth', seats: 5, doors: 4,
      vin: 'SAMPLE00000001009',
      description: 'A comfortable SUV that is pleasant to drive every day. It passed our pre-sale safety inspection and comes with its CARFAX Canada report.',
      features: ['Power liftgate', 'Heated front seats', 'Heated steering wheel', 'Blind spot monitoring', 'Rear-view camera', 'Dual-zone climate control'],
    }),
    vehicle({
      photoKey: 'hyundai-elantra', stockNumber: 'MB1010', status: 'available', featured: false,
      year: 2021, make: 'Hyundai', model: 'Elantra', trim: 'Preferred', body: body('sedan'),
      km: 66200, price: 20995, drivetrain: 'FWD', transmission: 'IVT automatic', engine: '2.0 L 4-cylinder', fuel: 'Gasoline',
      fuelEconomy: { city: 7.1, highway: 5.5 }, exteriorColour: 'Phantom Black', interiorColour: 'Grey cloth', seats: 5, doors: 4,
      vin: 'SAMPLE00000001010',
      description: 'A straightforward sedan for students and commuters. It passed our pre-sale safety inspection, and the CARFAX Canada report is ready to read.',
      features: ['Heated front seats', 'Heated steering wheel', 'Rear-view camera', 'Bluetooth', 'Apple CarPlay and Android Auto', 'Blind spot detection'],
    }),
  ],
} satisfies Inventory;

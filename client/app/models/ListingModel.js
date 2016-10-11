import Immutable from 'immutable';
import { Image, ResponsiveImage } from './ImageModel';
import { Profile } from './ProfileModel';

export const Distance = Immutable.Record({
  value: 0,
  unit: 'km',
});

export const Money = Immutable.Record({
  fractionalAmount: 0,
  currency: 'USD',
});


const ListingModel = Immutable.Record({
  id: 'uuid',
  title: 'Listing',
  distance: new Distance(),
  price: new Immutable.Map({
    ':money': new Money(),
    ':pricingUnit': new Immutable.Map(),
  }),
  images: new Immutable.List([new ResponsiveImage({
    '1x': new Image(),
    '2x': new Image(),
  })]),
  authorId: 'foo',
  author: new Profile(),

  // these need to be updated
  listingURL: 'https://example.com/listing/1',
});

const parseListingImages = (images) => new ResponsiveImage({
  '1x': images.square,
  '2x': images.square2x,
});

export const parse = (l) => new ListingModel({
  id: l.get(':id'),
  images: l.getIn([':attributes', ':images']).map(parseListingImages),
  authorId: l.getIn([':relationships', ':author', ':id']),
  distance: l.getIn([':attributes', ':distance']),
  price: l.getIn([':attributes', ':price']),
  title: l.getIn([':attributes', ':title']),
});

export default ListingModel;

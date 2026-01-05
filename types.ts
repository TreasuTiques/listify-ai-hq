
export enum ListingStyle {
  STANDARD = 'STANDARD',
  PREMIUM = 'PREMIUM'
}

export interface ListingFormValues {
  title: string;
  brand: string;
  condition: string;
  conditionNotes: string;
  specialFeatures: string;
  targetBuyer: string;
  price: string;
  category: string;
  listingStyle: ListingStyle;
}

export interface GeneratedListing {
  titles: string[];
  htmlDescription: string;
}

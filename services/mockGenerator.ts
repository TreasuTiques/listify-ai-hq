
import { ListingFormValues, GeneratedListing } from '../types';

/**
 * Generates a standard, search-optimized listing.
 * This is where you would typically wire an API call to Gemini.
 */
export const generateStandardListing = (values: ListingFormValues): GeneratedListing => {
  const { title, brand, condition, conditionNotes, specialFeatures, category, targetBuyer } = values;
  
  const titles = [
    `${brand} ${title} - ${condition} - ${category}`.slice(0, 80),
    `${condition} ${brand} ${title} | Tested & Ready`.slice(0, 80),
    `${title} ${brand} - Excellent for ${targetBuyer}`.slice(0, 80)
  ];

  const htmlDescription = `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 800px;">
      <b>Condition:</b><br>
      This ${brand} item is in ${condition} condition. ${conditionNotes || 'Well-maintained and ready for a new home.'}<br><br>

      <b>Features:</b><br>
      • Reliable ${brand} quality craftsmanship.<br>
      • Unique benefit: ${specialFeatures || 'Versatile design for everyday use.'}<br>
      • Perfect for any ${targetBuyer || 'discerning buyer'} looking in the ${category} category.<br><br>

      <b>Item Details:</b><br>
      This ${title} by ${brand} is a fantastic find. It has been kept in ${condition} condition and is perfect for anyone interested in ${category}. Whether you are adding to a collection or using it daily, this piece offers great value.<br><br>

      <b>Shipping:</b><br>
      We pack all items with extreme care using sturdy boxes and protective materials. Tracking is uploaded immediately after shipment. Secure delivery is our priority.<br><br>

      <b>Buy with Confidence 👍</b><br>
      We are a small, detail-oriented reselling shop focused on quality and honesty. Thank you for supporting our business!
    </div>
  `;

  return { titles, htmlDescription };
};

/**
 * Generates a premium, collector-grade listing with richer copy.
 */
export const generatePremiumListing = (values: ListingFormValues): GeneratedListing => {
  const { title, brand, condition, conditionNotes, specialFeatures, category, targetBuyer } = values;

  const titles = [
    `RARE ${brand} ${title} - Collector Quality - ${condition}`.slice(0, 80),
    `${brand} ${title} ${category} | Investment Grade | ${condition}`.slice(0, 80),
    `Authentic ${brand} ${title} - Must-Have for ${targetBuyer}s`.slice(0, 80)
  ];

  const htmlDescription = `
    <div style="font-family: 'Georgia', serif; color: #1a1a1a; line-height: 1.8; max-width: 800px; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
      <b>Description:</b><br>
      Presenting a truly exceptional example of the ${brand} ${title}. This piece represents the pinnacle of ${category} design, offering both historical significance and aesthetic beauty. A standout addition to any high-end collection.<br><br>

      <b>Micro-Lore / Fun Fact:</b><br>
      "Quality is never an accident; it is always the result of intelligent effort." — This ${brand} piece embodies that classic sentiment in every detail.<br><br>

      <b>Features:</b><br>
      • Iconic ${brand} engineering and timeless appeal.<br>
      • Distinctive attribute: ${specialFeatures || 'A rare find in this configuration.'}<br>
      • Specifically curated for the serious ${targetBuyer}.<br><br>

      <b>Condition Summary:</b><br>
      Currently held in ${condition} state. ${conditionNotes ? `Noteworthy details include: ${conditionNotes}` : 'The preservation of this item is truly remarkable, showing only minimal signs of its journey.'}<br><br>

      <b>Why You'll Love It:</b><br>
      • <b>Nostalgia & Value:</b> A significant piece that captures the essence of ${brand}'s legacy.<br>
      • <b>Upgrade Your Collection:</b> The perfect filler or centerpiece for those seeking only the best in ${category}.<br><br>

      <b>Shipping & Care:</b><br>
      Collector items deserve white-glove treatment. This will be wrapped in multiple layers of premium bubble wrap, placed in a heavy-duty double-walled box, and shipped from our smoke-free, climate-controlled facility with full insurance.<br><br>

      <b>Ready for Your Collection.</b>
    </div>
  `;

  return { titles, htmlDescription };
};

/**
 * The one money-back guarantee Rankify offers, and the only place its terms
 * are written.
 *
 * Tom, 26 Nov 2026: websites only, where the build is under $3,500, for 30
 * days after launch. Nothing else carries a guarantee: not Shopify builds,
 * not SEO, not logos, not retainers.
 *
 * Before this the site promised "100% money back" on logos and SEO and, by
 * a default nobody set, under Shopify retainers. Every mention now reads from
 * here, and the price panels only show the line while the price on screen is
 * under the limit.
 */
export const GUARANTEE_DAYS = 30;
export const GUARANTEE_UNDER = 3500;
export const GUARANTEE_UNDER_DISPLAY = "$3,500";
export const GUARANTEE_LABEL = `${GUARANTEE_DAYS}-day money-back guarantee on websites under ${GUARANTEE_UNDER_DISPLAY}`;

/** True while a build at this price (in dollars) is covered. */
export const guaranteeApplies = (price: number) => price < GUARANTEE_UNDER;

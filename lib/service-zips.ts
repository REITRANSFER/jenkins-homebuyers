// Jenkins Homebuyers service-area ZIP gate.
// The form only accepts addresses whose ZIP is in this list (Middle Tennessee:
// Davidson, Rutherford, Sumner, Wilson, Williamson, Maury, Montgomery, Cheatham,
// Dickson, Robertson, plus the Clarksville / Fort Campbell border ZIPs).
// Mirrors the Meta ad targeting. Update both together if the service area changes.

export const ALLOWED_ZIPS: ReadonlySet<string> = new Set([
  "37010", "37011", "37012", "37013", "37014", "37015", "37016", "37020", "37022", "37024", "37025", "37027",
  "37029", "37031", "37032", "37035", "37036", "37037", "37040", "37041", "37042", "37043", "37044", "37046",
  "37048", "37049", "37050", "37051", "37052", "37055", "37056", "37060", "37062", "37063", "37064", "37065",
  "37066", "37067", "37068", "37069", "37070", "37071", "37072", "37073", "37075", "37076", "37077", "37079",
  "37080", "37082", "37085", "37086", "37087", "37088", "37089", "37090", "37115", "37116", "37118", "37119",
  "37121", "37122", "37127", "37128", "37129", "37130", "37131", "37132", "37133", "37135", "37136", "37138",
  "37141", "37142", "37143", "37146", "37148", "37149", "37152", "37153", "37165", "37167", "37171", "37172",
  "37174", "37179", "37181", "37184", "37186", "37187", "37188", "37189", "37191", "37201", "37202", "37203",
  "37204", "37205", "37206", "37207", "37208", "37209", "37210", "37211", "37212", "37213", "37214", "37215",
  "37216", "37217", "37218", "37219", "37220", "37221", "37222", "37224", "37227", "37228", "37229", "37230",
  "37232", "37234", "37235", "37236", "37237", "37238", "37240", "37241", "37242", "37243", "37244", "37245",
  "37246", "37247", "37248", "37249", "37250", "38401", "38402", "38451", "38461", "38474", "38476", "38482",
  "38487", "42223", "42254",
])

// Fallback only used when Google returns no postal_code for a selected address.
// Base county names, lowercased, no "County" suffix.
export const ALLOWED_COUNTIES: ReadonlySet<string> = new Set([
  "davidson", "rutherford", "sumner", "wilson", "williamson",
  "maury", "montgomery", "cheatham", "dickson", "robertson",
])

// Returns true if the address is inside the Jenkins service area.
// Primary check is the ZIP allowlist. If no ZIP is available (rare), we fall
// back to the county allowlist so a Google data gap doesn't block a real owner.
export function isAddressInServiceArea(zip?: string, county?: string): boolean {
  if (zip && /^\d{5}$/.test(zip)) return ALLOWED_ZIPS.has(zip)
  if (county) {
    const base = county.toLowerCase().replace(/\s+county$/, "").trim()
    return ALLOWED_COUNTIES.has(base)
  }
  // No ZIP and no county returned: don't hard-block on missing data.
  return true
}

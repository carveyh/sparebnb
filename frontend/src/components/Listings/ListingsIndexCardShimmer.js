import "./ListingsIndexCardShimmer.css"

/**
 * CSS: LICS = ListingsIndexCardShimmer
 */
export default function ListingsIndexCardShimmer () {
 return (
  <div className="LICS grid-item">
    <div className="listings-photo-container">
      <div className="LICS-photo"></div>
    </div>
    <div className="listings-text-container">
      <div className="LICS-text-top-row listings-card-top-row"></div>
      <p className="LICS-text-distance"></p>
      <p className="LICS-text-dates"></p>
      <div className="LICS-text-price listings-index-price-para"></div>
    </div>
  </div>
 )
}
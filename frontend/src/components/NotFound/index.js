import "./NotFound.css";
import { useLocation } from "react-router-dom";
import useIsListingsShowPage from "../../hooks/useIsListingsShowPage";

export default function NotFoundPage () {
  console.log()
  return (
    <section className={`not-found-container ${useIsListingsShowPage() ? 'narrow-not-found' : ''}`}>
      <div className="not-found-inner">
        <div className="lost-page-text-container">
          <h1>Oops!</h1>
          <p>Seems we got a bit lost.
          Let's go <a className="lost-home-button" href='/'>home</a>, shall we?</p>
        </div>
        <div className="lost-page-image-container">
          <img className="lost-page-image" src={require(`../../images/freepik-lost.jpg`)}/>
        </div>
      </div>
    </section>
  )
}
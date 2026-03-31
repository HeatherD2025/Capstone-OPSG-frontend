import CardsGrid from "./CardsGrid";
import InfoCard from "./InfoCard";
import HomeInfoCard from "./HomeInfoCard";
import "../../styles/ourServices.css";

function ServiceSection({ title, description, cards }) {


  const isOnHome = location.pathname === "" || location.pathname === "/";
  // check page for cardcomponent conditional rendering?

    return (
        <div className="services-section">

            <h2 className="services-section-title">
                {title}
            </h2>

            {description && (
              <p className="card-description">
                {description}
              </p>
            )}

        {isOnHome ? (

            <CardsGrid 
              cards={cards}
              CardComponent={HomeInfoCard}
            />
          ) : (
            <CardsGrid 
              cards={cards}
              CardComponent={InfoCard}
            />
          )}
              
        </div>
    )
}

export default ServiceSection;
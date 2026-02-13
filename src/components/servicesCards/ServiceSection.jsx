import CardsGrid from "./CardsGrid";
import InfoCard from "./InfoCard";
import "../../styles/ourServices.css";

function ServiceSection({ title, description, cards }) {

    return (
        <div className="services-section">

            <p className="card-header">
                {title}
            </p>

            {description && (
              <p className="card-description">
                {description}
              </p>
            )}

            <CardsGrid 
              cards={cards}
              CardComponent={InfoCard}
            />

        </div>
    )
}

export default ServiceSection;
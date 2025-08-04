import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
  );
   // Fonction pure : juste changer l'index
  const nextCard = () => {
    setIndex((prev) =>
      prev < byDateDesc.length - 1 ? prev + 1 : 0
    );
  };
  // Appelle nextCard toutes les 5s proprement
  useEffect(() => {
    const timer = setTimeout(() => {
      nextCard();
    }, 5000);
    return () => clearTimeout(timer);
  });

return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div
          key={event.title}
          className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}
        >
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}

      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc?.map((event) => (
            <input
              key={event.title}
              type="radio"
              name="radio-button"
              checked={index === byDateDesc.findIndex(e => e.title === event.title)}
              onChange={() => setIndex(byDateDesc.findIndex(e => e.title === event.title))}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;

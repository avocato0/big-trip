export const createMenuInfo = (title, dates, cost) => `
<section class="trip-main__trip-info  trip-info">
   <div class="trip-info__main">
     <h1 class="trip-info__title">${title}</h1>
     <p class="trip-info__dates">${dates}</p>
   </div>
   <p class="trip-info__cost">
     Total: €&nbsp;<span class="trip-info__cost-value">${cost}</span>
   </p>
  </section>
`;
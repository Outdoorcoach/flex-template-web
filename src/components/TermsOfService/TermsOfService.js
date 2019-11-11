import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './TermsOfService.css';

const TermsOfService = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  // prettier-ignore
  return (
    <div className={classes}>
      <p className={css.lastUpdated}>Senast uppdaterad: 11 November 2019</p>

      <p>
      Dessa allmänna villkor reglerar användandet av Outdoorcoach online-plattform. Villkoren gäller för personer som köper tjänster på plattformen och av personer som erbjuder tjänster på plattformen. Vi rekommenderar att du läser igenom dessa villkor noggrant så att du känner till dina rättigheter och skyldigheter. Härefter kommer Outdoorcoach Nordic AB refereras till som ”Outdoorcoach”, "Plattformen", "oss" eller "vi".
      </p>

      <h2>Definitioner</h2>
      <ul className={css.noStyle}>
          <li><em>Användare</em> - En person som har registrerat ett användarkonto på Plattformen</li>
          <li><em>Coach</em> - En användare som ingått tränaravtal med Outdoorcoach och har rätt att erbjuda tjänster på plattformen </li>
          <li><em>Annons</em> - En tjänst som erbjuds på plattformen</li>
          <li><em>Bokning</em> - Ett köp av tjänst som är knuten till en specifik tid annons och som innefattar en avtalad start och sluttid</li>
          <li><em>Förfrågan</em> - En förfrågan om bokning av annons som görs av en användare</li>
          <li><em>Köpare</em> - Benämningen för en användare som köper en tjänst på plattformen</li>
          <li><em>Säljare</em> - Benämningen för en användare som erbjuder en köpt/bokad tjänst</li>
      </ul>

      <h2>Registrering av användarkonto</h2>
      <p>
      För att kunna använda tjänsten måste du registrera dig som en användare och skapa en användarprofil.
      <br /><br />
      Du måste vara 18 år eller äldre för att använda plattformen
      <br /><br />
      Du intygar att informationen i din profil är korrekt. Du som användare är ensam ansvarig för att den information du uppger är korrekt och fullständig och att du ansvarar för alla konsekvenser av felaktig, ofullständig eller inkorrekt information i din profil. 
      <br /><br />
      Den information som du uppger under registreringsprocessen kommer att behandlas i enlighet med vår personuppgiftspolicy.
      <br /><br />
      Du har inte rätt att registrera dig som en användare mer än en (1) gång vid något tillfälle.  
      <br /><br />
      Du är ensam ansvarig för att inte uppge ditt användarnamn och/eller lösenord till tredje part eller ge utomstående parter åtkomst till din profil på något sätt. Du är därför själv ansvarig för all användning av plattformen med hjälp av ditt användarnamn och lösenord. Outdoorcoach är berättigat att anta att du är den person som faktiskt loggar in med ditt användarnamn och lösenord. Du måste informera Outdoorcoach så snart som möjligt om du har något skäl att misstänka att ett användarnamn eller lösenord har kommit till känna för eventuella icke auktoriserade parter. Du har även skyldighet att vidta effektiva åtgärder, såsom ändring av lösenordet.
      <br /><br />
      Outdoorcoach har befogenhet att när som helst stänga av eller ta bort ett användarkonto, såsom, i de fall då Outdoorcoach får in klagomål om användaren i fråga från andra användare.

      </p>

      <h2>Köpvillkor</h2>
      
      <p>
        Med köp avses en beställning av en erbjuden tjänst på plattformen.
      </p>
      <h3>Allmänt</h3>
      <p>
      Innan du kan genomföra köp på plattformen behöver du fylla i kontaktuppgifter på ditt användarkonto
      <br /><br />
      Köpvillkoren i detta avtal blir automatiskt gällande när du som kund beställer en tjänst på plattformen. Du går då med på samtliga avtalsvillkor som relaterar till köpet samt de generella användarvillkor som relaterar till din användning av Plattformen som finns föreskrivna i detta dokument
      <br /><br />
      För att köpa en tjänst av Outdoorcoach väljer du via plattformen en tillgänglig annons och skickar en förfrågan till annonsens ägare(Coach). I samband med förfrågan fyller du i uppgifter om betalmedel så att vi kan debitera dig för den bokade tjänsten
      <br /><br />
      kostnaden för en annons anges i kronor och anger pris per timme inklusive moms

      </p>
      <h4>Villkor för köpare</h4>
      <ul>
        <li>En bekräftad bokning kan avbokas av dig som köpare fram till 24 timmar innan den bokade annonsens starttid med med pengarna tillbaka.</li>
        <li>Avbokningar av tjänster som sker senare än 24 timmar innan bokningens starttid återbetalas ej. Tvister hänvisas till bokning@outdoorcoach.se</li>
        <li>Om du som köpare inte dyker upp till en betalad bokning och inte heller har meddelat din frånvaro i förväg förbehåller sig Outdoorcoach rätten att debitera hela avgiften för bokningen. Om din frånvaro beror på en händelse utanför din kontroll till exempel en olycka eller plötslig sjukdom (“force majeure”) kommer du dock inte att debiteras.</li>
        <li>Om en säljare inte dyker upp till en avtalad bokning utan att ha avbokat eller lämnat ett meddelande kommer du som köpare att erbjudas en ny tjänst av motsvarande kvalité och innehåll som du inte behöver erlägga någon extra betalning för även om tjänsten skulle tillhöra en högre priskategori</li>
        <li>Skulle säljare avboka en bokad tjänst senare än 24 timmar innan bokningens avtalade starttid kommer vi att försöka erbjuda dig ett motsvarande pass med annan coach till samma pris som det avbokade passet. Om inget sådant pass finns tillgängligt har du som köpare rätt att få pengarna tillbaka. Om en säljare dyker upp sent har du som köpare rätt att få en procentuell nedsättning av priset som motsvarar den uteblivna tiden i procent i förhållande till passets totala längd.</li>
        <li>Om bokningen väsentligen inte motsvarar den kvalité och det innehåll som utlovats i annonsen har du som köpare rätt till ett nytt pass utan extra kostnad.</li>
        <li>Tvister och meningsskiljaktigheter mellan dig som användare och oss på Outdoorcoach hanteras alltid av administrativ personal på Outdoorcoach, aldrig direkt med tränaren. Du som kund har ett avtal med Outdoorcoach, och inte med tränaren. Även om du har kontakt med tränaren och utarbetar avtalets detaljer med tränaren så sker bokningen av passet hos Outdoorcoach, och det är vi som är skyldiga att leverera det som har utlovats via plattformen. Klagomål och kundtjänstärenden samt rättsliga krav ska därför alltid riktas till Outdoorcoach Nordic AB, adress x telefonnummer x mejl x. Allmänna användarvillkor </li>
        <li>Du ansvarar själv för din egen hälsa och för att du klarar av att fysiskt genomföra det pass du bokat. Outdoorcoach förbehåller sig skadeståndsskyldighet på grund av medicinska risker som inte beror på allvarlig försummelse som kan hänföras till en tränares handlande eller brist på handlande.</li>
      </ul>
      <h4>Villkor för säljare</h4>
      <ul>
        <li>
          Du förbinder sig att bekräfta en bokning inom 24 timmar från det att en förfrågan om bokning av tjänst mottagits.
        </li>
        <li>Om du som säljare inte dyker upp till en avtalad bokning och inte heller har meddelat din frånvaro i förväg erhåller du en varning. 
          Om din frånvaro beror på en händelse utanför din kontroll till exempel en olycka eller plötslig sjukdom (“force majeure”) erhålls ingen varning</li>
      </ul>
      
    </div>
  );
};

TermsOfService.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

TermsOfService.propTypes = {
  rootClassName: string,
  className: string,
};

export default TermsOfService;

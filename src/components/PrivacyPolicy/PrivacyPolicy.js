import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './PrivacyPolicy.css';

const PrivacyPolicy = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  // prettier-ignore
  return (
    <div className={classes}>
      <p className={css.lastUpdated}>Last updated: October 30, 2017</p>

      <p>
      Denna policy blir gällande i samband med att du registrerar personuppgifter hos oss. 
      Policyn beskriver hur dina personuppgifter används och syftet med användningen. 
      Policyn följer av EU:s Dataskyddsförordning (GDPR) och beskriver även vilka rättigheter du som personuppgiftsinnehavare har. 
      Policyn gäller vid all vår administrering av dina personuppgifter. 
      <br /><br />
      Genom att godkänna våra allmänna avtalsvillkor och köpvillkor godkänner du även denna personuppgiftspolicy. 
      Personuppgiftspolicyn gäller även de som är tränare och står i avtalsförhållande med Outdoor Coach. 

      En personuppgift är information som går att hänföra till en viss individ där individen kan identifieras genom uppgifterna, direkt eller indirekt. 
      I princip kan alltså all typ av information som går att knyta till en viss person alltså räknas som en personuppgift. 
      Vanliga exempel på personuppgifter är kontaktuppgifter till en person, till exempel adress och namn. 
      <br /><br />
      Enligt lag är vårt företag skyldigt att leva upp till de krav som ställs upp av GDPR vid all behandling av personuppgifter. 
      Behandling definieras som varje process som involverar hantering av personuppgifter. 
      All vår administrering av dina uppgifter involverar alltså personuppgiftsbehandling. 

      </p>

      <h2>Ändring och radering av uppgifter</h2>
      <p>
      Du har när som helst rätt att begära att vi raderar din profil på plattformen. 
      Vi kommer dock spara dina personuppgifter för vår interna administrering och bokföring samt för att möjliggöra framtida service. 
      Vi behöver även spara dina personuppgifter för att kunna se vad som tidigare hänt inom ramen för vårt avtalsförhållande utifall att 
      någon form av tvist skulle uppstå (vår kontakthistorik). 
      Vi har inte möjlighet att tillhandahålla dig vår tjänst utan tillgång till ditt namn och dina kontaktuppgifter. 
      En förutsättning för att erhålla denna tjänst är därför att du registrerar dina personuppgifter. 
      Du har själv tillgång till ändring av dina personuppgifter genom plattformens försorg och har också rätt att begära att vi ändrar personuppgifterna åt dig. 
      </p>

      <h2>Personuppgifter vi samlar in</h2>
      <p>
      Vi samlar in personuppgifter i olika sammanhang. 
      Nedan följer en redogörelse över i vilka sammanhang vi samlar in uppgifter och vilka uppgifter vi samlar in.
      </p>

      <h3>Registrering av användarkonto</h3>
      
      <p>
        Vid registrering av ett användarkonto hos oss samlar vi in följande:
      </p>
      <ul>
          <li>Förnamn, Efternamn - används för att kunna visa din profil på plattformen samt vid kontakt</li>
          <li>Profilbeskrivning, fritext(frivillig) - för publik visning för andra användare</li>
          <li>Kontaktuppgifter: telefonnummer &amp; epostadress - för de situationer vi eller behöver kontakta dig</li>
          <li>Information om köpta tjänster från Outdoorcoach, vilket inkluderar datum för köp, pris samt meddelanden mellan involverade parter</li>
        </ul>
      <h3>Tekniska uppgifter</h3>
      <p>
        När du besöker Outdoorcoach samlar vi in följande tekniska uppgifter:
      </p>
      <ul>
        <li>IP-adress</li>
        <li>Geografisk plats baserat på IP-adressen</li>
        <li>Tidpunkter för webbplatsbesök</li>
        <li>Annan automatiskt insamlad data av till exempel webbläsaren</li>
      </ul>
      
      <h2>Erbjudanden och reklam</h2>
      <p>
      Vi använder din epostadress för att skicka ut notiser till dig. Genom att godkänna våra avtalsvillkor och detta policydokument godkänner du att Outdoorcoach plattformen får skicka dessa notiser till dig samt att vi får skicka erbjudanden och nyhetsbrev. 
Du kan när som helst begära att Outdoorcoach upphör med att skicka erbjudanden och notiser till dig, med undantag för de notiser som skickas ut i samband med köp på plattformen.
      </p>

      <h2>Kakor</h2>
      <p>
      Cookies är bitar av data som tas emot av den enhet som används för att besöka Outdoorcoach.se. 
      Outdoorcoach anv'nder kakor för att förbättra din upplevelse som användare. 
      Vi använder till exempel Kakor för att komma ihåg autentiseringsuppgifter, 
      att kunna återuppta avbrutna webbläsarsessioner samt att förhindra obehörig åtkomst till ditt användarkonto. 
      Användare kan ta bort kakor när som helst. Kakor spelar dock en viktigt roll i vår förmåga att leverera full funktionalitet i våra tjänster. 
      Borttagning av kakor kan därför begränsa vår möjlighet att leverera de tjänster som erbjuds på plattformen.
      <br /><br />
      Outdoorcoach använder sig av tredjepartskakor för olika ändamål. 
      Dels används kakor i syftet att samla in statistik om hur webbplatsen används, 
      till exempel för att identifiera vilka delar av webbplatsen som besöks oftare än andra och vilka delar som kan förbättras. 
      För de ändamålen använder vi Google Analytics. De tekniska uppgifter som samlas in i dessa syften skickas till berörda parter 
      via dessa kakor för användning i statistiska rapporter.
      </p>
    </div>
  );
};

PrivacyPolicy.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

PrivacyPolicy.propTypes = {
  rootClassName: string,
  className: string,
};

export default PrivacyPolicy;

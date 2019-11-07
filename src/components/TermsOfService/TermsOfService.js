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
      <p className={css.lastUpdated}>Last updated: November 7, 2019</p>

      <p>
      Dessa allmänna villkor reglerar användandet av Outdoorcoach online-plattform. 
      Villkoren gäller vid användande av Outdoorcoach tjänster av personer som köper tjänster på plattformen och av personer som erbjuder tjänster på plattformen.

      Vi rekommenderar att du läser igenom dessa villkor noggrant så att du känner till dina rättigheter och skyldigheter.
      Härefter kommer Outdoorcoach Nordic AB refereras till som ”Outdoorcoach”, "Plattformen", "oss" eller "vi".
      </p>

      <h2>Definitioner</h2>
      <ul className={css.noStyle}>
          <li><em>Användare</em> - En person som har registrerat ett användarkonto på Plattformen</li>
          <li><em>Coach</em> - En användare som ingått tränaravtal med Outdoorcoach och har rätt att erbjuda tjänster på plattformen </li>
          <li><em>Annons</em> - Profilbeskrivning, fritext(frivillig) - för publik visning för andra användare</li>
          <li><em>Bokning</em> - Kontaktuppgifter: telefonnummer &amp; epostadress - för de situationer vi eller behöver kontakta dig</li>
          
          <li><em>Förfrågan</em> - Information om köpta tjänster från Outdoorcoach, </li>
          <li><em>Försäkringsavtal</em> - Information om köpta tjänster från Outdoorcoach, </li>
          <li><em>Förfrågan</em> - Information om köpta tjänster från Outdoorcoach, </li>
          
      </ul>

      <h2>Registrering av användarkonto</h2>
      <p>
      När du bokar ett pass på Outdoorcoachs plattform kommer du behöva fylla i 
      personuppgifter och registrera dig som kund. 
      
      Personuppgifterna består i ditt namn och kontaktuppgifter så som mejl, telefonnummer och/eller gatuadress samt betalningsmedel. 
      Du samtycker genom registreringen av ditt användarkonto till att vi sparar dessa uppgifter i syfte att uppfylla vår avtalsenliga prestation, det vill säga
tillhandahålla dig ditt träningspass och debitera avgiften för passet. Personuppgifterna
kommer endast att användas för att möjliggöra att dina bokade pass förses dig och för
att underlätta framtida bokningar genom att du får tillgång till en egen profil på
plattformen där du kan spara dina personuppgifter. Du har när som helst rätt att
begära att vi raderar din profil. Vi kommer dock spara dina personuppgifter för vår
interna administrering för att möjliggöra framtida service samt eventuella framtida
rättsliga tvister som relaterar till vårt avtalsförhållande. Vi har inte möjlighet att
tillhandahålla dig vår tjänst utan tillgång till ditt namn och dina kontaktuppgifter. Du
har själv tillgång till ändring av dina personuppgifter genom plattformens försorg och
har också rätt att begära att vi ändrar personuppgifterna åt dig. Vi kommer inte att
överföra personuppgifterna till tredje part eller använda dina personuppgifter för att
kontakta dig med erbjudanden. Du har möjlighet att särskilt godkänna att vi kontaktar
dig med rabatter och erbjudanden. Din profil kommer även att innehålla en
betygsskala och ett betyg som finns synligt för plattformens personliga tränare och för
administratörer av plattformen. Betygets syfte är att säkerställa att du dykt upp i tid
och inte medvetet orsakat någon incident eller skada i samband med passet. På så sätt
säkerställs även den personliga tränarens trygghet. Omvänt har du som kund
möjlighet att betygsätta din tränare. Det betyg du väljer att publicera kommer att
finnas öppet synligt på plattformen. Det är frivilligt att betygsätta en tränare.
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

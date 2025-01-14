/**
 * Export reducers from ducks modules of different containers (i.e. default export)
 * We are following Ducks module proposition:
 * https://github.com/erikras/ducks-modular-redux
 */
import AboutPage from './AboutPage/AboutPage.duck';
import CheckoutPage from './CheckoutPage/CheckoutPage.duck';
import ContactDetailsPage from './ContactDetailsPage/ContactDetailsPage.duck';
import EditListingPage from './EditListingPage/EditListingPage.duck';
import EnterprisePage from './EnterprisePage/EnterprisePage.duck';
import InboxPage from './InboxPage/InboxPage.duck';
import ListingPage from './ListingPage/ListingPage.duck';
import ManageListingsPage from './ManageListingsPage/ManageListingsPage.duck';
import PasswordChangePage from './PasswordChangePage/PasswordChangePage.duck';
import PasswordRecoveryPage from './PasswordRecoveryPage/PasswordRecoveryPage.duck';
import PasswordResetPage from './PasswordResetPage/PasswordResetPage.duck';
import PayoutPreferencesPage from './PayoutPreferencesPage/PayoutPreferencesPage.duck';
import PaymentMethodsPage from './PaymentMethodsPage/PaymentMethodsPage.duck';
import ProfilePage from './ProfilePage/ProfilePage.duck';
import ProfileSettingsPage from './ProfileSettingsPage/ProfileSettingsPage.duck';
import SearchPage from './SearchPage/SearchPage.duck';
import SportsPage from './SportsPage/SportsPage.duck';
import TransactionPage from './TransactionPage/TransactionPage.duck';



export {
  AboutPage,
  CheckoutPage,
  ContactDetailsPage,
  EditListingPage,
  EnterprisePage,
  InboxPage,
  ListingPage,
  ManageListingsPage,
  PasswordChangePage,
  PasswordRecoveryPage,
  PasswordResetPage,
  PayoutPreferencesPage,
  PaymentMethodsPage,
  ProfilePage,
  ProfileSettingsPage,
  SearchPage,
  SportsPage,
  TransactionPage,
};

import moment from 'moment';

moment.locale('fr');

// retourne un array des 3 derniers mois (en lettre FR) (mois en court compris)
export const getLastThreeMonthNames = () => {
  return [2, 1, 0].map(
    delta => moment().subtract(delta, 'months').format('MMMM')
  );
};

export const isValidDateOrReturnDefault = (date, formatDate) => {
  // const DEFAULT_DATE = '01/01/1900';
  return moment(date, formatDate).isValid()
    ? moment(date, formatDate)
    : null; // moment(DEFAULT_DATE, formatDate);
};

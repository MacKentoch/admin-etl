import moment from 'moment';
import { appConfig }  from '../../config';

moment.locale('fr');

export const cleanAspDotNetStringDate = (stringDate) => {
  const formatDate = appConfig.formatDate.defaut;

  if (stringDate) {
    const results = /Date\(([^)]+)\)/.exec(stringDate);
    const dt      = new Date(parseFloat(results[1]));
    return moment(dt).format(formatDate);
  }
  return null;
};

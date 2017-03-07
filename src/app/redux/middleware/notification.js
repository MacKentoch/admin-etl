/* eslint no-console:0 */

/**
 * any action containing
 * {
 *  notification: {
 *    message
 *    level (one of ['info', 'error', 'success'])
 *  }
 * }
 *
 * will dispatch a notification thanks to this middleware
 */

export const levels = [
  'info',
  'error',
  'success'
];

const FALLBACK_LEVEL = 'info';

const notificationMidleware = store => next => action => {
  if (!action.notification) {
    return next(action);
  }
  if (!action.notification.message) {
    console.warn('notification middleware payload needs a "message" property');
    return next(action);
  }
  if (!action.notification.level) {
    console.warn('notification middleware payload needs a "level" property');
    return next(action);
  }

  if (action.type === 'ADD_NOTIFICATION_MESSAGE') {
    // avoid infinite loop  
    return next(action);
  }

  const { message, level } = action.notification;

  store.dispatch({
    type: 'ADD_NOTIFICATION_MESSAGE',
    notification: {
      message,
      level: levels.some(lvl => lvl === level) ? level : FALLBACK_LEVEL
    }
  });

  return next(action);
};

export default notificationMidleware;

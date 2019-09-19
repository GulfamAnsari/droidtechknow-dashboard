import Notiflix from "notiflix-react";

Notiflix.Loading.Init({
  className: 'notiflix-loading',
  zindex: 4000,
  backgroundColor: 'rgba(3,23,6,0.8)',
  rtl: false,
  useGoogleFont: true,
  fontFamily: 'heebo',
  cssAnimation: true,
  cssAnimationDuration: 400,
  clickToClose: false,
  customSvgUrl: null,
  svgSize: '100px',
  svgColor: '#9c27b0',
  messageID: 'NotiflixLoadingMessage',
  messageFontSize: '16px',
  messageMaxLength: 100,
  messageColor: '#dcdcdc',
});

//Notiflix Notify - All Options
Notiflix.Notify.Init({
  width: '280px',
  position: 'right-top',
  distance: '10px', opacity: 1,
  borderRadius: '5px',
  rtl: false, timeout: 5000, messageMaxLength: 110, backOverlay: false,
  backOverlayColor: 'rgba(0,0,0,0.5)', ID: 'NotiflixNotify',
  className: 'notiflix-notify', zindex: 4001,
  useGoogleFont: true, fontFamily: 'Quicksand', fontSize: '13px',
  cssAnimation: true, cssAnimationDuration: 400, cssAnimationStyle: 'fade',
  closeButton: false, useIcon: true, useFontAwesome: false, fontAwesomeIconStyle: 'basic',
  fontAwesomeIconSize: '34px', plainText: true, // New Option: v1.3.0 and the next versions - (v1.0.0 and the next versions for React)
  showOnlyTheLastOne: false, // New Option: v1.8.0 and the next version

  ssuccess: { background: '#00b462', textColor: '#fff', childClassName: 'success', notiflixIconColor: 'rgba(0,0,0,0.2)', fontAwesomeClassName: 'fas fa-check-circle', fontAwesomeIconColor: 'rgba(0,0,0,0.2)', },
  failure: { background: '#f44336', textColor: '#fff', childClassName: 'failure', notiflixIconColor: 'rgba(0,0,0,0.2)', fontAwesomeClassName: 'fas fa-times-circle', fontAwesomeIconColor: 'rgba(0,0,0,0.2)', },
  warning: { background: '#f2bd1d', textColor: '#fff', childClassName: 'warning', notiflixIconColor: 'rgba(0,0,0,0.2)', fontAwesomeClassName: 'fas fa-exclamation-circle', fontAwesomeIconColor: 'rgba(0,0,0,0.2)', },
  info: { background: '#00bcd4', textColor: '#fff', childClassName: 'info', notiflixIconColor: 'rgba(0,0,0,0.2)', fontAwesomeClassName: 'fas fa-info-circle', fontAwesomeIconColor: 'rgba(0,0,0,0.2)', },
});

export const loading = (message) => {
  Notiflix.Loading.Hourglass(message);
}

export const remove = (time) => {
  Notiflix.Loading.Remove(time)
}

export const notify = (type, message) => {
  switch (type) {
    case 'Success':
      Notiflix.Notify.Success(message)
      break;
    case 'Failure':
      Notiflix.Notify.Failure(message);
      break;
    case 'Warning':
      Notiflix.Notify.Warning(message);
      break;
    case 'Info':
      Notiflix.Notify.Info(message);
      break;
    default:
      break;
  }
}

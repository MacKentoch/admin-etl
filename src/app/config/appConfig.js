export const appConfig = {
  // --------------------------------
  // ENV configs
  // --------------------------------
  // dev mode to mock async data for instance
  DEV_MODE: true,
  // When you need some kind "console spam" to debug
  DEBUG_ENABLED: true,
  // fake delay to mock async
  FAKE_ASYNC_DELAY: 1000,

  // --------------------------------
  // APP UI config
  // --------------------------------
  APP_NAME: 'admin-ETL',

  formatDate: {
    defaut: 'DD/MM/YYYY-HH:mm:ss'
  },

  // --------------------------------
  // API configs
  // --------------------------------
  // user info (login, name etc...)
  userInfos: {
    data: {
      API: 'api/userInfos'
    }
  },
  // CONFIG_INTERFACE table content
  interfaces: {
    data: {
      API: 'api/interfaces'
    }
  },
  // a specific interface
  interface: {
    data: {
      API: 'api/interface'
    }
  },
  // distinct value for interfaces types (like (ELEIG, MIGRATION ...)
  interfaceTypes:{
    data: {
      API: 'api/interferfacesTypes'
    }
  },
  // distinct value for interfaces directions (like (IN, OUT ...)
  interfaceDirections:{
    data: {
      API: 'api/interferfacesDirections'
    }
  },
  // distinct value for interfaces formats (like (table, csv ...)
  interfaceFormats:{
    data: {
      API: 'api/interferfacesFormats'
    }
  },
  // distinct value for column modifiers (like (UPPER, DATE_FROMAT ...)
  columnModFct:{
    data: {
      API: 'api/columnModFct'
    }
  },
  // all datasets (or table) of an interface
  interfaceDatasets: {
    data: {
      API: 'api/interfaceDatasets'
    }
  },
  // all columns of an interface datasets
  interfaceDatasetColumnDescription: {
    data: {
      API: 'api/interferfacesDatasetColumnDesc'
    }
  },
  // all column modifiers of an interface datasets column
  interfaceDatasetColumnModifiers: {
    data: {
      API: 'api/interferfacesDatasetColumnMod'
    }
  },

  // stats config
  stats: {
    // pas de donnee de legende ou initialState
    legendeInit: [{
      label: 'légende non disponible',
      color: '#ECECEC'
    }],
    labelNonDef: 'non défini',
    colorNonDef: '#ECECEC'
  },

  HELLO_WORD: 'Bonjour',

  // --------------------------------
  // UPLOAD config helpers
  // --------------------------------
  fileMimeTypes: [
    // txt:
    'txt',
    'text/plain',
    // zip:
    'zip',
    'application/x-compressed',
    'application/x-zip-compressed',
    'application/zip',
    'multipart/x-zip',
    // rar
    'rar',
    // 7zip:
    '7zip',
    // pdf:
    'pdf',
    'application/pdf',
    // doc:
    'doc',
    'application/msword',
    'docx',
    // excel:
    'xls',
    'application/excel',
    'application/vnd.ms-excel',
    'application/x-excel',
    'application/x-msexcel',
    'xlsx',
    // csv:
    'csv',
    // images:
    'png',
    'image/png',
    'jpg',
    'jpeg',
    'image/jpeg',
    'image/pjpeg',
    'bmp',
    'image/bmp',
    'image/x-windows-bmp'
  ]
};

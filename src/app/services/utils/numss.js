export const numss15regex = /[12][ \.\-]?[0-9]{2}[ \.\-]?(0[1-9]|[1][0-2])[ \.\-]?([0-9]{2}|2A|2B)[ \.\-]?[0-9]{3}[ \.\-]?[0-9]{3}[ \.\-]?[0-9]{2}/;
export const numss15pattern = '[12][ \.\-]?[0-9]{2}[ \.\-]?(0[1-9]|[1][0-2])[ \.\-]?([0-9]{2}|2A|2B)[ \.\-]?[0-9]{3}[ \.\-]?[0-9]{3}[ \.\-]?[0-9]{2}';


export const isValidNumss = (numss) => {
  return numss15regex.test(numss);
};

export const numSecuFormat = (numss) => {
  if (numss) {
    const numssNoSpace = numss.trim();
    // extract numss sub values:
    const sexe = numssNoSpace.slice(0, 1);
    const anneeDateNaissance = numssNoSpace.slice(1, 3);
    const moisDateNaissance = numssNoSpace.slice(3, 5);
    const lieuNaissanceMetropole = numssNoSpace.slice(5, 10);
    const numOrdreNaissance = numssNoSpace.slice(10, 13);
    const codeNIR = numssNoSpace.length === 15
      ? numssNoSpace.slice(13, 15)
      : null;

    if (
        isValidNumSSSexe(sexe) &&
        isValidNumSSAnneeNaissance(anneeDateNaissance) &&
        isValidMoisNaissance(moisDateNaissance) &&
        (
            isValidDepartementNaissanceCasA(lieuNaissanceMetropole)  ||
            isValidDepartementNaissanceCasB(lieuNaissanceMetropole)   ||
            isValidDepartementNaissanceCasC(lieuNaissanceMetropole)
        ) &&
        isNumOrdreNaissance(numOrdreNaissance)
      ) {
      let validNIR = codeNIR;
      if (!codeNIR) {
        const cleanCorseCode = numssNoSpace.replace(/2A/, '19').replace(/2B/, '18');
        validNIR = processNIR(cleanCorseCode);
      }
    }
  }
};

function isValidNumSSSexe(char) {
  switch (char) {
  case '1':
    return true;
  case '2':
  case '3':
  case '4':
    return true;
  default:
    return false;
  }
}

function isValidNumSSAnneeNaissance(str) {
  if (!str) {
    return false;
  }
  const firstDigitYearBirth = parseInt(str.slice(0, 1), 10);
  const secondDigitYearBirth = parseInt(str.slice(1, 2), 10);

  if (firstDigitYearBirth && secondDigitYearBirth) {
    return isBetweenZeroAndNine(firstDigitYearBirth) && isBetweenZeroAndNine(secondDigitYearBirth)
      ? true
      : false;
  }

  return false;
}

function isBetweenZeroAndNine(num) {
  if (!num) {
    return false;
  }
  return (num >= 0 && num <= 9)
    ? true
    : false;
}

function isValidMoisNaissance(str) {
  if (!str) {
    return false;
  }

  switch (str) {
  case '01':
  case '02':
  case '03':
  case '04':
  case '05':
  case '06':
  case '07':
  case '08':
  case '09':
  case '10':
  case '11':
  case '12':
  case '62':
  case '63':
    return true;
  default:
    return false;
  }
}

function isValidDepartementNaissanceCasA(code) {
  if (!code) {
    return false;
  }

  const departementNaissance = parseInt(code.slice(0, 2), 10);
  const codeOfficielCommuneNaissance = parseInt(code.slice(2, 3), 10);
  if (
      ((departementNaissance <= 1 && departementNaissance >= 99) ||
        code === '2A' ||
        code === '2B')
      &&
      (codeOfficielCommuneNaissance >= 1 && codeOfficielCommuneNaissance <= 990)
    ) {
    return true;
  } else {
    return false;
  }
}

function isValidDepartementNaissanceCasB(code) {
  if (!code) {
    return false;
  }

  const departementNaissanceOutreMer = parseInt(code.slice(0, 3), 10);
  const codeOfficielCommuneNaissance = parseInt(code.slice(2, 2), 10);

  if (
      (departementNaissanceOutreMer <= 970 && departementNaissanceOutreMer >= 989)
      &&
      (codeOfficielCommuneNaissance >= 1 && codeOfficielCommuneNaissance <= 90)
    ) {
    return true;
  } else {
    return false;
  }
}

function isValidDepartementNaissanceCasC(code) {
  if (!code) {
    return false;
  }

  const naissanceHorsFrance = parseInt(code.slice(0, 2), 10);
  const identifiantPaysNaissance = parseInt(code.slice(2, 3), 10);

  if (
      (naissanceHorsFrance === 99)
      &&
      (identifiantPaysNaissance >= 1 && identifiantPaysNaissance <= 990)
    ) {
    return true;
  } else {
    return false;
  }
}

function isNumOrdreNaissance(num) {
  if (!num) {
    return false;
  }

  if (parseInt(num, 10) >= 1 && parseInt(num, 10) <= 999) {
    return true;
  } else {
    return false;
  }
}

function processNIR(numss) {
  return 97 - (parseInt(numss, 10) % 97);
}

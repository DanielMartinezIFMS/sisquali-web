/* eslint-disable no-multi-spaces */
const CrFNVALIDATOR = 0;

const CrREQUIRED = 1;

const CrMAX = 2;
const CrMIN = 3;
const CrLENGHT = 4;
const CrMinLENGHT = 5;

const CrPAST = 6;
const CrFUTURE = 7;

const CrBETWIN = 8;
const CrEQUAL = 9;
const CrNOTEQUAL = 10;

/**
 * Serviço de validação de dados.
 *
 * Sintaxe:
 *
 * CONF:array = [ INPUT_VALIDATION, INPUT_VALIDATION ...]
 *
 * INPUT_VALIDATION:object = {ref: <referencia ao input>,
 *                     val: [<VALIDATOR_LIST>]}
 *
 * VALIDATOR_LIST:array|string = < const validator > | [VALIDATOR,VALIDATOR...]
 *
 * VALIDATOR: array = [<const validator>, arg | [<arg, arg ...>],<message>]
 *
 * Exemplo:
 *
 * let conf =
 * [ {ref: 'referencia',
 *    val: [
 *          CrREQUIRED,
 *          [CrMax,10,'O valor não pode ser maior que 10'],
 *          [CrBETWIN,[2,10],'O valor deve estar entre 2 e 10'],
 *         ]
 *   },
 *   {ref: 'referencia2', val: CrREQUIRED}
 * ]
 */
class CrValidator {
  constructor (conf) {
    this.conf = conf;
    this.focus = undefined;
  }

  /**
   * Realiza a validação conforme argumento "conf".
   */
  validate (refs) {
    this.focus = undefined;
    this.hasError = false;
    this.conf.map(i => {
      if (typeof i.val === 'number') {
        this._validate(refs[i.ref], i.ref, [i.val]);
      } else if (typeof i.val === 'object') {
        this._validate(refs[i.ref], i.ref, i.val);
      }
    });
    if (this.focus) {
      this.focus.focus();
    }
    return !this.hasError;
  }

  _validate (i, r, v) {
    let args, message, label;
    label = i.$attrs['label'] || r;
    v.map(vl => {
      if (typeof vl !== 'number') {
        args = (vl.length >= 2) ? vl[1] : undefined;
        message = (vl.length === 3) ? vl[2] : undefined;
        this.__validate(vl[0], i, label, args, message);
      } else {
        this.__validate(vl, i, label, args, message);
      }
    });
  }

  __validate (tp, i, label, args, message) {
    switch (tp) {
      case CrREQUIRED:
        this._vRequired(i, label, args, message);
        break;
      case CrMAX:
        this._vMax(i, label, args, message);
        break;
      case CrMIN:
        this._vMin(i, label, args, message);
        break;
      case CrLENGHT:
        this._vLenght(i, label, args, message);
        break;
      case CrMinLENGHT:
        this._vMinLenght(i, label, args, message);
        break;
      case CrPAST:
        this._vPast(i, label, args, message);
        break;
      case CrFUTURE:
        this._vFuture(i, label, args, message);
        break;
      case CrBETWIN:
        this._vBetwin(i, label, args, message);
        break;
      case CrEQUAL:
        this._vEqual(i, label, args, message);
        break;
      case CrNOTEQUAL:
        this._vNotEqual(i, label, args, message);
        break;
    }
  }
  _vRequired (i, label, args, message) {
    let m = ((message) || '{label} deve ser informado!').replace('{label}', label);
    if (i.value === undefined || i.value === '') {
      this.hasError = true;
      if (i.error) {
        i.error(m);
        if (this.focus === undefined) {
          this.focus = i;
        }
      } else {
        i.$root.mens.error(m);
      }
    } else {
      if (i.error) {
        i.error(undefined);
      }
    }
  }
  _vMax (i, label, args, message) {
    let arg = (typeof args === 'object') ? args[0] : args;
    let m = ((message) || '{label} deve ser no máximo {arg}!').replace('{label}', label).replace('{arg}', arg);
    if (i.value > arg) {
      this.hasError = true;
      if (i.error) {
        i.error(m);
        if (this.focus === undefined) {
          this.focus = i;
        }
      } else {
        i.$root.mens.error(m);
      }
    } else {
      if (i.error) {
        i.error(undefined);
      }
    }
  }
  _vMin (i, label, args, message) {
    let arg = (typeof args === 'object') ? args[0] : args;
    let m = ((message) || '{label} deve ser no minimo {arg}!').replace('{label}', label).replace('{arg}', arg);
    if (i.value < arg) {
      this.hasError = true;
      if (i.error) {
        i.error(m);
        if (this.focus === undefined) {
          this.focus = i;
        }
      } else {
        i.$root.mens.error(m);
      }
    } else {
      if (i.error) {
        i.error(undefined);
      }
    }
  }
  _vLenght (i, label, args, message) {
    let arg = (typeof args === 'object') ? args[0] : args;
    let m = ((message) || '{label} deve ter até {arg} letras!').replace('{label}', label).replace('{arg}', arg);
    if (i.value.length > arg) {
      this.hasError = true;
      if (i.error) {
        i.error(m);
        if (this.focus === undefined) {
          this.focus = i;
        }
      } else {
        i.$root.mens.error(m);
      }
    } else {
      if (i.error) {
        i.error(undefined);
      }
    }
  }
  _vMinLenght (i, label, args, message) {
    let arg = (typeof args === 'object') ? args[0] : args;
    let m = ((message) || '{label} deve ter no mínimo {arg} letras!').replace('{label}', label).replace('{arg}', arg);
    if (i.value === undefined || i.value.length < arg) {
      this.hasError = true;
      if (i.error) {
        i.error(m);
        if (this.focus === undefined) {
          this.focus = i;
        }
      } else {
        i.$root.mens.error(m);
      }
    } else {
      if (i.error) {
        i.error(undefined);
      }
    }
  }
  _vPast (i, label, args, message) {
    let arg = (typeof args === 'object') ? args[0] : args;
    let dt = i.$crUtils.mask('data', arg);
    let m = ((message) || '{label} deve ser anterior a {dt}!').replace('{label}', label).replace('{dt}', dt);
    if (i.value > arg) {
      this.hasError = true;
      if (i.error) {
        i.error(m);
        if (this.focus === undefined) {
          this.focus = i;
        }
      } else {
        i.$root.mens.error(m);
      }
    } else {
      if (i.error) {
        i.error(undefined);
      }
    }
  }
  _vFuture (i, label, args, message) {
    let arg = (typeof args === 'object') ? args[0] : args;
    let dt = i.$crUtils.mask('data', arg);
    let m = ((message) || '{label} deve ser posterior a {dt}!').replace('{label}', label).replace('{dt}', dt);
    if (i.value < arg) {
      this.hasError = true;
      if (i.error) {
        i.error(m);
        if (this.focus === undefined) {
          this.focus = i;
        }
      } else {
        i.$root.mens.error(m);
      }
    } else {
      if (i.error) {
        i.error(undefined);
      }
    }
  }
  //_vBetwin (i, label, args, message) {}
  _vEqual (i, label, fn, message) {
    let m = ((message) || '{label} deve ser igual a "{arg}"!').replace('{label}', label).replace('{arg}', fn());
    if (i.value !== fn()) {
      this.hasError = true;
      if (i.error) {
        i.error(m);
        if (this.focus === undefined) {
          this.focus = i;
        }
      } else {
        i.$root.mens.error(m);
      }
    } else {
      if (i.error) {
        i.error(undefined);
      }
    }
  }
  _vNotEqual (i, label, args, message) {
    let arg = (typeof args === 'object') ? args[0] : args;
    let m = ((message) || '{label} deve ser diferente de "{arg}"!').replace('{label}', label).replace('{arg}', arg);
    if (i.value === arg) {
      this.hasError = true;
      if (i.error) {
        i.error(m);
        if (this.focus === undefined) {
          this.focus = i;
        }
      } else {
        i.$root.mens.error(m);
      }
    } else {
      if (i.error) {
        i.error(undefined);
      }
    }
  }
}
export {CrValidator, CrFNVALIDATOR, CrREQUIRED, CrMAX, CrMIN, CrLENGHT, CrMinLENGHT, CrPAST, CrFUTURE, CrBETWIN, CrEQUAL, CrNOTEQUAL};

/* eslint-disable no-multi-spaces */
/**
 * Validator para personalização.
 * A função fornecida será executada durante o processo de validação e receberá como parametros:<br/>
 *  entity = entidade editada definida na tag "crud" propriedade "entity"<br/>
 *  ref = string com a referencia para o input ou title<br/>
 * @param fn  function(entity,ref):Boolean
 * @returns {validator: number, fn:fn}
 */
const CrFnVALIDATOR = (fn) => {
    return {validator: _CrFnVALIDATOR, fn: fn};
};
const CrREQUIRED = (message) => {
    return {validator: _CrREQUIRED, message: message};
};
const CrMAX = (maxValue, message) => {
    return {validator: _CrMAX, maxValue: maxValue, message: message};
};
const CrMIN = (minValue, message) => {
    return {validator: _CrMIN, minValue: minValue, message: message};
};
const CrMaxLENGTH = (maxLength, message) => {
    return {validator: _CrMaxLENGTH, maxLength: maxLength, message: message};
};
const CrMinLENGTH = (minLength, message) => {
    return {validator: _CrMinLENGTH, minLength: minLength, message: message};
};
const CrPAST = (maxValue, message) => {
    return {validator: _CrPAST, maxValue: maxValue, message: message};
};
const CrFUTURE = (minValue, message) => {
    return {validator: _CrFUTURE, minValue: minValue, message: message};
};
const CrBETWIN = (minValue, maxValue, message) => {
    return {validator: _CrBETWIN, minValue: minValue, maxValue: maxValue, message: message};
};
const CrEQUAL = (value, message) => {
    return {validator: _CrEQUAL, value: value, message: message};
};
const CrNotEQUAL = (value, message) => {
    return {validator: _CrNotEQUAL, value: value, message: message};
};

const _CrFnVALIDATOR = 0;
const _CrREQUIRED = 1;
const _CrMAX = 2;
const _CrMIN = 3;
const _CrMaxLENGTH = 4;
const _CrMinLENGTH = 5;
const _CrPAST = 6;
const _CrFUTURE = 7;
const _CrBETWIN = 8;
const _CrEQUAL = 9;
const _CrNotEQUAL = 10;


/**
 * Serviço de validação de dados.
 *
 * Sintaxe:
 *
 * CONF:Object = {'Ref1':INPUT_VALIDATION_LIST,'ref2':INPUT_VALIDATION_LIST ...}
 *
 * VALIDATOR_LIST: VALIDATOR | array(VALIDATOR,VALIDATOR...)
 *
 * VALIDATOR:
 *     CrREQUIRED([message:string])
 *     CrMAX(maxValue:string, [message:string])
 *     CrMIN(minValue:string, [message:string])
 *     CrMaxLENGTH(maxLength:number, [message:string])
 *     CrMinLENGTH(minLength:number:number, [message:string])
 *     CrPAST(dt:strDate|date, [message:string])
 *     CrFUTURE(dt:strDate|date, [message:string])
 *     CrBETWIN(ini:number|strRef|date, fin:number|strRef|date,[message:string])
 *     CrEQUAL(dt:strRef|date|number, [message:string])
 *     CrNotEQUAL(dt:strRef|date|number, [message:string])
 *     CrFnVALIDATOR(callBackFn(value):Boolean)
 *
 * Exemplo 1 - automatizado pelo processo de crud:
 *
 * <cr-crud validator='conf'>...</cr-crud>
 *
 * let conf = {
 *   'referencia':  [ CrREQUIRED(),
 *                    CrMAX(10,'O valor não pode ser maior que 10'),
 *                    CrBETWIN(2,10,'O valor deve estar entre 2 e 10'),
 *                    CrFnVALIDATOR(function(entity){...},'O valorA não pode ser inferior ao valorB')
 *                  ],
 *   'referencia2': CrREQUIRED()},
 *   ...
 * }
 * Exemplo 2 - programatico:
 *
 * let v = new CrValidator(conf);
 *
 * // indica campos requeridos com asterisco - coloque em created
 * v.initialize(this.$refs)
 *
 * // realiza validação
 * v.validate(this.$refs);
 *
 * // apaga as mensagens de erro - execute depois de recarregar os dados dos inputs
 * v.clear(this.$refs);
 */
class CrValidator {
    constructor(conf) {
        this.conf = conf;
        this.focus = undefined;
        this.hasError = undefined;
    }

    /**
     * Realiza a validação conforme argumento "conf".
     */
    validate(refs, scope) {
        this.focus = undefined;
        this.hasError = false;
        let objConf = undefined;
        let cps = Object.keys(refs)
        if (typeof this.conf === 'object') {
            for (const cp in this.conf) {
                let list = this.conf[cp];
                let inp = refs[cp];
                if (inp) {
                    if (Array.isArray(list)) {
                        for (let i = 0; i < list.length; i++) {
                            objConf = list[i];
                            this._validate(cp, inp, objConf, refs, cps, scope);
                        }
                    } else {
                        objConf = list;
                        this._validate(cp, inp, objConf, refs, cps, scope);
                    }
                }
            }

            return !this.hasError;
        }
    }

    _validArgs(vl, cps, refs) {
        if (typeof vl === 'string') {
            let i = refs.indexOf(vl);
            if (i >= 0) {
                return refs[i].value
            }
        }
        return vl;
    }

    _validate(cp, i, conf, refs, cps, scope) {
        let label = i.label || cp;
        let value = undefined;
        let valueB = undefined;
        if (conf.value) value = this._validArgs(conf.value, cps, refs)
        else if (conf.minValue) value = this._validArgs(conf.minValue, cps, refs)
        else if (conf.minLength) value = this._validArgs(conf.minLength, cps, refs)

        if (conf.maxValue) valueB = this._validArgs(conf.maxValue, cps, refs)
        else if (conf.maxLength) valueB = this._validArgs(conf.maxLength, cps, refs)
        let crud = undefined;
        let entity = undefined;
        let e = undefined;
        switch (conf.validator) {
            case _CrFnVALIDATOR:
                crud = this._getCrud(scope);
                entity = scope.$parent[crud.entity];
                e = this._vFunction(i, label, conf.fn, entity, cp);
                if (!e) this.hasError = true;
                break;
            case _CrREQUIRED:
                this._vRequired(i, label, conf.message);
                break;
            case _CrMAX:
                this._vMax(i, label, value, conf.message);
                break;
            case _CrMIN:
                this._vMin(i, label, value, conf.message);
                break;
            case _CrMaxLENGTH:
                this._vMaxLength(i, label, valueB, conf.message);
                break;
            case _CrMinLENGTH:
                this._vMinLength(i, label, value, conf.message);
                break;
            case _CrPAST:
                this._vPast(i, label, valueB, conf.message);
                break;
            case _CrFUTURE:
                this._vFuture(i, label, value, conf.message);
                break;
            case _CrBETWIN:
                this._vBetwin(i, label, value, valueB, conf.message);
                break;
            case _CrEQUAL:
                this._vEqual(i, label, value, conf.message);
                break;
            case _CrNotEQUAL:
                this._vNotEqual(i, label, value, conf.message);
                break;
        }
        return !this.hasError;
    }

    _getCrud(scope) {
        let c = scope;
        while (c && c.$options._componentTag !== 'cr-crud') {
            c = c.$parent;
        }
        return c;
    }

    initialize(refs) {
        for (const cp in this.conf) {
            let list = this.conf[cp];
            let inp = refs[cp];
            if (inp) {
                if (Array.isArray(list)) {
                    for (let i = 0; i < list.length; i++) {
                        let conf = list[i];
                        if (conf.validator && list.validator === _CrREQUIRED) {
                            inp.label = inp.label + '*';
                            break;
                        }
                    }
                } else {
                    if (list.validator && list.validator === _CrREQUIRED) {
                        inp.label = inp.label + '*';
                    }
                }
            }
        }
    }

    clear(refs) {
        for (const key in refs) {
            let i = refs[key];
            i.ok();
        }
    }

    _vFunction(i, label, fn, entity, ref) {
        return (fn && fn(entity,ref));
    }

    _vRequired(i, label, message) {
        let m = ((message) || 'O campo "{label}" deve ser informado!').replace('{label}', label);
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

    _vMax(i, label, value, message) {
        let m = ((message) || '{label} deve ser no máximo {arg}!').replace('{label}', label).replace('{arg}', value);
        if (i.value > value) {
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

    _vMin(i, label, value, message) {
        let m = ((message) || '{label} deve ser no minimo {arg}!').replace('{label}', label).replace('{arg}', value);
        if (i.value < value) {
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

    _vMaxLength(i, label, value, message) {
        let m = ((message) || '{label} deve ter até {arg} letras!').replace('{label}', label).replace('{arg}', value);
        if (i.value.length > value) {
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

    _vMinLength(i, label, value, message) {
        let m = ((message) || '"{label}" deve ter no mínimo {value} letras!').replace('{label}', label).replace('{value}', value);
        if (i.value === undefined || i.value.length < value) {
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

    _vPast(i, label, value, message) {
        let dt = i.$crUtils.mask('data', value);
        let m = ((message) || '"{label}" deve ser anterior a {dt}!').replace('{label}', label).replace('{dt}', dt);
        if (i.value > value) {
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

    _vFuture(i, label, value, message) {
        let dt = i.$crUtils.mask('data', value);
        let m = ((message) || '{label} deve ser posterior a {dt}!').replace('{label}', label).replace('{dt}', dt);
        if (i.value < value) {
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

    _vBetwin(i, label, arga, argb, message) {
        let m = ((message) || '"{label}" Deve ser maior ou igual a "{arga}" e menor ou igual a "{argb}"!').replace('{label}', label).replace('{arga}', arga).replace('{argb}', argb);
        if (i.value < arga || i.value > argb) {
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

    _vEqual(i, label, value, message) {
        let m = ((message) || '{label} deve ser igual a "{arg}"!').replace('{label}', label).replace('{arg}', value);
        if (i.value !== value) {
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

    _vNotEqual(i, label, value, message) {
        let m = ((message) || '{label} deve ser diferente de "{arg}"!').replace('{label}', label).replace('{arg}', value);
        if (i.value === value) {
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

export {
    CrValidator,
    CrFnVALIDATOR,
    CrREQUIRED,
    CrMAX,
    CrMIN,
    CrMaxLENGTH,
    CrMinLENGTH,
    CrPAST,
    CrFUTURE,
    CrBETWIN,
    CrEQUAL,
    CrNotEQUAL
};

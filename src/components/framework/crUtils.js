/* eslint-disable no-trailing-spaces */
function _fetcher (url, opt, root) {
    if (!opt['headers']) {
        opt.headers = {};
    }
    if (!(opt.body instanceof FormData) && (!opt.headers['Content-Type'])) {
        opt.headers['Content-Type'] = 'application/json';
    }
    if (root._fetcherBearer) {
        opt.headers['Authorization'] = root._fetcherBearer;
    }

    return fetch(url, opt)
        .then(async response => {
            if (response.headers.has('Authorization')) {
                root._fetcherBearer = response.headers.get('Authorization');
            }
            let t = await response.text();
            return {status: response.status, text: t};
        }).then(response =>{
            if(response.status===200){
                return JSON.parse(response.text);
            }else{
                console.log(response.text);
                return null;
            }
        });
}

export default {
    instance: undefined,
    root: undefined,
    inject (v) {
        let self = this;
        v.prototype.$post = this.post;
        v.prototype.$get = this.get;
        v.prototype.$delete = this.delete;
        v.prototype.$put = this.put;
        v.prototype.$crUtils = this.utils;
        v.filter('mask', function (value, mask) {
            return self.utils.mask(mask, value);
        });
    },
    get (url, opt) {
        if (!opt) opt = {};
        opt.method = 'GET';
        return _fetcher(url, opt, this.$root);
    },
    delete (url, opt) {
        if (!opt) opt = {};
        opt.method = 'DELETE';
        return _fetcher(url, opt, this.$root);
    },
    put (url, body, opt) {
        if (!opt) opt = {};
        opt.method = 'PUT';
        let sbody = '';
        if (opt.headers && opt.headers['Content-Type'] && opt.headers['Content-Type'] === 'application/x-www-form-urlencoded' && typeof body !== 'string') {
            for (var key in body) {
                sbody += ((sbody === '') ? '' : '&') + key + '=' + encodeURIComponent(body[key]);
            }
            body = sbody;
        } else {
            sbody = JSON.stringify(body);
        }

        opt.body = sbody;
        return _fetcher(url, opt, this.$root);
    },
    post (url, body, opt) {
        if (!opt) opt = {};
        opt.method = 'POST';
        if (body instanceof FormData) {
            opt.body = body;
        } else {
            let sbody = '';
            if (opt.headers && opt.headers['Content-Type'] && opt.headers['Content-Type'] === 'application/x-www-form-urlencoded' && typeof body !== 'string') {
                for (var key in body) {
                    sbody += ((sbody === '') ? '' : '&') + key + '=' + encodeURIComponent(body[key]);
                }
                body = sbody;
            } else {
                sbody = JSON.stringify(body);
            }
            opt.body = sbody;
        }
        return _fetcher(url, opt, this.$root);
    },
    utils: {
        mask: function (mask, vl) {
            if (!vl) return '';

            let value, msk = this._defaultMask(mask), result = '', m, c, v = 0;
            value = (typeof vl !== 'string') ? vl.toString() : vl;

            if ((typeof vl === 'string' || typeof vl === 'number') && msk.indexOf('99/99/9999 99:99') >= 0) {
                let d = new Date(vl), r = ' ' + (((d.getDate()) < 10) ? ('0' + (d.getDate())) : d.getDate());
                r += ((d.getMonth() + 1 < 10) ? ('0' + (d.getMonth() + 1)) : ((d.getMonth() + 1)));
                r += d.getFullYear() + ' ';
                r += ((d.getHours() < 10) ? '0' : '') + d.getHours() + ':';
                r += ((d.getMinutes() < 10) ? '0' : '') + d.getMinutes();
                value = r.trim();
            } else if ((typeof vl === 'number' || typeof vl === 'string') && msk.indexOf('99/99/9999') >= 0) {
                let d = new Date(vl), r = ' ' + (((d.getDate()) < 10) ? ('0' + (d.getDate())) : d.getDate());
                r += ((d.getMonth() + 1 < 10) ? ('0' + (d.getMonth() + 1)) : ((d.getMonth() + 1)));
                r += d.getFullYear();
                value = r.trim();
            } else if (vl instanceof Date && msk.indexOf('9999-99-99T99:99:99') >= 0) {
                let r = vl.getFullYear() + '-';
                r += ((vl.getMonth() + 1 < 10) ? ('0' + (vl.getMonth() + 1)) : ((vl.getMonth() + 1)));
                r += '-' + (((vl.getDate()) < 10) ? ('0' + (vl.getDate())) : vl.getDate()) + 'T';
                r += ((vl.getHours() < 10) ? '0' : '') + vl.getHours() + ':';
                r += ((vl.getMinutes() < 10) ? '0' : '') + vl.getMinutes();
                value = r.trim();
            } else if (vl instanceof Date && msk.indexOf('99/99/9999 99:99') >= 0) {
                let r = ' ' + (((vl.getDate()) < 10) ? ('0' + (vl.getDate())) : vl.getDate());
                r += ((vl.getMonth() + 1 < 10) ? ('0' + (vl.getMonth() + 1)) : ((vl.getMonth() + 1)));
                r += vl.getFullYear() + ' ';
                r += ((vl.getHours() < 10) ? '0' : '') + vl.getHours() + ':';
                r += ((vl.getMinutes() < 10) ? '0' : '') + vl.getMinutes();
                value = r.trim();
            } else if (vl instanceof Date && msk.indexOf('99/99/9999') >= 0) {
                let r = ' ' + (((vl.getDate()) < 10) ? ('0' + (vl.getDate())) : vl.getDate());
                r += ((vl.getMonth() + 1 < 10) ? ('0' + (vl.getMonth() + 1)) : ((vl.getMonth() + 1)));
                r += vl.getFullYear();
                value = r.trim();
            } else if (typeof vl === 'number' && msk.indexOf(',') >= 0) {
                let pv;
                let vlr = vl;
                let dg = 0;
                let dv = 1;
                for (pv = msk.indexOf(',') + 1; msk.charAt(pv) === '9'; pv++) {
                    vlr *= 10;
                    dg++;
                    dv *= 10;
                }
                vlr = parseInt(vlr) / dv;
                value = vlr.toFixed(dg).replace('.', ',');
            }

            value = this.umask(msk, value);

            if (msk.indexOf('<') === -1) {
                for (m = 0; m < msk.length && v < value.length; m++) {
                    c = msk.charAt(m);
                    if (c === '9' || c === '#') {
                        result += value.charAt(v);
                        v++;
                    } else {
                        if (c !== '>') {
                            result += c;
                        }
                    }
                }
            } else {
                v = value.length - 1;
                for (m = msk.length - 1; m >= 0 && v >= 0; m--) {
                    c = msk.charAt(m);
                    if (c === '9' || c === '#') {
                        result = value.charAt(v) + result;
                        v--;
                    } else {
                        if (c !== '<') {
                            result = c + result;
                        }
                    }
                }
            }
            return result;
        },
        umask: function (mask, vl) {
            let msk = this._defaultMask(mask), m, c, maskchars = '';
            for (m = 0; m < msk.length; m++) {
                c = msk.charAt(m);
                if (c !== '9' && c !== '#' && c !== '<' && c !== '>' && maskchars.indexOf(c) === -1) {
                    maskchars += c;
                }
            }
            let result = '', v;
            for (v = 0; v < vl.length; v++) {
                c = vl.charAt(v);
                if (maskchars.indexOf(c) === -1) {
                    result += c;
                }
            }
            return result;
        },
        _defaultMask: function (mask) {
            let msk;
            if (mask.toUpperCase() === 'CPF') {
                msk = '>999.999.999-99';
            } else if (mask.toUpperCase() === 'CNPJ') {
                msk = '>99.999.999/9999-99';
            } else if (mask.toUpperCase() === 'CEP') {
                msk = '>99.999-999';
            } else if (mask.toUpperCase() === 'VALOR') {
                msk = '99.999.999,99<';
            } else if (mask.toUpperCase() === 'INTEIRO') {
                msk = '99.999.999<';
            } else if (mask.toUpperCase() === 'DATA') {
                msk = '99/99/9999';
            } else if (mask.toUpperCase() === 'DATAHORA') {
                msk = '99/99/9999 99:99';
            } else {
                msk = mask;
            }
            return msk;
        },
        urlImage: function (urlBase, img) {
            if (img && img.tipo && img.nome) {
                return urlBase + '/' + img.tipo + '/' + img.nome;
            }
        },
        getParentData: function (scope, strData) {
            if (strData.indexOf('.') === -1) {
                return scope[strData];
            } else {
                let l = strData.split('.');
                let s = scope;
                while (s && !s[l[0]]) {
                    s = s.$parent;
                }
                l.map(vr => {
                    if (s[vr]) {
                        s = s[vr];
                    }
                });
                return s;
            }
        },
        getScopeOf: function (scope, strData) {
            if (strData.indexOf('.') === -1) {
                let s = scope;
                while (s && !s[strData]) {
                    s = s.$parent;
                }
                return s;
            } else {
                let l = strData.split('.');
                let s = scope;
                while (s && !s[l[0]]) {
                    s = s.$parent;
                }
                return s;
            }
        },
        has: function (arg, obj) {
            return Object.prototype.hasOwnProperty.call(obj, arg);
        },
        filteredUrl(url,filterObj){
            let result = url+"/listar?args=";
            let sbody='';
            for (var key in filterObj) {
                sbody += ((sbody === '') ? '' : '&') + key + '=' + encodeURIComponent(filterObj[key]);
            }
            return result+sbody;
        }
    }
};

import Vue from 'vue'

Vue.mixin({
    methods: {
        getGSTCode() {
            let gst = [
                {
                    "name": "Jammu and Kashmir",
                    "code": 1
                },
                {
                    "name": "Himachal Pradesh",
                    "code": 2
                },
                {
                    "name": "Punjab",
                    "code": 3
                },
                {
                    "name": "Chandigarh",
                    "code": 4
                },
                {
                    "name": "Uttarakhand",
                    "code": 5
                },
                {
                    "name": "Haryana",
                    "code": 6
                },
                {
                    "name": "Delhi",
                    "code": 7
                },
                {
                    "name": "Rajasthan",
                    "code": 8
                },
                {
                    "name": "Uttar Pradesh",
                    "code": 9
                },
                {
                    "name": "Bihar",
                    "code": 10
                },
                {
                    "name": "Sikkim",
                    "code": 11
                },
                {
                    "name": "Arunachal Pradesh",
                    "code": 12
                },
                {
                    "name": "Nagaland",
                    "code": 13
                },
                {
                    "name": "Manipur",
                    "code": 14
                },
                {
                    "name": "Mizoram",
                    "code": 15
                },
                {
                    "name": "Tripura",
                    "code": 16
                },
                {
                    "name": "Meghalaya",
                    "code": 17
                },
                {
                    "name": "Assam",
                    "code": 18
                },
                {
                    "name": "West Bengal",
                    "code": 19
                },
                {
                    "name": "Jharkhand",
                    "code": 20
                },
                {
                    "name": "Odisha",
                    "code": 21
                },
                {
                    "name": "Chattisgarh",
                    "code": 22
                },
                {
                    "name": "Madhya Pradesh",
                    "code": 23
                },
                {
                    "name": "Gujarat",
                    "code": 24
                },
                {
                    "name": "Daman and Diu",
                    "code": 25
                },
                {
                    "name": "Dadra and Nagar Haveli",
                    "code": 26
                },
                {
                    "name": "Maharashtra",
                    "code": 27
                },
                {
                    "name": "Andhra Pradesh",
                    "code": 28
                },
                {
                    "name": "Karnataka",
                    "code": 29
                },
                {
                    "name": "Goa",
                    "code": 30
                },
                {
                    "name": "Lakshadweep Islands",
                    "code": 31
                },
                {
                    "name": "Kerala",
                    "code": 32
                },
                {
                    "name": "Tamil Nadu",
                    "code": 33
                },
                {
                    "name": "Pondicherry",
                    "code": 34
                },
                {
                    "name": "Andaman and Nicobar Islands",
                    "code": 35
                },
                {
                    "name": "Telangana",
                    "code": 36
                },
                {
                    "name": "Andhra Pradesh (New)",
                    "code": 37
                }
            ];
            return gst;
        },
        getNormalImage(path, type) {
            let new_path = ""
            if (process.env.NODE_ENV == 'development') {
                new_path = String(path).split('uploads')[1]
            } else {
                new_path = path
            }
            if (new_path != "") {
                if (type == "normal") {
                    let fileSrc =
                        process.env.static_path + "/unsafe/fit-in/400x600/filters:quality(80):format(webp):fill(white)/" + process.env.static_base +
                        String(new_path);
                    return fileSrc;
                }
                if (type == "thumb") {
                    let fileSrc =
                        process.env.static_path + "/unsafe/96x/filters:format(webp):quality(70)/" + process.env.static_base +
                        String(new_path);
                    return fileSrc;
                }
                if (type == "small") {
                    let fileSrc =
                        process.env.static_path + "/unsafe/250x/filters:format(webp):quality(70)/" + process.env.static_base +
                        String(new_path);
                    return fileSrc;
                }
                if (type == "preview") {
                    let fileSrc =
                        process.env.static_path + "/unsafe/400x/filters:format(webp):quality(70)/" + process.env.static_base +
                        String(new_path);
                    return fileSrc;
                }
                if (type == "large-ratio") {
                    let fileSrc =
                        process.env.static_path + "/unsafe/600x/filters:format(webp):quality(70)/" + process.env.static_base +
                        String(new_path);
                    return fileSrc;
                }
                if (type == "large") {
                    let fileSrc =
                        process.env.static_path + "/unsafe/filters:format(webp)/" + process.env.static_base +
                        String(new_path);
                    return fileSrc;
                }
            }
            return null;
        },
        numtoWords(num) {
            var a = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
            var b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

            if ((num = Number(num).toString()).length > 9) return 'overflow';
            let n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
            if (!n) return; var str = '';
            str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
            str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
            str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
            str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
            str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only ' : '';
            return str;

        },
        titleCase(str) {
            return str.toLowerCase().split(' ').map(function (word) {
                return (word.charAt(0).toUpperCase() + word.slice(1));
            }).join(' ');
        },
        getLocalPrice(item) {
            // Add local currency
            let currency = this.$auth.user.roles.currency;
            if ((Object.keys(this.$auth.user.roles).includes('price') && this.$auth.user.roles.price) || this.$auth.user.type == 'admin') {

                if (currency.name == "INR") {
                    return (
                        Math.round(
                            ((item.price + Number.EPSILON) * 10) /
                            currency.exchange
                        ) / 10
                    ).toFixed(2);
                } else {
                    let cat_factor = 1
                    let number
                    try {

                        cat_factor = JSON.parse(item.product_category[0].meta).filter(item => { return item.curr == currency.name })[0].factor
                    } catch (error) {
                        cat_factor = 1
                    }
                    if (cat_factor == 1) {

                        number = (item.price * currency.factor) /
                            currency.exchange
                    }
                    else {
                        number = (item.price * cat_factor) /
                            currency.exchange

                    }
                    if (currency.name.toLowerCase() == 'rs') {

                        return Math.ceil(this.get_ceil(number, 1)).toFixed(2);
                    }
                    else {
                        return (this.get_ceil(number, 1)).toFixed(2);
                    }
                    // return (
                    //     Math.round(
                    //         (item.price * item.product_category[0].factor * 10) /
                    //         this.$auth.user.roles.currency[0].exchange
                    //     ) / 10
                    // ).toFixed(2);
                }
            }
            else return 0.0
        },
        get_ceil(number, digits) {
            return parseFloat(Math.ceil((10.0 ** digits) * number) / (10.0 ** digits))
        },
        getPriceByRate(item, curr) {
            // Add local currency

            let currency = curr;

            if (currency.name == "INR") {
                return (
                    Math.round(
                        ((item.rate + Number.EPSILON) * 10)
                    ) / 10
                ).toFixed(2);
            } else {
                let cat_factor = 1
                let number
                try {

                    cat_factor = JSON.parse(item.item[0].product_category[0].meta).filter(item => { return item.curr == currency.name })[0].factor
                } catch (error) {
                    cat_factor = 1
                }
                if (cat_factor == 1) {

                    number = (item.rate * currency.factor) /
                        currency.exchange
                }
                else {
                    number = (item.rate * cat_factor) /
                        currency.exchange

                }
                if (currency.name.toLowerCase() == 'rs') {

                    return Math.ceil(this.get_ceil(number, 1)).toFixed(2);
                }
                else {
                    return (this.get_ceil(number, 1)).toFixed(2);
                }


            }

        },
        getPriceBy(item, curr) {
            // Add local currency

            let currency = curr;

            if (currency.name == "INR") {
                return (
                    Math.round(
                        ((item.price + Number.EPSILON) * 10)
                    ) / 10
                ).toFixed(2);
            } else {
                let cat_factor = 1
                let number
                try {

                    cat_factor = JSON.parse(item.product_category[0].meta).filter(item => { return item.curr == currency.name })[0].factor
                } catch (error) {
                    cat_factor = 1
                }
                if (cat_factor == 1) {

                    number = (item.price * currency.factor) /
                        currency.exchange
                }
                else {
                    number = (item.price * cat_factor) /
                        currency.exchange

                }

                if (currency.name.toLowerCase() == 'rs') {

                    return Math.ceil(this.get_ceil(number, 1)).toFixed(2);
                }
                else {
                    return (this.get_ceil(number, 1)).toFixed(2);
                }


            }

        },
        convertBy(price, curr) {
            // Add local currency

            let currency = curr;

            if (currency.name == "INR") {
                return (
                    Math.round(
                        ((price + Number.EPSILON) * 10)
                    ) / 10
                ).toFixed(2);
            } else {

                let number = (price) /
                    currency.exchange

                if (currency.name.toLowerCase() == 'rs') {

                    return Math.ceil(this.get_ceil(number, 1)).toFixed(2);
                }
                else {
                    return (this.get_ceil(number, 1)).toFixed(2);
                }
            }

        },
        dobFormatter(date) {
            let options = { year: "numeric", month: "numeric", day: "numeric" };
            return date.toLocaleDateString("en-IN", options);
        },
    }
})


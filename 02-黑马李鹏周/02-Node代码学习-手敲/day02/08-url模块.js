var url = require('url')

var obj = url.parse('/pinglun?name=大家分开了思考&message=圣诞节风口浪尖的考虑')

var obj2 = url.parse('/pinglun?name=大家分开了思考&message=圣诞节风口浪尖的考虑',true)

console.log(obj);

console.log(obj2);
console.log(obj2.query);
// [Object: null prototype] { name: '大家分开了思考', message: '圣诞节风口浪尖的考虑' }
console.log(obj2.pathname);
// /pinglun
/**
 * @Author liming
 * @Date 2022/11/15 15:41
 **/

import list from  './list.json'
//TS在导包的时候默认不支持.json的后缀的，tsconfig.json中进行配置——"resolveJsonModule":true

export class DataStore{
    static list = list;
}
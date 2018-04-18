"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// TypeScript 中的几种基础类型:
// 1、number
// 2、string(包括模版字符串`)
// 3、boolean
// 4、array(普通类型数组type[]，数组泛型Array<type>)
// 5、元组Tuple(一种元素数量和类型的数组，类型不必相同，混合型数组)
// 6、enum枚举（是对js的一个补充，使用枚举类型可以为一组数值赋予友好的名字）；
// 7、any
// 8、void // void与any相反，他表示没有任何类型，如函数无返回值时，返回值void;/*当你指定了--strictNullChecks标记，null和undefined只能赋值给void和它们各自。*/
// 9、null 、undefined
// 10、 never
/*never类型表示的是那些永不存在的值的类型。 例如， never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型； 变量也可能是 never类型，当它们被永不为真的类型保护所约束时。
never类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是never的子类型或可以赋值给never类型（除了never本身之外）。 即使 any也不可以赋值给never。*/
// 一、类型注解
function myType(arg) {
    let num = 1;
    let str = 'lili';
    let str2 = `Li li`;
    let str3 = `Hello, my name is ${str2}`; // 模版字符串
    let isMe = true;
    let arr = [1, 2, 3];
    let arr2 = [4, 5, 6]; // 数组泛型
    let arr3 = [23, 'lili'];
    let Color;
    (function (Color) {
        Color[Color["Red"] = 0] = "Red";
        Color[Color["Green"] = 1] = "Green";
        Color[Color["Blue"] = 2] = "Blue";
    })(Color || (Color = {}));
    ; // 默认从0开始编号,也可以手动赋值{Red = 1}从1开始
    // {0: 'Red', 1: 'Green', 2: 'Blue', 'Red': 0, 'Green': 1, 'Blue': 2};
    let c = Color.Green; // 1 通过key查找val
    console.log(Color[2]); // 通过val查找key
    let a = 'nothing is impossible;';
    let unusable = undefined; // 声明一个void类型的变量没什么用，只能赋值undefined、null;
    function noReturn() {
        console.log(noReturn);
    }
    function error(msg) { throw new Error(msg); }
    ;
    let b = 'ss';
    let type = [num, str3, isMe, arr, arr2, c, a, unusable, error, b];
    return type[arg];
}
document.body.innerHTML += myType(1) + '<br>';
function greeter(person) {
    return 'Hello,' + person + '<br>';
}
let user = 'lishasha';
document.body.innerHTML += greeter(user);
// 二、 类型批注：提供静态类型，以在编译时启动类型检查（可选）；
function sum(num1, num2) {
    return num1 + num2;
}
let num1 = 111;
let num2 = 222;
document.body.innerHTML += sum(num1, num2) + '<br>';
function people(person) {
    return 'Hello,' + person.firstName + ' ' + person.lastName + '<br>';
}
let p = { firstName: 'zhang', lastName: 'san' };
document.body.innerHTML += people(p);
// 四、类：每个类都有多个公共字段和一个构造函数，类和接口可以一起工作；
class Student {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = firstName + lastName;
    }
}
console.log(Student);
/*
    Student(fistName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = firstName + lastName;
    }
*/
let stu = new Student('王', '五');
document.body.innerHTML += people(stu);
class Pets {
}
class Dog extends Pets {
}
let hali = new Dog();
hali.name = 'hali';
hali.breed = 'x';
let hanry = new Dog();
hanry.name = 'hanry';
hanry.breed = 'b';
console.log(hali, hanry);
// 类型断言
let str4 = 'i am string';
let len = str4.length;
let len2 = str4.length;
console.log(len, len2);
// readonly const
const A = 'can not reset';
let n = { a: 'ss', b: 11 };
// console.log(n.a = '22'); // error
let aa = n.a; // 只读类型必须用类型断言的方式赋值给别的变量
console.log(aa);
let mySreach;
mySreach = function (src, sub) {
    let result = src.search(sub);
    return result > -1;
};
console.log(mySreach('lishasha', 'a'));
let myArray = ['aaa', 'ssss'];
console.log(myArray[0]); // aaa
// 迭代器 for ..of 
let someArray = [1, 'string', false];
for (let key in someArray) {
    console.log(key); // 0,1,2
}
for (let val of someArray) {
    console.log(val); // a, string, false
}
// 泛型
function identity(arg) {
    return arg;
}
//# sourceMappingURL=greeter.js.map
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
function myType(arg: number) { 
    let num: number = 1;
    let str: string = 'lili';
    let str2: string = `Li li`;
    let str3: string = `Hello, my name is ${str2}`;// 模版字符串
    let isMe: boolean = true;
    let arr: number[] = [1, 2, 3];
    let arr2: Array<number> = [4, 5, 6];// 数组泛型
    let arr3: [number, string] = [23, 'lili'];
    enum Color {Red, Green, Blue};// 默认从0开始编号,也可以手动赋值{Red = 1}从1开始
    // {0: 'Red', 1: 'Green', 2: 'Blue', 'Red': 0, 'Green': 1, 'Blue': 2};
    let c :Color = Color.Green; // 1 通过key查找val
    console.log(Color[2]);// 通过val查找key
    let a: any = 'nothing is impossible;'
    let unusable: void = undefined;// 声明一个void类型的变量没什么用，只能赋值undefined、null;
    function noReturn():void {
        console.log(noReturn);
    }
    
    function error(msg: string): never { throw new Error(msg);};
    let b: number | string = 'ss';
    let type: any[] = [num, str3, isMe, arr, arr2, c, a, unusable, error, b];
    return type[arg];
}
document.body.innerHTML += myType(1) + '<br>';

function greeter(person: string) {
    return 'Hello,' + person + '<br>';
}
let user: string = 'lishasha';
document.body.innerHTML += greeter(user);

// 二、 类型批注：提供静态类型，以在编译时启动类型检查（可选）；
function sum (num1: number, num2: number): number {
    return num1 + num2;
}
let num1: number = 111;
let num2: number = 222;
document.body.innerHTML += sum(num1, num2) + '<br>';

// 三、接口: 接口可以作为类型批注
interface Person {
    firstName: string;
    lastName: string;
}
function people(person: Person) {
    return 'Hello,' + person.firstName + ' ' + person.lastName + '<br>'; 
}
let p: Person = {firstName: 'zhang', lastName:  'san'};
document.body.innerHTML += people(p);

// 四、类：每个类都有多个公共字段和一个构造函数，类和接口可以一起工作；
class Student {
    fullName: string;
    constructor(public firstName, public lastName) {
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

class Pets{
    name: string;
}
class Dog extends Pets {
    breed: string;
}
let hali = new Dog();
hali.name = 'hali' ;
hali.breed = 'x' ;
let hanry = new Dog();
hanry.name = 'hanry' ;
hanry.breed = 'b' ;
console.log(hali, hanry);


// 类型断言
let str4: string = 'i am string';
let len: number = (<string>str4).length;
let len2: number = (str4 as string).length;
console.log(len, len2);

// readonly const

const A = 'can not reset';
interface B {
    readonly a: string,
    b?: number
}
let n: B = {a: 'ss', b: 11};
// console.log(n.a = '22'); // error
let aa = n.a as string;// 只读类型必须用类型断言的方式赋值给别的变量
console.log(aa);
// 接口 - 函数类型: 定义的参数类型:返回值类型
interface SearchFunc {
    (source: string, subString: string) : boolean;
}
let mySreach: SearchFunc;
mySreach = function (src, sub) {
    let result = src.search(sub);
    return result > -1;
}
console.log(mySreach('lishasha', 'a'));
// 接口 - 可索引类型
interface StringArray {
    [index: number]: string
}
let myArray: StringArray = ['aaa', 'ssss'];
console.log(myArray[0]); // aaa

// 迭代器 for ..of 
let someArray = [1, 'string', false];
for(let key in someArray) {
    console.log(key);// 0,1,2
}
for(let val of someArray) {
    console.log(val);// a, string, false
}
export interface StringValidator {
    isAcceptable(s: string): boolean;
}
// 泛型
function identity<T>(arg: T): T {
    return arg;
}





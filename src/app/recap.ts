const usarname = 'Manuel';

const sum = (a: number, b: number) => {
    return a + b;
}

sum(1,2);

class Person{
    constructor(public age: number,public lastName: string){}
}

const Manu = new Person(23, "Carrizales");
Manu.age;


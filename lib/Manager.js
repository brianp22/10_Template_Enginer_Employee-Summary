const Employee = require("./Employee");

class Manager extends Employee {
    constructor(name, id, email, officeNo){

        super(name, id, email);

        this.officeNumber = officeNo;
        
    }
    getOfficeNumber(){
        return this.officeNumber;
    }
    getPosition(){
        return "Manager";
    }
}

module.exports = Manager;
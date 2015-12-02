'use strict';

describe('Calculator Service', function () {

    var service;

    beforeEach(function () {
        service = new CalculatorService();
    });

    it('should display 0 when loaded', function () {
        expect(service.getDisplay()).toEqual('0');
    });

    describe("Input numbers", function() {
        it("should display 1 when enter 1", function () {
            service.enterDigit("one");
            expect(service.getDisplay()).toEqual('1');
        });

        it("should display 15 when enter 1 then 5", function () {
            service.enterDigit("one");
            expect(service.getDisplay()).toEqual('1');
            service.enterDigit("five");
            expect(service.getDisplay()).toEqual('15');
        });

        it("should have all numbers from 0-9", function () {
            service.enterDigit("zero");
            expect(service.getDisplay()).toEqual('0');
            service.enterDigit("one");
            expect(service.getDisplay()).toEqual('1');
            service.enterDigit("two");
            expect(service.getDisplay()).toEqual('12');
            service.enterDigit("three");
            expect(service.getDisplay()).toEqual('123');
            service.enterDigit("four");
            expect(service.getDisplay()).toEqual('1234');
            service.enterDigit("five");
            expect(service.getDisplay()).toEqual('12345');
            service.enterDigit("six");
            expect(service.getDisplay()).toEqual('123456');
            service.enterDigit("seven");
            expect(service.getDisplay()).toEqual('1234567');
            service.enterDigit("eight");
            expect(service.getDisplay()).toEqual('12345678');
            service.enterDigit("nine");
            expect(service.getDisplay()).toEqual('123456789');
        });
    });
    
    describe("Operations", function() {
        it('should display 71 when calculating 9*8', function () {
            service.enterDigit("nine");
            expect(service.getDisplay()).toEqual('9');
            service.enterOperation("*");
            expect(service.getDisplay()).toEqual('9');
            service.enterDigit("eight");
            expect(service.getDisplay()).toEqual('8');
            service.enterEquals();
            expect(service.getDisplay()).toEqual('72');
        });

        it('should display 15 when calculating 12+3', function () {
            service.enterDigit("one");
            expect(service.getDisplay()).toEqual('1');
            service.enterDigit("two");
            expect(service.getDisplay()).toEqual('12');
            service.enterOperation("+");
            expect(service.getDisplay()).toEqual('12');
            service.enterDigit("three");
            expect(service.getDisplay()).toEqual('3');
            service.enterEquals();
            expect(service.getDisplay()).toEqual('15');
        });

        it('should display 10 when calculating 12-2', function () {
            service.enterDigit("one");
            expect(service.getDisplay()).toEqual('1');
            service.enterDigit("two");
            expect(service.getDisplay()).toEqual('12');
            service.enterOperation("-");
            expect(service.getDisplay()).toEqual('12');
            service.enterDigit("two");
            expect(service.getDisplay()).toEqual('2');
            service.enterEquals();
            expect(service.getDisplay()).toEqual('10');
        });

        it('should display 3 when calculating 12/4', function () {
            service.enterDigit("one");
            expect(service.getDisplay()).toEqual('1');
            service.enterDigit("two");
            expect(service.getDisplay()).toEqual('12');
            service.enterOperation("/");
            expect(service.getDisplay()).toEqual('12');
            service.enterDigit("four");
            expect(service.getDisplay()).toEqual('4');
            service.enterEquals();
            expect(service.getDisplay()).toEqual('3');
        });
    });
    
    describe("Error Handling", function() {
        it('should display zero when dividing by 0', function () {
            service.enterDigit("seven");
            expect(service.getDisplay()).toEqual('7');
            service.enterOperation("/");
            expect(service.getDisplay()).toEqual('7');
            service.enterDigit("zero");
            expect(service.getDisplay()).toEqual('0');
            service.enterEquals();
            expect(service.getDisplay()).toEqual('0');
        });

        it('should display zero when dividing 0 by any number', function () {
            service.enterDigit("zero");
            expect(service.getDisplay()).toEqual('0');
            service.enterOperation("/");
            expect(service.getDisplay()).toEqual('0');
            service.enterDigit("six");
            expect(service.getDisplay()).toEqual('6');
            service.enterEquals();
            expect(service.getDisplay()).toEqual('0');
        });

        it('should display 0 when enter clear then equals', function () {
            service.enterDigit("one");
            expect(service.getDisplay()).toEqual('1');
            service.enterDigit("five");
            expect(service.getDisplay()).toEqual('15');
            service.enterOperation("/");
            expect(service.getDisplay()).toEqual('15');
            service.enterClear();
            expect(service.getDisplay()).toEqual('0');
            service.enterEquals();
            expect(service.getDisplay()).toEqual('0');
        });

        it('should not break if no first number added', function () {
            service.enterOperation("-");
            expect(service.getDisplay()).toEqual('0');
            service.enterDigit("four");
            expect(service.getDisplay()).toEqual('4');
            service.enterEquals();
            expect(service.getDisplay()).toEqual('-4');
        });

        it('should not accept unknown operations', function () {
            service.enterDigit("four");
            expect(service.getDisplay()).toEqual('4');
            service.enterOperation("%");
            expect(service.getDisplay()).toEqual('4');
            service.enterDigit("four");
            expect(service.getDisplay()).toEqual('44');
            service.enterEquals();
            expect(service.getDisplay()).toEqual('44');
        });

        it('should not accept unknown numbers', function () {
            service.enterDigit("too");
            expect(service.getDisplay()).toEqual('0');
            service.enterEquals();
            expect(service.getDisplay()).toEqual('0');
        });
    });
    

    it('should display 6 when enter 4+4-2', function () {
        service.enterDigit("four");
        expect(service.getDisplay()).toEqual('4');
        service.enterOperation("+");
        expect(service.getDisplay()).toEqual('4');
        service.enterDigit("four");
        expect(service.getDisplay()).toEqual('4');
        service.enterOperation("-");
        expect(service.getDisplay()).toEqual('8');
        service.enterDigit("two");
        expect(service.getDisplay()).toEqual('2');
        service.enterEquals();
        expect(service.getDisplay()).toEqual('6');
    });

    

    it('should display 0 if enter equals after loading', function () {
        service.enterEquals();
        expect(service.getDisplay()).toEqual('0');
    });

    it('should display -0.5 when enter -4/8', function () {
        service.enterOperation("-");
        expect(service.getDisplay()).toEqual('0');
        service.enterDigit("four");
        expect(service.getDisplay()).toEqual('4');
        service.enterOperation("/");
        expect(service.getDisplay()).toEqual('-4');
        service.enterDigit("eight");
        expect(service.getDisplay()).toEqual('8');
        service.enterEquals();
        expect(service.getDisplay()).toEqual('-0.5');
    });
});


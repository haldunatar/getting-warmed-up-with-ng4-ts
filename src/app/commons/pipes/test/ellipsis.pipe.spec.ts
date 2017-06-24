import {Ellipsis} from "../ellipsis.pipe";
let pipe;

describe('Ellipsis' , () => {

    pipe = new Ellipsis();

    it('should return input with default ellipsis', () => {
        expect(pipe.transform('some string with a lot text', 15, '')).toBe('some string wit...');
    });

    it('should return input shortened with custom tail', () => {
        expect(pipe.transform('some string with a lot text', 15, '!!!')).toBe('some string wit!!!');
    });

    it('should return original input val', () => {
        expect(pipe.transform('some string with a lot text', 55, '!!!')).toBe('some string with a lot text');
    });
});
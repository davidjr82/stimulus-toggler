import fs from 'fs';
import path from 'path';

const loadHtmlFromExample = (example) => {
    return fs.readFileSync(path.resolve(__dirname, './../examples/' + example + '.html'), 'utf8');
}

const expectClass = (element, classes) => {
    expect(element).toHaveClass(classes);
};

const expectNotClass = (element, classes) => {
    expect(element).not.toHaveClass(classes);
};

export { loadHtmlFromExample, expectClass, expectNotClass };
import createElement from '../utils/create-element/index';
import Component from '../component';

export interface OnChange {
    (value: number): any;
}

interface Params {
    items: Array<string>;
    onChange?: OnChange;
}

export default class Dropdown extends Component {
    constructor({ items, onChange = () => {} }: Params) {
        super();
        this.element = createElement(`<select style="background: transparent; color: #fff; border: 0; outline: none;"></select>`);
        items.forEach((item, i) => this.element.appendChild(createElement(
            `<option value="${i}">${item}</option>`
        )));
        this.element.addEventListener('focus', () => {
            this.element.style.backgroundColor = '#000';
        });
        this.element.addEventListener('change', () => {
            this.element.style.backgroundColor = 'transparent';
            onChange(+(<HTMLSelectElement>this.element).value);
        });
    }
}

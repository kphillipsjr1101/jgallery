import View from '../../view';
import AlbumItem from '../../album-item';
import Loading from '../../loading/index';
import createElement from '../../utils/create-element/index';
import load from '../../utils/load/index';

export interface ThumbOnClick {
    (item: AlbumItem): void
}

interface Params {
    item: AlbumItem,
    onClick: ThumbOnClick
}

export default class Thumbnail extends View {
    constructor({ item, onClick }: Params) {
        super();

        const content: HTMLElement = createElement(
            item.thumbElement ?
            item.thumbElement.outerHTML :
            `<img src="${item.thumbUrl}"/>`
        );

        this.element = createElement(`<span></span>`, {
            style: {
                width: '100px',
                height: '100px',
                margin: '-5px',
                borderRadius: '100%',
                boxShadow: '0 0 10px 5px rgba(0,0,0,.4)',
                background: '#333',
                color: '#fff',
                overflow: 'hidden',
                cursor: 'pointer',
                alignItems: 'center',
                justifyContent: 'center',
                display: 'inline-flex',
                flex: '0 0 100px',
                position: 'relative',
            }
        });
        this.element.appendChild((new Loading).getElement());
        this.element.addEventListener('click', () => onClick(item));
        load(content).then(() => {
            this.element.innerHTML = '';
            this.element.appendChild(content);
        });
    }
}
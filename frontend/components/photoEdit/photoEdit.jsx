const React = require('react');
import { Link } from 'react-router';
import PhotoStore from '../../stores/PhotoStore';
import { Button } from 'antd';

export default class PhotoEdit extends React.Component{
    state = {
        photo: PhotoStore.getPhotoById(this.props.params.id),
        canvasa: null,
        contexta: null,
        convasb: null,
        contextb: null,
        width: 0,
        height: 0
    };

    constructor(props){
        super(props);
    }

    componentDidMount (){
        console.log(this.state.photo);
        this.state.canvasa = document.getElementById('canvasa');
        this.state.contexta = canvasa.getContext('2d');
        this.state.canvasb = document.getElementById('canvasb');
        this.state.contextb = canvasb.getContext('2d');
        let image = new Image();

        image.crossOrigin = 'anonymous';
        image.src = this.state.photo.img_url;
        let that = this;
        image.onload = function(){
            that.state.width = image.width;
            that.state.height = image.height;
            that.state.canvasa.setAttribute('width', 400);
            that.state.canvasa.setAttribute('height', 400/image.width*image.height);
            that.state.canvasb.setAttribute('width', 400);
            that.state.canvasb.setAttribute('height', 400/image.width*image.height);
            that.state.contexta.drawImage( image , 0 , 0 , that.state.canvasa.width , that.state.canvasa.height );
            that.state.contextb.drawImage( image , 0 , 0 , that.state.canvasb.width , that.state.canvasb.height );
        };
    }

    greyEffect = () => {
        let imageData = this.state.contexta.getImageData( 0 , 0 , this.state.canvasa.width , this.state.canvasa.height )
        let pixelData = imageData.data;
        for( let i = 0 ; i < this.state.canvasb.width * this.state.canvasb.height ; i ++ ){

            let r = pixelData[i*4];
            let g = pixelData[i*4+1];
            let b = pixelData[i*4+2];

            let grey = r*0.3+g*0.59+b*0.11;

            pixelData[i*4] = grey;
            pixelData[i*4+1] = grey;
            pixelData[i*4+2] = grey;
        }
        this.state.contextb.putImageData( imageData , 0 , 0 , 0 , 0 , this.state.canvasb.width , this.state.canvasb.height );
    };

    blackEffect = () => {
        let imageData = this.state.contexta.getImageData( 0 , 0 , this.state.canvasa.width , this.state.canvasa.height );
        let pixelData = imageData.data;
        for( let i = 0 ; i < this.state.canvasb.width * this.state.canvasb.height ; i ++ ){

            let r = pixelData[i*4];
            let g = pixelData[i*4+1];
            let b = pixelData[i*4+2];

            let grey = r*0.3+g*0.59+b*0.11;
            let pv = 0;
            if(grey > 125)
                pv = 255;
            else
                pv = 0;
            pixelData[i*4] = pv;
            pixelData[i*4+1] = pv;
            pixelData[i*4+2] = pv;
        }
        this.state.contextb.putImageData( imageData , 0 , 0 , 0 , 0 , this.state.canvasa.width , this.state.canvasa.height );
    };

    reverseEffect = () => {
        let imageData = this.state.contexta.getImageData( 0 , 0 , this.state.canvasa.width , this.state.canvasa.height );
        let pixelData = imageData.data;
        for( let i = 0 ; i < this.state.canvasb.width * this.state.canvasb.height ; i ++ ){
            let r = pixelData[i*4];
            let g = pixelData[i*4+1];
            let b = pixelData[i*4+2];

            pixelData[i*4] = 255 - r;
            pixelData[i*4+1] = 255 - g;
            pixelData[i*4+2] = 255 - b;
        }

        this.state.contextb.putImageData( imageData , 0 , 0 , 0 , 0 , this.state.canvasb.width , this.state.canvasb.height );
    };

    blurEffect = () => {
        let tmpImageData = this.state.contexta.getImageData( 0 , 0 , this.state.canvasa.width , this.state.canvasa.height );
        let tmpPixelData = tmpImageData.data;

        let imageData = this.state.contexta.getImageData( 0 , 0 , this.state.canvasa.width , this.state.canvasa.height );
        let pixelData = imageData.data;

        let blurR = 3;
        let totalnum = (2*blurR + 1)*(2*blurR + 1);

        for( let i = blurR ; i < this.state.canvasb.height - blurR ; i ++ )
            for( let j = blurR ; j < this.state.canvasb.width - blurR ; j ++ ){

                let totalr = 0 , totalg = 0 , totalb = 0;
                for( let dx = -blurR ; dx <= blurR ; dx ++ )
                    for( let dy = -blurR ; dy <= blurR ; dy ++ ){

                        let x = i + dx;
                        let y = j + dy;

                        let p = x*this.state.canvasb.width + y;
                        totalr += tmpPixelData[p*4];
                        totalg += tmpPixelData[p*4+1];
                        totalb += tmpPixelData[p*4+2];
                    }

                let p = i*this.state.canvasb.width + j;
                pixelData[p*4] = totalr / totalnum;
                pixelData[p*4+1] = totalg / totalnum;
                pixelData[p*4+2] = totalb / totalnum;
            }

        this.state.contextb.putImageData( imageData , 0 , 0 , 0 , 0 , this.state.canvasb.width , this.state.canvasb.height );
    };

    mosaicEffect = () => {
        let tmpImageData = this.state.contexta.getImageData( 0 , 0 , this.state.canvasa.width , this.state.canvasa.height );
        let tmpPixelData = tmpImageData.data;
        let imageData = this.state.contexta.getImageData( 0 , 0 , this.state.canvasa.width , this.state.canvasa.height );
        let pixelData = imageData.data;

        let size = 16;
        let totalnum = size*size;
        for( let i = 0 ; i < this.state.canvasb.height ; i += size )
            for( let j = 0 ; j < this.state.canvasb.width ; j += size ){

                let totalr = 0 , totalg = 0 , totalb = 0;
                for( let dx = 0 ; dx < size ; dx ++ )
                    for( let dy = 0 ; dy < size ; dy ++ ){

                        let x = i + dx;
                        let y = j + dy;

                        let p = x * this.state.canvasb.width + y;
                        totalr += tmpPixelData[p*4];
                        totalg += tmpPixelData[p*4+1];
                        totalb += tmpPixelData[p*4+2];
                    }

                let p = i*this.state.canvasb.width+j;
                let resr = totalr / totalnum;
                let resg = totalg / totalnum;
                let resb = totalb / totalnum;

                for( let dx = 0 ; dx < size ; dx ++ )
                    for( let dy = 0 ; dy < size ; dy ++ ){

                        let x = i + dx;
                        let y = j + dy;

                        let p = x * this.state.canvasb.width + y;
                        pixelData[p*4] = resr;
                        pixelData[p*4+1] = resg;
                        pixelData[p*4+2] = resb;
                    }
            }
        this.state.contextb.putImageData( imageData , 0 , 0 , 0 , 0 , this.state.canvasb.width, this.state.canvasb.height );

    };


    colorEffect = () => {
        let imageData = this.state.contexta.getImageData( 0 , 0 , this.state.canvasa.width , this.state.canvasa.height )
        let pixelData = imageData.data;
        for( let i = 0 ; i < this.state.canvasb.width * this.state.canvasb.height ; i ++ ){

            let r = pixelData[i*4];
            let g = pixelData[i*4+1];
            let b = pixelData[i*4+2];

            let cr = r; let cg = g; let cb = b;
            let fb1 = 20; let fb2 = 5; let fb3 = 70;

            if (r + fb1 <= 255) cr = r + fb1;
            if (g + fb2 <= 255) cg = g + fb2;
            if (b + fb3 <= 255) cb = b + fb3;

            pixelData[i*4] = cr;
            pixelData[i*4+1] = cg;
            pixelData[i*4+2] = cb;
        }

        this.state.contextb.putImageData( imageData , 0 , 0 , 0 , 0 , this.state.canvasb.width , this.state.canvasb.height );
    };

    savePhoto = () => {
        let image = this.state.canvasb.toDataURL("image/png");
        let data = this.dataURItoBlob(image);
        PhotoStore.saveEditPhoto(data, this.state.photo.img_id);
    };

    dataURItoBlob = (dataURI) => {
        // convert base64 to raw binary data held in a string
        // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
        let byteString = atob(dataURI.split(',')[1]);

        // separate out the mime component
        let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        // write the bytes of the string to an ArrayBuffer
        let ab = new ArrayBuffer(byteString.length);
        let ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        //Old Code
        //write the ArrayBuffer to a blob, and you're done
        //var bb = new BlobBuilder();
        //bb.append(ab);
        //return bb.getBlob(mimeString);

        //New Code
        return new Blob([ab], {type: mimeString});


    }

    render() {
        return (
            <div className="photo-edit-page">
                {/*<img className="edit-origin-img" src={photo.img_url} width="400" alt=""/>*/}
                <div className="edit-back">
                    <Link to={{ pathname: '/album/id/' + this.state.photo.album_id}}>
                        Back To Album
                    </Link>
                </div>
                <canvas id="canvasa" width="400" height="400" >
                    Problems With Edit Picture
                </canvas>
                <canvas id="canvasb" width="400" height="400" >
                    Problems With Edit Picture
                </canvas>
                <div className="effect-button">
                    <Button onClick={this.greyEffect}>grey effect</Button>
                    <Button onClick={this.blackEffect}>black effect</Button>
                    <Button onClick={this.reverseEffect}>reverse effect</Button>
                    <Button onClick={this.blurEffect}>blur effect</Button>
                    <Button onClick={this.mosaicEffect}>mosaic effect</Button>
                    <Button onClick={this.colorEffect}>color effect</Button>
                </div>
                <div className="edit-save-button">
                    <Button type="primary" onClick={this.savePhoto}>
                        SAVE
                    </Button>
                </div>
            </div>
        );
    }
}

module.exports = PhotoEdit;
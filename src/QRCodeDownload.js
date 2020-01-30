import React, {Component} from 'react';
import QRCode from 'qrcode.react'

class QRCodeDownload extends Component {
    
    downloadQR = () => {
        const canvas = document.getElementById("123456");
        const pngUrl = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
            let downloadLink = document.createElement("a");
            downloadLink.href = pngUrl;
            downloadLink.download = "123456.png";
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        };


    render() {
        return (
            <div>
            <QRCode
                id="123456"
                value="123456"
                size={290}
                level={"H"}
                includeMargin={true}
                />
                <a onClick={this.downloadQR}> Download QR </a>
            </div>
        );
    }
}

export default QRCodeDownload;
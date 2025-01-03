import React from "react";
import QRCode from "qrcode.react";

type QRCodeProps = {
  url: string;
  logoSrc: string;
};

const QRCodeWithLogo: React.FC<QRCodeProps> = ({ url, logoSrc }) => {
  const qrSize = 200;
  console.log(url);

  return (
    <div className="relative">
      <QRCode value={url} size={qrSize} bgColor="#ffffff" fgColor="#000000" />
      <img
        src={logoSrc}
        alt="Logo"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12"
      />
    </div>
  );
};

export default QRCodeWithLogo;

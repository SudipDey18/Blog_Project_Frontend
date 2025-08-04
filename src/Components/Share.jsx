// components/SocialShare.jsx
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinIcon,
  TelegramIcon,
} from 'react-share';
import { useState } from 'react';

const SocialShare = ({ url, title, setShare}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-xl shadow-2xl text-white relative w-[90%] max-w-md">
        {/* Close (X) button */}
        <button
          onClick={() => setShare(false)}
          className="absolute top-3 right-4 text-white text-xl hover:text-red-400"
          title="Close"
        >
          ✕
        </button>

        {/* Share URL text */}
        <div className="mb-4 text-center break-words">
          <span className="text-sm text-gray-300">Share this link:</span>
          <div className="bg-gray-600 mt-1 p-2 rounded text-sm select-all">{url}</div>
        </div>

        {/* Share buttons */}
        <div className="flex justify-center gap-4 mb-4">
          <WhatsappShareButton url={url} title={title} separator=":: ">
            <WhatsappIcon size={40} round />
          </WhatsappShareButton>

          <TelegramShareButton url={url} title={title} separator=":: ">
            <TelegramIcon size={40} round />
          </TelegramShareButton>
          
          <FacebookShareButton url={url} quote={title}>
            <FacebookIcon size={40} round />
          </FacebookShareButton>

          <TwitterShareButton url={url} title={title}>
            <TwitterIcon size={40} round />
          </TwitterShareButton>

          <LinkedinShareButton url={url} title={title}>
            <LinkedinIcon size={40} round />
          </LinkedinShareButton>
        </div>

        {/* Copy link button */}
        <div className="flex justify-center">
          <button
            onClick={handleCopy}
            className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-sm"
          >
            📋 {copied ? 'Copied!' : 'Copy Link'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialShare;

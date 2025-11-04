import React, { useEffect, useState } from "react";
import {
  FacebookIcon,
  WhatsappIcon,
  TelegramIcon,
  EmailIcon,
} from "react-share"; // נשתמש רק באייקונים
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import '../styles/ShareMenu.css'

type ShareMenuProps = {
  url: string;
  title?: string;
  onClose: () => void;
};

const encode = (s?: string) => encodeURIComponent(s ?? "");

const ShareMenu: React.FC<ShareMenuProps> = ({ url, title, onClose }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const fbHref = `https://www.facebook.com/sharer/sharer.php?u=${encode(url)}`;
  const waHref = `https://wa.me/?text=${encode(title ? `${title} - ${url}` : url)}`;
  const tgHref = `https://t.me/share/url?url=${encode(url)}&text=${encode(title)}`;
  const mailHref = `mailto:?subject=${encode(title)}&body=${encode(url)}`;

  const handleCopy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const el = document.createElement("textarea");
        el.value = url;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
      onClose();
    } catch {
      // אפשר להציג הודעת שגיאה אם צריך
    }
  };

  return (
    <>
      <div className="share-backdrop" onClick={onClose} />
      <div className="share-menu" role="menu" aria-label="Share menu">
        <a className="share-row" href={fbHref} target="_blank" rel="noopener noreferrer">
          <span className="share-ico"><FacebookIcon size={20} round /></span>
          <span>Facebook</span>
        </a>
        <a className="share-row" href={waHref} target="_blank" rel="noopener noreferrer">
          <span className="share-ico"><WhatsappIcon size={20} round /></span>
          <span>WhatsApp</span>
        </a>
        <a className="share-row" href={tgHref} target="_blank" rel="noopener noreferrer">
          <span className="share-ico"><TelegramIcon size={20} round /></span>
          <span>Telegram</span>
        </a>
        <a className="share-row" href={mailHref}>
          <span className="share-ico"><EmailIcon size={20} round /></span>
          <span>Email link</span>
        </a>
        <button type="button" className="share-row" onClick={handleCopy}>
          <span className="share-ico"><ContentCopyIcon fontSize="small" /></span>
          <span>{copied ? "Copied!" : "Copy link"}</span>
        </button>
      </div>
    </>
  );
};

export default ShareMenu;

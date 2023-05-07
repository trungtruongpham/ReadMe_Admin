import { useEffect, useRef, useState } from "react";

interface PopupProps {
  buttonText: string;
  children: any;
}

const Popup: React.FC<PopupProps> = ({ buttonText, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <button className="bg-slate-200 p-2 rounded" onClick={togglePopup}>{buttonText}</button>
    
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center ">
          <div className="relative p-[20px] max-w-[600px] max-h-[80vh] overflow-y-auto bg-slate-500 rounded">
            <button
              className="absolute top-4 right-4 border-none bg-transparent cursor-pointer"
              onClick={togglePopup}
            >
              X
            </button>
            <div className="mt-4 bg-slate-500">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;

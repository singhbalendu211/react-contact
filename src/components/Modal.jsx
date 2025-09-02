import React from 'react'
import { AiOutlineClose } from "react-icons/ai";
import { createPortal } from 'react-dom';

const Modal = ({onClose, isOpen, children}) => {
  return createPortal(
   <> {isOpen && (
            <div className='grid place-items-center absolute top-0 z-40 backdrop-blur h-screen w-screen'>
                <div className='m-auto z-50 relative min-h-[200px] min-w-[50%] bg-white p-4 rounded-2xl'>

                 <div className='flex justify-end'>
                   <AiOutlineClose onClick={onClose} className='self-end text-2xl' />
                 </div>
                 {children}
                </div>
                {/* <div onClick={onClose} className=''/> */}
            </div>

        )}
  </>,
  document.getElementById('modal-root')
  );
  
};

export default Modal
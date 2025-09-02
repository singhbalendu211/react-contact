import React from 'react'
import { IoPersonSharp } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { IoMdTrash } from "react-icons/io";
import {deleteDoc, doc} from 'firebase/firestore';
import { db } from '../config/firebase';
import AddAndUpdateContact from './AddAndUpdateContact';
import { useDisclosure } from '../hooks/useDisclosure';
import { toast } from 'react-toastify';




const ContactCard = ({contact}) => {

    const {isOpen, onClose, onOpen}= useDisclosure();

    const deleteContact= async(id)=>{
        try {
           await deleteDoc(doc(db, "contacts", id)) 
           toast.success("Contact Deleted Successfully")
        } catch (error) {
            console.log(error);
            
        }
    }

  return (

    <>
        <div key={contact.id} className='bg-[#D1EAED] flex justify-between items-center p-2 rounded-lg'>
            <div className='flex items-center gap-2 '>
              <IoPersonSharp className='text-3xl text-[#4a64f7]' />
            <div className=''>
              <h2 className='font-medium'>{contact.name}</h2>
              <p className='text-sm'>{contact.Email} </p>
            </div>
            </div>
            <div className='flex text-3xl'>
              <FaEdit onClick={onOpen} className='cursor-pointer h-5.5 text-[#023317]' />
              <IoMdTrash onClick={()=>deleteContact(contact.id)} className='text-[#F52907] cursor-pointer h-6' />
            </div>

          </div>
          <AddAndUpdateContact isUpdate contact={contact} isOpen={isOpen} onClose={onClose} />
    </>
 
  );
};

export default ContactCard;
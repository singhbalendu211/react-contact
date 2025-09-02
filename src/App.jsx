import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { FiSearch } from "react-icons/fi";
import { IoPersonAddSharp } from "react-icons/io5";
import {collection, getDocs, onSnapshot,} from 'firebase/firestore';
import { db } from './config/firebase';
import ContactCard from './components/ContactCard';
import AddAndUpdateContact from './components/AddAndUpdateContact';
import { useDisclosure } from './hooks/useDisclosure';
 import { ToastContainer, toast } from 'react-toastify';
import NotFoundCompo from './components/NotFoundCompo';
 
 



function App() {
  const [contacts, setContacts]= useState([]);
  const {isOpen, onClose, onOpen}= useDisclosure();

  useEffect(() => {
    const getContacts= async ()=>{
      try {
        const contactsRef= collection(db,"contacts" );
        // const contactsSnapshot= await getDocs(contactsRef);

        onSnapshot(contactsRef, (snapshot)=>{
           const contactLists= snapshot.docs.map((doc)=>{
          return{
            id: doc.id,
            ...doc.data(),
          };
        });
       
        setContacts(contactLists);
        return contactLists;

        });
       
      } catch (error) {
        console.log(error);
        
      }

    };

    getContacts();
  
  }, []);

  const filterContacts=(e)=>{
    const value= e.target.value;

    const contactsRef= collection(db,"contacts" );
        // const contactsSnapshot= await getDocs(contactsRef);

        onSnapshot(contactsRef, (snapshot)=>{
           const contactLists= snapshot.docs.map((doc)=>{
          return{
            id: doc.id,
            ...doc.data(),
          };
        });

        const filteredContacts= contactLists.filter((contact)=>
          contact.name.toLowerCase().includes(value.toLowerCase())
        
        );
       
        setContacts(filteredContacts);
        return filteredContacts;

        });
  }
  


  return (
    <>
    <div className=' mx-auto max-w-[370px] px-4'>
       <Navbar />

      <div className='flex items-center gap-2'>
        <div className='flex relative items-center flex-grow'>
        <FiSearch className='text-2xl text-white absolute ml-1' />

        <input onChange={filterContacts} type="text" 
        className=' bg-transparent border border-white rounded-md h-10 flex-grow pl-9 text-white' />
       </div>
        <IoPersonAddSharp onClick={onOpen} className='text-3xl text-white cursor-pointer' />

      </div>

      <div className='mt-4 flex flex-col gap-3'>
        { contacts.length <=0 ?<NotFoundCompo />: contacts.map((contact)=>(
         <ContactCard key={contact.id} contact={contact} />
        ))}
      </div>
    </div>
      
      <AddAndUpdateContact isOpen={isOpen} onClose={onClose} />
      <ToastContainer position='bottom-center' />
    
    
    </>
    
  )
}

export default App

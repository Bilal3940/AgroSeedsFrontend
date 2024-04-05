import React, { useState } from 'react';
import { BiLeftArrow, BiSearch, BiSend } from 'react-icons/bi';
import { BsChatDotsFill, BsChatLeftFill } from 'react-icons/bs';
import { CgCross } from 'react-icons/cg';
import { RxAvatar, RxCross1 } from 'react-icons/rx';

const Inbox = () => {
  const dummyData = [
    { name: 'John Doe', message: 'Hello there!', date:"April 6, 2024" },
    { name: 'Jane Smith', message: 'How are you?',date:"April 6, 2024" },
    { name: 'Alice Johnson', message: 'Nice to meet you!',date:"April 5, 2024" },
    { name: 'Bob Brown', message: 'What\'s up?',date:"April 4, 2024" },
    { name: 'Eva Lee', message: 'Howdy!',date:"April 3, 2024" },
    { name: 'Michael Clark', message: 'Good day!',date:"April 1, 2024" }
  ];

  const [selectedMessage, setSelectedMessage] = useState(null);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  const handleSelectMessage = (message, index) => {
    setSelectedMessage(message);
    setSelectedItemIndex(index);
  };
  return (
    <div className=''>
      {/* Search Input */}
    

      {/* Main Sections */}
      <div className="flex h-screen">
        {/* Left Section */}
        <div className="w-1/3 overflow-auto border-[2px]">
          {/* Placeholder for avatar, name, and last message */}
          <div className="input-group m-4">
        <div className="flex gap-[10px] items-center input-group-prepend">
          <span className="input-group-text"><BiSearch size={"1.5rem"} /></span>
          <input type="text" className="h-[50px] pl-[10px] w-full rounded-[30px] form-control" id="searchInput" placeholder="Search"/>
        </div>
      </div>
      <div className="border rounded">
  {dummyData.map((item, index) => (
    <div key={index} className={`p-4 border rounded ${index === selectedItemIndex ? 'bg-blue-200' : ''}`} onClick={() => handleSelectMessage(item, index)}>
      <div className="flex justify-between">
        <div>
          <div className='flex gap-[10px] items-center'>
            <RxAvatar size={"2rem"} />
            <div>
              <p style={{fontWeight:"bold"}} className='font-weight-bold items-center'>{item.name}</p>
              <p style={{color:"grey"}}>{item.message}</p>
            </div>
          </div>
        </div>
        <div className="text-gray-500">
          {/* Format the date here */}
          <p>{item.date}</p>
        </div>
      </div>
    </div>
  ))}

</div>
<div className='sticky bottom-0 w-full'>
      <button className="btn btn-secondary w-full h-[40px] bg-gray">Cancel</button>
    </div>
        </div>

        {/* Right Section */}
            {selectedMessage && selectedMessage ? (
        <div className="w-2/3 h-full overflow-auto">
          {/* Detailed Messaging */}
              <div className='flex justify-between  sticky top-0 bg-[lightgrey] p-4 border rounded ' >
                <div className='flex gap-[7px]' >
                <RxAvatar size={"1.8rem"} />
                <p>{selectedMessage.name}</p>
                </div>
                <div className='item-center' >
                  <RxCross1 style={{cursor:"pointer"}} onClick={()=>{setSelectedMessage(null);setSelectedItemIndex(null);}} size={"1.5rem"} />
                </div>
              </div>
          <div className=" p-4 border rounded h-full">
              <div className='bg-[lightgrey] w-[max-content]  p-4 border rounded-[30px]' >
                <p >{selectedMessage.message}</p>
              </div>
            

            {/* Text Field and Send Button (Fixed at bottom) */}
            <div className="w-full items-center flex mb-5 fixed bottom-0">
              <input 
                type="text" 
                className="pl-[30px] h-[50px] rounded-[30px] w-[62%] form-control mr-2"
                style={{ overflowWrap: 'break-word' }}
                placeholder="Type your message..."
                />
              <BiSend size={"1.5rem"} />
            </div>
          </div>
        </div>
      ):(
        <div className=" flex items-center justify-center w-full h-full">
          <div>
          <div className='flex justify-center' >
          <BsChatDotsFill size={"4rem"} />
        </div>
        <p className="text-center w-full">Select Chat to Message</p>
      </div>
      </div>
      )}
      </div>
    </div>
  );
}

export default Inbox;

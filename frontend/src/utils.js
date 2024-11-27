import { toast } from 'react-toastify';

export const handleSuccess = (msg) => {
    toast.success(msg, {
        position: 'top-right'
    })
}

export const handleError = (msg) => {
    toast.error(msg, {
        position: 'top-right'
    })
}
export const fetchCookie=async(item)=>{
    let cookieUrl="http://localhost:3000/getCookie";
    try{
    let response=await fetch(cookieUrl,{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      credentials: 'include',
      body:JSON.stringify({item}),
    });
    // console.log(response);
    const data=await response.json();
    return data.value;
  }
  catch(error){
    console.error("Error fetching cookie:", error);
    throw error;
  }
  }
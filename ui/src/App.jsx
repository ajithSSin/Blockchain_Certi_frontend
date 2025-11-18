import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { createWalletClient, custom } from 'viem' //creation of client and transport

import { hardhat , hoodi} from 'viem/chains' /// import particular chain

import { readContract, writeContract } from 'viem/actions'

// read from blockchain
// used to sent a transaction , to write something to blockchain


//abi and contract address
import cert from "./assets/Certi.json";

// import './App.css'

function App() {

  const [formdata, setFormdata]=useState({
                                            id:"",
                                            name:"",
                                            course:"",
                                            grade:"",
                                            date:""
                                          })

  const[addr, setAddr]=useState(null)
  const [ID,setID]=useState();

  const[output,setOutput]=useState('');

  // client creation (wallet client creation) for communication with blockchain
  //import chain from viem-chains
  //through what we are connecting specify metamask
  // for getting an address we are requesting

  const client= createWalletClient({
                                    chain:hoodi,     
                                    transport:custom(window.ethereum)

                                  })
  // function to connect with metamask

  async function connectmetamask(){

    const [Addr]=await client.requestAddresses();
    setAddr(Addr);   
    console.log(addr);    
    
  }
  function getId(){
    const id=document.getElementById('cid').value;
    setID(id);
  }

  function handleChange(e){
    const {name,value}=e.target;
    setFormdata ((prevState)  =>({...prevState,[name]:value}))

  }

  async function handleSubmit(){

    console.log(formdata);
    console.log(addr);
    console.log(cert.abi);
     
    const Id=parseInt(formdata.id);

     // specify the client and contract
     // contract address; and abi 

    const txhash= await writeContract(client,{
                    address:cert.ContractAddress,
                    abi:cert.abi,
                    functionName:'Certificate', //
                    args:[Id,
                          formdata.name,
                          formdata.course,
                          formdata.grade,
                          formdata.date
                        ],
                    account:addr                    
     })
     console.log(txhash);

   }

    async function viewCertificate(){

      console.log(typeof(ID));
      const cid = parseInt(ID)
      console.log(typeof(cid));
      
      // const txDetails = await readContract(client,{
      //   address:cert.ContractAddress,
      //   abi:cert.abi,
      //   functionName:"certificates",
      //   args:[cid],
      //   account:addr
      // })
      const txDetails = await readContract(client,{
  address: cert.ContractAddress,
  abi: cert.abi,
  functionName: "certificates",
  args: [cid]
})

      console.log(txDetails);
      setOutput(`Name:${txDetails[0]},
        Course:${txDetails[1]},
        Grade:${txDetails[2]},
        Date:${txDetails[3]}`);
      
    }  
  
  return(
    <>
   <div className='flex justify-end'>
    <button className="bg-blue-500 mt-10
                                hover:bg-green-400   
                                text-white font-bold py-2 px-4 
                                rounded-full w-100"
            type="submit" 
            onClick={connectmetamask} >
      Connect to MetaMask                              
    </button>
   </div> 

   <div className='m-10'>  
   
      <h2 className='m-5  text-center font-bold' > Enter Certificate Details </h2>
      <br/>
                <label htmlFor="">Certificate id</label>

                <input type="text"
                        className='outline m-5 ml-17' 
                        placeholder=''
                        name="id"
                        // value={}
                        onChange={handleChange}                       
                       /> 
      <br/>
      <br/>
                <label htmlFor="">Candidate Name</label>

                <input type="text"
                        className='outline m-5 ml-10' 
                        placeholder=''
                        name='name'
                        // value={}
                        onChange={handleChange}
                       /> 
      <br/>
      <br/>
                <label htmlFor="">Course Name</label>
                <input type="text"
                        className='outline m-5 ml-15' 
                        placeholder=''
                        name='course'
                        onChange={handleChange}
                       
                       /> 
      <br/>
      <br/>
                <label htmlFor="">Grade</label>
                <input type="text"
                        className='outline m-5 ml-28' 
                        placeholder=''
                        name='grade'
                        onChange={handleChange}                       
                       /> 
      <br/>
      <br/>
                <label htmlFor="">Date</label>
                <input type="date"
                        className='outline m-5 ml-30' 
                        placeholder=''   
                        name='date'    
                        onChange={handleChange}                
                       /> 
      <br/>   
      <div className=''>
      <input className='bg-sky-500 rounded-full p-2' 
      
      type="button" value="Submit"
      onClick={handleSubmit} />
    </div>
    </div>

    <div className='m-5'>
            <p className='font-bold m-4'>View Cetificate</p>

            <div className='flex '>
              <p className='mr-2'>Enter Certificate Id :</p>

              <input className='border border-black m-4' 
                    type="text" 
                    id="cid" 
                    name="cid"
                    onChange={getId}/>
            </div>                
            
            <input className='bg-sky-500 rounded p-1 w-25' 
                      type="button" 
                      value="View" 
                      onClick={viewCertificate}/>
                      <br/>         
    </div>  
    <div>
     
    <div >
      <h3 className='font-bold mb-2'>Certificate Details</h3>
      <p>{output}</p>
    </div>
    <br/>

</div>
    
    </>
  )
}

export default App

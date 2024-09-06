import { useParams } from 'react-router-dom';
import { useFetch } from '../../../../FrontendClient/src/Hook/Fetch';
import style from './addProduct.module.css'
import { useState } from 'react';

export function EditProduct() {
    const { editId } = useParams();
    const userData = JSON.parse(localStorage.getItem('userData'));
    const token = userData?.token
    const Data = useFetch('https://fullstackshop-twinst.onrender.com/admin/edit-product/' + editId);
    const [state, setState] = useState();
    const [status,setStatus] = useState('');
    const [files, setFiles] = useState(null);
    const [fileArr, setFileArr]  = useState([]);

    function uploadFile() {
      setStatus('Uploading....')
      const fd = new FormData();
      for(let i =0; i<files.length; i++) {
        fd.append(`file${i+1}`, files[i]);
      }
      fetch('http://httpbin.org/post', {
        method: "POST", 
        headers: {
            "Custom-Header": "value"
        },
        body: fd
      }).then(res => {
        if(res){
          setStatus('Uploaded!');
          return res.json()
        }
        }).then(data => setFileArr([data.files.file1, data.files.file2, data.files.file3,data.files.file4,data.files.file5]))
    }
    function submitHandle(e) {
        e.preventDefault();
        const FromData = new FormData(e.target);
        const data = {
          name: FromData.get('name'),
          long_desc: FromData.get('long_desc'),
          short_desc: FromData.get('short_desc'),
          price: FromData.get('price'),
          category: FromData.get('category'),
          count: FromData.get('count'),
          photos: fileArr
        }
        console.log(data);
        fetch('https://fullstackshop-twinst.onrender.com/admin/product-edit/'+ editId, {
          method: "PATCH",
          headers: {
              "Content-Type" : "application/json",
              "Authorization": "Bearer " + token
          },
          body: JSON.stringify(data)
         })
        alert('product Updated!');
      }

    return (
        <>
              {Data && 
              <form  onSubmit={submitHandle} className={style.form} key={Data._id}>
                   <label htmlFor='name'>Name</label>
                   <input onClick={() => setState(Data)} 
                                       onChange={(e)=> setState(state.name = e.target.value)} 
                                       value={state?.name} 
                                       placeholder={Data.name}
                        style={{height:"28px", outline: "none", textIndent:"10px"}} 
                        type='text' name='name' required>
                   </input>
                   <label htmlFor='long_desc'>Long Description</label>
                   <textarea onClick={() => setState(Data)} 
                                       onChange={(e)=> setState(state.long_desc = e.target.value)} 
                                       value={state?.long_desc} 
                                       placeholder={Data.long_desc}
                            style={{height:"100px", outline: "none", textIndent:"10px"}} 
                            type='text' name='long_desc' required>

                    </textarea>
                   <label htmlFor='short_desc'>Short Description</label>
                   <textarea  onClick={() => setState(Data)} 
                                       onChange={(e)=> setState(state.short_desc = e.target.value)} 
                                       value={state?.short_desc} 
                                       placeholder={Data.short_desc}
                            style={{height:"60px", outline: "none", textIndent:"10px"}} 
                            type='text' name='short_desc' required>

                    </textarea>
                   <label htmlFor='price'>Price</label>
                   <input  onClick={() => setState(Data)} 
                                       onChange={(e)=> setState(state.price = e.target.value)} 
                                       value={state?.price} 
                                       placeholder={Data.price}
                        style={{height:"28px", outline: "none", textIndent:"10px", width:"150px"}} 
                        type='number' name='price' required>
                        
                    </input>
                   <label htmlFor='category'>Category</label>
                   <input onClick={() => setState(Data)} 
                                       onChange={(e)=> setState(state.category = e.target.value)} 
                                       value={state?.category} 
                                       placeholder={Data.category}
                            style={{height:"28px", outline: "none", textIndent:"10px"}} 
                            type='text' name='category' required>
                            
                    </input>
                   <label htmlFor='count'>Count</label>
                   <input onClick={() => setState(Data)} 
                                       onChange={(e)=> setState(state.count = e.target.value)} 
                                       value={state?.count} 
                                       placeholder={Data.count} 
                        style={{height:"28px", outline: "none", textIndent:"10px", width:"150px"}} 
                         type='number' name='count' required>

                   </input>
                   <label htmlFor='photos'>Upload 5 Images</label>
                   <input onChange={(e) => setFiles(e.target.files)} multiple type='file' name='photos'></input>
                   <button style={{height:"40px", width:"100px", backgroundColor:"blue", color:"white"}}  type='submit'>Submit</button>
            </form>}
            <div className={style.upload}>
                    <p>{status}</p>
                    <button onClick={uploadFile}>Upload</button>
              </div>
        </>
    )
}

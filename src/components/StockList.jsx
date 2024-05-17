import {useState, useEffect} from 'react'
import { BiSolidUpArrow, BiSolidDownArrow  } from "react-icons/bi";
import finnHub from '../apis/finnHub'

export const StockList = ()=> {
  const [stock, setStock] = useState([])
  const [watchList, setWatchList] = useState(['GOOGL', 'MSFT', 'AMZN'])

  const renderColor = (data)=>(data > 0?'success':'danger')
  const renderIcon = (data)=>(data > 0?<BiSolidUpArrow />:<BiSolidDownArrow/>)
  
  useEffect(()=>{
    let isMount = true
    const fetchData = async ()=>{
      try{
        const responses = await Promise.all(watchList.map((stock)=>{
          return finnHub.get('/quote',{
            params:{
              symbol: stock
            }
          })
        }))

        const data = responses.map((response)=>{
          return {
            data: response.data,
            symbol: response.config.params.symbol
          }
        })
        
        console.log(data)
        if(isMount){
          setStock(data)
        }
      
      }catch(err){
        
      }
    }
    fetchData()

    return ()=>(isMount = false)
  },[])
            
  return(
    <table className="table hover mt-5">
      <thead style={{color: 'rgb(79,89,102)'}}>
        <tr>
          <th scope='col'>Name</th>
          <th scope='col'>Last</th>
          <th scope='col'>Chg</th>
          <th scope='col'>Chg%</th>
          <th scope='col'>High</th>
          <th scope='col'>Low</th>
          <th scope='col'>Open</th>
          <th scope='col'>Pclose</th>
        </tr>
      </thead>
      <tbody>
        {
          stock.map((item)=>{
            return(
              <tr key={item.symbol} className='table-row'>
                <th scope="row">{item.symbol}</th>
                <td>{item.data.c}</td>
                <td className={`text-${renderColor(item.data.d)}`}>{item.data.d}{renderIcon(item.data.d)}</td>
                <td className={`text-${renderColor(item.data.dp)}`}>{item.data.dp}{renderIcon(item.data.dp)}</td>
                <td>{item.data.h}</td>
                <td>{item.data.l}</td>
                <td>{item.data.o}</td>
                <td>{item.data.pc}</td>
              </tr>
          )}
        )}
      </tbody>
    </table>
  )
}
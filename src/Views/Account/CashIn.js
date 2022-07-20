import React, { useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { getCashOuts } from "../../Services/apis";
import { toast } from "react-toastify";

export default function Cashin() {
  const dispatch = useDispatch();
  const [details, setDetails] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchCashin()
    }, [dispatch]);

    const fetchCashin = () => {
      setLoading(true)
      getCashOuts().then(r => {
          if(r.success) {
              setDetails(r.data);
              setLoading(false)

          } else {
              toast.error(r.message);
              setLoading(false)

          }
      }).catch(err => {
          toast.error('Internal server eror');
          setLoading(false)

      })
  }
  
  return (
    <div className="account">
       <div className="page__head">
         <div className="page__head-item app-flex-item">
           <h3>Cash In History</h3>
          
           </div>
      </div>
      <div>
        <table className="dgStyle" cellSpacing="0" border="0" id="ac_w_PC_PC_grid"
          style={{ borderWidth: '0px', borderStyle: 'None', width: '100%', borderCollapse: 'collapse' }}>
          <tbody >
            <tr className="dgHdrStyle">
              <th align="center" scope="col">ID</th>
              <th align="center" scope="col">Date</th>
              <th className="dgHdrImporti" scope="col">Amount</th>
              <th align="center" scope="col">Comment</th>
            </tr>
            {loading ? 
            <tr  style={{ textAlign: 'center', width: "100%"}}><h3 >LOADING.....</h3> </tr>
             :
             details && details.map((item, i) => (
            <tr className="dgItemStyle" key={i}>
              <td align="center">
                {item?.id}
              </td>
              <td align="center"> {item?.date}</td>
              <td align="center">{item?.amount}</td>
              <td align="center">{item?.comment}</td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

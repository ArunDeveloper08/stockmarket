"use client"
// import { getData } from "@/actions/data";

import React, { Fragment, useEffect, useState } from "react";

const Table = () => {
  // const [data, setData] = useState({
  //   error: "",
  //   loading: false,
  //   data: {},
  // });
  // useEffect(() => {
  //   const init = async () => {
  //     try {
  //       setData((p) => ({ ...p, loading: true }));
  //       const data = await getData();
  //       setData((p) => ({ ...p, error: "", data: data }));
  //     } catch (error) {
  //       setData((p) => ({ ...p, data: {}, error: error.toString() }));
  //     } finally {
  //       setData((p) => ({ ...p, loading: false }));
  //     }
  //   };
  //   init();
  // }, []);
  // if (data.loading) {
  //   return <p>Loading...</p>;
  // }
  // if (data.error) {
  //   return <p>{JSON.stringify(data.error)}</p>;
  // }
  // console.log(data.data)
  // if (!("filtered" in data.data)) {
  //   return <p>Page Loading...</p>;
  // }
  // console.log(data.data.filtered.data);






  const [data, setOptionChainData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://www.nseindia.com/api/option-chain-indices?symbol=NIFTY`);

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setOptionChainData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);




 if(loading)return  <p>Loading...</p>
  if(error){ return <p>Error: {error}</p>}





  return (
    <div>
      <table className="w-1/2 m-6">
        <tbody>
          <tr>
            <th>Strike Price</th>
            <th>CE / PE</th>
            <th>Ask price</th>
          </tr>
          {data?.data?.filtered?.data?.map((item) => (
            <Fragment key={item.strikePrice}>
              <tr>
                <td>{item.CE.strikePrice}</td>
                <td>CE</td>
                <td>{item.CE.askPrice}</td>
              </tr>
              <tr>
                <td>{item.PE.strikePrice}</td>
                <td>PE</td>
                <td>{item.PE.askPrice}</td>
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

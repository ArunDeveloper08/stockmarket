"use client";
import { getData } from "@/actions/data";

import React, { Fragment, useEffect, useState } from "react";

const Table = () => {
  const [data, setData] = useState({
    error: "",
    loading: false,
    data: {},
  });
  useEffect(() => {
    const init = async () => {
      try {
        setData((p) => ({ ...p, loading: true }));
        const data = await getData();
        setData((p) => ({ ...p, error: "", data: data }));
      } catch (error) {
        setData((p) => ({ ...p, data: {}, error: error.toString() }));
      } finally {
        setData((p) => ({ ...p, loading: false }));
      }
    };
    init();
  }, []);
  if (data.loading) {
    return <p>Loading...</p>;
  }
  if (data.error) {
    return <p>{JSON.stringify(data.error)}</p>;
  }
  console.log(data.data)
  return (
    <div>
      <table className="w-1/2 m-6">
        <tbody>
          <tr>
            <th>Strike  t Price</th>
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

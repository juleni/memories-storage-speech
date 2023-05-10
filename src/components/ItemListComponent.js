import React from "react";
import Table from "react-bootstrap/Table";
import { MEM_TYPE } from "../constants/constants";
import "./ItemListComponent.css";

export default function ItemListComponent({ itemList }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Type</th>
          <th>Date</th>
          <th>Title</th>
        </tr>
      </thead>
      <tbody>
        {itemList.map((item, index = 0) => (
          <tr key={index++}>
            <td>{index}</td>
            <td className={MEM_TYPE[item.type]}>{MEM_TYPE[item.type]}</td>
            <td>{item.date}</td>
            <td>
              <a href={item.url} target="_blank">
                {item.title}
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

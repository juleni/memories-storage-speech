import React from "react";
import { default as BootstrapTable } from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { MEM_TYPE } from "../constants/constants";
import "./ItemListComponent.css";

export default function ItemSortableListComponent({ itemList }) {
  const idFormatter = (data, row, index) => {
    return <div>{index + 1}</div>;
  };

  const titleFormatter = (data, row) => {
    //console.log(row);
    return (
      <a href={row.url} target="_blank">
        {data}
      </a>
    );
  };

  const typeFormatter = (data, row) => {
    return <div className={MEM_TYPE[data]}>{MEM_TYPE[data]}</div>;
  };

  const columns = [
    {
      dataField: "id",
      text: "#",
      sort: true,
      formatter: idFormatter,
    },
    {
      dataField: "type",
      text: "Type",
      sort: true,
      formatter: typeFormatter,
    },
    {
      dataField: "date",
      text: "Date",
      sort: true,
      style: { width: "100px" },
    },
    {
      dataField: "title",
      text: "Title",
      formatter: titleFormatter,
    },
  ];

  return (
    <BootstrapTable
      keyField="id"
      data={itemList}
      columns={columns}
      striped
      hover
      condensed
      pagination={paginationFactory()}
    />
  );
}

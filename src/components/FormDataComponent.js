import React, { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { MEM_TYPE } from "../constants/constants";
import ItemListComponent from "./ItemSortableListComponent";
import ItemTimelineComponent from "./ItemTimelineComponent";

export default function FormDataComponent() {
  const [memType, setMemType] = useState(0);
  const [memDate, setMemDate] = useState(
    new Date().toJSON().slice(0, 10).replace(/-/g, "-")
  );
  const [memTitle, setMemTitle] = useState("");
  const [memItemList, setMemItemList] = useState([]);

  const refTitle = useRef();
  const refSaveBtn = useRef();
  const refFileInput = useRef();

  useEffect(() => {
    // On load: Read and set memory items from Local Storage
    const storageMemItemList = JSON.parse(
      localStorage.getItem("memSpeechItemList")
    );
    if (storageMemItemList) {
      setMemItemList(storageMemItemList);
    }
  }, []);

  const handleAdd = () => {
    const refTitleValue = refTitle.current.value.replace(/\s+/g, "");
    if (refTitleValue.length === 0) return;
    let memItem = {
      id: memItemList.length,
      type: memType,
      date: memDate,
      title: memTitle,
    };

    const newList = memItemList.concat(memItem);
    setMemItemList(newList);

    memItemList.push(memItem);
    console.log("1. memSpeechItemList");
    console.log(memItemList);

    // Add items to Local Storage
    localStorage.setItem("memItemList", JSON.stringify(memItemList));
    refTitle.current.value = "";
  };

  const handleExport = () => {
    const fileData = JSON.stringify(memItemList);
    const blob = new Blob([fileData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "export-mem.json";
    link.href = url;
    link.click();
  };

  const handleImport = (e) => {
    var file = e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function (e) {
      const fileContentArr = JSON.parse(e.target.result);
      // read data from file and set memory list state
      setMemItemList(fileContentArr);
      // Add imported items to Local Storage
      localStorage.setItem("memItemList", JSON.stringify(fileContentArr));
    };
    reader.readAsText(file);
  };

  const sortListByDate = (memItemList) => {
    return memItemList.sort(function (a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(b.date) - new Date(a.date);
    });
  };

  return (
    <div className="container">
      <Form>
        <Form.Group controlId="formGroupTitle">
          <Form.Label>Type and Date</Form.Label>
          <InputGroup className="mb-3">
            <Form.Select onChange={(e) => setMemType(e.target.value)}>
              {MEM_TYPE.map((item, index = 0) => (
                <option key={index} value={index++}>
                  {item}
                </option>
              ))}
            </Form.Select>
            <Form.Control
              type="date"
              min="1977-03-17"
              max="2077-03-17"
              aria-label="Date of the memory"
              defaultValue={memDate}
              onChange={(e) => setMemDate(e.target.value)}
            />
          </InputGroup>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            ref={refTitle}
            onChange={(e) => setMemTitle(e.target.value)}
          />
        </Form.Group>
        <div className="text-center">
          <ButtonGroup aria-label="Speech Memory">
            <Button
              variant="secondary"
              onClick={handleAdd}
              type="button"
              size="lg"
            >
              Start Speech
            </Button>
            <Button
              variant="primary"
              onClick={handleAdd}
              type="button"
              size="lg"
            >
              Add Memory
            </Button>
          </ButtonGroup>
        </div>
      </Form>
      <div>
        <hr />

        <Tabs
          defaultActiveKey="tableView"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="tableView" title="Table View">
            <ItemListComponent itemList={sortListByDate(memItemList)} />
          </Tab>
          <Tab eventKey="timelineView" title="Timeline View">
            <ItemTimelineComponent itemList={sortListByDate(memItemList)} />
          </Tab>
        </Tabs>

        <div className="float-end mt-3 mb-3">
          <ButtonGroup aria-label="Import/Export">
            <Button
              variant="outline-success"
              onClick={handleExport}
              type="button"
              ref={refSaveBtn}
            >
              Export
            </Button>
            <Form.Control
              ref={refFileInput}
              onChange={handleImport}
              type="file"
              style={{ display: "none" }}
            />
            <Button
              variant="outline-warning"
              onClick={() => refFileInput.current.click()}
              type="button"
            >
              Import
            </Button>
          </ButtonGroup>
        </div>

        {/**
         * console.log(JSON.stringify(memItemList, null, "\t"))
         */}
      </div>
    </div>
  );
}
